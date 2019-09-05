<template>
  <div>

    <el-button
      type="text"
      @click="registerVisible = true"
    >注册</el-button>

    <el-dialog
      width="30%"
      title="用户注册"
      :visible.sync="registerVisible"
      center
      @close='recover'
      :close-on-click-modal="false"
    >
      <el-form
        :status-icon="true"
        :model="first"
        ref="first"
        :rules="firstRules"
      >
        <el-form-item
          label="邮箱："
          :label-width="formLabelWidth"
          prop="email"
        >
          <el-input
            v-model="first.email"
            autofocus="true"
          ></el-input>
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
          :label-width="formLabelWidth"
          prop="captcha"
        >
          <el-input v-model="first.captcha"></el-input>

        </el-form-item>
        <el-form-item
          label="手机号："
          :label-width="formLabelWidth"
          prop="tel"
        >
          <el-input v-model="first.tel"></el-input>
        </el-form-item>
        <el-form-item
          label="密码："
          :label-width="formLabelWidth"
          prop="password"
        >
          <el-input
            v-model="first.password"
            show-password
          ></el-input>
        </el-form-item>

        <el-form-item
          label="确认密码："
          :label-width="formLabelWidth"
          prop="checkPass"
        >
          <el-input
            v-model="first.checkPass"
            show-password
          ></el-input>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="registerVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="ifNext('first')"
        >下一步</el-button>
      </div>

    </el-dialog>
    <el-dialog
      width="30%"
      title="完善资料"
      center
      :visible.sync="nextDialogVisible"
      :show-close=false
      :close-on-click-modal=false
      @close='recover'
    >
      <el-form
        :model="next"
        :status-icon="true"
        ref="next"
      >
        <el-form-item
          label="用户名："
          :label-width="formLabelWidth"
          autofocus
        >
          <el-input
            v-model="next.username"
            placeholder="默认为用户id"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="头像："
          :label-width="formLabelWidth"
        >
          <el-upload
            class="avatar-uploader"
            action="http://localhost:3050/api/user/upload"
            :show-file-list="false"
            :on-success="handleAvatarSuccess"
            :before-upload="beforeAvatarUpload"
            name="file"
            :with-credentials="true"
          >

            <el-avatar
              class="block"
              :size="100"
              v-if="next.avatar"
              :src="next.avatar"
            ></el-avatar>
            <i
              v-else
              class="el-icon-plus avatar-uploader-icon"
            ></i>
          </el-upload>
        </el-form-item>

      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button
          type="primary"
          @click="setInfo"
        >完成</el-button>
      </div>
    </el-dialog>
  </div>
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
      } else if (value.length < 6) {
        callback(new Error("密码过短！"));
      } else if (value.length > 20) {
        callback(new Error("密码过长！"));
      } else {
        if (this.first.checkPass !== "") {
          this.$refs.first.validateField("checkPass");
        }
        callback();
      }
    };
    var validateCheckPass = (rule, value, callback) => {
      if (value === "" || value.split(" ").join("").length === 0) {
        callback(new Error("请再次输入密码!"));
      } else if (value !== this.first.password) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      message: "",
      registerVisible: false,
      nextDialogVisible: false,
      first: {
        password: "",
        tel: "",
        email: "",
        checkPass: "",
        captcha: ""
      },
      show: true,
      count: "",
      timer: null,
      next: { username: "", avatar: "" },
      formLabelWidth: "120px",

      firstRules: {
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
        tel: { validator: validateTel, trigger: "blur", required: true },
        password: { validator: validatePass, trigger: "blur", required: true },
        checkPass: {
          validator: validateCheckPass,
          trigger: "blur",
          required: true
        },
        captcha: { required: true, message: "请输入验证码", trigger: "blur" }
      }
    };
  },
  methods: {
    getCaptcha() {
      if (
        this.first.email === "" ||
        this.first.email.split(" ").join("").length === 0
      ) {
        return;
      } else {
        this.$http
          .get(`user/captcha?` + `email=` + this.first.email)
          .then(res => {
            this.$message("验证码已发送到您的邮箱");
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
      }
    },
    recover() {
      this.first = {
        password: "",
        tel: "",
        email: "",
        checkPass: "",
        captcha: ""
      };
      this.next = {
        username: "",
        avatar: ""
      };
    },
    handleAvatarSuccess(res, file) {
      this.next.avatar = res;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },

    ifNext(formName) {
      this.show = true;
      clearInterval(this.timer);
      this.timer = null;
      this.$refs[formName].validate(valid => {
        if (valid) {
          delete this.first.checkPass;
          this.$http
            .post(`user`, this.first)
            .then(res => {
              this.nextDialogVisible = true;
              this.registerVisible = false;
              this.$cookies.set("OTAKUId", res.data);
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
    setInfo() {
      if (
        this.next.username === "" ||
        this.next.username.split(" ").join("").length === 0
      ) {
        this.next.isChange = 0;
      } else {
        this.next.isChange = 1;
      }
      this.next.id = this.$cookies.get("OTAKUId");

      this.$http
        .post(
          `user/info`,

          this.next
        )
        .then(res => {
          //  this.nextDialogVisible = true;
          //  this.registerVisible = false;
          this.$http
            .post(`user/avatar`)
            .then(res => {
              location.reload();
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
};
</script>

<style  scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background-color: #e4f3fc;
}
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
