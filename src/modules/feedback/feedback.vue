<template>
  <div class="person">
    <v-header />
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
            <el-form
              :model="feedBack"
              status-icon
              :rules="rules"
              ref="fb"
              label-width="0"
              class="feedback-form"
            >
              <el-form-item prop="desc">
                <el-input
                  type="textarea"
                  resize="none"
                  v-model="feedBack.desc"
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
    <v-footer />
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
      feedBack: {
        desc: ""
      },
      rules: {
        desc: [
          { required: true, message: "请填写反馈内容", trigger: "blur" },
          { max: 200, message: "长度不得超过200个字符", trigger: "blur" }
        ]
      }
    };
  },
  computed: {
    size() {
      return this.feedBack.desc.length || 0;
    }
  },
  watch: {
    feedBack(newValue, oldValue) {}
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