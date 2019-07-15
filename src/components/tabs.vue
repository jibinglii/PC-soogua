<template>
  <div class="tabs">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane v-for="(item,key) in tabs" :key="key" :label="item.label" :name="item.name"></el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
export default {
  data() {
    return {
    };
  },
  props: {
    tabs: { type: Array, default: [] },
    activeTab: { type: String, default: "" }
  },
  computed: {
    activeName: {
      set: function(str) {},
      get: function() {
        return this.activeTab;
      }
    }
  },
  methods: {
    handleClick(tab, event) {
      this.$emit("changeTab", tab, event);
    }
  }
};
</script>

<style lang="scss" scoped>
.tabs {
  background: #fff;
  padding-left: 16px;
  border-bottom: 1px solid #ededed;
}
/deep/.el-tabs__header {
  margin: 0;
}
/deep/.el-tabs__item.is-active {
  color: #000;
}

/deep/.el-tabs__item {
  padding: 0 20px;
  height: 60px;
  -webkit-box-sizing: border-box;
  box-sizing: border-box;
  line-height: 60px;
  display: inline-block;
  list-style: none;
  font-size: 14px;
  font-weight: 500;
  color: #999;
  position: relative;
}

/deep/.el-tabs__active-bar {
  background-color: #000;
}
/deep/.el-tabs__nav-wrap::after {
  background-color: transparent;
}
</style>