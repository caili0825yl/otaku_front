<template>
  <div>
    <div>
      <el-row :gutter="20">
        <el-col
          :md="2"
          :offset="2"
        >
          <span><img
              src="https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg"
              height="50px"
              alt="首页"
              @click="goHome"
              id="home"
            ></span>
        </el-col>
        <el-col :md="2">
          <span>
            <el-button
              type="text"
              @click="goHome"
              icon="el-icon-s-home"
            >首页</el-button>
          </span>
        </el-col>
        <el-col
          :md="8"
          :offset="3"
        >
          <span>
            <div>
              <el-input
                placeholder="请输入搜索内容"
                class="input-with-select"
                v-model="search"
              >
                <el-button
                  slot="append"
                  icon="el-icon-search"
                  @click="searchResult"
                ></el-button>
              </el-input>
            </div>

          </span>
        </el-col>

        <el-col
          :md="1"
          :offset="3"
        >

          <el-popover
            placement="bottom"
            width="200"
            trigger="hover"
          >
            <div class="username">{{username}}</div>
            <el-button
              type="primary"
              round
              icon="el-icon-user"
              style="margin-left:20%"
              @click="info"
            >个人资料</el-button>
            <div>
              <span
                id="quit"
                style="float:right"
                @click="quit"
              >退出</span>
            </div>
            <div slot="reference">
              <el-avatar
                style="margin-top:10px"
                size="large"
                :src="url"
                v-if="avatar"
                id="avatar"
              />
            </div>
          </el-popover>

          <login v-if="login" />
        </el-col>
        <el-col :md="1">
          <register v-if="login" />
        </el-col>
      </el-row>

    </div>

  </div>
</template>

<script>
import login from "./login";
import register from "./register";
export default {
  created() {
    if (this.$cookies.get("remember")) {
      this.$http
        .post(`auth`)
        .then(res => {
          this.$http
            .get(`user/avatar?` + `id=` + this.$cookies.get("OTAKUId"))
            .then(res => {
              this.login = false;
              this.avatar = true;
              this.url = res.data.avatar;
              this.username = res.data.username;
            })
            .catch(err => {});
        })
        .catch(err => {});
    } else if (this.$cookies.get("OTAKUId")) {
      this.$http
        .get(`user/avatar?` + `id=` + this.$cookies.get("OTAKUId"))
        .then(res => {
          this.login = false;
          this.avatar = true;
          this.url = res.data.avatar;
          this.username = res.data.username;
        })
        .catch(err => {});
    }
  },
  data() {
    return {
      activeIndex: "1",
      search: "",
      login: true,
      avatar: false,
      url: "",
      username: ""
    };
  },
  methods: {
    goHome() {
      this.$router.push({ path: "/home" });
    },
    info() {
      this.$router.push({ path: "/user" });
    },
    searchResult() {
      if (this.search === "" || this.search.split(" ").join("").length === 0) {
        return;
      }
      this.$router.push({ name: "search", params: { search: this.search } });
      location.reload();
    },
    quit() {
      this.$cookies.remove("OTAKUId");
      this.$cookies.remove("remember");
      location.reload();
    }
  },

  components: {
    login,
    register
  }
};
</script>

<style>
#home:hover {
  cursor: pointer;
}
#avatar:hover {
  cursor: pointer;
}
#quit:hover {
  cursor: pointer;
}
.username {
  text-align: center;
  padding: 5%;
  font-size: large;
  font-weight: bold;
  color:rgb(150, 185, 218)
}
</style>
