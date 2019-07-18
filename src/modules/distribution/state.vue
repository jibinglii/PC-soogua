<template>
  <div>
    <v-header />
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>分销人员管理</el-breadcrumb-item>
        <el-breadcrumb-item>分销状况</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>
        <div slot="main">
          <v-tabs :tabs="tabs" activeTab="all" @changeTab="changeTab" />
          <div class="personnellist">
            <el-table :data="taskData" style="width: 100%; text-align:center;">
              <el-table-column align="center" prop="completeTime" label="交易完成时间"></el-table-column>
              <el-table-column align="center" prop="name" label="商品名称"></el-table-column>
              <el-table-column align="center" prop="type" label="商品类型"></el-table-column>
              <el-table-column align="center" prop="price" label="商品价格"></el-table-column>
              <el-table-column align="center" prop="settleTime" label="结算时间"></el-table-column>
              <el-table-column align="center" prop="state" label="结算状态"></el-table-column>
            </el-table>
          </div>
          <pagination :total="50" :pageSize="12" @currentChange="currentChange" />
        </div>
      </v-content>
    </div>
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
      tabs: [
        { label: "全部", name: "all" },
        { label: "已启用", name: "enable" },
        { label: "未启用", name: "disable" }
      ],

      taskData: [
        {
          completeTime: "2019-05-27 23:23:42",
          name: "王者荣耀V8满英雄号，很多 限定皮肤",
          type: "游戏",
          price: "￥100.00",
          settleTime: "2019-05-28 23:23:42",
          state: "已结算"
        },
        {
          completeTime: "2019-05-27 23:23:42",
          name: "王者荣耀V8满英雄号，很多 限定皮肤",
          type: "游戏",
          price: "￥100.00",
          settleTime: "2019-05-28 23:23:42",
          state: "已结算"
        },
        {
          completeTime: "2019-05-27 23:23:42",
          name: "王者荣耀V8满英雄号，很多 限定皮肤",
          type: "游戏",
          price: "￥100.00",
          settleTime: "2019-05-28 23:23:42",
          state: "已结算"
        },
        {
          completeTime: "2019-05-27 23:23:42",
          name: "王者荣耀V8满英雄号，很多 限定皮肤",
          type: "游戏",
          price: "￥100.00",
          settleTime: "2019-05-28 23:23:42",
          state: "已结算"
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
      console.log(`TCL: handleClick -> data`, tab.name,event);
    },
    onCopyLink() {},
    currentChange() {}
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-table {
  th {
    background: #ededed;
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