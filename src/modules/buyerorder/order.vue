<template>
  <div class="order">
    <v-header></v-header>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>
        <div slot="main">
          <div class="title">查看我的订单</div>
          <v-tabs :tabs="tabs" activeTab="all" @changeTab="changeTab" />
          <div class="goodslist">
            <el-table :data="orderData" style="width: 100%; text-align:center;">
              <el-table-column align="center" prop="id" label="订单编号"></el-table-column>
              <el-table-column align="center" width="130" prop="shopname" label="商铺名称"></el-table-column>
              <el-table-column align="center" width="250" label="商品名称">
                <template slot-scope="scope">
                  <div class="goodsname">
                    <img src="~$assets/images/shangpinlogo@2x.png" alt />
                    <span>{{scope.row.goodsname}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="price" label="价格"></el-table-column>
              <el-table-column align="center" prop="num" label="数量"></el-table-column>
              <el-table-column align="center" prop="total" label="总支付"></el-table-column>
              <el-table-column align="center" prop="state" label="订单状态"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="onDetails(scope.$index)"
                    type="button"
                    size="small"
                  >确认收货</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <pagination :total="50" :pageSize="12" @currentChange="currentChange" />
        </div>
      </v-content>
    </div>
    <v-footer></v-footer>
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";
import VContent from "$components/VContent";
import VAside from "$components/VAside";
import VTabs from "$components/tabs";
import Pagination from "$components/Pagination";
export default {
  data() {
    return {
      start: "",
      end: "",
      searchForm: { order: "" },
      tabs: [
        { label: "全部订单", name: "all" },
        { label: "待付款", name: "waitpay" },
        { label: "待收货", name: "waitaccept " },
        { label: "已完成", name: "complete" },
        { label: "退换货", name: "return" }
      ],
      orderData: [
        {
          id: 162534281732,
          shopname: "天瑞网友工作室",
          goodsname: "+12钻石装备强化券，无货赔付",
          price: "￥300.00",
          num: "2",
          total: "￥600.00",
          state: "已支付"
        },
        {
          id: 162534281732,
          shopname: "天瑞网友工作室",
          goodsname: "+12钻石装备强化券，无货赔付",
          price: "￥300.00",
          num: "2",
          total: "￥600.00",
          state: "已支付"
        },
        {
          id: 162534281732,
          shopname: "天瑞网友工作室",
          goodsname: "+12钻石装备强化券，无货赔付",
          price: "￥300.00",
          num: "2",
          total: "￥600.00",
          state: "已支付"
        },
        {
          id: 162534281732,
          shopname: "天瑞网友工作室",
          goodsname: "+12钻石装备强化券，无货赔付",
          price: "￥300.00",
          num: "2",
          total: "￥600.00",
          state: "已支付"
        }
      ]
    };
  },
  components: {
    VHeader,
    VFooter,
    VContent,
    VAside,
    VTabs,
    Pagination
  },
  methods: {
    onDetails() {},
    changeTab(tab, event) {
      console.log("TCL: handleClick -> data", tab.name);
    },
    onSearch() {},
    currentChange() {}
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-weight: 400;
  padding-left: 16px;
  line-height: 50px;
  border-bottom: 1px solid #ededed;
  background: #fff;
}


.form-inline {
  margin-top: 17px;
  width: 350px;
  .el-form-item {
    margin-bottom: 17px;
  }
  .el-button {
    width: 80px;
  }
}

.goodslist {
  margin-top: 16px;
  margin-bottom: 30px;
  .goodsname {
    display: flex;
    img {
      width: 88px;
      height: 88px;
      margin-right: 10px;
    }
    span {
      padding-top: 10px;
      text-align: left;
      width: 100%;
    }
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

.el-button {
  width: 80px;
  background: #000;
  border: 1px solid #000;
  color: #fff;
  padding: 10px 10px;
  font-size: 12px;
}
</style>
