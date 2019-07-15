<template>
  <div class="login">
    <div class="title">
      <img class="logo" src="~$assets/images/sougualogo.png" />
      <span>搜瓜</span>
    </div>
    <div class="login_body">
      <qr-login @change-form="onChangeForm" v-if="form===0"></qr-login>
      <pwd-login @change-form="onChangeForm" v-if="form===1"></pwd-login>
      <code-login @change-form="onChangeForm" v-if="form===2"></code-login>
    </div>
    <footer-white></footer-white>
  </div>
</template>
<script>
import QrLogin from "./components/qrlogin";
import PwdLogin from "./components/pwdlogin";
import CodeLogin from "./components/codelogin";
import FooterWhite from "./components/footerwhite";
export default {
  components: {
    QrLogin,
    PwdLogin,
    CodeLogin,
    FooterWhite
  },
  name: "Login",
  data() {
    return {
      form: 0
    };
  },
  // components: {  },
  methods: {
    onChangeForm(form) {
      this.form = form;
    }
  },
  created() {}
};
</script>
<style scoped lang="scss">
.login {
  .title {
    height: 120px;
    display: flex;
    align-items: center;
    padding-left: 360px;
    background: #fff;
    .logo {
      float: left;
      width: 44px;
      height: 44px;
    }
    span {
      float: left;
      padding-left: 12px;
      font-size: 36px;
    }
  }

  .login_body {
    width: 100%;
    min-height:600px;
    background: #130b31;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: flex-end;
    padding-right:397px;
  }
}
</style>
