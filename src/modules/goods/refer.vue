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
									 label-width="80px">
						<el-form-item label="您的姓名">
							<el-col :span="12">
								<el-input v-model="receiver_name"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="您的电话">
							<el-col :span="12">
								<el-input v-model="receiver_mobile"></el-input>
							</el-col>
						</el-form-item>

						<el-form-item label="所选服务">
							<el-select v-model="serviceValue.value"
												 @change="getTotal"
												 placeholder="请选择担保产品"
												 style="width:516px">
								<el-option v-for="(item ,index) in services"
													 :key="index"
													 :label="item.name"
													 :value="index"></el-option>
							</el-select>
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
						<van-cell title="配送方式">在线发货</van-cell>
					</van-cell-group>
					<el-checkbox class="cehckbox"
											 v-model="isagree">
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
						<span>{{totalHtml}}</span>
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
				gameId: "",
				total: 0,
				totalHtml: "",
				goods: {},
				serviceColumns: [],
				defaultIndex: 2,
				receiver_name: "",
				receiver_mobile: "",
				services: [
					{ name: "30天担保产品", value: "1", day: 30, rate: 0.1 },
					{ name: "60天担保产品", value: "2", day: 60, rate: 0.15 },
					{ name: "不参与担保服务", value: "0", day: 0, rate: 0 }
				],
				serviceValue: {
					value: "不参与担保服务",
					index: 2
				},
				creating: false,
				insureContent: "",
				isagree: false,
				spread_id: 0,
				token: ""
			};
		},
		watch: {
			receiver_name (val) {
				localforage.setItem("receiver_name", val);
			},
			receiver_mobile (val) {
				localforage.setItem("receiver_mobile", val);
			}
		},
		computed: {
			canSubmit () {
				if (this.receiver_name != "" && this.receiver_mobile != "") {
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
			localforage.getItem("receiver_name").then(val => {
				val == "" || (this.receiver_name = val);
			});
			localforage.getItem("receiver_mobile").then(val => {
				val == "" || (this.receiver_mobile = val);
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
					if (
						this.serviceValue.index != this.serviceColumns.length - 1 &&
						this.isagree == false
					) {
						this.$message.error({
							message: "您必须同意《担保服务协议》才能继续"
						});
						return;
					}
					if (!this.creating) {
						this.creating = true;
						// 创建订单
						let param = {
							num: 1,
							receiver_name: this.receiver_name,
							receiver_mobile: this.receiver_mobile,
							express_type: 0,
							insure: this.serviceValue.index,
							spread_id: this.spread_id,
							_token: this.token
						};
						const loading = this.$loading({
							lock: true,
							text: "正在下单"
						});
						this.$http
							.post("api/v1/order/" + this.goodsId, param)
							.then(({ data }) => {
								loading.close();
								this.$message.success("下单成功");
								this.creating = false;
								let orderId = data.id;
								//	this.$router.push({ name: 'pay.type', params: { 'order': orderId } })
							})
							.catch(({ data }) => {
								loading.close();
								this.creating = false;
								this.$message.error(data.message);
							});
					}
				} else {
					this.$message.error("请先输入收货信息");
				}
			},
			async getDetail () {
				const loading = this.$loading({
					lock: true,
					text: "加载中",
				});
				await this.$http.get("/api/v1/goods/" + this.goodsId).then(({ data }) => {
					loading.close();
					this.goods = data.goods;

					this.initService();
					this.getTotal();
				});
			},
			getTotal (e) {
				if (e == undefined) {
					var rate = this.services[this.serviceValue.index].rate;
				} else {
					this.serviceValue.index = e;
					var rate = this.services[this.serviceValue.index].rate;
				}

				this.total = this.goods.amount * rate + this.goods.amount;
				this.totalHtml = " ¥ " + this.formatMoney(this.total) + " 元";
			},
			initService () {
				this.services.forEach(value => {
					let name = value.name;
					if (value.value != "0") {
						name =
							name +
							" ( ¥ " +
							this.formatMoney(this.goods.amount * value.rate) +
							")";
					}
					this.serviceColumns.push(name);
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
			padding-left: 26px;
			padding-right: 26px;
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
