<template>
  <div class="person">
    <v-header></v-header>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>修改资料</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>
        <div slot="main">
          <div class="approve">
            <div class="title">实名认证</div>
            <div v-if="identity" class="certified">
              <p>证件类型： 身份证</p>
              <p>真实姓名： 张**</p>
              <p>证件号码： 829**********1292</p>
              <p>审核状态： 待审核</p>
              <div class="line"></div>
              <p>扫描下载“搜瓜”APP，即使接受审核结果通知</p>
              <img src="~$assets/images/icon.png" alt />
            </div>
            <div v-else class="uncertified">
              <h4>证件类型： 身份证</h4>
              <el-form
                :model="approve"
                :rules="rules"
                ref="approve"
                label-width="135px"
                class="approve-form"
              >
                <el-form-item
                  label="真实姓名："
                  prop="name"
                  placeholder="请输入您的真实姓名"
                  style="width: 400px;"
                >
                  <el-input v-model="approve.name"></el-input>
                </el-form-item>
                <el-form-item label="证件号码：" prop="id" placeholder="请输入您的证件号码" style="width: 400px;">
                  <el-input v-model="approve.id"></el-input>
                </el-form-item>
                <el-form-item label-width="0" prop="zheng" ref="uploadzheng">
                  <v-upload prop="zheng" />
                </el-form-item>
                <el-form-item label-width="0" prop="fan" ref="uploadfan">
                  <v-upload prop="fan" />
                </el-form-item>
                <el-form-item label-width="0" prop="shouchi" ref="uploadshouchi">
                  <v-upload prop="shouchi" />
                </el-form-item>
                <el-form-item>
                  <el-button style="widht:300px" type="primary" @click="submitForm('approve')">确认</el-button>
                </el-form-item>
              </el-form>
              <div class="tips">
                <h5>温馨提示：</h5>
                <p>1. 认证名与提款收款账户的开户名必须一致，否则将不能成功体现；</p>
                <p>2. 张片、文字清晰可辨；</p>
                <p>3. 证件持有人必须年满十八周岁。</p>
              </div>
            </div>
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
import VUpload from "./upload";
export default {
  data() {
    return {
      identity: false,
      approve: {
        name: "",
        id: ""
      },
      rules: {
        name: [
          { required: true, message: "请输入您的真实姓名", trigger: "blur" },
          { min: 2, max: 10, message: "请输入您的真实姓名", trigger: "blur" }
        ],
        id: [
          { required: true, message: "请输入您的证件号码", trigger: "blur" },
          { max: 20, message: "长度不得超过20个字符", trigger: "blur" }
        ],
        zheng: [{ required: true, message: "请上传图片", trigger: "change" }],
        fan: [{ required: true, message: "请上传图片", trigger: "change" }],
        shouchi: [{ required: true, message: "请上传图片", trigger: "change" }]
      }
    };
  },
  components: {
    VHeader,
    VFooter,
    VContent,
    VAside,
    VUpload
  },
  computed: {
    size() {
      return this.profile.signature.length || 0;
    }
  },
  methods: {
    submitForm() {},
    editIcon() {}
  }
};
</script>

<style lang="scss" scoped>
.approve {
  min-height: 728px;
  background: #fff;
  margin-bottom: 100px;

  .title {
    font-size: 14px;
    font-weight: 400;
    padding-left: 16px;
    line-height: 60px;
    border-bottom: 1px solid #ededed;
  }
}

.certified {
  font-size: 14px;
  font-weight: 400;
  padding: 35px 135px;
  p {
    color: #000;
    margin-bottom: 30px;
  }
  .line {
    border-bottom: 1px solid #ededed;
    margin-bottom: 22px;
  }
  img {
    width: 110px;
    height: auto;
    max-width: 100%;
  }
}

.uncertified {
  font-size: 14px;
  font-weight: 400;
  h4 {
    padding: 30px 40px;
  }
  .approve-form {
    padding: 0 40px;
    min-width: 400px;
    .el-form-item {
      margin-bottom: 30px;
      /deep/ &__label {
        color: #000;
      }
    }
  }
}
.tips {
  padding: 43px 39px;
  background: #ededed;
  h5 {
    margin-bottom: 30px;
    font-size: 16px;
    font-weight: 400;
    color: #000;
  }
  p {
    margin-top: 15px;
    font-size: 16px;
    font-weight: 400;
    color: #000;
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