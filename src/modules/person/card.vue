<template>
  <div class="person">
    <v-header></v-header>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
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
                    <img src="~$assets/images/gs.png" alt />
                    <span>{{item.name}}</span>
                  </div>
                  <div class="right">
                    <i>尾号{{item.weihao}}</i>
                    <span>储蓄卡</span>
                  </div>
                </div>
                <div class="bottom">
                  <h4 v-text="item.default?'默认收款银行卡' : ''"></h4>
                  <p>
                    <i>持卡人姓名：{{item.user}}</i>
                    <a v-if="isActive ==index">设置</a>
                  </p>
                  <p>
                    <i>手机号： {{item.mobile}}}</i>
                    <a class v-if="isActive ==index" @click="deleteCard">删除</a>
                  </p>
                </div>
              </div>
              <router-link class="addcard" :to="{name:'person.addcard'}" tag="a">
                <img class="addimg" :src="addCard.img" alt />
                <span class="addlabel">{{addCard.label}}</span>
              </router-link>
            </div>
          </div>
        </div>
      </v-content>
    </div>
    <v-footer></v-footer>
    <delete-card :show.sync="showDelete" />
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";
import VContent from "$components/VContent";
import VAside from "$components/VAside";
import DeleteCard from "./deletecard";
export default {
  data() {
    return {
      isActive: -1,
      showDelete: false,
      addCard: {
        img: require("../../assets/images/tianjia.png"),
        label: "添加银行卡"
      },
      cardList: [
        {
          img: require("../../assets/images/tianjia.png"),
          name: "光大银行",
          weihao: "3245",
          default: true,
          user: "jj***l",
          mobile: "139*****12354"
        },
        {
          img: require("../../assets/images/tianjia.png"),
          name: "光大银行",
          weihao: "3245",
          default: false,
          user: "jj***l",
          mobile: "139*****12354"
        }
      ]
    };
  },
  components: {
    VHeader,
    VFooter,
    VContent,
    VAside,
    DeleteCard
  },
  methods: {
    submitForm() {},
    checkCard(index) {
      this.isActive = index;
    },
    mouseOver(index){
      this.isActive = index;
    },
    mouseLeave(index){
      this.isActive = -1;
    },
    deleteCard() {
      this.showDelete = true;
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
      width: 294px;
      height: 140px;
      border: 1px solid #c1c1c1;
      display: flex;
      align-items: center;
      justify-content: center;
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
    img {
      width: 30px;
      height: auto;
      vertical-align: middle;
    }
  }
  .right {
    font-size: 14px;
    font-weight: 400;
    color: #000;
    line-height: 50px;
    span {
      background: #f4c93a;
      padding: 9px;
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