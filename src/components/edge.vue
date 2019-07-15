<template>
  <div id="side-edge" class="side-edge">
    <ul>
      <li class="edge-cell" @mouseover="onMouseOver" @mouseleave="onMouseOut">
        <a class="wechat-hover" href="javascript:">
          <img class="center-block" src="~$assets/images/shouji.png" alt />
          <span class="hover-msg">官方微信</span>
          <div v-if="showQR" class="wechat-box">
            <img src="~$assets/images/erweima-6.png" class="center-block pop-img" alt />
          </div>
        </a>
      </li>
      <li class="edge-cell">
        <router-link :to="{name:'person'}" tag="a">
          <img class="center-block" src="~$assets/images/ren.png" alt />
          <span class="hover-msg">个人中心</span>
        </router-link>
      </li>
      <li class="edge-cell">
        <router-link :to="{name:'home'}" tag="a">
          <img class="center-block" src="~$assets/images/kefu-4.png" alt />
          <span class="hover-msg">联系客服</span>
        </router-link>
      </li>
      <li class="edge-cell">
        <router-link :to="{name:'feedback'}" tag="a">
          <img class="center-block" src="~$assets/images/yijianfankui.png" alt />
          <span class="hover-msg">意见反馈</span>
        </router-link>
      </li>
      <li v-if="showToTop" class="edge-cell">
        <a @click.prevent="toTop" href="javascript:">
          <img class="center-block" src="~$assets/images/zhiding.png" alt />
          <span class="hover-msg">返回顶部</span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showQR: false,
      showToTop: false
    };
  },
  created() {
    this.showToTopBtn();
    let self = this;
    window.addEventListener("scroll", function() {
      self.throttle(self.showToTopBtn);
    });
  },
  methods: {
    onMouseOver() {
      this.showQR = true;
    },
    onMouseOut() {
      this.showQR = false;
    },
    throttle(method, param) {
      clearTimeout(method.tId);
      method.tId = setTimeout(function() {
        method.call(param);
      }, 200);
    },
    showToTopBtn() {
      let scrollTop = window.scrollY;
      if (scrollTop != 0) {
        this.showToTop = true;
      } else {
        this.showToTop = false;
      }
    },
    toTop() {
      setTimeout(() => {
        window.scrollTo(0, 0);
      }, 200);
    }
  }
};
</script>

<style lang="scss" scoped>
.center-block {
  display: block;
  margin-right: auto;
  margin-left: auto;
}
.side-edge {
  position: fixed;
  right: 0;
  top: 50%;
  margin-top: -90px;
  width: 50px;
  background-color: #ffffff;
  box-shadow: -4px 4px 20px 0 rgba(0, 0, 0, 0.2);
  li {
    &:last-child {
      &.edge-cell {
        a {
          border-bottom: 0;
        }
      }
    }
  }
  a {
    display: block;
    position: relative;
    width: 50px;
    height: 50px;
    border-bottom: 1px solid #ededed;
    &:hover {
      .hover-msg {
        opacity: 1;
      }
    }
    img {
      padding-top: 10px;
    }
    .hover-msg {
      position: absolute;
      top: 0;
      left: 0;
      width: 50px;
      height: 50px;
      text-align: center;
      padding: 10px;
      opacity: 0;
      font-size: 12px;
      color: #000;
      background-color: #fff;
      transition: all 0.6s linear 0;
    }
  }
}
.wechat-box {
  position: absolute;
  top: 0;
  right: 50px;
  background-color: #fff;
  z-index: 100;
  padding: 5px;
  .pop-img {
    padding: 0;
  }
}
</style>