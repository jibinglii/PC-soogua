<template>
  <div class="order">
    <v-header></v-header>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>
        <div slot="main">
          <div class="details">
            <div class="title">订单详情</div>
            <div class="content">
              <div class="subtitle">
                <span>买家信息</span>
              </div>
              <div class="buyer-info">
                <div class="info-item">
                  <span>昵称：</span>
                  <i>搜瓜</i>
                  <span>真实姓名：</span>
                  <i>赵**</i>
                  <span>联系电话：</span>
                  <i>134****9876</i>
                </div>
                <a href="javascript:">
                  <img src="~$assets/images/kefu@2x.png" alt />
                  <b>联系买家</b>
                </a>
              </div>

              <div class="subtitle">
                <span>订单信息</span>
                <i>订单编号：15261738274363</i>
              </div>
              <div class="order-info">
                <div class="left">
                  <div class="order-time">
                    <span>创建订单时间</span>
                    <i>2019-04-19</i>
                  </div>
                  <div class="order-time">
                    <span>付款时间</span>
                    <i>2019-04-19 16:44:11</i>
                  </div>
                  <div class="order-time">
                    <span>发货时间</span>
                    <i>2019-04-19 16:44:11</i>
                  </div>
                  <div class="account">
                    <span>发货信息</span>
                    <div class="account-item">
                      <p>账号：13892019283</p>
                      <p>密码：123456</p>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <img src="~$assets/images/2@2x.png" alt />
                  <span>完成交易</span>
                </div>
              </div>
            </div>
          </div>

          <div class="goodslist">
            <el-table :data="orderData" style="width: 100%; text-align:center;">
              <el-table-column align="center" prop="id" label="商品单号"></el-table-column>
              <el-table-column align="center" width="255" label="商品名称">
                <template slot-scope="scope">
                  <div class="goodsname">
                    <img src="~$assets/images/shangpinlogo@2x.png" alt />
                    <span>{{scope.row.name}}</span>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="price" label="商品价格"></el-table-column>
              <el-table-column align="center" prop="num" label="购买数量"></el-table-column>
              <el-table-column align="center" prop="total" label="总支付"></el-table-column>
              <el-table-column align="center" prop="state" label="订单状态"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="onDetails(scope.$index)"
                    type="button"
                    size="small"
                  >查看详情</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
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
export default {
  data() {
    return {
      orderData: [
        {
          id: 162534281732,
          name: "+12钻石装备强化券，无货赔付",
          price: "￥300.00",
          num: "2",
          total: "￥600.00",
          state: "已支付"
        },
        {
          id: 162534281732,
          name: "+12钻石装备强化券，无货赔付",
          price: "￥300.00",
          num: "2",
          total: "￥600.00",
          state: "已支付"
        },
        {
          id: 162534281732,
          name: "+12钻石装备强化券，无货赔付",
          price: "￥300.00",
          num: "2",
          total: "￥600.00",
          state: "已支付"
        }
      ]
    };
  },
  components: {
    VHeader,
    VFooter,
    VContent,
    VAside
  },
  methods: {
    onDetails() {}
  }
};
</script>

<style lang="scss" scoped>
.order {
  position: relative;
}
.details {
  background: #fff;
  .title {
    font-size: 14px;
    font-weight: bold;
    padding-left: 16px;
    line-height: 50px;
    background-color: #fff;
    border-bottom: 1px solid #ededed;
  }
  .content {
    padding: 20px 16px;
    .subtitle {
      padding-left: 20px;
      background: #f5f5f5;
      overflow: hidden;
      span {
        float: left;
        font-size: 14px;
        font-weight: bold;
        line-height: 40px;
        &::before {
          content: "";
          width: 0px;
          height: 16px;
          border: 1.5px solid #000;
          margin-right: 10px;
        }
      }
      i {
        float: right;
        font-size: 14px;
        font-weight: 400;
        line-height: 40px;
        margin-right: 60px;
      }
    }
    .buyer-info {
      border: 1px solid #f5f5f5;
      padding: 20px 34px;
      .info-item {
        margin-bottom: 20px;
        span {
          font-size: 14px;
          font-weight: 400;
          color: #999;
          margin-right: 5px;
        }
        i {
          font-size: 14px;
          font-weight: 400;
          margin-right: 50px;
        }
      }
      img {
        width: 15px;
        height: auto;
        vertical-align: middle;
        margin-right: 10px;
      }
      b {
        font-size: 14px;
        font-weight: 400;
        color: #000;
      }
    }
    .order-info {
      display: flex;
      padding: 6px 30px 20px 30px;
      .left {
        flex: 1;
        font-size: 14px;
        font-weight: 400;
        .order-time {
          margin-top: 14px;
          span {
            display: inline-block;
            width: 90px;
            text-align: right;
            margin-right: 34px;
            color: #666;
          }
          i {
            color: #666;
          }
        }
        .account {
          margin-top: 14px;
          display: flex;
          span {
            display: inline-block;
            width: 90px;
            text-align: right;
            margin-right: 34px;
            color: #666;
          }
          &-item {
            width: 300px;
            background-color: #f5f5f5;
            padding: 14px 19px;
            p {
              &:first-child {
                margin-bottom: 14px;
              }
              color: #666;
            }
          }
        }
      }
      .right {
        flex: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        img {
          width: 40px;
          height: 40px;
          margin-right: 12px;
          vertical-align: middle;
        }
        span {
          font-size: 14px;
          font-weight: 400;
        }
      }
    }
  }
}
.goodslist {
  margin-top: 16px;
  margin-bottom: 30px;
  .goodsname {
    display: flex;
    img {
      width: 88px;
      height: 88px;
      margin-right: 10px;
    }
    span {
      padding-top: 10px;
      text-align: left;
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

.el-button {
  background: #000;
  border: 1px solid #000;
  color: #fff;
  padding: 11px 20px;
  font-size: 12px;
}
</style>