<template>
  <el-form
    ref="form"
    :model="form"
    label-width="100px"
    :status-icon="true"
    :rules="rules"
  >

    <el-form-item
      label="邮箱："
      label-width="100px"
      prop="email"
    >
      <el-input v-model="form.email  "></el-input>
      <button
        @click="getCaptcha"
        class="code-btn"
        :disabled="!show"
        type="button"
      >
        <span v-show="show">发送验证码</span>
        <span
          v-show="!show"
          class="count"
        >{{count}} s</span>
      </button>
    </el-form-item>

    <el-form-item
      label="验证码："
      label-width="100px"
      v-if="isSend"
      prop="captcha"
    >
      <el-input v-model="form.captcha  "></el-input>
    </el-form-item>
    <el-form-item
      label="密码："
      label-width="100px"
      v-if="isSend"
      prop="password"
    >
      <el-input
        v-model="form.password"
        show-password
      ></el-input>
    </el-form-item>
    <el-form-item
      label="新手机号："
      label-width="100px"
      v-if="isSend"
      prop="newTel"
    >
      <el-input v-model="form.newTel  "></el-input>
    </el-form-item>
    <el-button
      type="primary"
      @click="onSubmit('form')"
    >确定</el-button>
  </el-form>

</template>

<script>
const TIME = 60;

export default {
  data() {
    var telReg = /^[1][3,4,5,7,8][0-9]{9}$/;
    var validateTel = (rule, value, callback) => {
      if (value === "" || value.split(" ").join("").length === 0) {
        return callback(new Error("号码不能为空!!"));
      } else if (!telReg.test(value)) {
        callback(new Error("号码格式有误"));
      } else {
        callback();
      }
    };
    var validatePass = (rule, value, callback) => {
      if (value === "" || value.split(" ").join("").length === 0) {
        callback(new Error("请输入密码!"));
      } else {
        callback();
      }
    };

    return {
      isSend: false,
      message: "",
      show: true,
      count: "",
      timer: null,

      form: {
        newTel: "",
        email: "",
        password: "",
        id: this.$cookies.get("OTAKUId"),
        captcha: ""
      },
      rules: {
        email: [
          {
            type: "email",
            message: "邮箱格式错误！",
            trigger: "blur"
          },
          {
            required: true,
            message: "请输入邮箱",
            trigger: "blur"
          }
        ],
        password: { validator: validatePass, trigger: "blur", required: true },
        newTel: { validator: validateTel, trigger: "blur", required: true },

        captcha: { required: true, message: "请输入验证码", trigger: "blur" }
      }
    };
  },
  methods: {
    onSubmit(formName) {
      this.show = true;
      clearInterval(this.timer);
      this.timer = null;
      this.$refs[formName].validate(valid => {
        if (valid) {
          this.$http
            .post(`user/user`, this.form)
            .then(res => {
              this.$message("修改成功");
            })
            .catch(err => {
              this.message = err.request.responseText;

              this.$message({
                message: this.message,
                type: "error"
              });
            });
        } else {
          return false;
        }
      });
    },
    getCaptcha() {
      if (
        this.form.email === "" ||
        this.form.email.split(" ").join("").length === 0
      ) {
        return;
      } else {
        this.$http
          .get(
            `user/email?` +
              `email=` +
              this.form.email +
              `&_id=` +
              this.$cookies.get("OTAKUId")
          )
          .then(res => {
            this.$http
              .get(`user/captcha?` + `email=` + this.form.email)
              .then(res => {
                this.$message("验证码已发送到您的邮箱");
                this.isSend = true;
                if (!this.timer) {
                  this.count = TIME;
                  this.show = false;
                  this.timer = setInterval(() => {
                    if (this.count > 0 && this.count <= TIME) {
                      this.count--;
                    } else {
                      this.show = true;
                      clearInterval(this.timer);
                      this.timer = null;
                    }
                  }, 1000);
                }
              })
              .catch(err => {
                this.message = err.request.responseText;
                this.$message({
                  message: this.message,
                  type: "error"
                });
              });
          })
          .catch(err => {
            this.message = err.request.responseText;
            this.$message({
              message: this.message,
              type: "error"
            });
          });
      }
    }
  }
};
</script>
<style scoped>
.code-btn {
  width: 100px;
  height: 24px;
  position: absolute;
  top: 10px;
  right: 5px;
  z-index: 222;
  color: #f5a623;
  font-size: 14px;
  border: none;
  border-left: 1px solid #bababa;
  padding-left: 10px;
  background-color: #fff;
}
</style>