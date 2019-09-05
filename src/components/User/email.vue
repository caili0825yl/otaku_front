<template>
  <el-form
    ref="form"
    :model="form"
    label-width="100px"
    :status-icon="true"
    :rules="rules"
  >

    <el-form-item
      label="手机号："
      label-width="100px"
      prop="tel"
    >
      <el-input v-model="form.tel  "></el-input>

    </el-form-item>
    <el-form-item
      label="密码："
      label-width="100px"
      prop="password"
    >
      <el-input v-model="form.password  "></el-input>
    </el-form-item>

    <el-form-item
      label="新邮箱："
      label-width="100px"
      prop="newEmail"
    >
      <el-input v-model="form.newEmail  "> </el-input>

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
      prop="captcha"
    >
      <el-input v-model="form.captcha  "></el-input>
    </el-form-item>
    <el-button
      type="primary"
      @click="onSubmit('form')"
    >确定</el-button>
  </el-form>

</template>

<script>
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
      message: "",
      show: true,
      count: "",
      timer: null,
      form: {
        tel: "",
        newEmail: "",
        password: "",
        id: this.$cookies.get("OTAKUId"),
        captcha:""
      },
      rules: {
        newEmail: [
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
        password: {
          validator: validatePass,
          trigger: "blur",
          required: true
        },
        tel: { validator: validateTel, trigger: "blur", required: true },

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
        this.form.newEmail === "" ||
        this.form.newEmail.split(" ").join("").length === 0
      ) {
        return;
      } else {
        this.$http
          .get(
            `user/email?` +
              `email=` +
              this.form.newEmail +
              `&_id=` +
              this.$cookies.get("OTAKUId")
          )
          .then(res => {
            this.$http
              .get(`user/captcha?` + `email=` + this.form.newEmail)
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