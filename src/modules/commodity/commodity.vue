<template>
	<div>
		<v-header />
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'person.person'}">个人中心</el-breadcrumb-item>
				<el-breadcrumb-item>商品管理</el-breadcrumb-item>
			</el-breadcrumb>
			<v-content>
				<div slot="aside">
					<v-aside></v-aside>
				</div>
				<div slot="main">
					<div class="shop">
						<div class="title">
							<span>商品管理</span>
						</div>
						<div class="content">
							<div class="sale">
								<div class="left">
									<i>累计销售</i>
									<b>{{info.total_sale|formatMoney}}</b>
								</div>
								<span class="center"></span>
								<div class="right">
									<i>本月销售</i>
									<b>{{ info.total_sale_month | formatMoney }}</b>
								</div>
							</div>

						</div>
					</div>
				</div>
				<div slot="main">
					<v-tabs :tabs="tabs"
									activeTab="-1"
									@changeTab="changeTab" />

					<div class="commoditylist">
						<el-table :data="goodsData"
											style="width: 100%; text-align:center;"
											@row-click="goodsInfo">
							<el-table-column align="center"
															 width="300px"
															 prop="title"
															 label="商品名称">
								<template slot-scope="scope">
									<div class="commodityname">
										<img :src="scope.row.logo"
												 alt>
										<div class="text">
											<span>{{scope.row.title|ellipsis}}</span>
											<i>{{scope.row.content|ellipsis}}</i>
										</div>
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center"
															 prop="amount"
															 label="单价"
															 :formatter="priceFormat"></el-table-column>
							<el-table-column align="center"
															 prop="store_nums"
															 label="数量"
															 :formatter="numsFormat"></el-table-column>
							<el-table-column align="center"
															 prop="status_label"
															 label="商品状态"></el-table-column>
							<el-table-column align="center"
															 label="操作"
															 width="400px">
								<template slot-scope="scope">
									<div v-if="!isSeller">
										<el-button type="button"
															 v-if="scope.row.status == 3"
															 @click.stop="updateStatus(scope.row.uuid, 'delete')"
															 size="small">删除</el-button>
										<el-button style="background:#fff;color:#000"
															 type="button"
															 v-if="scope.row.status == 5"
															 @click.stop="updateStatus(scope.row.uuid, 'up')"
															 size="small">上架</el-button>
										<el-button type="button"
															 v-if="scope.row.status == 4"
															 @click.stop="copy(scope.row)"
															 size="small">复制链接</el-button>
										<el-button style="background:#fff;color:#000"
															 type="button"
															 v-if="scope.row.status == 4"
															 @click.stop="updateStatus(scope.row.uuid, 'down')"
															 size="small">下架</el-button>
										<el-button style="background:#fff;color:#000"
															 type="button"
															 v-if="scope.row.status == 4&&scope.row.recommend_at==''"
															 @click.stop="updateStatus(scope.row.uuid, 'setRecommend')"
															 size="small">推荐</el-button>

										<el-button style="background:#fff;color:#000"
															 type="button"
															 v-if="scope.row.status == 4&&scope.row.recommend_at!=''"
															 @click.stop="updateStatus(scope.row.uuid, 'dropRecommend')"
															 size="small">取消推荐</el-button>
										<el-button type="button"
															 v-if="scope.row.status == 4"
															 @click.stop="showForm(scope.row)"
															 size="small">分销</el-button>

										<el-button type="button"
															 @click.stop="editGameInfo(scope.row.uuid)"
															 v-if="scope.row.status == 0 && $user().id == scope.row.user_id"
															 size="small">修改</el-button>
									</div>
									<div v-else>
										<el-button type="button"
															 v-if="scope.row.status == 4"
															 @click.stop="copySeller(scope.row)"
															 size="small">复制链接</el-button>

										<el-button type="button"
															 v-if="scope.row.status == 4 && isSellerStore"
															 @click.stop="showForm(scope.row)"
															 size="small">分销</el-button>
									</div>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<el-dialog title="分配推广员"
										 :visible.sync="dialogFormVisible"
										 width="30%">
						<el-form>
							<el-form-item label="分销员ID"
														label-align="right"
														:label-width="formLabelWidth">
								<el-input style="width:80%"
													type="tel"
													v-model="assignUserId"
													placeholder="请输入分销员ID或手机号"
													autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="分润比例"
														:label-width="formLabelWidth">
								<el-input style="width:80%"
													type="number"
													placeholder="请输入分润比例"
													v-model="assignRate"
													autocomplete="off"></el-input>
							</el-form-item>
						</el-form>
						<div slot="footer"
								 class="dialog-footer">
							<el-button @click="dialogFormVisible = false">取 消</el-button>
							<el-button type="primary"
												 @click="assignSubmit">确 定</el-button>
						</div>
					</el-dialog>

					<pagination :total="total"
											:display="display"
											:current-page="page"
											@pagechange="getGoods"></pagination>
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
	import * as services from "$modules/commodity/services";
	import Vue from "vue";
	import VueClipboard from "vue-clipboard2";
	VueClipboard.config.autoSetContainer = true;
	Vue.use(VueClipboard);
	export default {
		filters: {
			ellipsis (value) {
				if (!value) return ''
				if (value.length > 12) {
					return value.slice(0, 12) + '...'
				}
				return value
			}
		},
		computed: {
			isSeller () {
				return _.indexOf(this.$user().roles, "分销员") != -1;
			},
			isSellerStore () {
				return (
					_.indexOf(this.$currentStore().roles, "推广店铺") != -1 &&
					_.indexOf(this.$user().roles, "分销员") == -1
				);
			}
		},
		data () {
			return {
				searchForm: { commodity: "" },
				tabs: [
					{ label: "全部", name: "-1" },
					{ label: "审核中", name: "1" },
					{ label: "审核退回", name: "3" },
					{ label: "在售中", name: "4" },
					{ label: "已下架", name: "5" },
					{ label: "已出售", name: "7" }
				],
				goodsData: [],
				page: 1,
				display: 15,
				status: -1,
				total: 0,
				assignUserId: "",
				assignRate: "",
				currentGoods: {},

				//
				dialogTableVisible: false,
				dialogFormVisible: false,
				formLabelWidth: "120px",
				info: {}
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
			priceFormat (row, column) {
				return "￥" + row.amount;
			},
			numsFormat (row, column) {
				return row.store_nums + "件";
			},
			changeTab (tab, event) {
				this.page = 1;
				this.status = tab.name;
				this.getGoods(this.page);
			},
			goodsInfo (row) {
				this.$router.push({ name: "goods", params: { goods: row.uuid } });
			},

			getGoods (currentPage) {
				this.goodsData = [];
				let param = {
					params: {
						page: currentPage,
						per_page: this.display
					}
				};

				if (this.status != -1) {
					param["params"]["status"] = this.status;
				}
				services.getGoods(param).then(({ data }) => {
					this.goodsData = data.goods.data;
					this.page = data.currentPage;
					this.total = data.goods.total;
				});
			},
			assignSubmit () {
				let params = {
					goods_id: this.currentGoods.uuid,
					spread_id: this.assignUserId,
					profit_rate: this.assignRate
				};
				const loading = this.$loading({
					lock: true,
					text: "请稍等"
				});

				this.$http
					.post("api/v2/store/sellers/my-drp-goods/add", params)
					.then(({ data }) => {
						this.dialogFormVisible = false;
						this.currentGoods = {};
						loading.close();
						this.$message.success("分配成功");
					})
					.catch($message => {
						loading.close();
					});
			},
			showForm (row) {
				this.dialogFormVisible = true;
				this.currentGoods = row;
			},
			//
			updateStatus (uuid, action) {
				let message = "您确定要[删除]该商品吗？";
				if (action == "up") {
					message = "您确定要[上架]该商品吗？";
				} else if (action == "down") {
					message = "您确定要[下架]该商品吗？";
				} else if (action == "setRecommend") {
					message = "您确定要[推荐]该商品吗？";
				} else if (action == "dropRecommend") {
					message = "您确定要[取消推荐]该商品吗？";
				}
				this.$confirm(message, {
					confirmButtonText: "确定",
					cancelButtonText: "取消",
					center: true,
					showClose: false
				})
					.then(() => {
						const loading = this.$loading({
							lock: true,
							text: "请稍等"
						});
						this.$http
							.post("api/v1/goods/" + uuid + "/" + action, {}, { loading: true })
							.then(({ message }) => {
								loading.close();
								this.$message.success(message);
								this.getGoods(this.page);
							}).catch(() => {
								loading.close()
							});
					})
					.catch(() => {

					});
			},
			copy (goods) {
				if (undefined != goods.uuid) {
					let url =
						location.origin +
						"/" +
						window.STORE_ID +
						"/goods/" +
						goods.uuid +
						".html?spread_id=" +
						this.$user().id;
					this.$copyText(url).then(
						e => {
							this.$message.success(
								"复制成功，赶快去微信、QQ粘贴分享给你的好友吧"
							);
						},
						function (e) { }
					);
				}
			},
			copySeller (goods) {
				if (undefined != goods.uuid) {
					let url =
						location.origin +
						"/" +
						goods.store_uuid +
						"/goods/" +
						goods.uuid +
						".html?spread_id=" +
						this.$user().id;
					this.$copyText(url).then(
						e => {
							this.$message.success(
								"复制成功，赶快去微信、QQ粘贴分享给你的好友吧"
							);
						},
						function (e) { }
					);
				}
			},
			editGameInfo (id) {
				this.$router.push({ name: "shop.editGameInfo", params: { id: id } });

			},
			toPublish () {
				this.$router.push({ name: "shop.release" });
			},
			toPreview () { this.$router.push({ name: "home" }); },
			async getInfo () {
				await this.$http.get('api/v1/seller/total').then(({ data }) => {
					this.info = data
				});
			}
		},
		created () {
			this.getGoods(this.page);
			this.getInfo()
		}
	};
</script>

<style lang="scss" scoped>
	.commodityname {
		display: flex;
		align-items: center;
		img {
			width: 88px;
			height: 88px;
			margin-right: 17px;
		}
		.text {
			text-align: left;
			flex: 1;

			span {
				font-size: 14px;
				font-weight: 400;
				color: #000;
				display: block;
			}
			i {
				font-size: 12px;
				font-weight: 400;
				color: #666;
			}
		}
	}
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
			margin-right: 0;
		}
	}
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

	.shop {
		background: #fff;
		.title {
			padding-left: 18px;
			overflow: hidden;
			font-size: 14px;
			font-weight: 400;
			border-bottom: 1px solid #ededed;
			span {
				font-weight: bold;
				padding-left: 16px;
				line-height: 50px;
				color: #000;
			}
			a {
				float: right;
				padding-right: 16px;
			}
			i {
				color: #666;
				line-height: 50px;
			}
			img {
				width: 15px;
				height: auto;
				vertical-align: middle;
				margin-right: 10px;
			}
		}
		.content {
			padding: 20px 16px 20px 16px;
			margin-bottom: 20px;
			.sale {
				height: 212px;
				background: #e8e8e8;
				display: flex;
				align-items: center;
				justify-content: center;

				.left {
					flex: 2;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					i {
						font-size: 14px;
						font-weight: 400;
						color: #999;
					}
					b {
						margin-top: 20px;
						font-size: 29px;
						font-weight: bold;
						color: #000;
						&::before {
							content: "￥";
							font-size: 14px;
							font-weight: 400;
						}
					}
				}
				.center {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					max-width: 1px;
					background: #dadada;
					height: 100px;
				}
				.right {
					flex: 2;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					i {
						font-size: 14px;
						font-weight: 400;
						color: #666;
					}
					b {
						margin-top: 20px;
						font-size: 29px;
						font-weight: bold;
						color: #000;
						&::before {
							content: "￥";
							font-size: 14px;
							font-weight: 400;
						}
					}
				}
			}
			.operation {
				margin-top: 16px;
				height: 162px;
				background: #e8e8e8;
				display: flex;
				align-items: center;
				justify-content: center;
				.btn {
					flex: 2;
					display: flex;
					flex-direction: column;
					align-items: center;
					justify-content: center;
					i {
						margin-top: 5px;
						font-size: 14px;
						font-weight: 400;
						color: #666;
					}
					img {
						width: 60px;
						height: 60px;
					}
				}
				.center {
					flex: 1;
					display: flex;
					align-items: center;
					justify-content: center;
					max-width: 1px;
					background: #dadada;
					height: 100px;
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
