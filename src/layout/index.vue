<template>
  <div class="home">
    <el-container>
      <el-aside :width=" isCollapse ? '70px':'200px'">
        <el-menu
          default-active="1-4-1"
          class="el-menu-vertical-demo"
          :collapse="isCollapse"
          background-color="rgb(48, 65, 86)"
          text-color="#BFCBD9"
          :collapse-transition="false"
          active-text-color="#409BFF"
        >
          <el-submenu index="1">
            <template slot="title">
              <i class="el-icon-location"></i>
              <span slot="title">导航一</span>
            </template>
            <el-menu-item-group>
              <span slot="title">分组一</span>
              <el-menu-item index="1-1">选项1</el-menu-item>
              <el-menu-item index="1-2">选项2</el-menu-item>
            </el-menu-item-group>
          </el-submenu>
        </el-menu>
      </el-aside>
      <el-container>
        <el-header>
          <div class="header_div">
            <el-breadcrumb separator="/">
              <i  class="foldi" @click="isFold" :class="isCollapse?'el-icon-s-unfold':'el-icon-s-fold'"/>
              <el-breadcrumb-item>活动列表</el-breadcrumb-item>
              <el-breadcrumb-item>活动详情</el-breadcrumb-item>
            </el-breadcrumb>

            <el-dropdown>
              <div class="user">
                <el-avatar
                  src="https://cube.elemecdn.com/0/88/03b0d39583f48206768a7534e55bcpng.png"
                ></el-avatar>
                <i class="el-icon-caret-bottom"/>
              </div>

              <el-dropdown-menu slot="dropdown">
                <el-dropdown-item>个人中心</el-dropdown-item>
                <el-dropdown-item @click.native="logOut">退出</el-dropdown-item>
              </el-dropdown-menu>
            </el-dropdown>
          </div>
        </el-header>
        <el-main>{{this.$store.state.accessRouterMap}}<router-view></router-view></el-main>
        <el-button @click="$router.push('/uploadInfo')">click</el-button>
      </el-container>
    </el-container>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isCollapse: false
    };
  },
  mounted() {
    console.log(this.$store.accessRouterMap);
  },
  methods: {
    isFold() {
      this.isCollapse = !this.isCollapse;
      console.log("菜单折叠");
    },
    logOut() {
      
      window.sessionStorage.clear();
      //退出时，将vuex里的值清空
      this.$store.commit('SET_TOKEN','');
      this.$store.commit('SET_ROLES','');
      this.$router.push("/login");
      this.$message({
        duration: 1000,
        message: "您已退出登录"
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  height: 100%;

  .el-container {
    height: 100%;
  }

  .el-header {
    background-color: #fff;
    color: #333;
    line-height: 60px;
    
    .foldi {
      margin-right: 10px;
      font-size: 20px;

    }
    .foldi:hover {
      color:#409EFF
    }
    .header_div {
      height: 100%;
    }
    .el-breadcrumb {
      display: flex;
      align-items: center;
      position: relative;
    }
  }

  .el-aside {
    background-color: rgb(48, 65, 86);
  }

  .header_div {
    display: flex;
    justify-content: space-between;
    .el-dropdown {
      display: flex;
      align-items: center;
      .user {
        height: 40px;
      }
    }
  }
}
</style>
