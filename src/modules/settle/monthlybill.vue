<template>
  <div>
    <v-header />
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>提现记录</el-breadcrumb-item>
        <el-breadcrumb-item>月份账单</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>

        <div slot="main">
          <div class="title">月份账单</div>
          <div class="settlelist">
            <el-table :data="personData" style="width: 100%; text-align:center;">
              <el-table-column align="center" prop="date" label="日期"></el-table-column>
              <el-table-column align="center" prop="name" label="商品名称"></el-table-column>
              <el-table-column align="center" prop="price" label="商品价格"></el-table-column>
              <el-table-column align="center" prop="prop" label="操作">
                <router-link class="view-btn" :to="{name:'settle.details'}" tag="a">详情</router-link>
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
import Pagination from "$components/Pagination";
export default {
  data() {
    return {
      personData: [
        {
          date: "2019/05/01—2019/05/31",
          name: "王者荣耀V8满英雄号 很多限定皮肤 拷贝",
          price: "¥422"
        },
        {
          date: "2019/05/01—2019/05/31",
          name: "王者荣耀V8满英雄号 很多限定皮肤 拷贝",
          price: "¥422"
        },
        {
          date: "2019/05/01—2019/05/31",
          name: "王者荣耀V8满英雄号 很多限定皮肤 拷贝",
          price: "¥422"
        },
        {
          date: "2019/05/01—2019/05/31",
          name: "王者荣耀V8满英雄号 很多限定皮肤 拷贝",
          price: "¥422"
        }
      ]
    };
  },
  components: {
    VHeader,
    VFooter,
    VContent,
    VAside,
    Pagination
  },
  methods: {
    changeTab(tab, event) {
      this.$router.push({ name: `settle.${tab.name}` });
    },
    currentChange() {}
  }
};
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-weight: bold;
  padding-left: 16px;
  line-height: 50px;
  background: #fff;
}
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

.el-button {
  width: 120px;
  background: #f4c93a;
  border: 1px solid #f4c93a;
  color: #000;
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