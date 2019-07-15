<template>
  <div
    class="goods"
    :style="this.styles"
    @mouseover="mouseOver"
    @mouseleave="mouseLeave"
    @click="onGoods"
  >
    <img class="img" src="~$assets/images/goods2.png" alt />
    <p class="title">{{ goods.title }}</p>
    <div class="group">
      <span class="price">{{ goods.price }}</span>
      <i class="stock">{{ goods.stock }}</i>
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
    showDel: { type: Boolean, default: false }
  },
  data() {
    return {
      del: false,
      goods: {
        id: 123,
        title: "王者荣耀【苹果QQ】外婆缘 48000碎片 12万金 30级 挂绑改密",
        img: require("$assets/images/goods2.png"),
        price: "¥300.00",
        stock: "库存1件"
      }
    };
  },
  methods: {
    onGoods() {
      this.$router.push({ name: "goods", params: { goods: "123" } });
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
    height: auto;
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