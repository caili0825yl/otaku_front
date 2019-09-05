<template>
  <el-container direction="vertical" >
    <el-header height="56px">
      <navbar />

    </el-header>
    <headerImage />

    <el-main>
      <articleContent />
    </el-main>

  </el-container>
</template>

<script>
import navbar from "../components/Common/navbar";
import headerImage from "../components/Common/headerImage";

import articleContent from "../components/Content/content";

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    navbar,
    articleContent,
    headerImage
  }
};
</script>

<style  scoped>
.el-header {
  text-align: center;
  line-height: 60px;
}

.el-aside {
  text-align: center;
  line-height: 200px;
}

.el-main {
  text-align: center;
  line-height: 160px;
}

body > .el-container {
  margin-bottom: 40px;
}

.el-container:nth-child(5) .el-aside,
.el-container:nth-child(6) .el-aside {
  line-height: 260px;
}

.el-container:nth-child(7) .el-aside {
  line-height: 320px;
}
</style>
