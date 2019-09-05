<template>
    <div>
      <el-image style="height : 300px;width :100%"
        :src='url'
        :fit='fit'
      ></el-image>
    </div>
    
</template>

<script>
export default {
  data() {
    return {
      fit: "cover",
      url:
        "https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
    };
  },
  methods: {},
  components: {}
};
</script>

<style>
</style>
