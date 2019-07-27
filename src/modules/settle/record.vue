<template>
	<div>
		<v-header />
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'person.person'}">个人中心</el-breadcrumb-item>
				<el-breadcrumb-item>结算管理</el-breadcrumb-item>
			</el-breadcrumb>
			<v-content>
				<div slot="aside">
					<v-aside></v-aside>
				</div>

				<div slot="main">
					<v-tabs :tabs="tabs"
									activeTab="record"
									@changeTab="changeTab" />
					<div class="settlelist">
						<el-table :data="items"
											style="width: 100%; text-align:center;">
							<el-table-column align="center"
															 prop="created_at"
															 label="提现时间"></el-table-column>
							<el-table-column align="center"
															 prop="amount"
															 label="提现金额"></el-table-column>
							<el-table-column align="center"
															 prop="status_label"
															 label="提现状态">
								<template slot-scope="scope">
									<p v-html='scope.row.status_label'></p>
								</template>
							</el-table-column>

						</el-table>
					</div>
					<pagination :total="total"
											:display="display"
											:current-page="page"
											@pagechange="gethistory"></pagination>
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
	export default {
		data () {
			return {
				tabs: [
					{ label: "结算列表", name: "order" },
					{ label: "提现记录", name: "record" }
				],
				items: [],
				page: 1,
				display: 20,
				total: 0,
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
				this.$router.push({ name: `settle.${tab.name}` });
			},
			async gethistory (currentPage) {
				let param = {
					params: {
						page: currentPage,
						per_page: this.display
					}
				};
				this.$http.get("api/v2/user/withdraws", param).then(({ data }) => {

					this.items = [];
					this.items.push(...data.withdraws.data);
					this.page = data.withdraws.current_page;
					this.total = data.withdraws.total;
				});
			},
		},
		created () {
			this.gethistory(this.page)
		}
	};
</script>

<style lang="scss" scoped>
	.settlelist {
		margin-top: 10px;
		background: #fff;
		.view-btn {
			color: #000;
		}
	}

	/deep/.el-table {
		th {
			background: #ededed;
		}
		td {
			height: 90px;
		}
	}

	/deep/.el-form-item__label {
		text-align: left;
		color: #000;
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
	/deep/span.text-success {
		color: #38c172;
	}
	/deep/span.text-blue {
		color: #3490dc;
	}
	/deep/span.text-red {
		color: #e3342f;
	}
</style>
