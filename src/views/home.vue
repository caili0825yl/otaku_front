<template>
  <el-container direction="vertical">
    <el-header height="56px">
      <navbar />

    </el-header>
    <headerImage />
    <el-container>

      <el-main>
        <tabs />
      </el-main>
      <el-aside width="500px">
        <music />
      </el-aside>
      <el-aside width="200px"></el-aside>
    </el-container>
  </el-container>

</template>
<style>
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


<script>
import navbar from "../components/Common/navbar";
import headerImage from "../components/Common/headerImage";
import tabs from "../components/Home/tabs";
import music from "../components/Home/music";

export default {
  data() {
    return {};
  },
  components: {
    navbar,
    headerImage,
    tabs,
    music
  }
};
</script>

