<template>
  <div>
    <v-header />
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
        <el-breadcrumb-item>发布商品</el-breadcrumb-item>
      </el-breadcrumb>
      <steps />
      <div class="nav">
        <span>当前选择游戏</span>
        <i>地下城与勇士</i>
        <el-button>修改</el-button>
      </div>
      <div class="goods-info">
        <div class="title">商品信息</div>
        <div class="content">
          <el-form ref="form-info" :model="formInfo" label-width="80px">
            <el-form-item width="100%" label="商品品类">
              <el-select v-model="formInfo.type" placeholder="请选择类型">
                <el-option label="游戏账号" value="zhanghao"></el-option>
                <el-option label="游戏账号" value="zhanghao"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="商品标题">
              <el-input v-model="formInfo.name"></el-input>
            </el-form-item>
            <el-form-item label="发布价格">
              <el-col :span="22">
                <el-input v-model="formInfo.price"></el-input>
              </el-col>
              <el-col class="line" :span="2">元</el-col>
            </el-form-item>
            <el-form-item label="发布数量">
              <el-col :span="22">
                <el-input v-model="formInfo.num"></el-input>
              </el-col>
              <el-col class="line" :span="2">件</el-col>
            </el-form-item>
          </el-form>
          <div class="info-tips">
            <img src="~$assets/images/gantan.png" alt />
            <span>你当前最大发布件数为0件，所需服务费0元，将在商品出售后扣除</span>
          </div>
        </div>
      </div>
      <div class="goods-desc">
        <div class="title">商品描述</div>
        <div class="content">
          <el-form ref="form-desc" :model="formDesc" label-width="90px">
            <el-form-item label="账号亮点：" prop="desc">
              <el-input type="textarea" resize="none" v-model="formDesc.desc"></el-input>
              <span class="size">{{size}}/300</span>
            </el-form-item>
            <el-form-item label="上传图片：">
              <div class="up">
                <el-upload
                  class="up-img"
                  action="/"
                  :on-preview="handlePreview"
                  :on-exceed="handleExceed"
                >
                  <el-button size="small" type="primary">点击上传</el-button>
                  <p class="desc-tips">单张最多可选5张，可以上传你认为有卖点的商品图片，请勿添加联系方式和其他平台信息，将导致商品下架。</p>
                </el-upload>
              </div>
            </el-form-item>
          </el-form>
          <el-checkbox class="cehckbox" v-model="checked">
            我同意
            <a href>《中国网络游戏服务寄售交易协议》</a>
          </el-checkbox>
        </div>
      </div>
      <div class="bottom-nav">
        <span>您当亲选择的类目：</span>
        <i>游戏>地下城与勇士>游戏币>寄售>广东区>广东2区</i>
      </div>

      <div class="nextstep">
        <el-button @click.native.prevent="onNext" type="button" size="medium">确认并发布</el-button>
      </div>
    </div>
    <v-footer />
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";
import Steps from "./components/steps";
export default {
  data() {
    return {
      checked: false,
      formInfo: {
        type: "",
        name: "",
        price: "",
        num: ""
      },
      formDesc: {
        desc: "",
        imgs: []
      }
    };
  },
  components: {
    VHeader,
    VFooter,
    Steps
  },
  computed: {
    size() {
      return this.formDesc.desc.length || 0;
    }
  },
  watch: {
    formDesc(newValue, oldValue) {}
  },
  methods: {
    onNext() {
      this.$router.push({ name: "shop.success" });
    },
    handlePreview() {},
    handleExceed() {}
  }
};
</script>

<style lang="scss" scoped>
.nav {
  line-height: 50px;
  span {
    font-size: 14px;
    font-weight: 400;
    color: #666;
    margin-right: 19px;
  }
  i {
    font-size: 14px;
    font-weight: bold;
    color: #000;
    margin-right: 19px;
  }
  .el-button {
    width: 70px;
    background: #fff;
    border: 1px solid #999;
    color: #000;
    padding: 10px 20px;
    font-size: 12px;
  }
}
.goods-info {
  background: #fff;
  .title {
    font-size: 14px;
    font-weight: bold;
    padding-left: 16px;
    line-height: 50px;
    background: #fff;
    border-bottom: 1px solid #ededed;
  }
  .content {
    padding: 25px 43px;
  }
  .info-tips {
    font-size: 12px;
    font-weight: 300;
    color: #999;
    img {
      vertical-align: middle;
    }
  }
}
.goods-desc {
  margin-top: 16px;
  background: #fff;
  .title {
    font-size: 14px;
    font-weight: bold;
    padding-left: 16px;
    line-height: 50px;
    background: #fff;
    border-bottom: 1px solid #ededed;
  }
  .content {
    padding: 25px 43px;
    /deep/.el-textarea__inner {
      height: 200px;
      width: 650px;
    }
    .size {
      position: absolute;
      bottom: 0;
      right: -340px;
      width: 38px;
      font-size: 14px;
      font-weight: 400;
      color: #999;
    }
    .up {
      position: relative;
      display: flex;
      align-items: center;
      justify-content: center;
      border: 1px solid #999;
      width: 650px;
      height: 184px;
      .desc-tips {
        width: 100%;
        position: absolute;
        bottom: 0;
        left: 0;
        text-align: center;
        font-size: 12px;
        font-weight: 300;
        color: #999;
      }
      .el-button {
        width: 220px;
        background: #fff;
        border: 2px dashed #999;
        color: #000;
        padding: 12px 20px;
        font-size: 14px;
      }
    }
  }
}
.cehckbox {
  margin: 30px 275px 0;
  a {
    color: #000;
  }
}
.el-form-item {
  position: relative;
  width: 380px;
  margin-bottom: 15px;
}
.el-select {
  display: block;
}

.bottom-nav {
  background: #fff;
  border-top: 1px solid #ededed;
  line-height: 50px;
  font-size: 14px;
  font-weight: 400;
  color: #666;
  padding-left: 20px;
}
.nextstep {
  margin-top: 103px;
  margin-bottom: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-button {
  width: 300px;
  background: #000;
  border: 1px solid #000;
  color: #fff;
  padding: 12px 20px;
  font-size: 16px;
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