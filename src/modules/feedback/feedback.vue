<template>
  <div class="person">
    <v-header/>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>意见反馈</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>
        <div slot="main">
          <div class="feedback">
            <div class="title">意见反馈</div>
            <el-form :model="param" status-icon label-width="0" class="feedback-form">
              <el-form-item prop="desc">
                <el-input
                  type="textarea"
                  resize="none"
                  v-model="param.content"
                  placeholder="我们需要您的意见"
                ></el-input>
                <span class="size">{{size}}/200</span>
              </el-form-item>
              <el-form-item class="btn-confirm">
                <el-button type="primary" @click="submitForm()">确认</el-button>
              </el-form-item>
            </el-form>
          </div>
        </div>
      </v-content>
    </div>
    <v-footer/>
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";
import VContent from "$components/VContent";
import VAside from "$components/VAside";
export default {
  data() {
    return {
      param: {
        content: ""
      }
    };
  },
  //监听属性 类似于data概念
  computed: {
    size() {
      return this.param.content.length || 0;
    }
  },
  //监控data中的数据变化
  watch: {
    "param.content"(val) {
      if (val.length > 200) {
        this.$message.error("最多输入200个字符");
        this.param.content = val.substr(0, 200);
      }
    }
  },
  //方法集合
  methods: {
    submitForm() {
      if (this.param.content == "") {
        this.$alert("请填写反馈内容");
        return false;
      }
      if (this.param.content.length < 20) {
        this.$alert("反馈内容不少于20个字");
        return false;
      }
      this.$http
        .post("api/v1/feedback", { content: this.param.content })
        .then(({ data }) => {
          this.$message.success("你的反馈已提交, 感谢您的帮助");
          this.$router.back();
        });
    }
  },
  components: {
    VHeader,
    VFooter,
    VContent,
    VAside
  }
};
</script>

<style lang="scss" scoped>
.feedback {
  height: 728px;
  background: #fff;
  margin-bottom: 100px;
  .title {
    font-size: 14px;
    font-weight: 400;
    padding-left: 16px;
    line-height: 60px;
    border-bottom: 1px solid #ededed;
  }
  .feedback-form {
    width: 400px;
    padding-top: 40px;
    padding-left: 50px;
    .el-form-item {
      margin-bottom: 40px;
    }
    /deep/.el-textarea__inner {
      height: 200px;
    }
    .size {
      position: absolute;
      bottom: 0;
      right: 20px;
      width: 38px;
      font-size: 14px;
      font-weight: 400;
      color: #999;
    }
    .btn-confirm {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
}
/deep/.el-input__inner {
  border: 1px solid #a0a0a0;
  color: #666;
}

.el-button--primary {
  color: #fff;
  background-color: #000;
  border-color: #000;
}

.el-button {
  width: 300px;
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
