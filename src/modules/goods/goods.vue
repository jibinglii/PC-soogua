<template>
  <div class="goods">
    <v-header />
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="content clearfix">
        <img class="logo" src="~$assets/images/shangpinlogo@2x.png" alt />
        <div class="text">
          <h4>+12钻石装备强化券，无货赔付</h4>
          <p>
            游戏区服：
            <span>王者荣耀（安卓）>QQ（安卓）>全区全服</span>
          </p>
          <p>
            商品价格：
            <span class="price">￥118.00</span>
          </p>
          <p>
            发布数量：
            <span>1件</span>
          </p>
          <p>
            购买数量：
            <span>1件</span>
          </p>
          <div class="btn-group">
            <button type="button" @click="onBuy" class="buy">立即购买</button>
            <a href="javascript:" class="graphic">
              <img src="~$assets/images/kefu@2x.png" alt />
              <span>联系商家</span>
            </a>
            <a href="javascript:" class="graphic">
              <img src="~$assets/images/shoucang@2x.png" alt />
              <span>收藏商品</span>
            </a>
          </div>
        </div>
        <div class="qrcode">
          <img src="~$assets/images/saomaxiadan@2x.png" alt />
        </div>
      </div>
      <el-container>
        <el-main>
          <h3>商品介绍</h3>
          <ul>
            <li>
              所属游戏：
              <span>王者荣耀</span>
            </li>
            <li>
              服务器：
              <span>王者荣耀</span>
            </li>
            <li>
              账号绑定：
              <span>无绑定</span>
            </li>
            <li>
              守护平台绑定：
              <span>王者荣耀</span>
            </li>
            <li>
              英雄个数：
              <span>王者荣耀</span>
            </li>
            <li>
              皮肤个数：
              <span>王者荣耀</span>
            </li>
            <li>
              防沉迷设置：
              <span>王者荣耀</span>
            </li>
            <li>
              至尊宝绑定：
              <span>王者荣耀</span>
            </li>
            <li>
              交易方式：
              <span>王者荣耀</span>
            </li>
            <li>
              发货时效：
              <span>王者荣耀</span>
            </li>
          </ul>
          <p class="introduce">
            商品介绍：
            <span>上班没时间，诚心出有意私我自己看图，资源多多，后期基本不用投资了，接受就能玩，3无微信游戏号</span>
          </p>
          <div class="main-img">
            <img src="~$assets/images/shangpinmain.png" alt />
            <p>如果图片或描述中带有联系方式均为骗子，请勿上当</p>
          </div>

          <el-carousel height="110px" indicator-position="none">
            <el-carousel-item>
              <img src="~$assets/images/shangpinfutu.png" alt />
              <img src="~$assets/images/shangpinfutu.png" alt />
              <img src="~$assets/images/shangpinfutu.png" alt />
            </el-carousel-item>
          </el-carousel>
          <div class="statement">
            <p>免责声明：1.所展示的商品供求信息由买卖双方自行提供，其真实性、准确性和合法性由信息发布人负责。</p>
            <p>2.账号真实情况以客服截图为准。</p>
            <p>3.国家法律规定，未成年人不能参与虚拟物品交易。</p>
            <p>4.本平台提供的数字化商品性质不支持七天无理由退货服务。</p>
          </div>
        </el-main>
        <el-aside width="300px">
          <div class="aside-head">浏览记录</div>
          <div class="aside-text">
            <div class="detail" v-for="i in 3" :key="i">
              <span>账</span>
              <div>
                <p>至尊宝脸证全，35级冒险团连体；12套年套神选之人，剑神亿万套超3万物套，黑色天二一套；神武，纯黑色战灵天舞套，各种角色...</p>
                <h6>￥300.00</h6>
              </div>
            </div>
          </div>

          <div class="aside-head">商品精选</div>
          <goods-item v-for="k in 2" :key="k" :styles="{marginBottom:'16px'}" />
        </el-aside>
      </el-container>
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
      aside: [
        {
          title: "王者荣耀【苹果QQ】外婆缘 48000碎片 12万金 30级 挂绑改密",
          price: "￥300.00",
          stock: "库存1件"
        },
        {
          title: "王者荣耀【苹果QQ】外婆缘 48000碎片 12万金 30级 挂绑改密",
          price: "￥300.00",
          stock: "库存1件"
        }
      ]
    };
  },
  components: {
    VHeader,
    VFooter,
    GoodsItem
  },
  methods: {
    onBuy() {
      this.$router.push({name:'goods.refer'})
    }
  },
};
</script>

