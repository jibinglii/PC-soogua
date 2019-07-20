<template>
  <el-dialog
    title="删除银行卡"
    :visible.sync="visible"
    :show="show"
    @close="$emit('update:show', false)"
    width="760px"
  >
    <p class="tips">您是否确认删除此银行卡【尾号{{item.bank_info.bankno_last4}}】？</p>
    <div class="pwd">
      <span>支付密码：</span>
      <div class="inputs" v-for="(item,index) in inputList" :key="index">
        <input
          type="password"
          v-model="item.val"
          class="border-input"
          @keyup="nextFocus($event,index)"
          @keydown="changeValue(index)"
        >
      </div>
    </div>
    <router-link tag="a" :to="{name:'person.resetpaypwd'}" class="forget">忘记支付密码？</router-link>

    <span slot="footer" class="dialog-footer">
      <el-button @click="visible = false">取 消</el-button>
      <el-button type="primary" @click="visible = false">确 定</el-button>
    </span>
  </el-dialog>
</template>

<script>
import PasswordInput from "vant/lib/password-input";
import "vant/lib/password-input/style";
export default {
  data() {
    return {
      id: "",
      item: {
        bank_info: {}
      },
      value: "",
      visible: this.show,
      inputList: [
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" },
        { val: "" }
      ]
    };
  },
  props: {
    show: {
      type: Boolean,
      default: false
    }
  },
  created() {
    this.id = this.$route.params.id;
  },
  watch: {
    show() {
      this.visible = this.show;
    }
  },
  mounted() {
    this.getBankCard();
  },
  methods: {
    getBankCard() {
      this.$toast.loading();
      this.$http
        .get("/api/v1/bankcard/" + this.id, { loading: true })
        .then(({ data }) => {
          this.item = data;
          console.log(data);
        })
        // .catch(error => {
        //   console.log(error);
        // });
    },
    nextFocus(el, index) {
      var dom = document.getElementsByClassName("border-input"),
        currInput = dom[index],
        nextInput = dom[index + 1],
        lastInput = dom[index - 1];
      if (el.keyCode != 8) {
        if (index < this.inputList.length - 1) {
          nextInput.focus();
        } else {
          currInput.blur();
        }
      } else {
        if (index != 0) {
          lastInput.focus();
        }
      }
    },
    changeValue(index) {
      this.inputList[index].val = "";
    }
  },
  components: {
    [PasswordInput.name]: PasswordInput
  }
};
</script>

<style lang="scss" scoped>
.tips {
  background: #ededed;
  color: #bb0101;
  padding: 10px;
}
.pwd {
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 40px auto 0 auto;
  .border-input {
    background: #ffffff;
    width: 56px;
    font-size: 56px;
    height: 56px;
    line-height: 56px;
    margin-left: 8px;
    margin-right: 8px;
    text-align: center;
    border: 1px solid #999;
  }
  .inputs {
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
.forget {
  cursor: pointer;
  text-decoration: none;
  width: 100%;
  text-align: center;
  display: block;
  color: #999;
  font-weight: 100;
  padding: 20px 0 50px 0;
}
</style>
