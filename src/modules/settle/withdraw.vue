<template>
	<div class="person">
		<v-header />
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>个人中心</el-breadcrumb-item>
				<el-breadcrumb-item>结算管理</el-breadcrumb-item>
				<el-breadcrumb-item>申请提现</el-breadcrumb-item>
			</el-breadcrumb>
			<v-content>
				<div slot="aside">
					<v-aside></v-aside>
				</div>
				<div slot="main">
					<div class="feedback">
						<div class="title">申请提现</div>
						<el-form status-icon
										 label-width="100px"
										 class="feedback-form">
							<el-form-item label="到账银行卡">

								<el-select v-model="bank"
													 placeholder="请选择到账银行卡">
									<el-option v-for="item in bank_cards"
														 :key="item.id"
														 :label="item.bank_info.bankName+item.bankno"
														 :value="item.id">
									</el-option>
								</el-select>

							</el-form-item>

							<el-form-item label="提现金额">

								<el-input title="提现金额"
													v-model="amount"
													type="number"
													placeholder="请输入提现金额"></el-input>
								<div class="info-tips">
									<!-- <img src="~$assets/images/gantan.png"
											 alt /> -->
									<span v-if="showBalance">钱包余额￥{{currentUser.wallet.amount|formatMoney}}元，<a @click="withdrawBtn">全部提现</a> 。</span>
									<span v-if="showDec">额外扣除{{amount}}元（费率0.01） </span>
								</div>

							</el-form-item>

							<el-form-item class="btn-confirm">
								<el-button type="primary"
													 :class="btnClass"
													 @click="pay">预计24小时到账，确认提现</el-button>

							</el-form-item>
						</el-form>
					</div>
				</div>
			</v-content>
		</div>
		<v-footer />
	</div>
</template>

<script>
	import VHeader from "$components/VHeader";
	import VFooter from "$components/VFooter";
	import VContent from "$components/VContent";
	import VAside from "$components/VAside";
	import { mapGetters } from "vuex";
	import user from '$api/user'
	export default {
		created () {
			this.$http
				.get("/api/v1/bankcard/", { loading: true })
				.then(({ data }) => {
					this.bank_cards = data.bank_cards;
					if (this.bank_cards.length == 0) {
						this.$alert('您还没有添加银行卡，点击确认前往添加').then(() => {
							let redirect = encodeURIComponent(window.location.href);
							this.$router.replace({ name: 'person.addcard', query: { redirect: redirect } })
						})
					}
				})
		},
		data () {
			return {
				bank_cards: [],
				bank: '',
				amount: "",
				showBalance: true,
				showDec: false,


				//: true,
				//showValue: '',
				//	info: '',
				btnClass: 'btn-flase'
			};
		},
		//监听属性 类似于data概念
		computed: {
			...mapGetters(["currentUser"]),
		},
		watch: {
			bank () { this.setBtnClass() },
			amount () { this.setBtnClass() }
		},
		//方法集合
		methods: {
			setBtnClass () {
				if (this.bank == '' || this.amount <= 0) {
					this.btnClass = 'btn-flase';
				} else {
					this.btnClass = 'btn'
				}
			},
			pay () {
				if (this.bank == '' || this.amount <= 0) return false;
				this.$prompt('请输入支付密码', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					inputType: 'password',
				}).then(({ value }) => {
					if (value.length != 6) {
						this.$message.error('支付密码错误');
						return flase;
					}
					const loading = this.$loading({
						lock: true,
						text: "请稍等",
					});
					user.veryPPwd(value, true).then(({ data }) => {
						loading.close()

						this.confirm()
					}).catch(({ response }) => {
						loading.close()
						this.$message.error('支付密码错误');

					})
				}).catch(() => {

				});



			},
			confirm () {
				let param = { bank_id: this.bank, amount: this.amount }

				this.$http.post('api/v2/user/withdraws/apply', param).then(() => {
					this.$message.success('提现申请成功');
					this.$router.back()
				})
			},
			withdrawBtn () {
				this.showBalance = false;
				this.showDec = true;
				this.amount = this.currentUser.wallet.amount;
			},
		},
		components: {
			VHeader,
			VFooter,
			VContent,
			VAside
		}
	};
</script>

<style lang="scss" scoped>
	.feedback {
		height: 100%;
		background: #fff;
		margin-bottom: 100px;
		.title {
			font-size: 14px;
			font-weight: 400;
			padding-left: 16px;
			line-height: 60px;
			border-bottom: 1px solid #ededed;
		}
		.feedback-form {
			width: 50%;
			padding-top: 40px;
			padding-left: 50px;
			.el-form-item {
				margin-bottom: 40px;
			}
			/deep/.el-select {
				//height: 500px;
				width: 400px;
			}
			/deep/.el-input {
				//height: 500px;
				width: 400px;
			}
			.size {
				position: absolute;
				bottom: 0;
				right: 20px;
				width: 38px;
				font-size: 14px;
				font-weight: 400;
				color: #999;
			}
			.btn-confirm {
				display: flex;
				align-items: center;
				justify-content: center;
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
	.btn-flase {
		background-color: #d0d0d0;
		border: 1px solid #d0d0d0;
	}
	.btn {
		background-color: #000;
	}
	/deep/.el-breadcrumb__separator {
		color: #666;
	}
	.info-tips {
		font-size: 12px;
		font-weight: 300;
		color: #999;
		a {
			color: #000;
		}
	}
</style>
