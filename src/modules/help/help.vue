<template>
  <div class="person">
    <v-header></v-header>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'person.person'}">个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>使用帮助</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>
        <div slot="main">
          <v-tabs :tabs="tabs" activeTab="help" @changeTab="changeTab"/>
          <el-card class="box-card">
            <a v-for="(item,key) in faqs" :key="key" @click="onDetails(item.id, key)" class="item">
              <i class="circle"></i>
              <span>{{item.title}}</span>
            </a>
          </el-card>
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
import article from "$api/article";
export default {
  data() {
    return {
      curTab: "help",
      faqs: [],
      tabs: [
        { label: "常见问题", name: "help" },
        { label: "问题分类", name: "sort" }
      ],
      loading: true
    };
  },
  components: {
    VHeader,
    VFooter,
    VContent,
    VAside,
    VTabs
  },
  created() {
    this.getHot();
  },
  methods: {
    getHot() {
      article.hot().then(({ data }) => {
        this.loading = false;
        this.faqs = data.contents;
      });
    },
    changeTab(tab) {
      this.curTab = tab.name;
      this.$router.push({ name: `help.${tab.name}` });
    },
    onDetails(id, index) {
      this.$router.push({
        name: "help.details",
        params: { id: this.faqs[index].id }
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.box-card {
  padding-left: 20px;
  padding-right: 20px;
  min-height: 678px;
  margin-bottom: 40px;
  /deep/.el-card__body {
    padding: 0;
  }
  .item {
    display: flex;
    align-items: center;
    border-bottom: 1px solid #ededed;
    height: 60px;
    line-height: 60px;
    cursor: pointer;
    span {
      color: #666;
      &.active {
        color: #000;
      }
    }
    .circle {
      width: 12px;
      height: 12px;
      border: 2px solid #000;
      border-radius: 50%;
      margin-right: 12px;
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
</style>
