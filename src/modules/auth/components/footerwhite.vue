<template>
	<div class="footer">
		<!-- <div class="nav">
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
		</div> -->
		<p class="copyright"><img src="~$assets/images/logo_copy.png"
					 alt>搜瓜提供店铺服务</p>
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
		background-color: #fff;
		padding-top: 10px;
		padding-bottom: 20px;
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
		line-height: 20px;
		text-align: center;
		color: #999;
		margin-top: 10px;

		img {
			position: relative;
			top: 5px;
			height: 20px;
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
</style>
