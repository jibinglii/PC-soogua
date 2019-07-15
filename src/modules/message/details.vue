<template>
  <div>
    <v-header />
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>我的消息</el-breadcrumb-item>
        <el-breadcrumb-item>消息详情</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="details">
        <h4 class="title">【同志】搜瓜留言系统升级维护</h4>
        <h6 class="desc">
          <span>来源：搜瓜团队</span>
          <i>2019-06-28 13:11</i>
        </h6>
        <div class="line"></div>
        <p class="content">
          亲爱的友友：
          <br />为了给您提供更好的使用体验，搜瓜“留言系统”将进行升级维护，维护期间 “留言系统”暂停使用，给您造成的不便深感抱歉。
          <br />真成感谢你对我们一如既往的信任和支持！
        </p>
      </div>
    </div>
    <v-footer />
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";
export default {
  data() {
    return {
      item: ""
    };
  },
  created() {},
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
  padding: 0 155px;
  margin-bottom: 80px;
  .title {
    margin-top: 49px;
    height: 60px;
    line-height: 60px;
    color: #000;
    text-align: center;
  }
  .desc {
    margin-top: 11px;
    font-size: 12px;
    color: #999;
    text-align: center;
  }
  .line{
      margin-top:35px;
      margin-bottom:75px;
      height: 3px;
      border-top:1px solid #000;
      border-bottom:1px solid #000;
  }
  .content {
    font-size: 14px;
    color: #000;
    font-weight: 400;
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