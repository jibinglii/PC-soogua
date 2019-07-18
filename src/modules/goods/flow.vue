<template>
  <div class="home">
    <v-header/>

    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>流量</el-breadcrumb-item>
      </el-breadcrumb>
      <v-tabs :tabs="tabs" activeTab @changeTab="changeTab"/>
      <el-container>
        <el-main>
          <div class="list">
            <el-table :data="goods" style="width: 100%; text-align:center;">
              <el-table-column align="center" width="200px" prop label="商品">
                <template slot-scope="scope">
                  <div class="goodsname">
                    <img :src="scope.row.logo" alt>
                    <div class="text">
                      <span>{{scope.row.title}}</span>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="amount" label="价格" :formatter="amountFormat"></el-table-column>
              <el-table-column
                align="center"
                prop="sale_nums"
                label="库存"
                :formatter="saleNumsFormat"
              ></el-table-column>
              <el-table-column align="center" prop label="保障">
                <i></i>
                实名认证
              </el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="onbuy(scope.row.id, scope.$index)"
                    type="button"
                    size="small"
                  >立即购买</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <pagination :total="total" :current-page="page" @pagechange="getList"></pagination>
        </el-main>
        <el-aside width="300px">
          <div class="aside-head">商品精选</div>
          <goods-item
            v-for="k in 4"
            :key="k"
            :styles="{width:'300px', marginBottom:'16px',background:'#fff'}"
          />
        </el-aside>
      </el-container>
    </div>

    <v-footer/>
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";
import GoodsItem from "$components/GoodsItem";
import VTabs from "$components/tabs";
import Pagination from "$components/Pagination";

import * as service from "$modules/home/services";
export default {
  data() {
    return {
      goods: [],
      infiniteId: +new Date(),
      total: 0, // 记录总条数
      display: 10, // 每页显示条数
      page: 1, // 当前的页数
      tabs: [
        { name: "0", label: "全部" },
        { name: "301", label: "社群流量" },
        { name: "300", label: "媒体流量" },
        { name: "302", label: "站点流量" }
      ],
      type: 2,
      type2: 0
    };
  },
  created() {
    this.getList(this.page);
  },
  methods: {
    saleNumsFormat(row, column) {
      return row.sale_nums + "件";
    },
    amountFormat(row, column) {
      return "￥" + row.amount;
    },
    changeTab(tab, event) {
      this.page = 1;
      this.type2 = tab.name;
      this.getList(this.page);
    },
    onbuy(id, index) {
      this.$router.push({
        name: "goods.refer",
        params: { goods: this.goods[index].uuid }
      });
    },
    async getList(currentPage) {
      const loading = this.$loading({
        lock: true,
        text: "请稍等"
      });
      let param = {
        params: {
          "fields[store_goods]": "id,title,amount,game_id,sale_nums,images",
          page: currentPage
        }
      };
      if (this.type2 != 0) {
        param["params"]["filter[type2]"] = this.type2;
      }
      param["params"]["filter[type]"] = this.type;
      service
        .goods(param)
        .then(({ data }) => {
          this.goods = [];
          this.goods = data.goods.data;
          console.log(this.goods);
          this.page = currentPage;
          this.total = data.goods.total;
          loading.close();
        })
        .catch(({ response }) => {
          this.$router.back();
        });
    }
  },
  components: {
    VHeader,
    VFooter,
    VTabs,
    GoodsItem,
    Pagination
  }
};
</script>

<style lang="scss" scoped>
.el-button {
  background: #000;
  border: 1px solid #000;
  color: #fff;
  font-size: 12px;
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
.el-container {
  margin-top: 15px;
  .el-main {
    max-width: 884px;
    padding: 0;
    margin-right: 16px;
    overflow: hidden;
  }
}

/deep/.el-table {
  .cell {
    color: #000;
  }
}
.goodsname {
  img {
    width: 88px;
    height: 88px;
    margin-right: 10px;
    float: left;
  }
  .text {
    display: flex;
    flex-direction: column;
    span {
      font-size: 14px;
      font-weight: 400;
      color: #000;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    i {
      font-size: 12px;
      font-weight: 400;
      color: #666;
      text-align: left;
    }
  }
}
.aside-head {
  margin-bottom: 15px;
  padding-left: 16px;
  font-size: 16px;
  font-weight: 400;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}
</style>
