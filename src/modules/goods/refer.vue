<template>
	<div class="home">
		<v-header></v-header>

		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>填写订单</el-breadcrumb-item>
			</el-breadcrumb>
			<div class="goods-info">
				<div class="title">商品信息</div>
				<div class="content">
					<img :src="goods.logo"
							 alt>
					<div class="text">
						<h4>{{goods.title}}</h4>
						<p>
							游戏区服：
							<span>{{goods.server_name}}</span>
						</p>
						<p>
							商品价格：
							<s>￥{{goods.amount}}</s>
						</p>
						<p>
							发布数量：
							<i>{{goods.store_nums}}件</i>
						</p>
					</div>
				</div>
			</div>
			<div class="user-info">
				<div class="title">
					<span>收货人信息</span>
					<i>请您认真核对填写的联系方式，以便客服及时能够联系到您</i>
				</div>
				<div class="content">
					<el-form label-position="left"
									 label-width="110px">
						<el-form-item label="收货人手机号">
							<el-input v-model="receiver_mobile"></el-input>
						</el-form-item>
						<el-form-item label="联系QQ">
							<el-input v-model="receiver_qq"></el-input>
							<span class="tips">客服将以此QQ号确定买家身份</span>
						</el-form-item>
					</el-form>
				</div>
			</div>
			<div class="refer-info">
				<div class="title">确认提交订单</div>
				<div class="content">
					<van-cell-group>
						<van-cell title="购买数"
											value="1件" />
						<van-cell title="商品价格">￥{{goods.amount}}</van-cell>
					</van-cell-group>
					<el-checkbox class="cehckbox"
											 v-model="checked">
						点击提交订单表示已阅读并同意
						<!-- <a href>《搜瓜用户服务协议及规则》</a> -->
						<a @click="showAgree">《担保服务购买须知》</a>
						<!-- <a href>《交易安全险》</a> -->
					</el-checkbox>
					<agree title="担保服务协议"
								 ref="agree"
								 :content="insureContent" />
					<div class="confirm">
						<i>实际付款</i>
						<span>{{goods.amount}}</span>
						<el-button @click="next"
											 :class="{disabled: !canSubmit}">提交订单</el-button>
					</div>
				</div>
			</div>
		</div>

		<v-footer />
	</div>
</template>

<script>
	import VHeader from "$components/VHeader";
	import VFooter from "$components/VFooter";
	import Pagination from "$components/Pagination";
	import Agree from "$components/Agree";
	import Cell from "vant/lib/cell";
	import CellGroup from "vant/lib/cell-group";
	import "vant/lib/cell/style";
	import "vant/lib/cell-group/style";
	import protocol from "$api/protocol";
	import localforage from "localforage";

	import * as service from "$modules/goods/services";
	export default {
		data () {
			return {
				currentPage: 1,
				checked: false,
				receiver_mobile: "",
				receiver_qq: "",
				goods: {},
				insureContent: '',
				creating: false
			};
		},
		watch: {
			receiver_mobile (val) {
				localforage.setItem("receiver_mobile", val);
			},
			receiver_qq (val) {
				localforage.setItem("receiver_qq", val);
			}
		},
		computed: {
			canSubmit () {
				if (this.receiver_mobile != "" && this.receiver_qq != "") {
					return true;
				}
				return false;
			}
		},
		created () {
			this.goodsId = this.$route.params.goods;
			this.getDetail();
			this.getSaleProtocol();
			this.getToken();
			localforage.getItem("receiver_mobile").then(val => {
				val == "" || (this.receiver_mobile = val);
			});
			localforage.getItem("receiver_qq").then(val => {
				val == "" || (this.receiver_qq = val);
			});
			if (
				this.$cookies.get("goods-spread") != undefined &&
				this.$cookies.get("goods-spread") != "undefined"
			) {
				this.spread_id = this.$cookies.get("goods-spread");
			}
			if (this.$route.query["spread_id"] != undefined) {
				this.spread_id = this.$route.query["spread_id"];
			}
		},
		methods: {
			next () {
				if (this.canSubmit) {
					if (this.checked == false) {
						this.$toast({ message: "您必须同意《担保服务协议》才能继续" });
						return;
					}
					if (!this.creating) {
						this.creating = true;
						// 创建订单
						let param = {
							num: 1,
							receiver_mobile: this.receiver_mobile,
							receiver_qq: this.receiver_qq,
							express_type: 0,
							spread_id: this.spread_id,
							_token: this.token
						};
						this.$toast.loading({ mask: true });
						this.$http
							.post("api/v1/order/" + this.goodsId, param)
							.then(({ data }) => {
								this.$toast.clear();
								this.creating = false;
								let orderId = data.id;
								this.$router.push({
									name: "pay.type",
									params: { order: orderId }
								});
							})
							.catch(({ data }) => {
								this.$toast.clear();
								this.creating = false;
								this.$toast(data.message);
							});
					}
				} else {
					this.$toast.fail("请先输入收货信息");
				}
			},
			async getDetail () {
				this.$toast.loading({ mask: true });
				service.goodsView(this.goodsId).then(({ data }) => {
					this.goods = data.goods;
					window.document.title = this.goods.title;
					this.$toast.clear();
				});
			},
			showAgree () {
				this.$refs.agree.show();
			},
			getSaleProtocol () {
				protocol.getProtocol("insure").then(data => {
					this.insureContent = data.data.content;
				});
			},
			getToken () {
				this.$http.get("api/request-token").then(data => {
					this.token = data.data;
				});
			}
		},
		components: {
			VHeader,
			VFooter,
			Pagination,
			Agree,
			[Cell.name]: Cell,
			[CellGroup.name]: CellGroup
		}
	};
