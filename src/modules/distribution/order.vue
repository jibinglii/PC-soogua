<template>
  <div>
    <v-header />
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>分销管理</el-breadcrumb-item>
        <el-breadcrumb-item>分销任务</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>
        <div slot="main">
          <v-tabs :tabs="tabs" activeTab="order" @changeTab="changeTab" />
          <el-form :inline="true" :model="searchForm" class="form-inline">
            <el-form-item>
              <el-input v-model="searchForm.order" placeholder="请输入商品标题或订单编号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch">搜索</el-button>
            </el-form-item>
          </el-form>
          <div class="orderlist">
            <el-table :data="orderData" style="width: 100%; text-align:center;">
              <el-table-column width="170px" align="center" prop="time" label="发布时间"></el-table-column>
              <el-table-column width="170px" align="center" prop="goodsname" label="商品名称"></el-table-column>
              <el-table-column align="center" prop="price" label="商品价格"></el-table-column>

              <el-table-column
                align="center"
                prop="type"
                label="商品类型"
                :filters="typeFilter"
                :filter-method="filterType"
                filter-placement="bottom-end"
                :filter-multiple="false"
              >
                <template slot-scope="scope">
                  <span>{{scope.row.type}}</span>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="prop" label="佣金比例"></el-table-column>
              <el-table-column align="center" prop="person" label="分销人员"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="onDistribution(scope.row.goodsname)"
                    type="button"
                    size="small"
                  >分销商品</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <pagination :total="50" :pageSize="12" @currentChange="currentChange" />
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
import VTabs from "$components/tabs";
import Pagination from "$components/Pagination";
export default {
  data() {
    return {
      searchForm: { order: "" },
      tabs: [
        { label: "分销任务", name: "task" },
        { label: "分销人员管理", name: "personnel" },
        { label: "分销订单管理", name: "order" }
      ],
      typeFilter: [
        { text: "流量", value: "流量" },
        { text: "账号", value: "账号" },
        { text: "游戏", value: "游戏" },
        { text: "服务", value: "服务" }
      ],
      orderData: [
        {
          id: 162534281732,
          time: "2019-05-26 23:22:126",
          type: "游戏",
          goodsname: "王者荣耀V8满英雄号，很多 限定皮肤",
          price: "￥300.00",
          prop: "10%",
          person: "张三 128374",
          link: "复制链接"
        },
        {
          id: 162534281732,
          time: "2019-05-26 23:22:126",
          type: "游戏",
          goodsname: "王者荣耀V8满英雄号，很多 限定皮肤",
          price: "￥300.00",
          prop: "10%",
          person: "张三 128374",
          link: "复制链接"
        },
        {
          id: 162534281732,
          time: "2019-05-26 23:22:126",
          type: "游戏",
          goodsname: "王者荣耀V8满英雄号，很多 限定皮肤",
          price: "￥300.00",
          prop: "10%",
          person: "张三 128374",
          link: "复制链接"
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
    changeTab(tab, event) {
      this.$router.push({ name: `distribution.${tab.name}` });
    },
    onDistribution() {},
    currentChange() {},
    formatter(row, column) {
      return row.address;
    },
    filterType(value, row) {
      console.log("TCL: filterType -> value", value);
      return row.type === value;
    },
    onSearch() {}
  }
};
</script>
<style lang="scss">
// 关于弹出类窗口无法改动样式
.el-table-filter {
  background: #ededed;
}
.el-table-filter__list-item {
  text-align: center;
  &.is-active {
    background-color: #f3cb3c;
    color: #000;
  }
  &:hover {
    background: #f3cb3c;
    color: #000;
  }
}
</style>
<style lang="scss" scoped>
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
/deep/.el-form--inline {
  .el-form-item {
    margin-right: 20px;
  }
}
/deep/.el-table th > .cell.highlight {
  color: #000;
}
/deep/.el-table {
  thead {
    color: #000;
    background: #ededed;
  }
}

.el-button {
  background: #000;
  border: 1px solid #000;
  color: #fff;
  padding: 11px 20px;
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
</style>