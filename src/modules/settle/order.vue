<template>
	<div>
		<v-header />
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>会员管理</el-breadcrumb-item>
				<el-breadcrumb-item>结算管理</el-breadcrumb-item>
			</el-breadcrumb>
			<v-content>
				<div slot="aside">
					<v-aside></v-aside>
				</div>

				<div slot="main">
					<v-tabs :tabs="mainTabs"
									activeTab="order"
									@changeTab="changeTab" />

					<div class="preview-bd">
						<div class="preview">
							<div class="one">
								<div class="left">
									<i>可提现金额</i>
									<span>￥ {{ currentUser.wallet.amount|formatMoney }}</span>
								</div>
								<div class="right">
									<el-button @click.native.prevent
														 type="button"
														 size="primary">申请提现</el-button>
								</div>
							</div>
							<div class="two">
								<div class="left">
									<i>结算总金额</i>
									<span>￥{{ info.settled|formatMoney }}</span>
								</div>
								<span class="center"></span>
								<div class="right">
									<el-date-picker v-model="currentDate"
																	placeholder="按月份查询"
																	type="month"
																	:editable="false"
																	@change="changeMonth">
									</el-date-picker>
								</div>
							</div>
						</div>
					</div>

					<div class="
																	settlelist">
						<el-table :data="items"
											style="width: 100%; text-align:center;">
							<el-table-column align="center"
															 prop="order_id"
															 label="订单号"></el-table-column>
							<el-table-column align="center"
															 prop="order.goods_title"
															 label="商品名称"></el-table-column>

							<el-table-column align="center"
															 prop="order.total_amount"
															 label="成交价格"></el-table-column>
							<el-table-column align="center"
															 prop="settle_amount"
															 label="结算金额"></el-table-column>
							<el-table-column align="center"
															 prop="created_at"
															 label="结算时间"></el-table-column>
						</el-table>
					</div>
					<pagination :total="total"
											:current-page="page"
											@pagechange="getData"></pagination>
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
	import VTabs from "$components/tabs";
	import Pagination from "$components/Pagination";
	import { mapGetters } from "vuex";
	import Monent from "moment"
	export default {
		data () {
			return {
				month: '',
				rangeSeparator: '',
				defaultValue: '',
				info: {},
				page: 1,
				total: 0,
				currentDate: "",
				mainTabs: [
					{ label: "结算列表", name: "order" },
					{ label: "提现记录", name: "record" }
				],
				items: []
			};
		},
		components: {
			VHeader,
			VFooter,
			VContent,
			VAside,
			VTabs,
			Pagination,
			Monent
		},
		computed: {
			...mapGetters(["currentUser"])

		},
		methods: {
			changeMonth (value) {
				const loading = this.$loading({
					lock: true,
					text: "请稍等",
				});
				this.items = [];
				this.page = 1;
				this.month = Monent(value).format("YYYYMM")
				this.getData(this.page)
				loading.close()
			},
			async getInfo () {
				await this.$http.get("api/v2/user/settles/total").then(({ data }) => {
					this.info = data;
				});
			},
			changeTab (tab, event) {
				this.$router.push({ name: `settle.${tab.name}` });
			},
			changeChildTab (tab, event) {
				console.log(`TCL: handleClick -> datatab.name,event${tab.name} ${event}`);
			},
			onState () {
				this.$router.push({
					name: `distribution.personnel.state`,
					params: { id: "123" }
				});
			},
			onManage (index) {
				console.log("TCL: onManage -> index", index);
				this.curPerson = this.personData[index];
				this.showPopover = true;
			},

			onSubmit () { },
			onCancel (index) {
				this.$refs[`popover-` + index].doClose();
			},
			async getData (currentPage) {
				let param = {
					params: {
						month: this.month,
						page: currentPage,
						include: "order"
					},
					headers: {
						"X-Store-Id": ""
					}
				};

				this.$http.get("api/v2/user/settles", param).then(({ data }) => {
					this.items = [];
					this.items.push(...data.settles.data);
					this.page = data.settles.current_page;
					this.total = data.settles.total;
				});
			}
		}, created () {
			this.getInfo();
			this.getData(this.page)
			this.$store.dispatch("loadUser");
		}
	};
</script>

<style lang="scss" scoped>
	.preview-bd {
		padding: 16px 52px;
		background: #fff;
	}
	.preview {
		width: 100%;
		background: #e8e8e8;
		.one {
			display: flex;
			min-height: 140px;
			border-bottom: 1px solid #dadada;
			.left {
				flex: 1;
				display: flex;
				flex-direction: column;
				justify-content: center;
				align-items: center;
				i {
					font-size: 16px;
					font-weight: 400;
					color: #666;
				}
				span {
					margin-top: 15px;
					font-size: 36px;
					font-weight: 400;
					color: #000;
				}
			}
			.right {
				flex: 1;
				display: flex;
				justify-content: center;
				align-items: center;
			}
		}
	}
	.two {
		display: flex;
		min-height: 100px;
		.left,
		.right {
			flex: 2;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;
			i {
				font-size: 12px;
				font-weight: 400;
				color: #666;
			}
			span {
				margin-top: 10px;
				font-size: 30px;
				font-weight: 400;
				color: #000;
			}
		}
		.center {
			flex: 1;
			max-width: 1px;
			background: #dadada;
			height: 60px;
			margin-top: 20px;
		}
	}
	/deep/.el-table {
		th {
			background: #e0e0e0;
		}
	}
	/deep/.el-popover {
		background: #fff;
		border: 1px solid #ebeef5;
		padding: 35px;
		font-size: 14px;
	}

	/deep/.el-form-item__label {
		text-align: left;
		color: #000;
	}

	.el-button {
		width: 120px;
		background: #f4c93a;
		border: 1px solid #f4c93a;
		color: #000;
		padding: 11px 20px;
		font-size: 12px;
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
