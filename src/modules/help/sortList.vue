<template>
  <div>
    <v-header/>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'person.person'}">个人中心</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'help.help'}">使用帮助</el-breadcrumb-item>
        <el-breadcrumb-item>帮助详情</el-breadcrumb-item>
      </el-breadcrumb>
      <el-card class="box-card" shadow="never">
        <router-link v-for="(item,key) in items" :key="key" class="item" :to="{name:'help.details',params:{id: item.id}}">
           <i class="circle"></i>
          <span>{{item.title}}</span>
        </router-link>
        <infinite-loading @infinite="infiniteHandler" spinner="spiral">
          <div slot="no-more">没有更多数据啦...</div>
          <div slot="no-results">没有数据</div>
        </infinite-loading>
      </el-card>
    </div>
    <v-footer/>
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";
import article from "$api/article";
import InfiniteLoading from "vue-infinite-loading";
export default {
  data() {
    return {
      items: [],
      page: 1,
    };
  },
  methods: {
    infiniteHandler($state) {
      let id = this.$route.params.id;
      article.list(id, this.page).then(({ data }) => {
        if (data.contents.data.length > 0) {
          this.loading = false;
          this.items = data.contents.data;
          $state.loaded();
        }
        if (data.contents.per_page > data.contents.data.length) {
          $state.complete();
        }
      });
    },
  },
  components: {
    VHeader,
    VFooter,
    InfiniteLoading
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  padding-left: 20px;
  padding-right: 20px;
  min-height: 678px;
  margin-bottom: 40px;
  /deep/.el-card__body {
    padding: 0;
  }
  .item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ededed;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    span {
      color: #666;
      line-height: 20px;
      p {
        font-size: 12px;
        color: #999;
      }
      &.active {
        color: #000;
      }
    }
    .circle {
      width: 12px;
      height: 12px;
      border: 2px solid #000;
      border-radius: 50%;
      margin-right: 12px;
    }
  }
}
/deep/.infinite-status-prompt{
  padding-top: 30px;
}
.el-breadcrumb {
  margin-top: 18px;
  margin-bottom: 18px;

  .el-breadcrumb__item {
    font-size: 14px;
    font-weight: 400;
    line-height: 30px;
    color: #666;
    &:last-child {
      color: #666;
    }
  }
}
/deep/.el-breadcrumb__separator {
  color: #666;
}
</style>
