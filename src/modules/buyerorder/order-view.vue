<template>
	<div class="order">
		<v-header></v-header>
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>个人中心</el-breadcrumb-item>
				<el-breadcrumb-item>订单管理</el-breadcrumb-item>
				<el-breadcrumb-item>订单详情</el-breadcrumb-item>
			</el-breadcrumb>
			<v-content>
				<div slot="aside">
					<v-aside></v-aside>
				</div>
				<div slot="main">
					<div class="details">
						<div class="title">订单详情</div>
						<div class="content">
							<div class="subtitle">
								<span>商品信息</span>
							</div>
							<div class="order-info">
								<div class="left">

									<div class="order-time">
										<span>商品名称：</span>
										<i>{{ goods.title }}</i>
									</div>
									<div class="order-time">
										<span></span>
										<i>{{ goods.game_name }}</i>
									</div>
									<div class="order-time">
										<span></span>
										<i>{{ goods.server_name }}</i>
									</div>
									<div class="order-time">
										<span>商品价格：</span>
										<i>￥{{ goods.amount | formatMoney }}</i>
									</div>
									<div class="order-time">
										<span>担保无忧：</span>
										<i>{{order.insure_name}}</i>
									</div>
									<div class="order-time">
										<span>担保费：</span>
										<i>{{order.insure_fee}}</i>
									</div>

								</div>
								<div class="right1">
									<img :src="logo"
											 alt>

								</div>
							</div>

							<div class="subtitle">
								<span>订单信息</span>

							</div>
							<div class="order-info">
								<div class="left">
									<div class="order-time">
										<span>订单编号</span>
										<i>{{order.id}}</i>
									</div>
									<div class="order-time">
										<span>实际付款</span>
										<i>{{order.total_amount}}</i>
									</div>
									<div class="order-time">
										<span>创建订单时间</span>
										<i>{{order.created_at}}</i>
									</div>
									<div v-show="order.payment_time"
											 class="order-time">
										<span>付款时间</span>
										<i>{{order.payment_time}}</i>
									</div>

								</div>
								<div class="right">
									<img :src="order_status[order.status].icon"
											 alt>
									<span>{{order_status[order.status].status_desc_1}}</span>
								</div>
							</div>
							<div v-if="order.status>1"
									 class="subtitle">
								<span>发货信息</span>

							</div>
							<div v-if="order.status>1"
									 class="order-info">
								<div class="left">

									<div class="order-time">
										<span>发货时间</span>
										<i>{{order.express_at}}</i>
									</div>
									<div class="order-time">
										<span>备注</span>
										<i>{{order.express_remark}}</i>
									</div>

								</div>

							</div>
							<div class="btnBox">
								<div v-if="order.closed"
										 class="nextstep">
									<el-button type="button"
														 size="medium">订单已关闭</el-button>
								</div>
								<div v-if="!order.closed"
										 class="nextstep">
									<el-button type="button"
														 @click.native="connectSaler()"
														 size="medium">联系卖家</el-button>
								</div>
								<div v-if="!order.closed && order.status==2"
										 class="nextstep">
									<el-button type="button"
														 @click.native="confirm(order.id)"
														 size="medium">确认收货</el-button>
								</div>
								<div v-if="!order.closed && order.status==0"
										 class="nextstep">
									<el-button type="button"
														 @click.native="destroy(order.id)"
														 size="medium">取消订单</el-button>
								</div>
								<div v-if="!order.closed && order.status==0"
										 class="nextstep">
									<el-button type="button"
														 @click.native="pay(order.id)"
														 size="medium">去付款</el-button>
								</div>
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
	export default {
		computed: {
			logo () {
				if (undefined != this.goods.logo) {
					if (this.goods.logo.indexOf('aliyuncs') > 0) {
						return this.goods.logo + '?x-oss-process=image/auto-orient,1/interlace,1/resize,m_lfit,w_180/quality,q_90'
					}
					return this.goods.logo
				}
				return '';
			}
		},
		data () {
			return {
				id: '',
				goods: {
					logo: '/images/blank.png'
				},
				order_status: {
					'-1': {
						status_desc_1: "-",
						status_desc_2: "---",
						icon: '/images/blank.png'
					},
					0: {
						status_desc_1: "待支付",
						status_desc_2: "30分钟未支付订单将自动取消",
						icon: '/images/shop/order-dfk.png'
					},
					1: {
						status_desc_1: "待发货",
						status_desc_2: "你已付款成功，等待商家发货",
						icon: '/images/shop/order-dfh.png'
					},
					2: {
						status_desc_1: "待收货",
						status_desc_2: "24小时未处理订单将自动确认收货",
						icon: '/images/shop/order-dsh.png'
					},
					3: {
						status_desc_1: "已完成",
						status_desc_2: "交易已完成，如需售后请联系客服",
						icon: '/images/shop/order-ywc.png'
					},
					4: {
						status_desc_1: "退货中",
						status_desc_2: "协商处理中，请及时关注订单状态",
						icon: '/images/shop/order-thh.png'
					},
				},
				order: {
					status: -1
				}
			}
		},
		created () {
			this.id = this.$route.params.order;
			this.getDetail();
		},
		methods: {
			async getDetail () {
				const loading = this.$loading({
					lock: true,
					text: "请稍等",
				});
				this.$http.get('/api/v1/order/' + this.id, { loading: true })
					.then(({ data }) => {
						this.order = data.order;
						let index = this.order.goods_title.indexOf(' ');
						let title = this.order.goods_title.substr(index + 1)
						let game_name = this.order.goods_title.substr(0, index)
						let goods = {
							uuid: this.order.goods_uuid,
							logo: this.order.goods_logo,
							title: title,
							game_name: game_name,
							server_name: this.order.goods_server,
							amount: this.order.goods_price
						};
						this.goods = goods;
						loading.close()
					}).catch(({ response }) => {
						loading.close()
						if (response.status == 404) {
							this.$router.back()
						}
					});
			},
			connectSaler () {
				this.$message.error('请时候用搜瓜App联系')
			},
			async destroy (id) {

				let message = "您确定要[取消]该订单吗？";
				await this.$confirm(message, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					const loading = this.$loading({ lock: true, text: "取消订单中" });
					this.$http.post('api/v1/order/' + id + '/close', {}, { loading: true }).then(({ message }) => {
						loading.close()
						this.$message.success(message)
						this.$router.back()
					}).catch(() => {
						loading.close()
					});
				})

			},
			async	confirm (id) {
				let message = "您确定要[确认收货]该订单吗？";
				await this.$confirm(message, '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning',
					center: true
				}).then(() => {
					const loading = this.$loading({ lock: true, text: "确认收货中" });
					this.$http.post('api/v1/order/confirm/' + id, {}, { loading: true }).then(({ message }) => {
						loading.close()
						this.$message.success(message);
						this.getDetail()
						// setTimeout(() => {
						// 	window.location.reload()
						// }, 500)
					}).catch(() => {
						loading.close()

					});

				})

			},
			pay (id) {
				this.$message.error('......')
				//this.$router.push({ name: 'pay.type', params: { 'order': id } })
			}

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
	.order {
		position: relative;
	}
	.details {
		background: #fff;
		.title {
			font-size: 14px;
			font-weight: bold;
			padding-left: 16px;
			line-height: 50px;
			background-color: #fff;
			border-bottom: 1px solid #ededed;
		}
		.content {
			padding: 20px 16px;
			.subtitle {
				padding-left: 20px;
				background: #f5f5f5;
				overflow: hidden;
				span {
					float: left;
					font-size: 14px;
					font-weight: bold;
					line-height: 40px;
					&::before {
						content: "";
						width: 0px;
						height: 16px;
						border: 1.5px solid #000;
						margin-right: 10px;
					}
				}
				i {
					float: right;
					font-size: 14px;
					font-weight: 400;
					line-height: 40px;
					margin-right: 60px;
				}
			}
			.buyer-info {
				border: 1px solid #f5f5f5;
				padding: 20px 34px;
				.info-item {
					margin-bottom: 20px;
					span {
						font-size: 14px;
						font-weight: 400;
						color: #999;
						margin-right: 5px;
					}
					i {
						font-size: 14px;
						font-weight: 400;
						margin-right: 50px;
					}
				}
				img {
					width: 15px;
					height: auto;
					vertical-align: middle;
					margin-right: 10px;
				}
				b {
					font-size: 14px;
					font-weight: 400;
					color: #000;
				}
			}
			.order-info {
				display: flex;
				padding: 6px 30px 20px 30px;
				.left {
					flex: 1;
					font-size: 14px;
					font-weight: 400;
					.order-time {
						margin-top: 14px;
						span {
							display: inline-block;
							width: 90px;
							text-align: right;
							margin-right: 34px;
							color: #666;
						}
						i {
							color: #666;
						}
					}
					.account {
						margin-top: 14px;
						display: flex;
						span {
							display: inline-block;
							width: 90px;
							text-align: right;
							margin-right: 34px;
							color: #666;
						}
						&-item {
							width: 300px;
							background-color: #f5f5f5;
							padding: 14px 19px;
							p {
								&:first-child {
									margin-bottom: 14px;
								}
								color: #666;
							}
						}
					}
				}
				.right {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					img {
						width: 80px;
						height: 80px;
						margin-right: 12px;
						vertical-align: middle;
					}
					span {
						font-size: 14px;
						font-weight: 400;
					}
				}
				.right1 {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					img {
						width: 60%;
						margin-right: 12px;
						vertical-align: middle;
					}
					span {
						font-size: 14px;
						font-weight: 400;
					}
				}
			}
		}
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

	.el-button {
		background: #000;
		border: 1px solid #000;
		color: #fff;
		padding: 11px 20px;
		font-size: 12px;
	}
	.btnBox {
		display: flex;
		justify-content: center;
		.nextstep {
			margin-top: 20px;
			//	margin-bottom: 60px;
			margin-right: 10px;
			display: flex;
			align-items: center;
			justify-content: center;
		}
	}
</style>
