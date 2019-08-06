<template>
	<div class="person">
		<v-header></v-header>
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>个人中心</el-breadcrumb-item>
			</el-breadcrumb>
			<v-content>
				<div slot="aside">
					<v-aside></v-aside>
				</div>
				<div slot="main">
					<div class="user-center">
						<div class="title">用户中心</div>
						<div class="info">
							<div class="left">
								<div class="base">
									<img v-if="currentUser.avatar!=''"
											 class="icon"
											 :src="currentUser.avatar"
											 alt>
									<img v-else
											 class="icon"
											 src="~$assets/images/gerentouxiang.png"
											 alt>
									<span>上午好！{{currentUser.nickname}}</span>

									<router-link tag="a"
															 :to="{name:'person.profile'}">
										<img class="edit"
												 src="~$assets/images/bianji.png"
												 alt>
									</router-link>
								</div>
								<ul>
									<li>买家成交数：{{orderCount.buyer_count[3].num}}件</li>
									<li>未结算资金：{{AccountTotal.account}}元</li>
									<li>卖家成交数：{{orderCount.seller_count}}件</li>
									<li>已结算资金：{{AccountTotal.accounted}}元</li>
								</ul>
							</div>
							<div class="right">
								<p>快捷入口</p>
								<div class="group">
									<a tag="a"
										 @click="toMyStore"
										 class="graphic m-right">
										<img src="~$assets/images/dianpu.png"
												 alt>
										<span>店铺首页</span>
									</a>
									<router-link tag="a"
															 :to="{name:'person.card'}"
															 class="graphic">
										<img src="~$assets/images/yinhangka.png"
												 alt>
										<span>银行卡管理</span>
									</router-link>
								</div>
							</div>
						</div>
						<div class="order"
								 @click="toOrder">
							<div class="order-graphic">
								<i>{{orderCount.buyer_count[0].num}}</i>
								<span>待付款</span>
							</div>
							<div class="order-graphic">
								<i>{{orderCount.buyer_count[1].num}}</i>
								<span>待发货</span>
							</div>
							<div class="order-graphic">
								<i>{{orderCount.buyer_count[2].num}}</i>
								<span>待收货</span>
							</div>
							<div class="order-graphic">
								<i>{{orderCount.buyer_count[3].num }}</i>
								<span>已完成</span>
							</div>
							<div class="order-graphic">
								<i>{{orderCount.buyer_count[4].num}}</i>
								<span>退货中</span>
							</div>
						</div>
					</div>
					<div class="safe-center">
						<div class="title">我的安全中心</div>
						<div class="safe-list">
							<div class="safe-item">
								<div class="left">
									<img v-if="pwdImg"
											 src="~$assets/images/true.png"
											 alt>
									<img v-else
											 src="~$assets/images/false.png"
											 alt>
									<i>登录密码</i>
									<span>英文加数字或者富豪的组合密码，安全性更高，建议您定期更换密码。</span>
								</div>
								<router-link tag="a"
														 :to="{name:'person.resetpwd'}">修改</router-link>
							</div>
							<div class="safe-item">
								<div class="left">
									<img v-if="payImg"
											 src="~$assets/images/true.png"
											 alt>
									<img v-else
											 src="~$assets/images/false.png"
											 alt>
									<i>支付密码</i>
									<span>在您支付时，输入正确的支付密码，保障您的资金和账户更安全。</span>
								</div>
								<router-link tag="a"
														 :to="{name:'person.resetpaypwd'}">{{payImg?"修改":"设置"}}</router-link>
							</div>
							<div class="safe-item">
								<div class="left">
									<img v-if="authImg"
											 src="~$assets/images/true.png"
											 alt>
									<img v-else
											 src="~$assets/images/false.png"
											 alt>
									<i>实名认证</i>
									<span>发布商品时需完成实名认证，使您的交易更安全。</span>
								</div>
								<router-link tag="a"
														 :to="{name:'person.approve'}">{{authImg?"通过":"认证"}}</router-link>
							</div>
						</div>
					</div>
					<div class="link-center">
						<div class="title">相关链接</div>
						<div class="link-list">
							<div class="link-app">
								<div class="text">扫一扫下载搜瓜</div>
								<div class="graphic">
									<img class="qrcode"
											 src="~$assets/images/erweima.png"
											 alt>
									<div class="btn-group">
										<a class="download"
											 href="javascript:">
											<img src="~$assets/images/pingguo.png"
													 alt>
											<span>IOS下载</span>
										</a>
										<a class="download m-top"
											 href="javascript:">
											<img src="~$assets/images/android.png"
													 alt>
											<span>Android下载</span>
										</a>
									</div>
								</div>
							</div>

							<div class="link-item">
								<div class="text">
									<img src="~$assets/images/weibo.png"
											 alt>
									<span>微博公众号</span>
								</div>
								<div class="qrcode">
									<img src="~$assets/images/weibo_erweima.png"
											 alt>
								</div>
							</div>
							<div class="link-item">
								<div class="text">
									<img src="~$assets/images/weixin.png"
											 alt>
									<span>微信公众号</span>
								</div>
								<div class="qrcode">
									<img src="~$assets/images/weixin_ewm.png"
											 alt>
								</div>
							</div>
						</div>
					</div>
					<div class="recommend-center">
						<div class="title">
							<span>&nbsp;</span>
						</div>
						<!-- <ul>
							<li class="recommend-item"
									v-for="(item,key) in dlList.slice(0,4)"
									:key="key"
									@click="onGoods">
								<img class="icon"
										 :src="item.logo"
										 alt />
								<div class="desc">
									<h4>{{item.title}}</h4>
									<p>
										<span>{{item.amount}}</span>
										<i>库存:{{item.store_nums}}件</i>
									</p>
								</div>
							</li>
            </ul>-->
					</div>
				</div>
			</v-content>
		</div>
		<v-footer></v-footer>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from "vuex";
	import VHeader from "$components/VHeader";
	import VFooter from "$components/VFooter";
	import VContent from "$components/VContent";
	import VAside from "$components/VAside";
	import * as services from "$modules/person/services";
	import user from '$api/user'
	export default {
		computed: {
			...mapGetters(["currentUser"]),
		},
		data () {
			return {
				pwdImg: false,
				payImg: false,
				authImg: false,
				orderCount: {
					buyer_count: {
						0: {
							num: 0
						},
						1: {
							num: 0
						},
						2: {
							num: 0
						},
						3: {
							num: 0
						},
						4: {
							num: 0
						}
					},
					seller_count: 0
				},
				AccountTotal: {
					accounted: 0,
					account: 0
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
			onGoods () {
				this.$router.push({ name: "goods", params: { goods: "123" } });
			},
			async getOrderCount () {
				services.getOrderCount().then(data => {
					console.log(data)
					this.orderCount.seller_count = data.data.seller_count;

					Object.keys(data.data.buyer_count).forEach(key => {
						this.orderCount.buyer_count[key] = data.data.buyer_count[key];
					});
				});
			},
			async getAccountTotal () {
				services.getAccountTotal().then(data => {
					this.AccountTotal = data.data;
				});
			},
			async checkSetPwd () {
				user.getUserInfo(true).then(({ data }) => {
					this.payImg = data.user.is_set_paypasswd;
					if (data.user.easemob.password != '') {
						this.pwdImg = true
					}
				})
			},
			authStatus () {
				user.getAuthStatus().then(({ data }) => {
					if (data.auth_status.is_auth == 2) {
						this.authImg = true;
					}
				})

			},
			toMyStore () {
				if (this.currentUser.store != '') {
					window.location.href = "/" + this.currentUser.store.hash_id
				} else {
					this.$router.push({ name: "home" })
				}
			},
			toOrder () {
				this.$router.push({ name: 'buyer.order' });
			}
		},
		mounted () {
			this.getOrderCount();
			this.getAccountTotal();
			this.checkSetPwd();
			this.authStatus();
		},
		filters: {
			checkNum (num) {
				alert(num);
			}
		}
	};
</script>

<style lang="scss" scoped>
	.user-center {
		.title {
			font-size: 14px;
			font-weight: 400;
			padding-left: 16px;
			line-height: 60px;
			background-color: #fff;
			border-bottom: 1px solid #ededed;
		}
		.info {
			padding: 30px;
			background: #fff;
			display: flex;
			.left {
				width: 50%;
				.base {
					display: flex;
					.icon {
						width: 46px;
						height: 46px;
						margin-right: 10px;
					}
					span {
						font-size: 16px;
						line-height: 46px;
						font-weight: 400;
					}
					.edit {
						padding-top: 3px;
						width: 40px;
						height: 40px;
					}
				}
				ul {
					margin-top: 30px;
					overflow: hidden;
					li {
						padding-left: 29px;
						float: left;
						width: 50%;
						font-size: 14px;
						font-weight: 400;
						color: #666;
						line-height: 30px;
					}
				}
			}
			.right {
				margin-left: 100px;
				p {
					font-size: 16px;
					line-height: 46px;
					font-weight: 400;
				}
				.group {
					display: flex;
					margin-top: 10px;
					.graphic {
						display: flex;
						flex-direction: column;
						align-items: center;
						justify-content: center;
						img {
							width: 50px;
							height: 50px;
						}
						span {
							font-size: 14px;
							font-weight: 400;
							color: #666;
							line-height: 30px;
						}
					}
				}
			}
		}
		.order {
			padding-top: 30px;
			padding-bottom: 30px;
			background: #fff;
			display: flex;
			align-items: center;
			justify-content: space-around;
			&-graphic {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				i {
					font-size: 16px;
					font-weight: 400;
					line-height: 30px;
				}
				span {
					font-size: 14px;
					font-weight: 400;
					line-height: 30px;
					color: #666;
				}
			}
		}
	}
	.m-right {
		margin-right: 120px;
	}

	.safe-center {
		background-color: #fff;
		margin-top: 16px;
		.title {
			font-size: 14px;
			font-weight: 400;
			padding-left: 16px;
			line-height: 60px;
			border-bottom: 1px solid #ededed;
		}
		.safe-list {
			padding: 37px 60px 17px 30px;
		}
	}
	.safe-item {
		display: flex;
		justify-content: space-between;
		margin-bottom: 20px;
		a {
			font-size: 14px;
			font-weight: 400;
			text-decoration: underline;
			color: #000;
		}
		.left {
			display: flex;
			img {
				width: 23px;
				height: 23px;
				margin-right: 13px;
			}
			i {
				font-size: 14px;
				font-weight: 400;
				line-height: 23px;
				margin-right: 53px;
			}
			span {
				font-size: 12px;
				line-height: 23px;
				font-weight: 400;
				color: #999;
			}
		}
	}
	.link-center {
		background-color: #fff;
		.title {
			font-size: 14px;
			font-weight: 400;
			padding-left: 16px;
			line-height: 60px;
			border-bottom: 1px solid #ededed;
		}
		.link-list {
			display: flex;
			justify-content: space-between;
			padding: 40px 80px 10px 60px;
		}
	}
	.link-app {
		.graphic {
			display: flex;
			align-items: center;
			justify-content: center;
			margin-top: 20px;
			.qrcode {
				width: 90px;
				height: 90px;
				margin-right: 25px;
			}
			.btn-group {
				display: flex;
				flex-direction: column;
				align-items: center;
				justify-content: center;
				.download {
					width: 140px;
					height: 30px;
					border-radius: 15px;
					background: #000;
					text-align: center;
					display: flex;
					align-items: center;
					justify-content: center;
					img {
						width: 20px;
						height: 20px;
						padding-right: 5px;
					}
					span {
						height: 30px;
						font-size: 12px;
						font-weight: 400;
						line-height: 30px;
						color: #fff;
					}
				}
			}
		}
	}
	.link-item {
		.text {
			img {
				width: 20px;
				height: 20px;
				margin-right: 5px;
				vertical-align: middle;
			}
			span {
				font-size: 14px;
				font-weight: 400;
			}
		}
		.qrcode {
			margin-top: 20px;
			img {
				width: 90px;
				height: 90px;
			}
		}
	}
	.m-top {
		margin-top: 10px;
	}

	.recommend-center {
		background-color: #fff;
		.title {
			display: flex;
			justify-content: space-between;
			align-items: center;
			font-size: 14px;
			font-weight: 400;
			padding-left: 16px;
			padding-right: 16px;
			line-height: 60px;
			border-bottom: 1px solid #ededed;
			a {
				color: #999;
			}
		}
		ul {
			overflow: hidden;
			padding-top: 40px;
			padding-bottom: 40px;
		}
	}
	.recommend-item {
		max-width: 226px;
		padding: 8px 9px;
		margin-left: 16px;
		background: #f2f2f2;
		cursor: pointer;
		float: left;
		.icon {
			width: 208px;
			height: 130px;
		}
		.desc {
			h4 {
				font-size: 12px;
				font-weight: 400;
				line-height: 18px;
			}
			p {
				display: flex;
				justify-content: space-between;
				margin-top: 15px;
				span {
					font-size: 14px;
					font-weight: bold;
					line-height: 18px;
				}
				i {
					font-size: 12px;
					font-weight: 400;
					color: #999;
					line-height: 18px;
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
</style>
