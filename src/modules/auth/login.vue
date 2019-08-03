<template>
	<div class="login">
		<!-- <div class="title">
      <img class="logo" src="~$assets/images/sougualogo.png" />
      <span>搜瓜</span>
    </div>-->
		<div class="header">
			<div class="container storeInfo">
				<div class="left">
					<img class="logo"
							 :src="currentStore.logo">
					<span>{{currentStore.name}}</span>
				</div>
				<p class="right">店铺介绍：{{currentStore.desc|ellipsis}}</p>
			</div>
		</div>

		<div class="login_body">
			<div class="container">
				<qr-login @change-form="onChangeForm"
									v-if="form===0"></qr-login>
				<pwd-login @change-form="onChangeForm"
									 v-if="form===1"></pwd-login>
				<code-login @change-form="onChangeForm"
										v-if="form===2"></code-login>
			</div>
		</div>
		<footer-white></footer-white>
	</div>
</template>
<script>
	import QrLogin from "./components/qrlogin";
	import PwdLogin from "./components/pwdlogin";
	import CodeLogin from "./components/codelogin";
	import FooterWhite from "./components/footerwhite";
	import { mapGetters } from "vuex";
	export default {
		components: {
			QrLogin,
			PwdLogin,
			CodeLogin,
			FooterWhite
		},
		name: "Login",
		filters: {
			ellipsis (value) {
				if (!value) return ''
				if (value.length > 50) {
					return value.slice(0, 50) + '...'
				}
				return value
			}
		},
		data () {
			return {
				form: 2
			};
		},
		computed: {
			...mapGetters(["currentStore"])
		},
		// components: {  },
		methods: {
			onChangeForm (form) {
				this.form = form;
			}
		},
		created () { }
	};
</script>
<style scoped lang="scss">
	.login {
		.header {
			background: #fff;
			.storeInfo {
				height: 120px;
				display: flex;
				justify-content: space-between;
				align-items: center;
				.left {
					float: left;
					.logo {
						float: left;
						width: 44px;
						height: 44px;
					}
					span {
						float: left;
						padding-left: 12px;
						font-size: 28px;
					}
				}
				.right {
					float: right;
				}
			}
		}
		.container {
			width: 1200px;
			margin: 0 auto;
		}
		.login_body {
			width: 100%;
			min-height: 600px;
			background: url(../../assets/images/login_bg.png) no-repeat;
			background-size: cover;
			position: relative;
			display: flex;
			align-items: center;
			justify-content: flex-end;
		}
	}
</style>
