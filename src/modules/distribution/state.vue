<template>
	<div>
		<v-header />
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>分销人员管理</el-breadcrumb-item>
				<el-breadcrumb-item>分销商品</el-breadcrumb-item>
			</el-breadcrumb>
			<v-content>
				<div slot="aside">
					<v-aside></v-aside>
				</div>
				<div slot="main">

					<div class="personnellist">
						<el-table :data="sellerGoods"
											style="width: 100%; text-align:center;">
							<el-table-column align="center"
															 prop="title"
															 label="商品名称"></el-table-column>
							<el-table-column align="center"
															 prop="amount"
															 label="商品价格"></el-table-column>
							<el-table-column align="center"
															 prop="seller.profit_rate"
															 label="分润比例"></el-table-column>
							<el-table-column align="center"
															 label="操作"
															 width="400px">
								<template slot-scope="scope">

									<el-popover :ref="'popover-'+scope.$index"
															placement="left-start"
															width="400"
															trigger="click">
										<el-form ref="form"
														 label-width="100px">
											<el-form-item label="推广费比例">
												<el-input v-model="profit_rate_goods"></el-input>
											</el-form-item>

											<el-form-item>
												<el-button type="primary"
																	 @click="save">确认</el-button>
												<el-button @click="onCancel(scope.$index)">取消</el-button>
											</el-form-item>
										</el-form>
									</el-popover>

									<el-button @click.native.prevent="copyGoods(scope.row.uuid)"
														 type="button"
														 size="small">复制链接</el-button>
									<el-button style="background:#fff;color:#000"
														 @click.native.prevent="onManage(scope.row)"
														 type="button"
														 size="small"
														 v-popover="'popover-'+scope.$index">修改</el-button>
									<el-button style="background:#fff;color:#000"
														 @click.native.prevent="del(scope.row.uuid)"
														 type="button"
														 size="small">删除</el-button>

								</template>
							</el-table-column>
						</el-table>
					</div>

				</div>
			</v-content>
		</div>
	</div>
</template>

<script>
	import VHeader from "$components/VHeader";
	import VFooter from "$components/VFooter";
	import VContent from "$components/VContent";
	import VAside from "$components/VAside";
	import VTabs from "$components/tabs";
	import Pagination from "$components/Pagination";
	import Vue from 'vue';
	import VueClipboard from 'vue-clipboard2';
	VueClipboard.config.autoSetContainer = true
	Vue.use(VueClipboard);
	export default {
		data () {
			return {
				sellerGoods: [],
				spread_id: '',
				profit_rate_goods: '',
				current: {},

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
				console.log(`TCL: handleClick -> data`, tab.name, event);
			},
			onCopyLink () { },
			currentChange () { },
			async getSellerGoods () {
				const loading = this.$loading({
					lock: true,
					text: "加载中"
				});
				this.sellerGoods = [];
				await this.$http.get('api/v2/store/sellers/my-drp-goods/' + this.spread_id).then(({ data }) => {
					this.sellerGoods = data.goods
					loading.close();
				})
			},
			save () {
				const loading = this.$loading({
					lock: true,
					text: "加载中"
				});
				this.$http.post('api/v2/store/sellers/my-drp-goods/update', { spread_id: this.spread_id, goods_id: this.current.uuid, profit_rate: this.profit_rate_goods }).then(({ data }) => {
					loading.close();
					this.profit_rate_goods = ''
					this.getSellerGoods()
					this.$message.success("修改成功")
				}).catch(() => {
					loading.close()
					this.getSellerGoods()
				});
			},
			onManage (row) {
				this.profit_rate_goods = row.seller.profit_rate;
				this.current = row;
			},
			onCancel (index) {
				this.$refs[`popover-` + index].doClose()
				this.profit_rate_goods = ''
			},
			del (uuid) {
				this.$confirm('您确定要删除该分销员吗', "提示", {
					confirmButtonText: "删除",
					cancelButtonText: "取消"
				}).then(() => {
					const { spread_id } = this
					const loading = this.$loading({
						lock: true,
						text: "加载中"
					});
					this.$http.post('api/v2/store/sellers/my-drp-goods/delete', { spread_id, goods_id: uuid }).then(({ data }) => {
						loading.close()
						this.getSellerGoods()
						this.$message.success("删除成功")
					})
				}).catch(() => {
					console.log('cancel')
				}
				)
			},
			copyGoods (uuid) {
				let url = location.origin + '/' + window.STORE_ID + '/goods/' + uuid + '.html?spread_id=' + this.spread_id
				this.$copyText(url).then((e) => {
					this.$message.success('复制成功，赶快去微信、QQ粘贴给你的分销员推广吧');
				}, function (e) {
				})
			},

		},
		mounted () {

			let id = this.$route.params.id
			this.spread_id = id
			this.getSellerGoods()
		},
	};
</script>

<style lang="scss" scoped>
	/deep/.el-table {
		th {
			background: #ededed;
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
</style>