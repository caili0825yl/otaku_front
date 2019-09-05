<template>
  <div>

    <el-button
      type="text"
      @click="dialogFormVisible = true"
    >登录</el-button>

    <el-dialog
      width="30%"
      title="用户登录"
      :visible.sync="dialogFormVisible"
      center
      @close='recover'
      :close-on-click-modal="false"
    >
      <el-form :model="form">
        <el-form-item
          label="登录方式："
          :label-width="formLabelWidth"
        >
          <el-radio-group
            v-model="form.type"
            size="medium"
          >
            <el-radio-button label="邮箱"></el-radio-button>
            <el-radio-button label="手机"></el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item
          label="邮箱/手机号："
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.username"
            autocomplete="off"
          ></el-input>
        </el-form-item>
        <el-form-item
          label="密码："
          :label-width="formLabelWidth"
        >
          <el-input
            v-model="form.password"
            autocomplete="off"
            show-password
          ></el-input>
        </el-form-item>
        <el-form-item :label-width="formLabelWidth">
          <el-checkbox v-model="form.rememberMe">自动登录？</el-checkbox>
        </el-form-item>
      </el-form>
      <div
        slot="footer"
        class="dialog-footer"
      >
        <el-button @click="dialogFormVisible = false">取 消</el-button>
        <el-button
          type="primary"
          @click="login"
        >确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      message: "",
      dialogFormVisible: false,
      form: {
        type: "邮箱",
        username: "",
        password: "",
        rememberMe: false
      },
      formLabelWidth: "120px"
    };
  },
  methods: {
    recover() {
      this.form = {
        username: "",
        password: "",
        rememberMe: false
      };
    },
    login() {
      if (this.form.type === "手机") {
        this.form.tel = this.form.username;
      } else {
        this.form.email = this.form.username;
      }
      this.$http
        .post(`auth`, this.form)
        .then(res => {
          this.$message("登陆成功");
          location.reload();
        })
        .catch(err => {
          this.message = err.request.responseText;
          this.$message({
            message: this.message,
            type: "error"
          });
        });
      this.dialogFormVisible = false;
    }
  }
};
</script>

<style  scoped>
</style>
