<template>
  <div class="person">
    <v-header></v-header>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'person.person'}">个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>银行卡管理</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>
        <div slot="main">
          <div class="card">
            <div class="title">银行卡管理</div>
            <div class="card-list">
              <div
                class="item"
                v-for="(item, index) in cardList"
                :key="index"
                :class="{active:index==isActive}"
                @mouseover="mouseOver(index)"
                @mouseleave="mouseLeave(index)"
              >
                <div class="top">
                  <div class="left">
                    <i class="iconfont" :class="'icon-' + item.bank" :style="{'color':item.bank_info.color}"></i>
                    <span>{{item.bank_info.bankName}}</span>
                  </div>
                  <div class="right">
                    <i>尾号{{item.bankno_last4}}</i>
                    <span>{{item.bank_info.cardTypeName}}</span>
                  </div>
                </div>
                <div class="bottom">
                  <h4 v-show="item.is_default">默认收款银行卡</h4>
                  <p>
                    <i>持卡人姓名：{{item.realname}}</i>
                    <a v-if="isActive ==index" @click="bind(item.id, index)">设置</a>
                  </p>
                  <p>
                    <i>手机号： {{item.mobile}}</i>
                    <a class v-if="isActive ==index" @click="deleteCard(item.id, index)">删除</a>
                  </p>
                </div>
              </div>
              <router-link class="addcard" :to="{name:'person.addcard'}" tag="a">
                <img class="addimg" :src="addCard.img" alt>
                <span class="addlabel">{{addCard.label}}</span>
              </router-link>
            </div>
          </div>
        </div>
      </v-content>
    </div>
    <v-footer></v-footer>
    <!-- <delete-card :show.sync="showDelete"/> -->
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";
import VContent from "$components/VContent";
import VAside from "$components/VAside";
// import DeleteCard from "./deletecard";
export default {
  data() {
    return {
      isActive: -1,
      // showDelete: false,
      addCard: {
        img: require("../../assets/images/tianjia.png"),
        label: "添加银行卡"
      },
      cardList: []
    };
  },
  components: {
    VHeader,
    VFooter,
    VContent,
    VAside
    // DeleteCard
  },
  mounted() {
    this.getBankCards();
  },
  methods: {
    checkCard(index) {
      this.isActive = index;
    },
    mouseOver(index) {
      this.isActive = index;
    },
    mouseLeave(index) {
      this.isActive = -1;
    },
    getBankCards() {
      const loading = this.$loading({
        lock: true,
        text: "请稍等"
      });
      this.$http.get("/api/v1/bankcard", { loading: true }).then(({ data }) => {
        console.log(data)
        loading.close();
        this.cardList = data.bank_cards;
      });
    },
    bind(id, index) {
      let message = "您确定将此卡设置成默认吗？";
      let that = this;
      this.$confirm(message, "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(function() {
          const loading = that.$loading({
            lock: true,
            text: "请稍等"
          });
          that.$http
            .put("/api/v1/bankcard/set-default/" + id)
            .then(({ data }) => {
              loading.close();
              that.cardList.is_default = 1;
              that.$message.success('设为默认银行卡成功');
              that.getBankCards()
            })
            .catch(fail => {
              loading.close();
            });
        })
        .catch(() => {
          console.log("“cancel”");
        });
    },
    deleteCard(id, index) {
      let message = "您确定要删除此银行卡吗？";
      let that = this;
      this.$confirm(message, "提示", {
        confirmButtonText: "确认",
        cancelButtonText: "取消"
      })
        .then(function() {
          const loading = that.$loading({
            lock: true,
            text: "请稍等"
          });
          that.$http
            .delete("/api/v1/bankcard/" + id, { loading: true })
            .then(({ data }) => {
              loading.close();
              that.$delete(that.cardList, index);
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
.card {
  min-height: 728px;
  background: #fff;
  margin-bottom: 100px;
  .title {
    font-size: 14px;
    font-weight: 400;
    padding-left: 16px;
    line-height: 60px;
    border-bottom: 1px solid #ededed;
  }
  .card-list {
    display: flex;
    flex-wrap: wrap;
    padding-top: 30px;
    padding-left: 30px;
    .addcard {
      margin-right: 18px;
      width: 294px;
      height: 140px;
      border: 1px solid #c1c1c1;
      display: flex;
      align-items: center;
      justify-content: center;
      flex-direction: column;
      cursor: pointer;
      .addimg {
        width: 58px;
        height: auto;
      }
      .addlabel {
        margin-top: 12px;
        font-size: 16px;
        font-weight: 400;
        color: #333;
      }
    }
    .item {
      margin-right: 18px;
      margin-bottom: 20px;
      width: 294px;
      height: 140px;
      border: 1px solid #c1c1c1;
      display: flex;
      align-items: center;
      justify-content: space-between;
      flex-direction: column;
      cursor: pointer;
      &.active {
        border: 1px solid #000;
      }
    }
  }
}
.top {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background: #f2f2f2;
  width: 100%;
  height: 50px;
  padding-left: 10px;
  padding-right: 10px;
  .left {
    font-size: 16px;
    font-weight: 400;
    color: #000;
    line-height: 50px;
    i.iconfont {
      float: left;
      font-size: 27px;
    }
    span {
      float: left;
    }
  }
  .right {
    font-size: 14px;
    font-weight: 400;
    color: #000;
    line-height: 50px;
    span {
      background: #f4c93a;
      padding: 4px 6px;
      font-size: 12px;
      margin-left: 5px;
    }
  }
}
.bottom {
  width: 100%;
  padding: 10px 20px;
  h4 {
    flex: 1;
    text-align: right;
    height: 16px;
    line-height: 16px;
    font-size: 12px;
    font-weight: 400;
    color: #000;
  }
  p {
    margin-top: 10px;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-size: 12px;
    font-weight: 400;
    color: #000;
  }
}
/deep/.el-input__inner {
  border: 1px solid #a0a0a0;
  color: #666;
}

.el-button--primary {
  color: #fff;
  background-color: #000;
  border-color: #000;
}

.el-button {
  width: 100%;
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
