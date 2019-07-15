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
      </div>
      <div class="success">
        <img src="~$assets/images/success.png" alt />
        <span>发布成功</span>
        <p>您的商品已发布成功，请耐心等待审核结果，您也可以下载手机客户端实时了解审核进度</p>
        <el-button @click.native.prevent="onHome()">返回首页</el-button>
      </div>
      <div class="title">
          热门推荐
      </div>
      <div class="recommend">
          <goods-item
            v-for="k in 5"
            :key="k"
            :styles="{width:'225px', float:'left', marginRight:'19px',background:'#fff'}"
          />
      </div>
    </div>
    <v-footer />
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";
import Steps from "./components/steps";
import GoodsItem from "$components/GoodsItem";
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
    Steps,
    GoodsItem
  },
  methods: {
    onHome() {
      this.$router.push({ name: "home" });
    }
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
}
.success {
  min-height: 470px;
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  img {
    width: 140px;
    height: auto;
  }
  span {
    font-size: 14px;
    font-weight: 400;
    color: #999;
  }
  p {
    font-size: 14px;
    margin-top: 35px;
    margin-bottom: 35px;
    max-width: 390px;
    font-weight: 400;
    text-align: center;
  }
}
.title{
    margin-top:20px;
    margin-bottom:16px;
    background: #fff;
    font-size: 14px;
    font-weight: 400;
    padding-left: 16px;
    line-height: 60px;
    border-bottom: 1px solid #ededed;
}

.recommend{
    width:105%;
    overflow: hidden;
    margin-bottom:60px;
}

.el-button {
  width: 120px;
  background: #000;
  border: 1px solid #000;
  color: #fff;
  padding: 10px 20px;
  font-size: 12px;
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