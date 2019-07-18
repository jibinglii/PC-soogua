<template>
  <div>
    <v-header />
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
        <el-breadcrumb-item>发布商品</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="result">
        <img :src="data[result].img" alt />
        <span>{{data[result].title}}</span>
        <p>{{data[result].desc}}</p>
        <div class="btn-group">
          <el-button style="margin-right:70px" @click.native.prevent="onHome()">返回首页</el-button>
          <el-button @click.native.prevent="onDownApp()">下载搜瓜App</el-button>
        </div>
      </div>
      <div class="title">热门推荐</div>
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
import GoodsItem from "$components/GoodsItem";
export default {
  data() {
    return {
      result: "success",
      data: {
        success: {
          title: "支付成功",
          img: require("$assets/images/paysuccess.png"),
          desc: "您的商品已成功购买，也可以下载手机客户端了解最新发货信息"
        },
        fail: {
          title: "支付失败",
          img: require("$assets/images/payfail.png"),
          desc: "您的商品支付失败，请重新支付，也可以下载手机客户端进行支付"
        }
      }
    };
  },
  components: {
    VHeader,
    VFooter,
    GoodsItem
  },
  methods: {
    onHome() {
      this.$router.push({ name: "home" });
    },
    onDownApp() {}
  }
};
</script>

<style lang="scss" scoped>
.result {
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
.title {
  margin-top: 20px;
  margin-bottom: 16px;
  background: #fff;
  font-size: 14px;
  font-weight: 400;
  padding-left: 16px;
  line-height: 60px;
  border-bottom: 1px solid #ededed;
}

.recommend {
  width: 105%;
  overflow: hidden;
  margin-bottom: 60px;
}
.btn-group {
  display: flex;
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