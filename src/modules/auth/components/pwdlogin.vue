<template>
	<div class="login_form">
		<div class="form_title">
			<span>
				<b @click="changeForm(2)">手机登录</b>
				密码登录
			</span>
			<img @click="changeForm(0)"
					 src="~$assets/images/qr_icon.png" />
		</div>
		<div class="form_body">
			<el-input class="phone"
								type="text"
								@keyup.enter="submit"
								v-model="username"
								placeholder="请输入手机号">
				<img slot="prefix"
						 src="~$assets/images/phone_login.png"
						 alt />
			</el-input>
			<el-input class="passwd"
								type="password"
								@keyup.enter="submit"
								v-model="password"
								placeholder="请输入密码">
				<img slot="prefix"
						 src="~$assets/images/passwd_login.png"
						 alt />
			</el-input>
			<el-button @click="submit">登录</el-button>
		</div>
		<hr />
		<div class="third_party_login">
			<img src="~$assets/images/qq_login.png" />
			<a href="#">QQ登录</a>
			<img src="~$assets/images/watch_login.png" />
			<a href="#">微信登录</a>
		</div>
	</div>
</template>

<script>
	import { mapActions } from "vuex";
	export default {
		data () {
			return {
				username: "",
				password: ""
			};
		},
		methods: {
			changeForm (form) {
				this.$emit("change-form", form);
			},
			...mapActions(["attemptLogin"]),
			async submit () {
				if (this.username == "" || this.password == "") {
					this.$message({ message: "用户名或密码不能为空", type: "warning" });
					return false;
				}
				if (!/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(this.username)) {
					this.$message({ message: "手机号不正确", type: "warning" });
					return false;
				}

				const username = this.username;
				const password = this.password;
				const loading = this.$loading({
					lock: true,
					text: "登录中"
				});

				try {
					await this.attemptLogin({ username, password });
					loading.close();
					this.$message.success("欢迎回来~");
					this.$router.push({ name: "home" });
				} catch (e) {
					if (e.status !== 422) {
						loading.close();
						this.$message.error("账号密码错误！");
					}
				}
			}
		}
	};
</script>
<style lang='scss' scoped>
	.login_form {
		float: right;
		width: 376px;
		height: 428px;
		background-color: #fff;
		.form_title {
			display: flex;
			padding: 15px;
			span {
				padding-left: 20px;
				flex: 4;
				color: #000;
				line-height: 66px;
				font-size: 18px;
				font-weight: bold;
			}
			b {
				cursor: pointer;
				padding-right: 20px;
				color: #999;
			}
			img {
				cursor: pointer;
				flex: 1;
				height: 66px;
			}
		}
		.form_body {
			width: 100%;
			text-align: center;
			padding-top: 5px;
			.phone {
				width: 300px;
			}
			.passwd {
				width: 300px;
				margin-top: 20px;
			}
		}

		/deep/.el-input__prefix {
			left: 10px;
			padding-top: 12px;
		}
		/deep/.el-input__inner {
			border: 1px solid #cdcdcd;
			color: #b1b1b1;
			height: 46px;
			line-height: 46px;
		}
		/deep/.el-input--prefix .el-input__inner {
			padding-left: 40px;
		}
		.el-button {
			width: 300px;
			height: 46px;
			margin-top: 37px;
			font-size: 16px;
			color: rgb(255, 255, 255);
			border: 1px solid #000;
			background: #000;
		}

		hr {
			height: 63px;
			border: none;
			width: 90%;
			border-bottom: 2px solid #ededed;
		}
		.third_party_login {
			padding-top: 10px;

			img {
				padding-left: 20px;
				float: left;
			}
			a {
				float: left;
				height: 24px;
				line-height: 24px;
				font-size: 14px;
				color: #666;
				text-decoration: none;
			}
		}
	}
</style>