<style lang="scss" scoped>
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
.content {
  width: 100%;
  background: #fff;
  padding: 22px 56px;
  margin-bottom: 16px;
  .logo {
    float: left;
    margin-top: 25px;
    vertical-align: middle;
    margin-right: 43px;
  }
  .text {
    float: left;
    margin-top: 21px;
    h4 {
      font-size: 14px;
      font-weight: bold;
    }
    p {
      margin-top: 12px;
      font-size: 12px;
      font-weight: bold;
      line-height: 13px;
      color: #999;

      span {
        &.price {
          font-size: 16px;
        }
        color: #000;
      }
    }
    .btn-group {
      margin-top: 29px;
      overflow: hidden;
      .buy {
        float: left;
        width: 140px;
        font-size: 12px;
        font-weight: bold;
        text-align: center;
        line-height: 36px;
        color: #fff;
        background: #000;
        margin-right: 20px;
      }
      .graphic {
        float: left;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        margin-left: 10px;
        img {
          width: 20px;
          height: 20px;
        }
        span {
          font-size: 12px;
          font-weight: bold;
          color: #999;
        }
      }
    }
  }
  .qrcode {
    float: right;
    img {
      max-width: 321px;
      height: auto;
    }
  }
}
.el-main {
  max-width: 884px;
  padding: 0;
  margin-right: 16px;
  overflow: hidden;
  h3 {
    height: 50px;
    padding-left: 19px;
    font-size: 14px;
    line-height: 50px;
    font-weight: bold;
    border-bottom: 1px solid #ededed;
    background: #fff;
  }
  ul {
    padding-top: 19px;
    width: 100%;
    overflow: hidden;
    background: #fff;
    li {
      &:nth-child(4n-3) {
        padding-left: 43px;
      }
      float: left;
      width: 25%;
      padding-left: 25px;
      font-size: 14px;
      font-weight: bold;
      line-height: 42px;
      color: #999;
    }
  }
  .introduce {
    padding-left: 43px;
    font-size: 14px;
    font-weight: bold;
    color: #999;
    line-height: 42px;
    padding-bottom: 19px;
    background: #fff;
  }
  .main-img {
    position: relative;
    padding-left: 44px;
    padding-right: 44px;
    background: #fff;
    img {
      width: 100%;
      height: auto;
    }
    p {
      position: absolute;
      bottom: 3px;
      left: 44px;
      height: 48px;
      width: 796px;
      font-size: 14px;
      font-weight: bold;
      line-height: 48px;
      text-align: center;
      color: #fff;
      background-color: #000;
      opacity: 0.5;
    }
  }
  .statement {
    padding: 15px 44px;
    background: #fff;
    p {
      font-size: 12px;
      font-weight: bold;
      line-height: 16px;
      color: #999;
      padding-left: 5em;
      &:first-child {
        padding-left: 0;
      }
    }
  }
}
.el-carousel {
  background: #fff;
  padding: 30px 44px;
  border-bottom: 1px solid #ededed;
  .el-carousel__item {
    padding: 0 20px;
    img {
      width: 224px;
      height: 110px;
      margin-left: 13px;
      margin-right: 13px;
    }
  }
}
/deep/.el-carousel__arrow--left {
  left: 0px;
}
/deep/.el-carousel__arrow--right {
  right: 0px;
}
/deep/.el-carousel__arrow {
  height: 20px;
  width: 20px;
  border-radius: 0;
}

.el-aside {
  .aside-head {
    margin-bottom: 15px;
    font-size: 14px;
    font-weight: 400;
    padding-left: 16px;
    line-height: 50px;
    background-color: #fff;
  }
  .aside-text {
    margin-bottom: 16px;
    background-color: #fff;
    padding: 20px 20px 0 20px;

    .detail {
      display: flex;
      width: 100%;
      span {
        flex: 1;
        margin-right: 9px;
        display: block;
        width: 25px;
        height: 18px;
        font-size: 12px;
        font-weight: 400;
        line-height: 18px;
        background: #f4c93a;
      }
      p {
        font-size: 12px;
        font-weight: 300;
        line-height: 16px;
      }
      h6 {
        padding-top: 7px;
        padding-bottom: 20px;
        font-size: 14px;
        font-weight: bold;
        line-height: 16px;
      }
    }
  }
  .aside-graphic {
    padding: 10px;
    background: #fff;
    margin-bottom: 16px;
    .icon {
      width: 282px;
      height: 184px;
    }
    .desc {
      h4 {
        font-size: 12px;
        font-weight: 400;
        line-height: 20px;
      }
      p {
        display: flex;
        justify-content: space-between;
        margin-top: 18px;
        span {
          font-size: 16px;
          font-weight: bold;
          line-height: 20px;
        }
        i {
          font-size: 12px;
          font-weight: 400;
          color: #999;
          line-height: 20px;
        }
      }
    }
  }
}
</style>