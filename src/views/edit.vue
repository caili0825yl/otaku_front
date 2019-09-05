<template>
  <div>
    <el-container direction="vertical">
      <el-header height="56px">
        <navbar />

      </el-header>
      <headerImage />

      <el-main>
        <tabs/>
      </el-main>

    </el-container>
  </div>
</template>

<script>
import navbar from "../components/Common/navbar";
import headerImage from "../components/Common/headerImage";
import tabs from "../components/User/tabs"

export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    navbar,
    headerImage,
    tabs
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
</style>
