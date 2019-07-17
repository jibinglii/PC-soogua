<template>
  <div class="footer">
    <div class="nav">
      <a href="javascript:;">关于我们</a>
      <span>|</span>
      <a href="javascript:;">联系我们</a>
      <span>|</span>
      <a href="javascript:;">隐私保护</a>
      <span>|</span>
      <a href="javascript:;">免责声明</a>
      <span>|</span>
      <a href="javascript:;">诚聘英才</a>
    </div>
    <!-- <div class="device">
      <a href="javascript:;">触屏版</a>
      <span>|</span>
      <a href="javascript:;">电脑版</a>
    </div> -->
    <!-- <p class="license">【网络文化经营许可证】：陕网文许字[xxxx]xxxx-xxx号|【增值电信业务经营许可证】：陕xx-xxxxxxxx【工信部</p> -->
    <p class="copyright">西安学学信息技术有限公司 © xxxx-xxxx soogua.cn 版权所有</p>
    <p class="address">公司地址：陕西省西安市雁塔区高新三路蓝溪国际酒店 1号写字楼18F 联系电话：400-000-0000</p>
    <!-- <div class="safe">
      <img src="~$assets/images/copyright1.png" alt />
      <a href="javascript:;">反盗号绿色联盟</a>
      <span class="line">|</span>
      <img src="~$assets/images/copyright2.png" alt />
      <a href="javascript:;">网络社区警务室</a>
      <span class="line">|</span>
      <img src="~$assets/images/copyright3.png" alt />
      <a href="javascript:;">工信部域名备案管理系统</a>
      <span class="line">|</span>
      <img src="~$assets/images/copyright4.png" alt />
      <a href="javascript:;">网上交易保障中心</a>
      <span class="line">|</span>
      <img src="~$assets/images/copyright5.png" alt />
      <a href="javascript:;">诚信安全可靠</a>
    </div> -->
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.footer {
  font-size: 12px;
  font-weight: 500;
  line-height: 13px;
  background-color: #000;
  padding-top: 40px;
  padding-bottom: 30px;
  margin-top: 30px;
  .nav {
    font-size: 12px;
    font-weight: 500;
    line-height: 13px;
    text-align: center;
    a {
      color: #999;
    }
    span {
      color: #999;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
  .device {
    font-size: 12px;
    font-weight: 500;
    line-height: 13px;
    text-align: center;
    margin-top: 10px;
    a {
      color: #999;
    }
    span {
      color: #999;
      margin-left: 10px;
      margin-right: 10px;
    }
  }
}
.license {
  font-size: 12px;
  font-weight: 500;
  line-height: 13px;
  text-align: center;
  color: #999;
  margin-top: 10px;
}
.copyright {
  font-size: 12px;
  font-weight: 500;
  line-height: 13px;
  text-align: center;
  color: #999;
  margin-top: 10px;
}
.address {
  font-size: 12px;
  font-weight: 500;
  line-height: 13px;
  text-align: center;
  color: #999;
  margin-top: 10px;
}
.safe {
  font-size: 12px;
  font-weight: 500;
  line-height: 13px;
  text-align: center;
  margin-top: 10px;
  img {
    vertical-align: middle;
    width: 20px;
    height: 20px;
  }
  .line {
    margin-left: 10px;
    margin-right: 10px;
  }
  a {
    color: #999;
  }
  span {
    color: #999;
  }
}
</style>
