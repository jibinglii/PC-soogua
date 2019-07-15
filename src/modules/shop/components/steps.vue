<template>
  <div class="steps">
    <div class="cell">
      <img src="~$assets/images/xuanzeleixing.png" alt />
      <span>选择游戏类型</span>
    </div>
    <i>...</i>
    <div class="cell">
      <img src="~$assets/images/tianxiefabu.png" alt />
      <span>填写发布信息</span>
    </div>
    <i>...</i>
    <div class="cell">
      <img src="~$assets/images/fabuchenggong.png" alt />
      <span>发布成功</span>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {};
  }
};
</script>

<style lang="scss" scoped>
.steps {
  background: #fff;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100px;
  i {
    flex: 1;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .cell {
    flex: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 39px;
      height: auto;
      margin-right:18px;
    }
  }
}
</style>