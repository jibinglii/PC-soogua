<template>
  <div class="goods" @click="onGoods">
    <img class="img" src="~$assets/images/goods2.png" alt />
    <div class="info">
      <div class="group">
        <span class="title">{{ goods.title }}</span>
        <i class="tag">{{ goods.tag }}</i>
      </div>
      <p class="content">{{ goods.content }}</p>
      <p class="desc">{{ goods.desc }}</p>
      <div class="group">
        <span class="price">{{ goods.price }}</span>
        <i class="stock">{{ goods.stock }}</i>
      </div>
    </div>
  </div>
</template>

<script>
import Image from "vant/lib/image";
import "vant/lib/image/style";
export default {
  name: "goods-item",
  data() {
    return {
      goods: {
        title: "王者荣耀",
        tag: "装备",
        content: "王者荣耀【苹果QQ】外婆缘一大元素使武装...",
        desc: "王者荣耀（安卓）-QQ（安卓）全区全服",
        img: "",
        price: "¥300.00",
        stock: "库存1件"
      }
    };
  },
  components: {
    [Image.name]: Image
  },
  methods: {
    onGoods() {
      this.$router.push({ name: "goods", params: { goods: "123" } });
    }
  }
};
</script>

<style lang="scss" scoped>
.goods {
  width: 284px;
  height: 305px;
  padding: 9px 8px;
  float: left;
  margin-bottom: 16px;
  background-color: #fff;
  &:nth-child(3n-1) {
    margin-right: 16px;
    margin-left: 16px;
  }
  .img {
    display: block;
    width: 268px;
    height: 190px;
    overflow: hidden;
    margin: 0 auto;
  }
  .info {
    .title {
      font-size: 16px;
      font-weight: bold;
      color: #000;
      line-height: 16px;
    }
    .tag {
      font-size: 12px;
      font-weight: 400;
      color: #000;
      line-height: 16px;
    }
    .content {
      margin-top: 10px;
      font-size: 12px;
      font-weight: 400;
      color: #000;
      line-height: 12px;
    }
    .desc {
      margin-top: 8px;
      font-size: 12px;
      font-weight: 400;
      color: #999;
      line-height: 12px;
    }
    .price {
      font-size: 16px;
      font-weight: bold;
      color: #000;
      line-height: 20px;
    }
    .stock {
      font-size: 12px;
      font-weight: bold;
      color: #000;
      line-height: 20px;
    }
    .group {
      margin-top: 10px;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>