<template>
  <div>
    <div class="goods" @click="onGoods(index)" v-for="(item, index) in recommend.slice(0,3)" :key="index">
      <img class="img" :src="item.logo" alt>
      <p class="title">{{ item.title }}</p>
      <div class="group">
        <span class="price">￥{{ item.amount }}</span>
        <i class="stock">{{ item.store_nums }}件</i>
      </div>
    </div>
  </div>
</template>

<script>
import * as services from "$modules/goods/services";
export default {
  data() {
    return {
      recommend: []
    };
  },
  methods: {
    onGoods(index) {
      this.$router.push({ name: "goods", params: { goods: this.recommend[index].uuid } });
    },
    async getRecommend() {
      services.getRecommend().then(data => {
        this.recommend = data.data.goods.data;
      
      });
    }
  },
  mounted() {
    this.getRecommend();
  }
};
</script>

<style lang="scss" scoped>
.goods {
  position: relative;
  width: 100%;
  padding: 9px 8px 12px 8px;
  background-color: #fff;
  margin-bottom: 10px;
  cursor: pointer;
  .img {
    display: block;
    width: 100%;
    height: 190px;
    max-width: 100%;
    overflow: hidden;
    margin: 0 auto;
  }
  .title {
    margin-top: 13px;
    color: #000;
    font-size: 12px;
    font-weight: 400;
    line-height: 16px;
  }
  .group {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 19px;
    .price {
      font-size: 16px;
      font-weight: bold;
      color: #000;
      line-height: 16px;
    }
    .stock {
      font-size: 12px;
      font-weight: 400;
      color: #999;
      line-height: 16px;
    }
  }
  .del {
    position: absolute;
    top: 10px;
    right: 10px;
  }
}
</style>
