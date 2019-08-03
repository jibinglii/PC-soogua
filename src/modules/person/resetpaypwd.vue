<template>
	<div class="person">
		<v-header></v-header>
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>个人中心</el-breadcrumb-item>
				<el-breadcrumb-item>修改支付密码</el-breadcrumb-item>
			</el-breadcrumb>
			<v-content>
				<div slot="aside">
					<v-aside></v-aside>
				</div>
				<div slot="main">
					<div class="setpaypwd">
						<div class="title">修改支付密码</div>
						<el-form :model="pwd"
										 status-icon
										 :rules="rules"
										 ref="pwd"
										 label-width="0"
										 class="pwd-form">
							<el-form-item prop="oldpassword">
								<el-input type="password"
													v-model="pwd.oldpassword"
													placeholder="旧支付密码"
													auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item prop="password">
								<el-input type="password"
													v-model="pwd.password"
													placeholder="请输入6位数字设为支付密码"
													auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item prop="confirmPasswd">
								<el-input type="password"
													v-model="pwd.confirmPasswd"
													placeholder="请确认支付密码"
													auto-complete="off"></el-input>
							</el-form-item>
							<el-form-item>
								<el-button type="primary"
													 @click="submitForm('pwd')">确认</el-button>
							</el-form-item>
						</el-form>
					</div>
				</div>
			</v-content>
		</div>
		<v-footer></v-footer>
	</div>
</template>

<script>
	import VHeader from "$components/VHeader";
	import VFooter from "$components/VFooter";
	import VContent from "$components/VContent";
	import VAside from "$components/VAside";
	import user from '$api/user'
	export default {
		data () {
			var validateOldPass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("旧密码不能为空"));
				}
				callback();
			};
			var validatePass = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请输入6位数字支付密码"));
				} else {
					if (this.pwd.confirmPasswd !== "") {
						this.$refs.pwd.validateField("confirmPasswd");
					}
					callback();
				}
			};
			var validatePass2 = (rule, value, callback) => {
				if (value === "") {
					callback(new Error("请再次输入6位支付密码"));
				} else if (value !== this.pwd.password) {
					callback(new Error("两次输入密码不一致!"));
				} else {
					callback();
				}
			};
			return {
				pwd: {
					oldpassword: '',
					password: '',
					confirmPasswd: ''
				},
				rules: {
					oldpassword: [{ validator: validateOldPass, trigger: "blur" }],
					password: [{ validator: validatePass, trigger: "blur" }],
					confirmPasswd: [{ validator: validatePass2, trigger: "blur" }]
				}
			};
		},
		components: {
			VHeader,
			VFooter,
			VContent,
			VAside
		},
		methods: {
			submitForm () {

				let reg = new RegExp("^[0-9]{6}$");
				if (!reg.test(this.pwd.password)) {
					this.$message.error("支付密码格式为6位纯数字");
					this.pwd.oldpassword = '';
					this.pwd.password = '';
					this.pwd.confirmPasswd = '';
					return false;
				}
				if (this.pwd.password != this.pwd.confirmPasswd) {
					this.$message.error("两次输入的密码不一致");
					this.pwd.oldpassword = '';
					this.pwd.password = '';
					this.pwd.confirmPasswd = '';
					return false;
				}
				const loading = this.$loading({
					lock: true,
					text: "请稍等",
				});
				user.veryPPwd(this.pwd.oldpassword, true).then(({ data }) => {
					// 旧密码输入正确，继续修改密码

					user.modifyPPwd(this.pwd.oldpassword, this.pwd.password, true).then(({ res }) => {
						loading.close();
						this.$message.success("支付密码设置成功，请使用新密码");
						this.$router.push({ name: "person.person" });
					}).catch(error => {
						loading.close();

						this.$message.error("设置失败，请重试");
						this.password = '';
						this.confirmPasswd = '';
					})

				}).catch(error => {
					loading.close();
					// console.log(error);
					this.pwd.oldpassword = '';
					this.pwd.password = '';
					this.pwd.confirmPasswd = '';
				})


			},

		},
		created () {
			// 先验证是否设置了支付密码
			const loading = this.$loading();
			user.getUserInfo(true).then(({ data }) => {
				loading.close();
				if (!data.user.is_set_paypasswd) {
					this.$alert('您还没有设置支付密码，请前往设置', {
						title: "温馨提示",
						btn: {
							text: '去设置',
							style: { overflow: "inherit" },
						}
					}).then(() => {
						this.$router.push({ name: 'person.setpaypwd' })
					});
				}
			})
		}
	};
</script>

<style lang="scss" scoped>
	.setpaypwd {
		height: 728px;
		background: #fff;
		margin-bottom: 100px;
		.title {
			font-size: 14px;
			font-weight: 400;
			padding-left: 16px;
			line-height: 60px;
			border-bottom: 1px solid #ededed;
		}
		.pwd-form {
			width: 300px;
			padding-top: 40px;
			padding-left: 50px;
			.el-form-item {
				margin-bottom: 40px;
			}
		}
	}
	/deep/.el-input__inner {
		border: 1px solid #a0a0a0;
		color: #666;
	}

	.el-button--primary {
		color: #fff;
		background-color: #000;
		border-color: #000;
	}

	.el-button {
		width: 100%;
	}
	.el-breadcrumb {
		margin-top: 18px;
		margin-bottom: 18px;

		.el-breadcrumb__item {
			font-size: 14px;
			font-weight: 400;
			line-height: 30px;
			color: #666;
			&:last-child {
				color: #666;
			}
		}
	}
	/deep/.el-breadcrumb__separator {
		color: #666;
	}
</style>