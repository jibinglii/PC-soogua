<template>
  <div class="login_form">
    <div class="form_title">
      <span>
        快捷登录
        <b @click="changeForm(1)">密码登录</b>
      </span>
      <img @click="changeForm(0)" src="~$assets/images/qr_icon.png" />
    </div>
    <div class="form_body">
      <el-input
        class="phone"
        type="text"
        @keyup.enter="submit"
        v-model="username"
        placeholder="请输入手机号"
      >
        <img slot="prefix" src="~$assets/images/phone_login.png" alt />
      </el-input>
      <el-row class="code" :gutter="10">
        <el-col :span="15">
          <el-input
            type="text"
            @keyup.enter="submit"
            v-model="code"
            placeholder="请输入验证码"
          >
            <img slot="prefix" src="~$assets/images/passwd_login.png" alt />
          </el-input>
        </el-col>
        <el-col :span="9">
          <el-button class="code-btn" @click="getCode">获取验证码</el-button>
        </el-col>
      </el-row>

      <el-button class="login-btn" @click="submit">登录</el-button>
    </div>
    <hr />
    <div class="third_party_login">
      <img src="~$assets/images/qq_login.png" />
      <a href="#">QQ登录</a>
      <img src="~$assets/images/watch_login.png" />
      <a href="#">微信登录</a>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: "",
      code: ""
    };
  },
  methods: {
    changeForm(form) {
      this.$emit("change-form", form);
    },
    submit() {},
    getCode(){}
  }
};
</script>
<style lang='scss' scoped>
.login_form {
  float: right;
  width: 376px;
  height: 428px;
  background-color: #fff;
  .form_title {
    display: flex;
    padding: 15px;

    span {
      padding-left: 20px;
      flex: 4;
      color: #000;
      line-height: 66px;
      font-size: 18px;
      font-weight: bold;
    }
    b {
      cursor: pointer;
      padding-left: 20px;
      color: #999;
    }
    img {
      cursor: pointer;
      flex: 1;
      height: 66px;
    }
  }
  .form_body {
    width: 100%;
    text-align: center;
    padding: 5px 38px 0 38px;
    .code {
      margin-top: 20px;
    }
  }

  /deep/.el-input__prefix {
    left: 10px;
    padding-top: 12px;
  }
  /deep/.el-input__inner {
    border: 1px solid #cdcdcd;
    color: #b1b1b1;
    height: 46px;
    line-height: 46px;
  }
  /deep/.el-input--prefix .el-input__inner {
    padding-left: 40px;
  }
  .code-btn {
    width: 110px;
    height: 46px;
    font-size: 16px;
    color: #fff;
    border: 1px solid #000;
    background: #000;
    border-radius: 0;
    padding: 0;
  }
  .login-btn {
    width: 300px;
    height: 46px;
    margin-top: 37px;
    font-size: 16px;
    color: #fff;
    border-radius: 0;
    border: 1px solid #000;
    background: #000;
  }

  hr {
    height: 63px;
    border: none;
    width: 90%;
    border-bottom: 2px solid #ededed;
  }
  .third_party_login {
    padding-top: 10px;

    img {
      padding-left: 20px;
      float: left;
    }
    a {
      float: left;
      height: 24px;
      line-height: 24px;
      font-size: 14px;
      color: #666;
      text-decoration: none;
    }
  }
}
</style>