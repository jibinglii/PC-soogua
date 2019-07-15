<template>
  <form action="/" class="search-form">
    <van-search v-model="value" :clearable=false placeholder="请输入搜索关键词" @search="onSearch" @clear="onClear" />
  </form>
</template>

<script>
import Search from "vant/lib/search";
import "vant/lib/search/style";
export default {
  name: "Search",
  components: {
    [Search.name]: Search
  },
  data() {
    return {
      value: ""
    };
  },
  methods: {
    onSearch: function() {
      this.$emit("search", this.value);
    },
    onClear() {
      this.value =''
    }
  }
};
</script>

<style lang="scss">
.search-form {
  width: 270px;
  height: 34px;
  padding-top: 9px;
  .van-search {
    background: transparent !important;
    padding: 0;
  }
}
</style>

