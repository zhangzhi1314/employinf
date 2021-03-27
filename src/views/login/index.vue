<template>
  <div class="login-container">
    <div class="login-box">
      <el-form
        label-position="right"
        label-width="0"
        :model="loginForm"
        ref="loginForm"
        :rules="rules"
      >
        <div class="fromTitle">
          <h3 class="title">就业信息统计</h3>
        </div>
        <el-form-item prop="username">
          <el-input prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            prefix-icon="el-icon-lock"
            :type="passwordType"
            v-model="loginForm.password"
            @keyup.enter.native="onLogin"
          >
            <span
              @click="showPwd"
              slot="suffix"
              :class="
                passwordType === 'password'
                  ? 'iconfont icon-hide'
                  : 'iconfont icon-browse'
              "
            ></span>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click.native="onLogin" style="width: 100%">登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script>
export default {
  data() {
    return {
      passwordType: "password",
      loginForm: {
        username: "admin",
        password: "123456"
      },
      rules: {
        username: [
          { required: true, message: "请输入用户名", trigger: "blur" }
        ],
        password: [{ required: true, message: "请输入密码", trigger: "blur" }]
      }
    };
  },
  methods: {
    //点击可对密码隐藏或者显示
    showPwd() {
      if (this.passwordType === "password") {
        this.passwordType = "text";
      } else {
        this.passwordType = "password";
      }
    },
    //登录前首先对表单进行验证
    onLogin() {
      this.$refs.loginForm.validate(async valid => {
        if (!valid) {
          return;
        }
        try {
          const { data: res } = await this.$http.login(
            this.loginForm.username.trim(),
            this.loginForm.password.trim()
          );
          console.log("返回结果是：", res);
          if (res.meta.msg === "登录成功") {
            this.$message.success({ duration: 1000, message: "登录成功" });
            //本地存储token和用户名
            window.sessionStorage.setItem("token", "123456");
            //将从后端获取的角色名和token存储到vuex里面
            window.sessionStorage.setItem("roles", "student");
            let roles = window.sessionStorage.getItem("roles").split();
            this.$store.commit("SET_TOKEN", window.sessionStorage.getItem("token"));
            this.$store.commit("SET_ROLES", roles);
            this.$router.push({
              path: "/home"
            });
          } else {
            this.$message.error({
              duration: 1000,
              message: "用户名或密码错误"
            });
          }
        } catch (e) {
          this.$message.error({
            duration: 1000,
            message: e
          });
        }
      });
    }
  }
};
</script>
<style lang="scss" >
$light_gray: #fff;
$dark_gray: #889aa4;
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
  width: 100%;
  input {
    height: 47px;
    color: $light_gray;
    background-color: #283443;
    border-color: #454545;
  }
}
.fromTitle {
  position: relative;
  .title {
    font-size: 26px;
    text-align: center;
    color: $light_gray;
    font-weight: bold;
    margin-bottom: 40px;
  }
}
</style>