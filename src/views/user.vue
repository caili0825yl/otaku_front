<template>
  <div>
    <el-container direction="vertical">
      <el-header height="56px">
        <navbar />

      </el-header>
      <headerImage />

      <el-main>

        <div style="width:15%;margin:0 auto;text-align:left">

          <el-card>
            <img
              :src="user.avatar"
              class="image"
            >
            <div style="padding: 14px;line-height:400%">
              <div>用户名：{{user.username}}</div>
              <div>手机号：{{user.tel}}</div>
              <div>邮箱：{{user.email}}</div>
              <div class="bottom clearfix">
                <el-button
                  type="primary"
                  style="float:right"
                  @click="jump"
                >修改资料</el-button>

              </div>
            </div>
          </el-card>

        </div>
      </el-main>

    </el-container>
  </div>
</template>

<script>
import navbar from "../components/Common/navbar";
import headerImage from "../components/Common/headerImage";
import tabs from "../components/User/tabs";
import { log } from "util";

export default {
  data() {
    return {
      user: {
        username: "",
        avatar: "",
        tel: "",
        email: ""
      }
    };
  },

  methods: {
    jump() {
      this.$router.push({ path: "/edit" });
    }
  },
  components: {
    navbar,
    headerImage,
    tabs
  },
  created() {
    this.$http.get(`user/`).then(res => {
      this.user.username = res.data.info.username;
      this.user.avatar = res.data.info.avatar;
      this.user.tel = res.data.user.tel;
      this.user.email = res.data.user.email;
    });
  }
};
</script>

<style  scoped>
.el-header {
  text-align: center;
  line-height: 60px;
}

.el-main {
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.time {
  font-size: 13px;
  color: #999;
}

.bottom {
  margin-top: 13px;
  line-height: 12px;
}

.button {
  padding: 0;
  float: right;
}

.image {
  width: 100%;
  display: block;
}

.clearfix:before,
.clearfix:after {
  display: table;
  content: "";
}

.clearfix:after {
  clear: both;
}
</style>