</script>

<style lang="scss" scoped>
	.goods-info {
		background: #fff;
		margin-bottom: 16px;
		.title {
			font-size: 14px;
			font-weight: bold;
			padding-left: 16px;
			line-height: 50px;
			border-bottom: 1px solid #ededed;
		}
		.content {
			display: flex;
			padding: 36px 43px;

			img {
				width: 260px;
				height: 150px;
				margin-right: 40px;
			}
			.text {
				h4 {
					font-size: 16px;
					font-weight: bold;
					color: #000;
				}
				p {
					margin-top: 16px;
					font-size: 12px;
					font-weight: 400;
					color: #999;
					span {
						color: #000;
					}
					i {
						color: #000;
					}
					s {
						text-decoration: none;
						font-size: 16px;
						color: #ff2e2e;
					}
				}
			}
		}
	}
	.user-info {
		background: #fff;
		margin-bottom: 16px;
		.title {
			padding-left: 16px;
			line-height: 50px;
			border-bottom: 1px solid #ededed;
			span {
				color: #000;
				font-size: 14px;
				font-weight: bold;
				margin-right: 15px;
			}
			i {
				font-size: 12px;
				font-weight: 300;
				color: #999;
			}
		}
		.content {
			padding: 25px 43px 10px 43px;
		}
	}
	.refer-info {
		background: #fff;
		margin-bottom: 60px;
		.title {
			font-size: 14px;
			font-weight: bold;
			padding-left: 16px;
			line-height: 50px;
			border-bottom: 1px solid #ededed;
		}
		.content {
			padding-left: 43px;
			padding-right: 43px;
			overflow: hidden;
			.confirm {
				padding-bottom: 80px;
				display: flex;
				justify-content: flex-end;
				align-items: flex-end;
				i {
					font-size: 14px;
					font-weight: 300;
					color: #666;
					margin-right: 5px;
				}
				span {
					font-size: 30px;
					font-weight: bold;
					color: #000;
					margin-right: 28px;
				}
			}
		}
	}
	.el-button {
		background: #f4c93a;
		border: 1px solid #f4c93a;
		color: #000;
		width: 130px;
		font-size: 12px;
	}
	.cehckbox {
		margin-top: 50px;
		margin-bottom: 90px;
		display: flex;
		align-items: center;
		justify-content: center;
		a {
			color: #000;
		}
	}
	.el-form-item {
		position: relative;
		width: 400px;
		margin-bottom: 15px;
	}
	.tips {
		position: absolute;
		top: 0;
		right: -210px;
		font-size: 12px;
		color: #999;
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
