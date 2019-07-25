<template>
  <div class="goods">
    <v-header/>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>商品详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="content clearfix">
        <img class="logo" :src="goods.logo" alt>
        <div class="text">
          <h4>{{goods.game_name}}</h4>
          <p>
            游戏区服：
            <span>{{goods.server_name}}</span>
          </p>
          <p>
            商品价格：
            <span class="price">￥{{goods.amount}}</span>
          </p>
          <p>
            发布数量：
            <span>{{goods.store_nums}}件</span>
          </p>
          <p>
            购买数量：
            <span>1件</span>
          </p>
          <div class="btn-group">
            <button
              type="button"
              @click="onBuy(goodsId)"
              class="buy"
              :class="{disabled: !canBuy, 'can-not-contact': !canContact}"
            >{{canBuy?'立即购买':'暂时无货'}}</button>
            <router-link class="graphic" v-show="canContact" :to="{name: 'contact'}">
              <img src="~$assets/images/kefu@2x.png" alt>
              <span>联系商家</span>
            </router-link>
            <a class="graphic" @click="collect(goods)">
              <img src="~$assets/images/collect.png" alt v-if="goods.is_collect">
              <img src="~$assets/images/shoucang@2x.png" alt v-else>
              <span>{{ goods.is_collect ? '已收藏' : '收藏商品'}}</span>
            </a>
          </div>
        </div>
        <div class="qrcode">
          <img src="~$assets/images/saomaxiadan@2x.png" alt>
        </div>
      </div>
      <el-container>
        <el-main>
          <h3>商品介绍</h3>
          <ul>
            <li v-for="(item, index) in goods.specs" :key="index" class="item">
              <label>{{item.option.title}}</label>
              <div>
                <span v-if="Array.isArray(item.value)">{{item.value.join(', ')}}</span>
                <span v-else-if="item.type == 'radio'">{{item.option.options[item.value]}}</span>
                <span v-else>{{item.value}}</span>
              </div>
            </li>
          </ul>

          <p class="introduce">
            商品介绍：
            <span>{{goods.content}}</span>
          </p>
          <div class="main-img">
            <el-carousel indicator-position="outside" :autoplay="true">
              <el-carousel-item v-for="(item,index) in goods.images" :key="index">
                <img :src="item" alt>
              </el-carousel-item>
            </el-carousel>
            <p>如果图片或描述中带有联系方式均为骗子，请勿上当</p>
          </div>
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
        </el-aside>
      </el-container>
    </div>
    <v-footer/>
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";

import * as service from "$modules/goods/services";
export default {
  data() {
    return {
      goodsId: "",
      goods: { images: [], game: [], server: [], specs: [] },
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
    VFooter
  },
  computed: {
    canBuy() {
      if (this.goods.status != 4) {
        return false;
      }
      return this.goods.store_nums > 0;
    },
    canContact() {
      return this.$user().id != this.$currentStore().user_id;
    }
  },
  created() {
    this.goodsId = this.$route.params.goods;
    this.getDetail();
  },
  beforeRouteUpdate(to, from, next) {
    // 在当前路由改变，但是该组件被复用时调用
    // 举例来说，对于一个带有动态参数的路径 /foo/:id，在 /foo/1 和 /foo/2 之间跳转的时候，
    // 由于会渲染同样的 Foo 组件，因此组件实例会被复用。而这个钩子就会在这个情况下被调用。
    // 可以访问组件实例 `this`
    this.goodsId = to.params.goods;
    this.getDetail();
    window.scroll({
      top: 0,
      left: 0,
      behavior: "smooth"
    });
  },
  methods: {
    onBuy(goodsId) {
      if (this.$route.query["spread_id"] != undefined) {
        this.$cookies.set("goods-spread", this.$route.query["spread_id"], 1800);
      }

      if (this.canBuy) {
        this.$router.push({
          name: "goods.refer",
          params: { goods: goodsId },
          query: { spread_id: this.$route.query["spread_id"] }
        });
      }
    },
    async getDetail() {
      const loading = this.$loading({
        lock: true,
        text: "请稍等"
      });
      service
        .goodsView(this.goodsId, {
          params: {
            include: "specs.option,game,server",
            "fields[game]": "id,name",
            append: "is_collect"
          }
        })
        .then(({ data }) => {
          this.goods = data.goods;
          window.document.title = this.goods.title;
          loading.close();
        })
        .catch(({ response }) => {
          this.$router.back();
        });
    },
    collect(goods) {
      if (!goods.is_collect) {
        this.$http
          .put("api/v1/collect/goods/" + this.goodsId)
          .then(({ data }) => {
            this.$message.success("收藏成功");
            this.$set(goods, "is_collect", true);
          })
          .catch(error => {
            this.$message.error(error.data.message);
          });
      }
    }
  }
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
    width: 188px;
    height: 188px;
    margin-top: 25px;
    vertical-align: middle;
    margin-right: 43px;
  }
  .text {
    float: left;
    margin-top: 21px;
    h4 {
      font-size: 18px;
      font-weight: bold;
    }
    p {
      margin-top: 12px;
      font-size: 12px;
      font-weight: bold;
      line-height: 13px;
      color: #999;
      font-weight: 400;
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
        line-height: 38px;
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
        margin-left: 30px;
        img {
          width: 20px;
          height: 20px;
        }
        span {
          font-size: 12px;
          font-weight: bold;
          color: #999;
          padding-top: 4px;
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
      float: left;
      width: 50%;
      padding-left: 44px;
      font-size: 14px;
      font-weight: bold;
      line-height: 42px;
      color: #999;
      display: flex;
      span {
        color: #000;
      }
      label {
        width: 120px;
      }
    }
  }
  .introduce {
    font-size: 14px;
    font-weight: bold;
    color: #999;
    line-height: 28px;
    padding: 0 19px 19px 43px;
    background: #fff;
    span {
      color: #000;
    }
  }
  .main-img {
    position: relative;
    background: #fff;
    border-bottom: solid 1px #f2f2f2;
    .el-carousel {
      padding: 30px 0;
      /deep/.el-carousel__container {
        width: 796px;
        height: 360px;
        margin: auto;
      }
      img {
        width: 100%;
        height: 100%;
      }
    }
    p {
      position: absolute;
      bottom: 59px;
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
      z-index: 99;
      display: none;
    }
  }
  .main-img:hover {
    p {
      display: block;
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
