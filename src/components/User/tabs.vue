<template>

  <el-row
    class="row-bg"
  >

    <el-col :span="8" :offset="2">
      <el-tabs :tab-position="tabPosition">
        <el-tab-pane label="修改密码">
          <password />
        </el-tab-pane>
        <el-tab-pane label="修改手机号">
          <tel />
        </el-tab-pane>
        <el-tab-pane label="修改邮箱">
          <email />
        </el-tab-pane>
        <el-tab-pane label="更改头像">
          <avatar />
        </el-tab-pane>
      </el-tabs>
    </el-col>

  </el-row>

</template>

<script>
import password from "./password";
import tel from "./tel";
import email from "./email";
import avatar from "./avatar";
export default {
  data() {
    return {
      tabPosition: "left"
    };
  },
  methods: {},
  components: {
    password,
    tel,
    email,
    avatar
  }
};
</script>

<style  scoped>
</style>

