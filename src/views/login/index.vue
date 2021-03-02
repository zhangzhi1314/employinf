<template>
  <div class="login-container">
    <div class="login-box">
      <el-form label-position="right" label-width="80px" :model="loginform">
        <el-form-item>
          <el-input placeholder="用户名"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input placeholder="密码" type="password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loginform: {},
    };
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