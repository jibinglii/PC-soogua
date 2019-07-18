<template>
  <div>
    <v-header />
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        <el-breadcrumb-item>结算管理</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>

        <div slot="main">
          <v-tabs :tabs="tabs" activeTab="record" @changeTab="changeTab" />
          <div class="settlelist">
            <el-table :data="personData" style="width: 100%; text-align:center;">
              <el-table-column align="center" prop="year" label="2019年"></el-table-column>
              <el-table-column align="center" prop="month" label="月账单"></el-table-column>
              <el-table-column align="center" prop="interval" label="结算时间终点"></el-table-column>
              <el-table-column align="center" prop="total" label="结算总额"></el-table-column>
              <el-table-column align="center" prop="prop" label="操作">
                <router-link class="view-btn" :to="{name:'settle.monthlybill'}" tag="a">查看</router-link>
              </el-table-column>
            </el-table>
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
import VTabs from "$components/tabs";
export default {
  data() {
    return {
      tabs: [
        { label: "本月订单", name: "order" },
        { label: "提现记录", name: "record" }
      ],
      personData: [
        {
          year: 2019,
          month: "6月账单",
          interval: "2019/05/01—2019/05/31",
          total: "¥4223.11"
        },
        {
          year: 2019,
          month: "6月账单",
          interval: "2019/05/01—2019/05/31",
          total: "¥4223.11"
        },
        {
          year: 2019,
          month: "6月账单",
          interval: "2019/05/01—2019/05/31",
          total: "¥4223.11"
        },
        {
          year: 2019,
          month: "6月账单",
          interval: "2019/05/01—2019/05/31",
          total: "¥4223.11"
        },
        {
          year: 2019,
          month: "6月账单",
          interval: "2019/05/01—2019/05/31",
          total: "¥4223.11"
        }
      ]
    };
  },
  components: {
    VHeader,
    VFooter,
    VContent,
    VAside,
    VTabs
  },
  methods: {
    changeTab(tab, event) {
      this.$router.push({ name: `settle.${tab.name}` });
    }
  }
};
</script>

<style lang="scss" scoped>
.settlelist {
  margin-top: 10px;
  min-height: 657px;
  background: #fff;
  .view-btn {
    color: #000;
  }
}

/deep/.el-table {
  th {
    background: #ededed;
  }
  td {
    height: 90px;
  }
}

/deep/.el-form-item__label {
  text-align: left;
  color: #000;
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