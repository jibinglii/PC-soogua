<template>
  <div>
    <v-header />
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>游戏专区</el-breadcrumb-item>
      </el-breadcrumb>
      <steps />
      <div class="nav">
        <span>当前选择游戏</span>
        <i>地下城与勇士</i>
        <el-button>修改</el-button>
      </div>
      <div class="goods-type">
        <el-row :gutter="34">
          <el-col :span="4">
            <el-autocomplete
              class="inline-input"
              v-model="state1"
              :fetch-suggestions="oneTypeSearch"
              placeholder="中文或拼音首字母"
              @select="handleSelect"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-autocomplete>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="4">
            <el-autocomplete
              class="inline-input"
              v-model="state2"
              :fetch-suggestions="twoTypeSearch"
              placeholder="中文或拼音首字母"
              @select="handleSelect"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-autocomplete>
          </el-col>
          <el-col :span="1"></el-col>
          <el-col :span="4">
            <el-autocomplete
              class="inline-input"
              v-model="state3"
              :fetch-suggestions="threeTypeSearch"
              placeholder="中文或拼音首字母"
              @select="handleSelect"
            >
              <i slot="prefix" class="el-input__icon el-icon-search"></i>
            </el-autocomplete>
          </el-col>
        </el-row>
      </div>
      <div class="bottom-nav">
        <span>您当亲选择的类目：</span>
        <i>游戏>地下城与勇士>游戏币>寄售>广东区>广东2区</i>
      </div>

      <div class="nextstep">
        <el-button @click.native.prevent="onNext" type="button" size="medium">下一步， 请选择商品类型</el-button>
      </div>
    </div>
    <v-footer />
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";
import Steps from "./components/steps";
export default {
  data() {
    return {
      oneType: [],
      twoType: [],
      threeType: [],
      fourType: [],
      state1: "",
      state2: "",
      state3: "",
      state4: ""
    };
  },
  methods: {
    querySearch(index, queryString, cb) {
      var data = this.loadAll()[index];
      var results = queryString
        ? data.filter(this.createFilter(queryString))
        : data;
      // 调用 callback 返回建议列表的数据
      cb(results);
    },
    createFilter(queryString) {
      return type => {
        return (
          type.value.toLowerCase().indexOf(queryString.toLowerCase()) === 0
        );
      };
    },
    oneTypeSearch(queryString, cb) {
      this.querySearch(0, queryString, cb);
    },
    twoTypeSearch(queryString, cb) {
      this.querySearch(1, queryString, cb);
    },
    threeTypeSearch(queryString, cb) {
      this.querySearch(2, queryString, cb);
    },
    loadAll() {
      return [
        [
          { value: "星空深渊原石" },
          {
            value: "游戏币"
          },
          {
            value: "游戏账号"
          }
        ],
        [
          { value: "星空深渊原石" },
          {
            value: "游戏币"
          },
          {
            value: "游戏账号"
          }
        ],
        [
          { value: "星空深渊原石" },
          {
            value: "游戏币"
          },
          {
            value: "游戏账号"
          }
        ]
      ];
    },
    handleSelect(item) {
      console.log(item);
    },
    onNext() {
      this.$router.push({name:"shop.fill"})
    }
  },
  mounted() {
    this.oneType = this.loadAll()[0];
    this.twoType = this.loadAll()[1];
    this.threeType = this.loadAll()[2];
  },
  components: {
    VHeader,
    VFooter,
    Steps
  }
};
</script>

<style lang="scss" scoped>
.nav {
  line-height: 50px;
  span {
    font-size: 14px;
    font-weight: 400;
    color: #666;
    margin-right: 19px;
  }
  i {
    font-size: 14px;
    font-weight: bold;
    color: #000;
    margin-right: 19px;
  }
  .el-button {
    width: 70px;
    background: #fff;
    border: 1px dashed #999;
    color: #000;
    padding: 10px 20px;
    font-size: 12px;
  }
}
.goods-type {
  min-height: 400px;
  padding: 42px 44px;
  background: #fff;
}

.bottom-nav {
  background: #fff;
  border-top: 1px solid #ededed;
  line-height: 50px;
  font-size: 14px;
  font-weight: 400;
  color: #666;
  padding-left: 20px;
}
.nextstep {
  margin-top: 60px;
  margin-bottom: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  .el-button {
    width: 300px;
    background: #000;
    border: 1px solid #000;
    color: #fff;
    padding: 12px 20px;
    font-size: 16px;
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