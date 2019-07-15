<template>
  <el-breadcrumb class="app-breadcrumb" separator="/">
    <transition-group name="breadcrumb">
      <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
      <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      <el-breadcrumb-item v-for="item in levelList" :key="item.path">
        <span v-if="item.path" class="no-redirect">{{ item.title }}</span>
        <a v-else @click.prevent="handleLink(item)">{{ item.title }}</a>
      </el-breadcrumb-item>
    </transition-group>
  </el-breadcrumb>
</template>

<script>

export default {
  props: {
    levelList: {
      type: Array,
      default: []
    },
  },
  data() {}
};
</script>

<style lang="scss" scoped>
.app-breadcrumb.el-breadcrumb {
  display: inline-block;
  margin-top: 18px;
  margin-bottom: 18px;
  font-size: 14px;
  line-height: 30px;
  margin-left: 8px;
  .el-breadcrumb__item {
    font-size: 14px;
    font-weight: 400;
    line-height: 30px;
    color: #666;
    &:last-child {
      color: #666;
    }
  }
  .no-redirect {
    color: #666;
    cursor: text;
  }
}

/deep/.el-breadcrumb__separator {
  color: #666;
}
</style>
