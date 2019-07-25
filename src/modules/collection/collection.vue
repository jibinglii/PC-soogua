<template>
  <div>
    <v-header/>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
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
              v-for="(item, index) in goods"
              :key="index"
              :showDel="true"
              :goods="item"
              @delItem="delItem(item.uuid, index)"
              :styles="{width:'284px', float:'left', marginLeft:'25px',marginBottom:'20px',background:'#F2F2F2'}"
            />
          </div>
          <pagination :total="total" :current-page="page" @pagechange="getCollection"></pagination>
        </div>
      </v-content>
    </div>
    <v-footer/>
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";
import VContent from "$components/VContent";
import VAside from "$components/VAside";
import Pagination from "$components/Pagination";
import GoodsItem from "$components/GoodsItem";

import * as service from "$modules/collection/services";
export default {
  data() {
    return {
      goods: [],
      infiniteId: +new Date(),
      total: 0, // 记录总条数
      page: 1 // 当前的页数
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
  mounted() {
    this.getCollection(this.page);
  },
  methods: {
    async getCollection(currentPage) {
      let param = {
        params: {
          page: currentPage
        }
      };
      service
        .getCollectionGoods(param)
        .then(({ data }) => {
          this.goods = [];
          this.goods = data.data.data;
          this.page = currentPage;
          this.total = data.data.data.total;
        })
        .catch(({ response }) => {
          console.log("“cancel”");
        });
    },

    delItem(uuid, index) {
      let that = this;
      this.$confirm("是否要删除该商品", "系统提示", {
        center: true,
        showClose: false
      })
        .then(function() {
          const loading = that.$loading({
            lock: true,
            text: "请稍等"
          });
          that.$http
            .delete("/api/v1/collect/goods/" + uuid, { loading: true })
            .then(({ data }) => {
              loading.close();
              that.$delete(that.goods, index);
              that.$message.success("删除成功");
            })
            .catch(fail => {
              loading.close();
            });
        })
        .catch(() => {
          console.log("“cancel”");
        });
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
