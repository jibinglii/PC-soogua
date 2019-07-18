<template>
  <div>
    <v-header />
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>分销管理</el-breadcrumb-item>
        <el-breadcrumb-item>分销任务</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>
        <div slot="main">
          <v-tabs :tabs="tabs" activeTab="task" @changeTab="changeTab" />
          <div class="tasklist">
            <el-table :data="taskData" style="width: 100%; text-align:center;">
              <el-table-column align="center" prop="shopname" label="店铺名称"></el-table-column>
              <el-table-column align="center" prop="type" label="商品类型"></el-table-column>
              <el-table-column align="center" prop="goodsname" label="商品名称"></el-table-column>
              <el-table-column align="center" prop="price" label="商品价格"></el-table-column>
              <el-table-column align="center" prop="num" label="库存数"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="onCopyLink(scope.row.link)"
                    type="button"
                    size="small"
                  >复制链接</el-button>
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
      tabs: [
        { label: "分销任务", name: "task" },
        { label: "分销人员管理", name: "personnel" },
        { label: "分销订单管理", name: "order" }
      ],
      taskData: [
        {
          id: 162534281732,
          shopname: "想要专卖店",
          type: "游戏",
          goodsname: "王者荣耀V8满英雄号，很多 限定皮肤",
          price: "￥300.00",
          num: "2",
          link: "复制链接"
        },
        {
          id: 162534281732,
          shopname: "想要专卖店",
          type: "游戏",
          goodsname: "王者荣耀V8满英雄号，很多 限定皮肤",
          price: "￥300.00",
          num: "2",
          link: "复制链接"
        },
        {
          id: 162534281732,
          shopname: "想要专卖店",
          type: "游戏",
          goodsname: "王者荣耀V8满英雄号，很多 限定皮肤",
          price: "￥300.00",
          num: "2",
          link: "复制链接"
        },
        {
          id: 162534281732,
          shopname: "想要专卖店",
          type: "游戏",
          goodsname: "王者荣耀V8满英雄号，很多 限定皮肤",
          price: "￥300.00",
          num: "2",
          link: "复制链接"
        },
        {
          id: 162534281732,
          shopname: "想要专卖店",
          type: "游戏",
          goodsname: "王者荣耀V8满英雄号，很多 限定皮肤",
          price: "￥300.00",
          num: "2",
          link: "复制链接"
        },
        {
          id: 162534281732,
          shopname: "想要专卖店",
          type: "游戏",
          goodsname: "王者荣耀V8满英雄号，很多 限定皮肤",
          price: "￥300.00",
          num: "2",
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
      console.log("TCL: handleClick -> data", tab.name);
      this.$router.push({ name: `distribution.${tab.name}` });
    },
    onCopyLink() {},
    currentChange() {}
  }
};
</script>

<style lang="scss" scoped>
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