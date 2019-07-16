<template>
  <div class="goods" @click="onGoods">
    <img class="img" :src="goods.logo" alt>
    <div class="info">
      <div class="group">
        <span class="title">{{ goods.game_name }}</span>
        <i class="tag"></i>
      </div>
      <p class="content">{{ goods.title }}</p>
      <p class="desc">{{ goods.server_name }}</p>
      <div class="group">
        <span class="price">￥{{ goods.amount }}</span>
        <i class="stock">库存{{ goods.store_nums }}件</i>
      </div>
    </div>
  </div>
</template>

<script>
import Image from "vant/lib/image";
import "vant/lib/image/style";
export default {
  name: "goods-item",
  props: {
    goods: Object
  },
  data() {
    return {};
  },
  components: {
    [Image.name]: Image
  },
  methods: {
    onGoods() {
      this.$router.push({ name: "goods", params: { goods: this.goods.uuid } });
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
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 1;
      overflow: hidden;
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
