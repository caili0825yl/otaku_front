<template>
  <div>

    <div>
      <div
        v-for="article in articleList"
        :key="article.title"
      >
        <el-link
          style="display:block;line-height:500%;text-align:left;"
          :href="'content/'+article._id"
          :underline="false"
        ><span class="content" style="margin-right:12%">{{article.time}}</span><span class="content">{{article.title}}</span>
        </el-link>
        <hr />
      </div>
      <div>
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
    </div>
  </div>
</template>
<script>
export default {
  created() {
    this.fetch();
  },
  methods: {
    fetch() {
      this.$http
        .get(`article?page=` + this.page + `&type=` + this.articleType)
        .then(res => {
          this.articleList = res.data.articles;
          this.size = res.data.size;
          this.total = res.data.count;
        });
    },
    handleCurrentChange(val) {
      this.$http
        .get(`article?page=` + val + `&type=` + this.articleType)
        .then(res => {
          this.articleList = res.data.articles;
          this.total = res.data.count;
        });
    }
  },
  props: ["type"],
  data() {
    return {
      articleList: [],
      total: 0,
      page: 1,
      size: 0,
      articleType: "1"
    };
  },
  watch: {
    type: function(newVal, oldVal) {
      this.articleType = newVal;
      this.$http
        .get(`article?page=` + this.page + `&type=` + this.articleType)
        .then(res => {
          this.articleList = res.data.articles;
          this.total = res.data.count;
        });
    }
  },
  components: {
    
  }
};
</script>
<style>
.el-carousel__item h3 {
  color: #475669;
  font-size: 14px;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

#mainBox {
  writing-mode: vertical-lr;
}
#mainBox a {
  display: inline-block;
  height: 100px;
  writing-mode: lr-tb;
}

.content{
  font-size: large;
  font-weight:bold
}
</style>