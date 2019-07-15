<template>
  <div>
    <v-header />
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>店铺管理</el-breadcrumb-item>
        <el-breadcrumb-item>发布商品</el-breadcrumb-item>
      </el-breadcrumb>
      <steps />
      <div class="select">
        <div class="title">选择商品类型</div>
        <el-row>
          <el-col :span="6" v-for="(item) in goodSort" :key="item.id">
            <div class="goodtype" @click="onClick(item)">
              <img :src="item.img" alt />
              <span>{{item.desc}}</span>
            </div>
          </el-col>
        </el-row>
      </div>
      <div class="nextstep">
        <el-button @click.native.prevent="onNext()" type="button" size="medium">下一步， 请选择商品类型</el-button>
      </div>
    </div>
    <v-footer />
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";
import Steps from "./components/steps";
export default {
  data() {
    return {
      goodSort: [
        {
          id: "2",
          img: require("$assets/images/kefu.png"),
          desc: "流量"
        },
        {
          id: "3",
          img: require("$assets/images/kefu.png"),
          desc: "账号"
        },
        {
          id: "4",
          img: require("$assets/images/kefu.png"),
          desc: "游戏"
        },
        {
          id: "5",
          img: require("$assets/images/kefu.png"),
          desc: "服务"
        }
      ]
    };
  },
  components: {
    VHeader,
    VFooter,
    Steps
  },
  methods: {
    onClick() {
      this.$router.push({ name: "shop.selectgame" });
    },
    onNext() {}
  }
};
</script>

<style lang="scss" scoped>
.select {
  margin-top: 16px;
  background: #fff;
  .title {
    font-size: 14px;
    font-weight: bold;
    padding-left: 16px;
    line-height: 50px;
    background: #fff;
    border-bottom: 1px solid #ededed;
  }
  .goodtype {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    padding: 23px 90px 60px 90px;
    cursor: pointer;
    img {
      width: 50px;
      height: 50px;
      margin-bottom: 10px;
    }
    span {
      font-size: 14px;
      font-weight: 400;
      color: #000;
    }
  }
}
.nextstep {
  margin-top: 103px;
  margin-bottom: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
}

.el-button {
  width: 300px;
  background: #000;
  border: 1px solid #000;
  color: #fff;
  padding: 12px 20px;
  font-size: 16px;
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