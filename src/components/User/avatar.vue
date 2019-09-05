<template>
  <div>

    <el-upload
      class="avatar-uploader"
      :show-file-list="false"
      :on-success="handleAvatarSuccess"
      :before-upload="beforeAvatarUpload"
      action="http://localhost:3050/api/user/upload"
      name="file"
      :with-credentials="true"
    >

      <el-avatar
        class="block"
        :size="100"
        v-if="imageUrl"
        :src="imageUrl"
      ></el-avatar>
      <i
        v-else
        class="el-icon-plus avatar-uploader-icon"
      ></i>
    </el-upload>
    <el-button
      type="primary"
      @click="upload"
    >确定</el-button>

  </div>
</template>

<script>
export default {
  data() {
    return {
      imageUrl: ""
    };
  },
  methods: {
    handleAvatarSuccess(res, file) {
      this.imageUrl = res;
    },
    beforeAvatarUpload(file) {
      const isJPG = file.type === "image/jpeg";
      const isLt2M = file.size / 1024 / 1024 < 2;

      if (!isJPG) {
        this.$message.error("上传头像图片只能是 JPG 格式!");
      }
      if (!isLt2M) {
        this.$message.error("上传头像图片大小不能超过 2MB!");
      }
      return isJPG && isLt2M;
    },
    upload() {
      this.$http
        .post(`user/avatar`)
        .then(res => {
          this.$message("保存成功");
                location.reload();

        })
        .catch(err => {
          this.message = err.request.responseText;
          this.$message({
            message: this.message,
            type: "error"
          });
        });
    }
  },

  components: {}
};
</script>

<style  scoped>
.avatar-uploader .el-upload {
  border: 1px dashed #d9d9d9;
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
}
.avatar-uploader .el-upload:hover {
  border-color: #409eff;
}
.avatar-uploader-icon {
  font-size: 28px;
  color: #8c939d;
  width: 100px;
  height: 100px;
  line-height: 100px;
  text-align: center;
  background-color: #e4f3fc;
}
</style>
