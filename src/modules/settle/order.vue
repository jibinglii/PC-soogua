<template>
  <div>
    <v-header />
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>会员管理</el-breadcrumb-item>
        <el-breadcrumb-item>结算管理</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>

        <div slot="main">
          <v-tabs :tabs="mainTabs" activeTab="order" @changeTab="changeTab" />

          <div class="preview-bd">
            <div class="preview">
              <div class="one">
                <div class="left">
                  <i>已结算</i>
                  <span>5283.33</span>
                </div>
                <div class="right">
                  <el-button @click.native.prevent type="button" size="primary">申请结算</el-button>
                </div>
              </div>
              <div class="two">
                <div class="left">
                  <i>已结算</i>
                  <span>5283.33</span>
                </div>
                <span class="center"></span>
                <div class="right">
                  <i>已结算</i>
                  <span>5283.33</span>
                </div>
              </div>
            </div>
          </div>

          <v-tabs :tabs="childTabs" activeTab="all" @changeTab="changeChildTab" />
          <div class="settlelist">
            <el-table :data="personData" style="width: 100%; text-align:center;">
              <el-table-column align="center" prop="completeTime" label="交易完成时间"></el-table-column>
              <el-table-column align="center" prop="name" label="商品名称"></el-table-column>
              <el-table-column align="center" prop="type" label="游戏类型"></el-table-column>
              <el-table-column align="center" prop="price" label="商品价格"></el-table-column>
              <el-table-column align="center" prop="prop" label="佣金比例"></el-table-column>
              <el-table-column align="center" prop="commission" label="佣金"></el-table-column>
              <el-table-column align="center" prop="settleTime" label="结算时间"></el-table-column>
              <el-table-column align="center" prop="state" label="结算状态"></el-table-column>
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
      mainTabs: [
        { label: "本月订单", name: "order" },
        { label: "提现记录", name: "record" }
      ],
      childTabs: [
        { label: "全部", name: "all" },
        { label: "已结算", name: "enable" },
        { label: "未结算", name: "disable" }
      ],

      personData: [
        {
          id: 928372,
          completeTime: "2019-10-25 12:56:30",
          name: "王者荣耀V8满英雄号 很多限定皮肤",
          type: "游戏",
          price: "$100",
          prop: "10%",
          commission: "4545",
          settleTime: "2019-10-25 12:56:30",
          state: "已结算"
        },
        {
          id: 928372,
          completeTime: "2019-10-25 12:56:30",
          name: "王者荣耀V8满英雄号 很多限定皮肤",
          type: "游戏",
          price: "$100",
          prop: "10%",
          commission: "4545",
          settleTime: "2019-10-25 12:56:30",
          state: "已结算"
        },
        {
          id: 928372,
          completeTime: "2019-10-25 12:56:30",
          name: "王者荣耀V8满英雄号 很多限定皮肤",
          type: "游戏",
          price: "$100",
          prop: "10%",
          commission: "4545",
          settleTime: "2019-10-25 12:56:30",
          state: "已结算"
        },
        {
          id: 928372,
          completeTime: "2019-10-25 12:56:30",
          name: "王者荣耀V8满英雄号 很多限定皮肤",
          type: "游戏",
          price: "$100",
          prop: "10%",
          commission: "4545",
          settleTime: "2019-10-25 12:56:30",
          state: "已结算"
        },
        {
          id: 928372,
          completeTime: "2019-10-25 12:56:30",
          name: "王者荣耀V8满英雄号 很多限定皮肤",
          type: "游戏",
          price: "$100",
          prop: "10%",
          commission: "4545",
          settleTime: "2019-10-25 12:56:30",
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
      this.$router.push({ name: `settle.${tab.name}` });
    },
    changeChildTab(tab, event) {
      console.log(`TCL: handleClick -> datatab.name,event${tab.name} ${event}`);
    },
    onState() {
      this.$router.push({
        name: `distribution.personnel.state`,
        params: { id: "123" }
      });
    },
    onManage(index) {
      console.log("TCL: onManage -> index", index);
      this.curPerson = this.personData[index];
      this.showPopover = true;
    },

    onSubmit() {},
    onCancel(index) {
      this.$refs[`popover-` + index].doClose();
    },
    currentChange() {}
  }
};
</script>

<style lang="scss" scoped>
.preview-bd {
  padding: 16px 52px;
}
.preview {
  width: 100%;
  background: url("/images/settlebg.png") center center no-repeat;
  background-size: cover;
  .one {
    display: flex;
    min-height: 140px;
    border-bottom: 1px solid #666;
    .left {
      flex: 1;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      i {
        font-size: 16px;
        font-weight: 400;
        color: #fff;
      }
      span {
        margin-top: 15px;
        font-size: 36px;
        font-weight: 400;
        color: #fff;
      }
    }
    .right {
      flex: 1;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
}
.two {
  display: flex;
  min-height: 100px;
  .left,
  .right {
    flex: 2;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    i {
      font-size: 12px;
      font-weight: 400;
      color: #999;
    }
    span {
      margin-top: 10px;
      font-size: 30px;
      font-weight: 400;
      color: #999;
    }
  }
  .center {
    flex: 1;
    max-width: 1px;
    background: #666;
    height: 60px;
    margin-top:20px;
  }
}
/deep/.el-table {
  th {
    background: #ededed;
  }
}
/deep/.el-popover {
  background: #fff;
  border: 1px solid #ebeef5;
  padding: 35px;
  font-size: 14px;
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