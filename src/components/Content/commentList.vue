<template>
  <div style="margin-top:50%;border:1px solid black;text-align:left;padding:2%;line-height:2rem">
    <span style="font-weight:bolder;font-size:x-large">留言（{{total}}）</span>
    <div
      style="margin-top:1rem"
      v-for="(item,index) in comments"
      :key="index"
    >
      <el-avatar
        style="vertical-align:middle;margin-right:1rem"
        :size=80
        :src="item.avatar"
      ></el-avatar>
      <span style="font-size:larger;font-weight:bold">
        {{item.username}}
      </span>
      <div style="margin:1rem">
        {{item.content}}
      </div>
      <div style="position: relative;bottom:0;left:0">
        <span style="margin-right:1rem">#{{item.index}}</span>
        <span>{{item.time}}</span>
      </div>
      <el-divider><i class="el-icon-chat-line-square"></i></el-divider>

    </div>
    <el-pagination
      @current-change="handleCurrentChange"
      :current-page.sync="page"
      :page-size="size"
      :total="total"
      layout="prev, pager, next, jumper"
      :hide-on-single-page=true
    >
    </el-pagination>
    <div style="margin-top:1rem">
      <el-input
        type="textarea"
        :placeholder="placceholder"
        :disabled="isLogin?false:true"
        :rows="10"
        resize="none"
        v-model="comment.content"
      >
      </el-input>
      <el-button
        type="primary"
        style="margin:1rem  0 0 90rem"
        :disabled="isLogin?false:true"
        @click="send"
      >发送留言</el-button>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      placceholder: this.$cookies.get("OTAKUId") ? " " : "请登录！",
      total: 0,
      comment: {
        id: this.$cookies.get("OTAKUId"),
        content: ""
      },
      isLogin: this.$cookies.get("OTAKUId"),
      comments: [],
      page: 1,
      size: 0,
    };
  },
  methods: {
    send() {
      this.$http
        .post(`article/comment/` + this.$route.params.id, this.comment)
        .then(res => {
          this.comment.content = "";
          let sent = {};
          sent.username = res.data.username;
          sent.avatar = res.data.avatar;
          sent.content = res.data.content;
          sent.time = res.data.time;
          sent.index = res.data.index;

          this.comments.unshift(sent);
          ++this.total;
        });
    },
    handleCurrentChange(val) {
      

         this.$http.get(`article/comment?page=`+val + `&id=`+this.$route.params.id).then(res => {
      this.comments = res.data.comments;
      this.total = res.data.total;
      this.size = res.data.size
    });
    }
  },
  components: {},
  created() {
    this.$http.get(`article/comment?page=`+this.page + `&id=`+this.$route.params.id).then(res => {
      this.comments = res.data.comments;
      this.total = res.data.total;
      this.size = res.data.size
    });
  }
};
</script>

<style  scoped>
</style>
