<template>
	<div class="footer">
		<div class="nav">
			<router-link :to="{name:'home'}">首页</router-link>
			<span>|</span>
			<router-link :to="{name:'gamecenter'}">游戏</router-link>
			<span>|</span>
			<router-link :to="{name:'goods.flow'}">流量</router-link>
			<span>|</span>
			<router-link :to="{name:'goods.account'}">账号</router-link>
			<span>|</span>
			<router-link :to="{name:'goods.service'}">服务</router-link>
			<span>|</span>
			<router-link :to="{name:'person.person'}">个人中心</router-link>
		</div>
		<!-- <div class="device">
      <a href="javascript:;">触屏版</a>
      <span>|</span>
      <a href="javascript:;">电脑版</a>
    </div> -->
		<!-- <p class="license">【网络文化经营许可证】：陕网文许字[xxxx]xxxx-xxx号|【增值电信业务经营许可证】：陕xx-xxxxxxxx【工信部</p> -->

		<p class="copyright"><img src="~$assets/images/logo_copy.png"
					 alt></p>
		<p class="copyright">
			搜瓜提供店铺服务</p>

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
		// position: fixed;
		// bottom: 0;
		// width: 100%;
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
		img {
			height: 30px;
			padding-right: 10px;
		}
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
