<template>
  <div class="login-container">
    <div class="login-box">
      <el-form label-position="right" label-width="80px" :model="loginForm">
        <el-form-item prop="userName">
          <el-input
            prefix-icon="el-icon-user-solid"
            v-model="loginForm.userName"
          ></el-input>
        </el-form-item>
        <el-form-item prop="passWord">
          <el-input
            prefix-icon="el-icon-view"
            type="password"
            v-model="loginForm.passWord"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="onLogin">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginForm: {
        userName: "admin",
        passWord: "",
      },
    };
  },
  methods: {
    async onLogin() {
      console.log(this.loginForm);
      const { data: res } = await this.$http.login(
        this.loginForm.userName,
        this.loginForm.passWord
      );
      console.log(res);
    },
  },
};
</script>
<style lang="scss" >
$light_gray: #fff;
$bg: #2d3a4b;
.login-container {
  width: 100%;
  height: 100%;
  background-color: $bg;
  display: flex;
  justify-content: center;
  align-items: center;
}
.login-box {
  width: 520px;
  height: 300px;
  border-radius: 6px;
}
.el-form {
  width: 100%;
  bottom: 0;
  box-sizing: border-box;
  padding: 20px;
}
.el-input {
  display: inline-block;
  height: 47px;
  width: 450px;
  input {
    height: 47px;
    background-color: #283443;
    border: 0px;
    box-shadow: 0 0 0px 1px inset;
  }
}
</style>