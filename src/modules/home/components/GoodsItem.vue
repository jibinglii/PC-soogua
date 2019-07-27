<template>
  <div class="goods" @click="onGoods">
    <img class="img" :src="goods.logo" alt>
    <div class="info">
      <div class="group">
        <span class="title">{{ goods.title }}</span>
        <span class="name">{{ goods.game_name }}</span>
      </div>
      <p class="desc">{{ goods.server_name }}</p>
      <div class="group">
        <span class="price">￥{{ goods.amount }}</span>
        <i class="stock">库存{{ goods.sale_nums }}件</i>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "goods-item",
  props: {
    goods: Object
  },
  data() {
    return {};
  },
  components: {},
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
  height: 310px;
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
    .desc {
      margin-top: 23px;
      font-size: 12px;
      font-weight: 400;
      color: #999;
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
    .name{
      font-size: 14px;
    }
    .group {
      margin-top: 10px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
  }
}
</style>
