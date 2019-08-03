<template>
	<div class="login_form">
		<div class="form_title">
			<span>手机扫码,安全登录</span>
			<img @click="changeForm(1)"
					 src="~$assets/images/pc_login.png">
		</div>
		<div class="form_qrcode">
			<img src="~$assets/images/qrcode.png">
		</div>
		<div class="open_app">
			<img src="~$assets/images/scan_login.png">
			<span>
				打开搜瓜App
				<br>扫一扫登录
			</span>
		</div>
		<!-- <hr>
    <div class="third_party_login">
      <img src="~$assets/images/qq_login.png">
      <a href="#">QQ登录</a>
      <img src="~$assets/images/watch_login.png">
      <a href="#">微信登录</a>
    </div> -->
	</div>
</template>

<script>
	export default {
		components: {},
		data () {
			return {};
		},
		methods: {
			changeForm (form) {
				this.$emit("change-form", form);
			}
		}
	};
</script>
<style lang='scss' scoped>
	.login_form {
		float: right;
		width: 376px;
		// height: 428px;
		height: 376px;
		background-color: #fff;
		.form_title {
			display: flex;
			padding: 15px;
			span {
				flex: 4;
				padding-left: 20px;
				line-height: 66px;
				font-size: 18px;
				font-weight: bold;
			}
			img {
				flex: 1;
				height: 66px;
			}
		}
		.form_qrcode {
			width: 100%;
			text-align: center;
			padding-top: 20px;
			img {
				width: 116px;
			}
		}
		.open_app {
			padding-top: 35px;
			//width: 134px;
			display: flex;

			img {
				margin-left: 30%;
				width: 46px；;
			}
			span {
				padding-left: 5px;
				width: 110px;
				flex: 1;
			}
		}
		hr {
			height: 42px;
			border: none;
			width: 90%;
			border-bottom: 2px solid #ededed;
		}
		.third_party_login {
			padding-top: 10px;
			padding-top: 10px;
			display: flex;
			align-items: center;
			justify-content: center;

			img {
				padding: 0 5px 0 20px;
			}
			a {
				height: 24px;
				line-height: 24px;
				font-size: 14px;
				color: #666;
				text-decoration: none;
			}
		}
	}
</style>
