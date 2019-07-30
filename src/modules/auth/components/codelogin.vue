<template>
	<div class="login_form">
		<div class="form_title">
			<span>
				手机登录
				<b @click="changeForm(1)">密码登录</b>
			</span>
			<img @click="changeForm(0)"
					 src="~$assets/images/qr_icon.png">
		</div>
		<div class="form_body">
			<el-input class="phone"
								type="text"
								@keyup.enter="submit"
								v-model="param.username"
								placeholder="请输入手机号">
				<img slot="prefix"
						 src="~$assets/images/phone_login.png"
						 alt>
			</el-input>
			<el-row class="code"
							:gutter="10">
				<el-col :span="15">
					<el-input type="text"
										@keyup.enter="submit"
										v-model="param.code"
										placeholder="请输入验证码">
						<img slot="prefix"
								 src="~$assets/images/passwd_login.png"
								 alt>
					</el-input>
				</el-col>
				<el-col :span="9">
					<el-button class="code-btn"
										 @click="getCode()"
										 :disabled="vCodeButtonDisabled">{{ vCodeLabel }}</el-button>
				</el-col>
			</el-row>

			<el-button class="login-btn"
								 @click="loginByCode">登录</el-button>
		</div>
		<hr>
		<div class="third_party_login">
			<img src="~$assets/images/qq_login.png">
			<a href="#">QQ登录</a>
			<img src="~$assets/images/watch_login.png">
			<a href="#">微信登录</a>
		</div>
	</div>
</template>

<script>
	import { mapActions, mapGetters } from "vuex";
	import * as services from "$modules/auth/services";

	import { type } from "os";
	export default {
		data () {
			return {
				appid: "2056057733",
				param: {
					username: "",
					code: ""
				},
				vCount: null,
				defaultCodeSecond: 60,
				vCodeSecond: 60,
				vCodeLabel: "获取验证码",
				vCodeButtonDisabled: false
			};
		},
		methods: {
			changeForm (form) {
				this.$emit("change-form", form);
			},
			...mapActions(["attemptLoginByCode"]),

			async getCode () {
				if (!this.checkPhone(this.param.username)) {
					this.$message({ message: "请填写正确的手机号", type: "warning" });
					return;
				}
				let captcha1 = new TencentCaptcha(this.appid, res => {
					if (res.ret == 0) {
						let username = this.param.username;
						let ticket = res.ticket;
						let randstr = res.randstr;
						//  try {
						const loading = this.$loading({
							lock: true,
							text: "验证码获取中"
						});
						services.getCode({ ticket, randstr, username }).then(data => {
							loading.close();
							if (data.code == 200) {
								this.param.code = data.data.code;
								this.$message.success("验证码发送成功");
								this.vCount = setInterval(this.countDown, 1000);
							}
						}).catch(() => {
							loading.close();
						})
						// } catch (e) {
						//   if (e.status !== 422) {
						//     this.$message.error("手机号错误");
						//   }
						// }
					}
				});
				captcha1.show();
			},
			countDown () {
				if (this.vCodeSecond === 0) {
					this.vCodeLabel = "重新获取";
					this.vCodeSecond = this.defaultCodeSecond;
					this.vCodeButtonDisabled = false;
					clearInterval(this.vCount);
				} else {
					this.vCodeButtonDisabled = true;
					this.vCodeLabel = this.vCodeSecond + " s";
					this.vCodeSecond = this.vCodeSecond - 1;
				}
			},
			async loginByCode () {
				if (!this.checkPhone(this.param.username)) {
					this.$message({ message: "请填写正确的手机号", type: "warning" });
					return;
				}

				const username = this.param.username;
				const code = this.param.code;
				const loading = this.$loading({
					lock: true,
					text: "登录中"
				});

				try {
					await this.attemptLoginByCode({ username, code });
					loading.close();
					this.$message.success("欢迎回来~");
					this.$router.push({ name: "home" });
				} catch (e) {
					loading.close();
					console.log(e);
					if (e.status !== 422) {

						this.$message.error("手机号或验证码错误");
					}
				}
			},
			checkPhone (phone) {
				if (!/^1[3|4|5|6|7|8][0-9]\d{4,8}$/.test(phone)) {
					return false;
				} else {
					return true;
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
				padding-left: 20px;
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
			padding: 5px 38px 0 38px;
			.code {
				margin-top: 20px;
			}
		}

		/deep/.el-input__prefix {
			left: 10px;
			padding-top: 12px;
		}
		/deep/.el-input__inner {
			border: 1px solid #cdcdcd;
			height: 46px;
			line-height: 46px;
		}
		/deep/.el-input--prefix .el-input__inner {
			padding-left: 40px;
		}
		.code-btn {
			width: 110px;
			height: 46px;
			font-size: 16px;
			color: #fff;
			border: 1px solid #000;
			background: #000;
			border-radius: 0;
			padding: 0;
		}
		.login-btn {
			width: 300px;
			height: 46px;
			margin-top: 37px;
			font-size: 16px;
			color: #fff;
			border-radius: 0;
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
