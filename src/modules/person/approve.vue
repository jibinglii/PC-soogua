<template>
	<div class="person">
		<v-header></v-header>
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>个人中心</el-breadcrumb-item>
				<el-breadcrumb-item>修改资料</el-breadcrumb-item>
			</el-breadcrumb>
			<v-content>
				<div slot="aside">
					<v-aside></v-aside>
				</div>
				<div slot="main">
					<div class="approve">
						<div class="title">实名认证</div>
						<div v-if="identity"
								 class="certified">
							<p>证件类型： 身份证</p>
							<p>真实姓名：{{auth_info.real_name}} </p>
							<p>证件号码： {{auth_info.id_card}}</p>
							<p>审核状态： {{auth_status}}</p>
							<div class="line"></div>
							<p>扫描下载“搜瓜”APP，及时接受审核结果通知</p>
							<img src="~$assets/images/erweima.png"
									 alt />
						</div>
						<div v-else
								 class="uncertified">
							<h4>证件类型： 身份证</h4>
							<el-form :model="approve"
											 ref="approve"
											 :rules="rules"
											 label-width="135px"
											 class="approve-form">
								<el-form-item label="真实姓名："
															prop="name"
															placeholder="请输入您的真实姓名"
															style="width: 400px;">
									<el-input v-model="approve.name"></el-input>
								</el-form-item>
								<el-form-item label="证件号码："
															prop="id_card"
															placeholder="请输入您的证件号码"
															style="width: 400px;">
									<el-input v-model="approve.id_card"></el-input>
								</el-form-item>
								<el-form-item label-width="0"
															prop="zheng"
															ref="uploadzheng">
									<v-upload prop="zheng"
														:image="id_card_back"
														@upload="upload" />
								</el-form-item>
								<el-form-item label-width="0"
															prop="fan"
															ref="uploadfan">
									<v-upload prop="fan"
														:image="id_card_front"
														@upload="upload" />
								</el-form-item>
								<el-form-item label-width="0"
															prop="shouchi"
															ref="uploadshouchi">
									<v-upload prop="shouchi"
														:image="id_card_hold"
														@upload="upload" />
								</el-form-item>
								<el-form-item>
									<el-button style="widht:300px"
														 type="primary"
														 @click="submitForm()">提交申请资料</el-button>
								</el-form-item>
							</el-form>
							<div class="tips">
								<h5>温馨提示：</h5>
								<p>1. 认证名与提款收款账户的开户名必须一致，否则将不能成功体现；</p>
								<p>2. 张片、文字清晰可辨；</p>
								<p>3. 证件持有人必须年满十八周岁。</p>
							</div>
						</div>
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
	import VUpload from "./upload";
	import user from '$api/user'
	export default {
		data () {
			return {
				auth_info: {},
				auth_status: "",
				identity: false,
				approve: {
					name: "",
					id_card: ""
				},
				id_card_back: require("../../assets/images/zheng-default.png"),
				id_card_front: require("../../assets/images/fan-default.png"),
				id_card_hold: require("../../assets/images/shouchi-default.png"),
				card_back: false,
				card_front: false,
				card_hold: false,
				rules: {
					name: [
						{ required: true, message: "请输入您的真实姓名", trigger: "blur" },
					],
					id_card: [
						{ required: true, message: "请输入您的证件号码", trigger: "blur" },
					],
				}
			};
		},
		components: {
			VHeader,
			VFooter,
			VContent,
			VAside,
			VUpload
		},
		computed: {
			size () {
				return this.profile.signature.length || 0;
			}
		},
		methods: {
			submitForm () {
				if (this.approve.name == "") {
					this.$message.error("请填写真实姓名");
					return false;
				}
				let reg = /(^\d{15}$)|(^\d{18}$)|(^\d{17}(\d|X|x)$)/;
				if (!reg.test(this.approve.id_card)) {
					this.$message.error("请填写正确的身份证号");
					return false;
				}
				if (!this.card_back) {
					this.$message.error("请上传身份证正面");
					return false;
				}
				if (!this.card_front) {
					this.$message.error("请上传身份证反面");
					return false;
				}
				if (!this.card_hold) {
					this.$message.error("请上传手持身份证照片");
					return false;
				}
				const loading = this.$loading({
					lock: true,
					text: "正在上传",
				});
				let param = {
					real_name: this.approve.name,
					id_card: this.approve.id_card,
					id_card_back: this.id_card_back,
					id_card_front: this.id_card_front,
					id_card_hold: this.id_card_hold,
				}
				this.$http.post('api/v1/user/store/auth/basic', param).then(({ data }) => {
					loading.close();
					this.$message.success("认证信息提交成功，请等待审核");
					this.identity = true
					this.authStatus();
				}).catch((error => {
					loading.close()
				}))

			},
			authStatus () {
				user.getAuthStatus().then(({ data }) => {
					if (data.auth_status.is_auth != 3) {
						this.identity = true;
						this.auth_status = data.label[data.auth_status.is_auth];
					}
				}).catch(error => {
					this.identity = false;
				})
				user.getAuthInfo().then(({ data }) => {
					this.auth_info = data.auth_info;
				})
			},
			editIcon () { },
			upload (val) {
				switch (val.type) {
					case 'zheng':
						this.id_card_back = val.url
						this.card_back = true
						break;
					case 'fan':
						this.id_card_front = val.url
						this.card_front = true
						break;
					case 'shouchi':
						this.id_card_hold = val.url
						this.card_hold = true
						break;

				}
			}
		}, created () {
			this.authStatus();
		}
	}
</script>

<style lang="scss" scoped>
	.approve {
		min-height: 728px;
		background: #fff;
		margin-bottom: 100px;

		.title {
			font-size: 14px;
			font-weight: 400;
			padding-left: 16px;
			line-height: 60px;
			border-bottom: 1px solid #ededed;
		}
	}

	.certified {
		font-size: 14px;
		font-weight: 400;
		padding: 35px 135px;
		p {
			color: #000;
			margin-bottom: 30px;
		}
		.line {
			border-bottom: 1px solid #ededed;
			margin-bottom: 22px;
		}
		img {
			width: 110px;
			height: auto;
			max-width: 100%;
		}
	}

	.uncertified {
		font-size: 14px;
		font-weight: 400;
		h4 {
			padding: 30px 40px;
		}
		.approve-form {
			padding: 0 40px;
			min-width: 400px;
			.el-form-item {
				margin-bottom: 30px;
				/deep/ &__label {
					color: #000;
				}
			}
		}
	}
	.tips {
		padding: 43px 39px;
		background: #ededed;
		h5 {
			margin-bottom: 30px;
			font-size: 16px;
			font-weight: 400;
			color: #000;
		}
		p {
			margin-top: 15px;
			font-size: 16px;
			font-weight: 400;
			color: #000;
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
		width: 300px;
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