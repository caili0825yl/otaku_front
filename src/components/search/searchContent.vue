<template>
  <div>
    <div style="width:40%;margin:0 auto;text-align:left">
            <h1 >搜索结果</h1>
    </div>

    <div
      v-for="article in articleList"
      :key="article.title"
      style="width:40%;margin:0 auto;text-align:left"
    >
      <el-link
        style="display:block;line-height:500%"
        :href="'/content/'+article._id"
        :underline="false"
      ><span
          style="margin-right:5%"
          class="content"
        >{{article.time}}</span><span class="content">{{article.title}}</span>
      </el-link>
      <hr />
    </div>
    <div class="block">
      <el-pagination
        @current-change="handleCurrentChange"
        :current-page.sync="page"
        :page-size="size"
        :total="total"
        layout="prev, pager, next, jumper"
        :hide-on-single-page=true
      >
      </el-pagination>
    </div>
    <div v-if="!exist">
      没有找到相关的结果
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      articleList: [],
      size: 0,

      exist: 1,
      total: 0,
      page: 1
    };
  },
  methods: {
    handleCurrentChange(val) {
      this.$http
        .get(
          `article/search/result?search=` +
            this.$route.params.search +
            `&page=` +
            val
        )
        .then(res => {
          this.articleList = res.data.articles;
          this.total = res.data.count;
        });
    }
  },
  components: {},
  created() {
    this.$http
      .get(
        `article/search/result?search=` +
          this.$route.params.search +
          `&page=` +
          this.page
      )
      .then(res => {
        this.articleList = res.data.articles;
        this.exist = this.articleList.length;
        this.total = res.data.count;
        this.size = res.data.size;
      });
  }
};
</script>

<style  scoped>
.content {
  font-size: large;
  font-weight: bold;
}
</style>
