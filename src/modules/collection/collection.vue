<template>
  <div>
    <v-header />
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>我的收藏</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>
        <div slot="main">
          <div class="collection clearfix">
            <goods-item
              v-for="k in 10"
              :key="k"
              :showDel="true"
              @mouseOver="mouseOver"
              @mouseLeave="mouseLeave"
              @delItem="delItem"
              :styles="{width:'284px', float:'left', marginLeft:'25px',marginBottom:'20px',background:'#F2F2F2'}"
            />
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
import GoodsItem from "$components/GoodsItem";
export default {
  data() {
    return {
      collection: [
        {
          title: "王者荣耀【苹果QQ】外婆缘 48000碎片 12万金 30级 挂绑改密",
          price: "￥300.00",
          stock: "库存1件"
        }
      ]
    };
  },
  components: {
    VHeader,
    VFooter,
    VContent,
    VAside,
    Pagination,
    GoodsItem
  },
  methods: {
    changeTab(tab, event) {
      console.log("TCL: handleClick -> data", tab.name);
      this.$router.push({ name: `distribution.${tab.name}` });
    },
    onCopyLink() {},
    currentChange() {},
    mouseOver(ref) {
      console.log("dfdfdfdf", ref);
    },
    mouseLeave(ref) {
      console.log("dfdfdfdf", ref);
    },
    delItem() {
      this.$confirm("是否要删除该商品", "系统提示", { center: true,showClose:false })
        .then(() => {})
        .catch(() => {});
    }
  }
};
</script>

<style lang="scss" scoped>
.collection {
  background: #fff;
  padding: 30px 20px 30px 15px;
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