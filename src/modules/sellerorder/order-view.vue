<template>
  <div class="order">
    <v-header></v-header>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>订单管理</el-breadcrumb-item>
        <el-breadcrumb-item>订单详情</el-breadcrumb-item>
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
                  <img src="~$assets/images/kefu@2x.png" alt>
                  <b>联系买家</b>
                </a>
              </div>

              <div class="subtitle">
                <span>订单信息</span>
                <i>订单编号：{{order.id}}</i>
              </div>
              <div class="order-info">
                <div class="left">
                  <div class="order-time">
                    <span>创建订单时间</span>
                    <i>{{order.created_at}}</i>
                  </div>
                  <div class="order-time">
                    <span>付款时间</span>
                    <i>{{order.payment_time}}</i>
                  </div>
                  <div class="order-time">
                    <span>发货时间</span>
                    <i>{{order.updated_at}}</i>
                  </div>
                  <div class="account">
                    <span>发货信息</span>
                    <div class="account-item">
                      <p>账号：{{order.receiver_mobile}}</p>
                      <p>密码：</p>
                    </div>
                  </div>
                </div>
                <div class="right">
                  <img src="~$assets/images/2@2x.png" alt>
                  <span>{{order.status_label}}</span>
                </div>
              </div>
            </div>
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
      id: "",
      order: ""
    };
  },
  created() {
    this.id = this.$route.params.order;
    this.getDetail();
  },
  methods: {
    async getDetail() {
      const loading = this.$loading({
        lock: true,
        text: "请稍等"
      });
      this.$http
        .get("/api/v1/seller-order/" + this.id)
        .then(({ data }) => {
          this.$toast.clear();
          this.order = data.order;
          loading.close();
        })
        .catch(({ response }) => {
          loading.close();
        });
    }
  },

  components: {
    VHeader,
    VFooter,
    VContent,
    VAside
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
