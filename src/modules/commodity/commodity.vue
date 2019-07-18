<template>
  <div>
    <v-header />
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>我是卖家</el-breadcrumb-item>
        <el-breadcrumb-item>商品管理</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>
        <div slot="main">
          <v-tabs :tabs="tabs" activeTab="all" @changeTab="changeTab" />
          <el-form :inline="true" :model="searchForm" class="form-inline">
            <el-form-item label="关键字">
              <el-input v-model="searchForm.commodity" placeholder="请输入商品名称货订单编号"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="onSearch">搜索</el-button>
            </el-form-item>
          </el-form>
          <div class="commoditylist">
            <el-table :data="commodityData" style="width: 100%; text-align:center;">
              <el-table-column align="center" width="300px" prop="name" label="商品名称">
                <template slot-scope="scope">
                  <div class="commodityname">
                    <img src="~$assets/images/shangpinlogo@2x.png" alt />
                    <div class="text">
                      <span>{{scope.row.name}}</span>
                      <i>{{scope.row.desc}}</i>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="price" label="单价"></el-table-column>
              <el-table-column align="center" prop="num" label="数量"></el-table-column>
              <el-table-column align="center" prop="state" label="商品状态"></el-table-column>
              <el-table-column align="center" label="操作" width="200px">
                <template slot-scope="scope">
                  <el-button
                    style="background:#fff;color:#000"
                    @click.native.prevent="handleOff(scope.$index)"
                    type="button"
                    size="small"
                  >下架商品</el-button>
                  <el-button
                    @click.native.prevent="handleDistribution(scope.$index)"
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
      searchForm: { commodity: "" },
      tabs: [
        { label: "本月订单", name: "all" },
        { label: "正出售", name: "selling" },
        { label: "已下架", name: "off" },
        { label: "审核中", name: "review" },
        { label: "未通过", name: "nopass" }
      ],
      commodityData: [
        {
          id: 162534281732,
          name: "王者荣耀V8满英雄号，很多 限定皮肤",
          desc: "游戏区服：苹果QQ>老兵不死",
          img: require("../../assets/images/shangpinlogo@2x.png"),
          state: "正出售",
          price: "￥300.00",
          num: "2"
        },
        {
          id: 162534281732,
          name: "王者荣耀V8满英雄号，很多 限定皮肤",
          desc: "游戏区服：苹果QQ>老兵不死",
          img: require("../../assets/images/shangpinlogo@2x.png"),
          state: "正出售",
          price: "￥300.00",
          num: "2"
        },
        {
          id: 162534281732,
          name: "王者荣耀V8满英雄号，很多 限定皮肤",
          desc: "游戏区服：苹果QQ>老兵不死",
          img: require("../../assets/images/shangpinlogo@2x.png"),
          state: "正出售",
          price: "￥300.00",
          num: "2"
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
      console.log("TCL: handleClick -> data", tab.name);
    },
    onCopyLink() {},
    currentChange() {},
    onSearch() {},
    handleOff() {
      this.$confirm("是否要下架该商品", "系统提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        center: true,
        showClose: false
      })
        .then(() => {})
        .catch(() => {});
    },
    handleDistribution() {}
  }
};
</script>

<style lang="scss" scoped>
.commodityname {
  display: flex;
  img {
    width: 88px;
    height: 88px;
    margin-right: 10px;
  }
  .text {
    display: flex;
    flex-direction: column;
    text-align: left;
    span {
      flex: 1;
      font-size: 14px;
      font-weight: 400;
      color: #000;
    }
    i {
      font-size: 12px;
      font-weight: 400;
      color: #666;
    }
  }
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
/deep/.el-form--inline {
  .el-form-item {
    margin-right: 0;
  }
}
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
</style>