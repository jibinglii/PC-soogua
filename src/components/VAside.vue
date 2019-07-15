<template>
  <div class="v-aside">
    <el-card class="box-card" v-for="(item,key) in asideList" :key="key">
      <div slot="header" class="clearfix">
        <span>{{item.title}}</span>
      </div>
      <a v-for="(content,k) in item.contents" :key="k" @click="onActive(content.router)" class="tag-item">
        <span :class="{active:checkActive(content.router)}">{{content.name}}</span>
        <i v-show="checkActive(content.router)" class="circle"></i>
      </a>
    </el-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      curItem: "",
      asideList: [
        {
          title: "我是买家",
          contents: [{ name: "我的订单", router: "buyer.order" }]
        },
        {
          title: "我是卖家",
          contents: [
            { name: "店铺管理", router: "shop" },
            { name: "商品管理", router: "commodity" },
            { name: "订单管理", router: "seller.order" },
            {
              name: "分销管理",
              router: [
                "distribution.task",
                "distribution.order",
                "distribution.personnel"
              ]
            },
            { name: "结算管理", router: ["settle.order", "settle.record"] }
          ]
        },
        {
          title: "常用工具",
          contents: [
            { name: "我的收藏", router: "collection" },
            { name: "我的消息", router: "message" },
            { name: "操作流程", router: "flow" },
            { name: "使用帮助", router: "help" },
            { name: "意见反馈", router: "feedback" }
          ]
        }
      ]
    };
  },
  created() {
    this.curItem = this.$route.name;
  },
  methods: {
    onActive(router) {
      if ((typeof router).toLowerCase() === "object") {
        this.curItem = router[0];
      } else {
        this.curItem = router;
      }
      console.log("TCL: created -> curItem", this.curItem)
      this.$router.push({ name: this.curItem });
    },
    checkActive(router) {
      if ((typeof router).toLowerCase() === "object") {
        return router.indexOf(this.curItem) !== -1;
      } else {
        return router == this.curItem;
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.v-aside {
  margin-right: 16px;
  margin-bottom: 20px;
}
/deep/ .el-card__header {
  padding: 16px 20px;
  font-size: 16px;
  font-weight: 400;
  color: #000;
  background: #e8e8e8;
}

.tag-item {
  display: block;
  font-size: 14px;
  line-height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: space-between;
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
  }
}
</style>