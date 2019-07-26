<template>
  <div class="order">
    <v-header></v-header>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>
        <div slot="main">
          <v-tabs :tabs="tabs" activeTab="-1" @changeTab="changeTab"/>
          <div class="goodslist">
            <el-table :data="orderData" style="width: 100%; text-align:center;">
              <el-table-column align="center" prop="id" label="商品单号"></el-table-column>
              <el-table-column align="center" width="255" label="商品名称">
                <template slot-scope="scope">
                  <div class="goodsname">
                    <img :src="scope.row.goods_logo" alt>
                    <span>{{scope.row.goods_title}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="goods_price" label="商品价格"></el-table-column>
              <el-table-column align="center" prop="num" label="购买数量"></el-table-column>
              <el-table-column align="center" prop="total_amount" label="总支付"></el-table-column>
              <el-table-column align="center" prop="status_label" label="订单状态"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="onDetails(scope.row)"
                    type="button"
                    size="small"
                  >查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <pagination :total="total" :current-page="page" @pagechange="getOrder"></pagination>
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

import * as services from "$modules/sellerorder/services";
export default {
  data() {
    return {
      tabs: [
        { label: "全部", name: "-1" },
        { label: "待发货", name: "1" },
        { label: "待收货", name: "2" },
        { label: "已完成", name: "3" },
        { label: "退货中", name: "4" }
      ],
      orderData: [],
      page: 1,
      status: -1,
      total: 0
    };
  },

  methods: {
    onDetails(row) {
      this.$router.push({
        name: "seller.orderview",
        params: {
          order: row.id
        }
      });
    },
    changeTab(tab, event) {
      this.page = 1;
      this.status = tab.name;
      this.getOrder(this.page);
    },
    getOrder(currentPage) {
      this.orderData = [];
      let param = {
        params: {
          page: currentPage
        }
      };
      if (this.status != -1) {
        param["params"]["status"] = this.status;
      }
      services.getOrder(param).then(({ data }) => {
        this.orderData = data.orders.data;
        this.page = currentPage;
        this.total = data.orders.total;
      });
    }
  },
  created() {
    this.getOrder(this.page);
  },
  components: {
    VHeader,
    VFooter,
    VContent,
    VAside,
    VTabs,
    Pagination
  }
};
</script>

<style lang="scss" scoped>
.order {
  position: relative;
}
.details {
  background: #fff;
  .title {
    font-size: 14px;
    font-weight: bold;
    padding-left: 16px;
    line-height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #ededed;
  }
}
.goodslist {
  margin-top: 16px;
  margin-bottom: 30px;
  .goodsname {
    display: flex;
    align-items: center;
    img {
      width: 88px;
      height: 88px;
      margin-right: 10px;
    }
    span {
      flex: 1;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
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
  background: #000;
  border: 1px solid #000;
  color: #fff;
  padding: 11px 20px;
  font-size: 12px;
}
</style>
