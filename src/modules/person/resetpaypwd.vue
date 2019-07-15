<template>
  <div class="person">
    <v-header></v-header>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>设置支付密码</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>
        <div slot="main">
          <div class="setpaypwd">
            <div class="title">支付密码</div>
            <el-form
              :model="pwd"
              status-icon
              :rules="rules"
              ref="pwd"
              label-width="0"
              class="pwd-form"
            >
              <el-form-item prop="pass">
                <el-input type="password" v-model="pwd.pass" placeholder="请输入6位数字设为支付密码" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item prop="checkPass">
                <el-input type="password" v-model="pwd.checkPass" placeholder="请确认支付密码" auto-complete="off"></el-input>
              </el-form-item>
              <el-form-item>
                <el-button type="primary" @click="submitForm('pwd')">确认</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </v-content>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";
import VContent from "$components/VContent";
import VAside from "$components/VAside";
export default {
  data() {
    var validatePass = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请输入密码"));
      } else {
        if (this.pwd.checkPass !== "") {
          this.$refs.pwd.validateField("checkPass");
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === "") {
        callback(new Error("请再次输入密码"));
      } else if (value !== this.pwd.pass) {
        callback(new Error("两次输入密码不一致!"));
      } else {
        callback();
      }
    };
    return {
      pwd: {
        pass: null,
        checkPass: null
      },
      rules: {
        pass: [{ validator: validatePass, trigger: "blur" }],
        checkPass: [{ validator: validatePass2, trigger: "blur" }]
      }
    };
  },
  components: {
    VHeader,
    VFooter,
    VContent,
    VAside
  },
  methods: {
    submitForm() {}
  }
};
</script>

<style lang="scss" scoped>
.setpaypwd {
  height: 728px;
  background: #fff;
  margin-bottom:100px;
  .title {
    font-size: 14px;
    font-weight: 400;
    padding-left: 16px;
    line-height: 60px;
    border-bottom: 1px solid #ededed;
  }
  .pwd-form {
    width: 300px;
    padding-top: 40px;
    padding-left: 50px;
    .el-form-item {
      margin-bottom: 40px;
    }
  }
}
/deep/.el-input__inner {
  border: 1px solid #a0a0a0;
  color: #666;
}

.el-button--primary {
    color: #FFF;
    background-color: #000;
    border-color: #000;
}

.el-button {
    width:100%;
}
.el-breadcrumb {
  margin-top: 18px;
  margin-bottom: 18px;

  .el-breadcrumb__item {
    font-size: 14px;
    font-weight: 400;
    line-height: 30px;
    color: #666;
    &:last-child {
      color: #666;
    }
  }
}
/deep/.el-breadcrumb__separator {
  color: #666;
}
</style>