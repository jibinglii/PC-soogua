<template>
  <div class="person">
    <v-header></v-header>
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>个人中心</el-breadcrumb-item>
        <el-breadcrumb-item>银行卡管理</el-breadcrumb-item>
        <el-breadcrumb-item>填写银行卡信息</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>
        <div slot="main">
          <div class="addcard">
            <div class="title">银行卡管理</div>
            <div class="content">
              <van-cell-group>
                <van-field clearable center label="卡类型">
                  <el-select slot="input" v-model="cardType" placeholder="选择所属银行">
                    <el-option
                      v-for="item in bankOptions"
                      :key="item.cardType"
                      :label="item.label"
                      :value="item.cardType"
                    ></el-option>
                  </el-select>
                </van-field>

                <van-field v-model="cardNum" label="银行卡号" placeholder="请输入银行卡号" />
                <van-field v-model="phone" label="预留手机号" placeholder="请输入银行卡预留电话" />
                <van-field
                  v-model="sms"
                  center
                  clearable
                  label="短信验证码"
                  placeholder="请输入短信验证码"
                  style="position:relative"
                >
                  <a class="sendsms" @click.prevent slot="button" size="small" type="primary">发送验证码</a>
                </van-field>
              </van-cell-group>
              <van-checkbox v-model="checked">
                同意
                <span>《用户协议》</span>
              </van-checkbox>
              <el-button @click.native.prevent type="button" size="primary">确认</el-button>
              <div v-if="smsTips" class="smstip">验证码已发送至手机，请注意查收</div>
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
import CellGroup from "vant/lib/cell-group";
import "vant/lib/cell-group/style";
import DropdownMenu from "vant/lib/dropdown-menu";
import "vant/lib/dropdown-menu/style";
import DropdownItem from "vant/lib/dropdown-item";
import "vant/lib/dropdown-item/style";
import Field from "vant/lib/field";
import "vant/lib/field/style";
import Checkbox from "vant/lib/checkbox";
import "vant/lib/checkbox/style";
export default {
  data() {
    return {
      smsTips: true,
      checked: false,
      cardType: "",
      bankOptions: [
        { label: "中国银行", cardType: 0 },
        { label: "浦发银行", cardType: 1 },
        { label: "光大银行", cardType: 2 }
      ],
      cardNum: "",
      phone: "",
      sms: ""
    };
  },
  components: {
    VHeader,
    VFooter,
    VContent,
    VAside,
    [DropdownMenu.name]: DropdownMenu,
    [DropdownItem.name]: DropdownItem,
    [CellGroup.name]: CellGroup,
    [Field.name]: Field,
    [Checkbox.name]: Checkbox
  },
  methods: {
    submitForm() {}
  }
};
</script>

<style lang="scss" scoped>
/deep/.van-field__label {
  width: 105px;
  padding-left: 20px;
}
.van-cell {
  border: 1px solid #a0a0a0;
  margin-top: 30px;
  width: 340px;
}
.van-checkbox {
  margin-top: 11px;
  font-size: 14px;
  color: #000;
  font-weight: 400;
  span {
    color: #f4c93a;
  }
}
.addcard {
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
  .content {
    position: relative;
    padding-top: 10px;
    padding-left: 30px;
  }
}
.sendsms {
  color: #f4c93a;
  font-size: 14px;
  font-weight: 400;
  cursor: pointer;
}
.smstip {
  position: absolute;
  bottom: 125px;
  right: 380px;
  font-size: 14px;
  font-weight: 400;
  color: #999;
}
/deep/.el-input__inner {
  border: 0;
  color: #323233;
  height: 24px;
  line-height: 24px;
  padding: 0 40px 0 0;
}
/deep/.el-input__icon {
  line-height: 24px;
}

.el-button--primary {
  color: #fff;
  background-color: #000;
  border-color: #000;
}

.el-button {
  margin-top: 40px;
  width: 340px;
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