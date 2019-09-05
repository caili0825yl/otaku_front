<template>
  <el-row
    type="flex"
    class="row-bg"
    justify="center"
  >
    <el-col :span="4"></el-col>

    <el-col :span="14">
      <el-menu
        :default-active="activeIndex"
        mode="horizontal"
        @select="handleSelect"
        active-text-color="#ffd04b"
      >
        <el-row
          type="flex"
          class="row-bg"
          justify="center"
        >

          <el-col :span="6">
            <el-menu-item index="1">站长随笔</el-menu-item>
          </el-col>
          <el-col :span="6">
            <el-submenu index="2">
              <template slot="title">动画</template>
              <el-menu-item index="2-1">文章</el-menu-item>
              <el-menu-item index="2-2">TV资源</el-menu-item>
              <el-menu-item index="2-3">OVA资源</el-menu-item>
              <el-menu-item index="2-4">剧场版资源</el-menu-item>
            </el-submenu>
          </el-col>
          <el-col :span="6">
            <el-submenu index="3">
              <template slot="title">轻小说</template>
              <el-menu-item index="3-1">文章</el-menu-item>
              <el-menu-item index="3-2">资源</el-menu-item>
            </el-submenu>
          </el-col>
          <el-col :span="6">
            <el-submenu index="4">
              <template slot="title">游戏</template>
              <el-menu-item index="4-1">文章</el-menu-item>
              <el-submenu index="4-2">
                <template slot="title">掌机资源</template>

                <el-menu-item index="4-2-1">GBA</el-menu-item>
                <el-menu-item index="4-2-2">NDS</el-menu-item>
                <el-menu-item index="4-2-3">3DS</el-menu-item>

                <el-menu-item index="4-2-4">PSP</el-menu-item>
                <el-menu-item index="4-2-5">PSV</el-menu-item>

              </el-submenu>
              <el-submenu index="4-3">
                <template slot="title">主机资源</template>
                <el-menu-item index="4-3-1">NGC</el-menu-item>
                <el-menu-item index="4-3-2">PS2</el-menu-item>
              </el-submenu>

            </el-submenu>
          </el-col>
        </el-row>
      </el-menu>
      <articleTable :type = "activeIndex"/>

    </el-col>

  </el-row>

</template>
<script>
import articleTable from "./content";
export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  methods: {
    handleSelect(key, path) {
      this.activeIndex = key;
    }
  },
  components: {
    articleTable
  }
};
</script>

