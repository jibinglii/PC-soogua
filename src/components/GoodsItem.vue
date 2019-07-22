<template>
  <div
    class="goods"
    :style="this.styles"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
    @click="onGoods"
  >
    <img class="img" :src="goods.logo" alt />
    <p class="title">{{ goods.title }}</p>
    <div class="group">
      <span class="price">￥{{ goods.amount }}</span>
      <i class="stock">{{ goods.game_name }}</i>
    </div>
    <div v-if="del" class="del" @click.stop="delItem">
      <img src="~$assets/images/del.png" alt />
    </div>
  </div>
</template>

<script>
export default {
  props: {
    styles: Object,
    goods: Object,
    showDel: { type: Boolean, default: false }
  },
  data() {
    return {
      del: false,
    };
  },
  methods: {
    onGoods() {
      this.$router.push({ name: "goods", params: { goods: this.goods.uuid }});
    },
    mouseOver() {

      if (!this.showDel) {
        return;
      }
      this.del = true;
    },
    mouseLeave() {
      if (!this.showDel) {
        return;
      }
      this.del = false;
    },
    delItem() {
      this.$emit("delItem");
    }
  }
};
</script>

<style lang="scss" scoped>
.goods {
  position: relative;
  width: 100%;
  padding: 9px 8px 12px 8px;
  background-color: #fff;
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
