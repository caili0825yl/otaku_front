<template>
  <div>
    <el-container direction="vertical">
      <el-header height="56px">
        <navbar />

      </el-header>
      <headerImage />
      <el-main>
        <search-content />
      </el-main>
    </el-container>
  </div>
</template>

<script>
import navbar from "../components/Common/navbar";
import headerImage from "../components/Common/headerImage";
import searchContent from "../components/search/searchContent";
export default {
  data() {
    return {};
  },
  methods: {},
  components: {
    navbar,
    headerImage,
    searchContent
  }
};
</script>

<style  scoped>
</style>
