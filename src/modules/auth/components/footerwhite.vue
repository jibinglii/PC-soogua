<template>
	<div class="footer">

		<p class="copyright"><img src="~$assets/images/logo_copy.png"
					 alt>搜瓜提供店铺服务</p>
	</div>
</template>

<script>
	export default {};
</script>

<style lang="scss" scoped>
	.footer {
    width: 100%;
    position: absolute;
    bottom: 0;
		font-size: 12px;
		font-weight: 500;
		line-height: 60px;
		background-color: #fff;

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
		text-align: center;
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
