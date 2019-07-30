<template>
	<div>
		<v-header />
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>分销管理</el-breadcrumb-item>
				<el-breadcrumb-item>分销订单管理</el-breadcrumb-item>
			</el-breadcrumb>
			<v-content>
				<div slot="aside">
					<v-aside></v-aside>
				</div>
				<div slot="main">
					<v-tabs :tabs="tabs"
									activeTab="order"
									@changeTab="changeTab" />

					<div class="orderlist">
						<el-table :data="orderData"
											@row-click="onDetails"
											style="width: 100%; text-align:center;">
							<el-table-column width="170px"
															 align="center"
															 prop="id"
															 label="订单号"></el-table-column>
							<el-table-column width="170px"
															 align="center"
															 prop="goods_title"
															 label="商品名称"></el-table-column>

							<el-table-column align="center"
															 prop="goods_price"
															 label="订单价格"></el-table-column>

							<el-table-column align="center"
															 prop="status"
															 label="订单状态"
															 :filters="typeFilter"
															 :filter-method="filterType"
															 filter-placement="bottom-end"
															 :filter-multiple="false">
								<template slot-scope="scope">
									<span>{{scope.row.status_label}}</span>
								</template>
							</el-table-column>

							<el-table-column align="center"
															 prop="created_at"
															 label="下单时间"></el-table-column>

						</el-table>
					</div>
					<pagination :total="total"
											:display="display"
											:current-page="page"
											@pagechange="getOrder"></pagination>
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
	import * as services from "$modules/sellerorder/services";
	export default {
		computed: {
			showPeople () {
				return !(_.indexOf(this.$currentStore().roles, '分销店铺') != -1)
			},
			isFenxiaoyuan () {
				return !(_.indexOf(this.$currentStore().roles, '推广店铺') != -1)
			},
			tabs () {
				if (this.isFenxiaoyuan) {
					return [
						{ label: "分销任务", name: "task" },
						{ label: "分销人员管理", name: "personnel" },
						{ label: "分销订单管理", name: "order" }
					]
				} else if (this.showPeople) {
					return [
						{ label: "分销人员管理", name: "personnel" },
						{ label: "分销订单管理", name: "order" }
					]
				}
			}
		},
		data () {
			return {

				typeFilter: [
					{ text: "待发货", value: 1 },
					{ text: "已发货", value: 2 },
					{ text: "已完成", value: 3 },
					{ text: "退货中", value: 4 }
				],
				orderData: [],
				page: 1,
				total: 0,
				display: 15,
				status: -1

			};
		},
		components: {
			VHeader,
			VFooter,
			VContent,
			VAside,
			VTabs,
			Pagination
		},
		methods: {
			changeTab (tab, event) {
				this.$router.push({ name: `distribution.${tab.name}` });
			},
			formatter (row, column) {
				return row.address;
			},
			filterType (value, row) {
				return row.status === value;
			},
			onDetails (row) {
				this.$router.push({
					name: "seller.orderview",
					params: {
						order: row.id
					}
				});
			},
			getOrder (currentPage) {
				const loading = this.$loading({
					lock: true,
					text: "请稍等"
				});
				this.orderData = [];
				let param = {
					params: {
						page: currentPage,
						per_page: this.display
					}
				};
				services.getOrder(param).then(({ data }) => {
					this.orderData = data.orders.data;
					this.page = data.orders.current_page;
					this.total = data.orders.total;
					loading.close();
				});
			}
		},
		created () {
			this.getOrder(this.page);
		}
	};
</script>
<style lang="scss">
	// 关于弹出类窗口无法改动样式
	.el-table-filter {
		background: #ededed;
	}
	.el-table-filter__list-item {
		text-align: center;
		&.is-active {
			background-color: #f3cb3c;
			color: #000;
		}
		&:hover {
			background: #f3cb3c;
			color: #000;
		}
	}
</style>
<style lang="scss" scoped>
	.form-inline {
		margin-top: 17px;
		width: 350px;
		.el-form-item {
			margin-bottom: 17px;
		}
		.el-button {
			width: 80px;
		}
	}
	/deep/.el-form--inline {
		.el-form-item {
			margin-right: 20px;
		}
	}
	/deep/.el-table th > .cell.highlight {
		color: #000;
	}
	/deep/.el-table {
		thead {
			color: #000;
			background: #ededed;
		}
	}

	.el-button {
		background: #000;
		border: 1px solid #000;
		color: #fff;
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