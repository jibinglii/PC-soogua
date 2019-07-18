<template>
  <div>
    <v-header />
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>提现记录</el-breadcrumb-item>
        <el-breadcrumb-item>月份账单</el-breadcrumb-item>
        <el-breadcrumb-item>提现详情</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>
        <div slot="main">
          <div class="title">提示订单详情</div>
          <div class="wrap">
            <div class="subtitle">
              <span>结算详情</span>
            </div>
            <div class="content">
              <div class="left">
                <img src="~$assets/images/youxitubiao.png" alt />
                <div class="info">
                  <el-row>
                    <el-col :span="12">
                      <div class>商品名称</div>
                    </el-col>
                    <el-col :span="12">
                      <div class>王者荣耀V8满英雄，很多限定皮肤</div>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top:20px">
                    <el-col :span="12">
                      <div class>商品分类</div>
                    </el-col>
                    <el-col :span="12">
                      <div class>游戏账号</div>
                    </el-col>
                  </el-row>
                  <el-row style="margin-top:20px">
                    <el-col :span="12">
                      <div class>游戏区服</div>
                    </el-col>
                    <el-col :span="12">
                      <div class>绝地求生/全区全服</div>
                    </el-col>
                  </el-row>
                </div>
              </div>
              <div class="right">
                <el-row>
                  <el-col :span="9" :offset="6">
                    <div class>结算金额</div>
                  </el-col>
                  <el-col :span="9">
                    <div class>128.00</div>
                  </el-col>
                </el-row>
                <el-row style="margin-top:20px">
                  <el-col :span="9" :offset="6">
                    <div class>结算方式</div>
                  </el-col>
                  <el-col :span="9">
                    <div class>已结算</div>
                  </el-col>
                </el-row>
                <el-row style="margin-top:20px">
                  <el-col :span="9" :offset="6">
                    <div class>结算时间</div>
                  </el-col>
                  <el-col :span="9">
                    <div class>12019-04-19 16:22:32</div>
                  </el-col>
                </el-row>
              </div>
            </div>
          </div>
        </div>
      </v-content>
    </div>
    <v-footer />
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";
import VContent from "$components/VContent";
import VAside from "$components/VAside";
export default {
  data() {
    return {};
  },
  components: {
    VHeader,
    VFooter,
    VContent,
    VAside
  },
  methods: {}
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-weight: bold;
  padding-left: 16px;
  line-height: 50px;
  background: #fff;
  border-bottom: 1px solid #ededed;
}
.wrap {
  min-height: 676px;
  background: #fff;
  padding: 20px 22px;
}
.subtitle {
  padding-left: 20px;
  background: #f2f2f2;
  overflow: hidden;
  border-bottom: 1px solid #ededed;
  span {
    float: left;
    font-size: 14px;
    font-weight: bold;
    line-height: 50px;
    &::before {
      content: "";
      width: 0px;
      height: 16px;
      border: 1.5px solid #000;
      margin-right: 10px;
    }
  }
}
.content {
  display: flex;
  justify-content: space-between;
  padding: 25px 40px;
  background: #f2f2f2;
  .left {
    flex: 1;
    display: flex;
    align-items: center;
    img {
      margin-right: 20px;
      width: 70px;
      height: 70px;
    }
    .info {
      font-size: 12px;
      font-weight: 400;
      color: #666;
    }
  }
  .right {
    flex: 1;
    font-size: 12px;
    font-weight: 400;
    color: #666;
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