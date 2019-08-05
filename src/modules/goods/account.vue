<template>
	<div class="home">
		<v-header />

		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name: 'home' }">首页</el-breadcrumb-item>
				<el-breadcrumb-item>账号</el-breadcrumb-item>
			</el-breadcrumb>
			<v-tabs :tabs="tabs"
							activeTab
							@changeTab="changeTab" />
			<el-container>
				<el-main>
					<div class="list">
						<el-table :data="goods"
											style="width: 100%; text-align:center;"
											@row-click="clickRow">
							<el-table-column align="center"
															 width="420px"
															 prop
															 label="商品">
								<template slot-scope="scope">
									<div class="goodsname">
										<img :src="scope.row.logo"
												 alt>
										<div class="gameBox">
											<span class>{{scope.row.title|ellipsis}}</span>

											<p>{{scope.row.game_name}}</p>
											<p>{{scope.row.server_name}}</p>
										</div>
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center"
															 prop="amount"
															 label="价格"
															 :formatter="amountFormat"></el-table-column>
							<el-table-column align="center"
															 prop="store_nums"
															 label="库存"
															 :formatter="saleNumsFormat"></el-table-column>

							<el-table-column align="center"
															 label="操作">
								<template slot-scope="scope">
									<el-button type="button"
														 size="small">立即购买</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<pagination :total="total"
											:display="display"
											:current-page="page"
											@pagechange="getList"></pagination>
				</el-main>
				<el-aside width="300px">
					<div class="aside-head">商品精选</div>
					<goods-item />
				</el-aside>
			</el-container>
		</div>

		<v-footer />
	</div>
</template>

<script>
	import VHeader from "$components/VHeader";
	import VFooter from "$components/VFooter";
	import GoodsItem from "./components/GoodsItem";
	import VTabs from "$components/tabs";
	import Pagination from "$components/Pagination";

	import * as service from "$modules/home/services";
	export default {
		filters: {
			ellipsis (value) {
				if (!value) return ''
				if (value.length > 20) {
					return value.slice(0, 20) + '...'
				}
				return value
			}
		},
		data () {
			return {
				goods: [],
				infiniteId: +new Date(),
				total: 0, // 记录总条数
				display: 10, // 每页显示条数
				page: 1, // 当前的页数
				tabs: [
					{ name: "0", label: "全部" },
					{ name: "401", label: "自媒体账号" },
					{ name: "400", label: "网店账号" },
					{ name: "402", label: "社交账号" },
					{ name: "403", label: "视频账号" }
				],

				type: 3,
				type2: 0
			};
		},
		created () {
			this.getList(this.page);
		},
		methods: {
			saleNumsFormat (row, column) {
				return row.store_nums + "件";
			},
			amountFormat (row, column) {
				return "￥" + row.amount;
			},
			changeTab (tab, event) {
				this.page = 1;
				this.type2 = tab.name;
				this.getList(this.page);
			},
			clickRow (row) {
				this.$router.push({
					name: "goods",
					params: { goods: row.uuid }
				});
			},
			onbuy (id, index) {
				this.$router.push({
					name: "goods.refer",
					params: { goods: this.goods[index].uuid }
				});
			},
			async getList (currentPage) {
				let param = {
					params: {
						"fields[store_goods]": "id,title,amount,game_id,game_name,server_name,store_nums,images",
						page: currentPage,
						per_page: this.display
					}
				};
				if (this.type2 != 0) {
					param["params"]["filter[type2]"] = this.type2;
				}
				param["params"]["filter[type]"] = this.type;
				service
					.goods(param)
					.then(({ data }) => {
						this.goods = [];
						this.goods = data.goods.data;
						this.page = currentPage;
						this.total = data.goods.total;
					})
					.catch(({ response }) => {
						this.$router.back();
					});
			}
		},

		components: {
			VHeader,
			VFooter,
			VTabs,
			GoodsItem,
			Pagination
		}
	};
</script>

<style lang="scss" scoped>
	.el-button {
		background: #000;
		border: 1px solid #000;
		color: #fff;
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
	.el-container {
		margin-top: 15px;
		min-height: 400px;
		.el-main {
			max-width: 884px;
			padding: 0;
			margin-right: 16px;
			overflow: hidden;
		}
	}

	/deep/.el-table {
		.cell {
			color: #000;
		}
	}
	.goodsname {
		display: flex;
		align-items: center;
		img {
			width: 88px;
			height: 88px;
			margin-right: 17px;
		}
		.gameBox {
			display: flex;
			flex-direction: column;

			span {
				flex: 1;
				text-align: left;
				overflow: hidden;
				text-overflow: ellipsis;
				display: -webkit-box;
				-webkit-box-orient: vertical;
				-webkit-line-clamp: 3;
			}
			p {
				text-align: left;
				color: #999;
				margin-top: 7px;
				font-size: 10px;
			}
		}
	}
	.aside-head {
		margin-bottom: 15px;
		padding-left: 16px;
		font-size: 16px;
		font-weight: 400;
		height: 50px;
		line-height: 50px;
		background-color: #fff;
	}
</style>
