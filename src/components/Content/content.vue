<template>
  <div class="main">
    <div class="cs">

      <a
        href="#"
      >TOP</a>
    </div>
    <el-button
      type="primary"
      icon="el-icon-edit"
      style="float:right"
      @click="scoll"
    >留言</el-button>
    <div style="height:80%">
      <h1 style="line-height:100px">{{title}}</h1>
      <h3 style="line-height:10px">{{time}}</h3>
      <div
        style="line-height:30px;width:70%;margin:0 auto;text-align:left"
        v-html='body'
      >

      </div>
      <div
        v-if="resource"
        style=""
      >
        <div v-if="!isLogin">
          <el-card style="width:20%;margin:0 auto">
            <div style="line-height:200%">
              获取资源需要登录
            </div>
          </el-card>

        </div>
        <div v-if="isLogin">
          <el-card style=" width:20%;line-height:5%;margin:0 auto">
            <div
              slot="header"
              class="clearfix"
            >
              <span>资源下载</span>
            </div>
            <div>
              百度网盘：<el-button @click="jump">点击跳转</el-button> 提取码：{{code}}
            </div>

          </el-card>

        </div>
      </div>
    </div>
    <commentList />

    <el-backtop target=".main"></el-backtop>

  </div>

</template>

<script>
import commentList from "./commentList";

export default {
  created() {
    this.$http.get(`article/` + this.$route.params.id).then(res => {
      this.url = res.data.resUrl;
      this.code = res.data.code;
      this.title = res.data.title;
      this.time = res.data.time;
      this.body = res.data.body;
      this.resource = res.data.resource;
    });
  },
  data() {
    return {
      url: "",
      code: "",
      title: "",
      time: "",
      body: "",
      resource: false,
      isLogin: this.$cookies.get("OTAKUId"),
      placceholder: "请登录！",

    };
  },
  methods: {
    jump() {
      window.location.href = this.url;
    },
    scoll() {
      document.documentElement.scrollTop =
        document.documentElement.scrollHeight;
    }
  },
  components: {
    commentList
  }
};
</script>

<style  scoped>
.content {
  font-size: large;
  font-weight: bold;
}
.main {
  border-left: 1px solid black;
  border-right: 1px solid black;
  width: 100rem;
  margin: 0 auto;
  padding: 2%;
}
.cs {
  width: 50px;
  height: 50px;
  background-color: #f0f0f0;
  border: 1px solid #d9d9d9;
  z-index: 1;
  right: 5px;
  bottom: 5px;
  position: fixed;
 
}
.cs a {
  width: 50px;
  height: 49px;
  display: block;
  text-align: center;
  line-height: 49px;
  font-size: 12px;
  color: #999999;
  text-decoration: none;
}
</style>
