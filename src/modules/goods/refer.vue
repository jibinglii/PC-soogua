<template>
  <div class="home">
    <v-header></v-header>

    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="goods-info">
        <div class="title">商品信息</div>
        <div class="content">
          <img src="~$assets/images/shangpinlogo@2x.png" alt />
          <div class="text">
            <h4>+12钻石装备强化券，无货赔付</h4>
            <p>
              游戏区服：
              <span>王者荣耀（安卓）>QQ（安卓）>全区全服</span>
            </p>
            <p>
              商品价格：
              <s>￥118.00</s>
            </p>
            <p>
              发布数量：
              <i>1件</i>
            </p>
          </div>
        </div>
      </div>
      <div class="user-info">
        <div class="title">
          <span>收货人信息</span>
          <i>请您认真核对填写的联系方式，以便客服及时能够联系到您</i>
        </div>
        <div class="content">
          <el-form ref="form" :model="form" label-position="left" label-width="110px">
            <el-form-item label="收货人手机号">
              <el-input v-model="form.phone"></el-input>
            </el-form-item>
            <el-form-item label="联系QQ">
              <el-input v-model="form.qq"></el-input>
              <span class="tips">客服将以此QQ号确定买家身份</span>
            </el-form-item>
          </el-form>
        </div>
      </div>
      <div class="refer-info">
        <div class="title">确认提交订单</div>
        <div class="content">
          <van-cell-group>
            <van-cell title="购买数" value="1件" />
            <van-cell title="商品价格" value="￥118.00" />
          </van-cell-group>
          <el-checkbox class="cehckbox" v-model="checked">
            点击提交订单表示已阅读并同意
            <a href>《搜瓜用户服务协议及规则》</a>
            <a href>《担保服务购买须知》</a>
            <a href>《交易安全险》</a>
          </el-checkbox>
          <div class="confirm">
            <i>实际付款</i>
            <span>118.00</span>
            <el-button>提交订单</el-button>
          </div>
        </div>
      </div>
    </div>

    <v-footer />
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";
import Pagination from "$components/Pagination";
import Cell from "vant/lib/cell";
import CellGroup from "vant/lib/cell-group";
import "vant/lib/cell/style";
import "vant/lib/cell-group/style";
export default {
  data() {
    return {
      currentPage: 1,
      checked: false,
      form: { phone: "", qq: "" }
    };
  },
  methods: {
    currentChange() {}
  },
  components: {
    VHeader,
    VFooter,
    Pagination,
    [Cell.name]: Cell,
    [CellGroup.name]: CellGroup
  }
};
</script>

<style lang="scss" scoped>
.goods-info {
  background: #fff;
  margin-bottom: 16px;
  .title {
    font-size: 14px;
    font-weight: bold;
    padding-left: 16px;
    line-height: 50px;
    border-bottom: 1px solid #ededed;
  }
  .content {
    display: flex;
    padding: 36px 43px;

    img {
      width: 260px;
      height: 150px;
      margin-right: 40px;
    }
    .text {
      h4 {
        font-size: 16px;
        font-weight: bold;
        color: #000;
      }
      p {
        margin-top: 16px;
        font-size: 12px;
        font-weight: 400;
        color: #999;
        span {
          color: #000;
        }
        i {
          color: #000;
        }
        s {
          text-decoration: none;
          font-size: 16px;
          color: #ff2e2e;
        }
      }
    }
  }
}
.user-info {
  background: #fff;
  margin-bottom: 16px;
  .title {
    padding-left: 16px;
    line-height: 50px;
    border-bottom: 1px solid #ededed;
    span {
      color: #000;
      font-size: 14px;
      font-weight: bold;
      margin-right: 15px;
    }
    i {
      font-size: 12px;
      font-weight: 300;
      color: #999;
    }
  }
  .content {
    padding: 25px 43px 10px 43px;
  }
}
.refer-info {
  background: #fff;
  margin-bottom: 60px;
  .title {
    font-size: 14px;
    font-weight: bold;
    padding-left: 16px;
    line-height: 50px;
    border-bottom: 1px solid #ededed;
  }
  .content {
    padding-left: 43px;
    padding-right: 43px;
    overflow: hidden;
    .confirm {
      padding-bottom: 80px;
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      i {
        font-size: 14px;
        font-weight: 300;
        color: #666;
        margin-right: 5px;
      }
      span {
        font-size: 30px;
        font-weight: bold;
        color: #000;
        margin-right: 28px;
      }
    }
  }
}
.el-button {
  background: #f4c93a;
  border: 1px solid #f4c93a;
  color: #000;
  width: 130px;
  font-size: 12px;
}
.cehckbox {
  margin-top: 50px;
  margin-bottom: 90px;
  display: flex;
  align-items: center;
  justify-content: center;
  a {
    color: #000;
  }
}
.el-form-item {
  position: relative;
  width: 400px;
  margin-bottom: 15px;
}
.tips {
  position: absolute;
  top: 0;
  right: -210px;
  font-size: 12px;
  color: #999;
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