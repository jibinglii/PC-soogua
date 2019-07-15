<template>
  <div>
    <el-container>
      <el-aside width="200px">
        <slot name="aside"></slot>
      </el-aside>
      <el-main>
        <slot name="main"></slot>
      </el-main>
    </el-container>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.el-main {
  max-width: 984px;
  padding: 0;
  margin-right: 16px;
  overflow: hidden;
}
</style>