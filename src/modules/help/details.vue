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
      <div class="details">
        <div class="title">
          <i class="circle"></i>
          <span>{{article.title}}</span>
        </div>
        <p  v-html="article.content"></p>
      </div>
    </div>
    <v-footer/>
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";
import article from '$api/article'
export default {
  data() {
    return {
      article: {}
    };
  },
  created() {
    setTimeout(() => {
      this.getData();
    }, 300);
  },
  methods: {
    getData() {
      let id = this.$route.params.id;
      article.view(id).then(({ data }) => {
        this.loading = false;
        this.article = data;
      });
    }
  },
  components: {
    VHeader,
    VFooter
  }
};
</script>

<style lang="scss" scoped>
.details {
  min-height: 500px;
  background: #fff;
  padding: 0 23px;
  margin-bottom: 80px;
  .title {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ededed;
    height: 60px;
    line-height: 60px;
    span {
      color: #666;
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
  p {
    background: #f2f2f2;
    padding: 28px 38px;
    font-size: 14px;
    font-weight: 400;
    color: #000;
  }
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
