<template>
	<div>
		<v-header />
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'person.person'}">个人中心</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'distribution.personnel'}">分销管理</el-breadcrumb-item>
				<el-breadcrumb-item>分销人员管理</el-breadcrumb-item>
			</el-breadcrumb>
			<v-content>
				<div slot="aside">
					<v-aside></v-aside>
				</div>

				<div slot="main">
					<v-tabs :tabs="mainTabs"
									activeTab="personnel"
									@changeTab="changeTab" />

					<div class="personnellist">
						<el-table :data="users"
											style="width: 100%; text-align:center;">
							<el-table-column align="center"
															 prop="id"
															 label="分销人员ID"></el-table-column>
							<el-table-column align="center"
															 prop="nickname"
															 label="分销人员名称"></el-table-column>
							<el-table-column align="center"
															 prop="sellers.profit_rate"
															 label="分润比例"></el-table-column>
							<el-table-column align="center"
															 :render-header="renderHeader"
															 width="400px"
															 label="操作">
								<template slot-scope="scope">
									<el-popover :ref="'popover-'+scope.$index"
															placement="left-start"
															width="400"
															trigger="click">
										<el-form ref="form"
														 :model="curPerson"
														 label-width="100px">
											<el-form-item label="分销人员ID">
												<el-input v-model="spread_id"
																	disabled=""></el-input>
											</el-form-item>

											<el-form-item label="分润比例">
												<el-input v-model="profit_rate"></el-input>
											</el-form-item>

											<el-form-item>
												<el-button type="primary"
																	 @click="update">确认</el-button>
												<el-button @click="onCancel(scope.$index)">取消</el-button>
											</el-form-item>
										</el-form>
									</el-popover>

									<el-button @click.native.prevent="onState(scope.row.id)"
														 type="button"
														 size="small">分销商品</el-button>
									<el-button style="background:#fff;color:#000"
														 @click.native.prevent="onManage(scope)"
														 type="button"
														 size="small"
														 v-popover="'popover-'+scope.$index">修改</el-button>
									<el-button style="background:#fff;color:#000"
														 @click.native.prevent="del(scope.row.id)"
														 type="button"
														 size="small">删除</el-button>
								</template>
							</el-table-column>
						</el-table>

					</div>
					<el-dialog title="添加分销人员"
										 :visible.sync="dialogFormVisible"
										 width="30%">
						<el-form>
							<el-form-item label="分销员ID"
														label-width="20%"
														text-align="right">
								<el-input style="width:80%"
													type="number"
													v-model="spread_id"
													placeholder="请输入分销员ID或手机号"
													autocomplete="off"></el-input>
							</el-form-item>
							<el-form-item label="分润比例"
														label-width="20%">
								<el-input style="width:80%"
													type="number"
													placeholder="请输入分润比例"
													v-model="profit_rate"
													autocomplete="off"></el-input>
							</el-form-item>
						</el-form>
						<div slot="footer"
								 class="dialog-footer">
							<el-button @click="	dialogFormVisible = false">取 消</el-button>
							<el-button type="primary"
												 @click="add">确 定</el-button>
						</div>
					</el-dialog>
					<pagination :total="total"
											:display="display"
											:current-page="page"
											@pagechange="infiniteHandler"></pagination>
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
		computed: {
			showPeople () {
				return !(_.indexOf(this.$currentStore().roles, '分销店铺') != -1)
			},
			isFenxiaoyuan () {
				return !(_.indexOf(this.$currentStore().roles, '推广店铺') != -1)
			},
			mainTabs () {
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
				dialogFormVisible: false,
				curPerson: {},
				slideDirection: "",
				users: [],
				page: 1,
				total: 0, // 记录总条数
				display: 15,
				spread_id: "",
				profit_rate: "0.08",
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
			renderHeader (h) {
				return h('div', null, [
					h('span', null, '操作'),
					h('el-button', {						value: "caozuo", class: 'head-btn', on: {
							click: this.addManage
						}					}, '添加'
					)
				])
			},
			changeTab (tab, event) {
				this.$router.push({ name: `distribution.${tab.name}` });
			},
			changeChildTab (tab, event) {
				// console.log(`TCL: handleClick -> datatab.name,event${tab.name} ${event}`);
			},
			onState (id) {


				this.$router.push({
					name: `distribution.personnel.state`,
					params: { id: id }
				});
			},
			addManage (index) {
				this.spread_id = '';
				this.profit_rate = 0.08
				this.dialogFormVisible = true;
			},
			onManage (index) {

				if (index) {
					this.spread_id = index.row.sellers.spread_id;
					this.profit_rate = index.row.sellers.profit_rate;
				}
				this.index = index
			},

			add () {
				const { spread_id, profit_rate } = this
				const loading = this.$loading({
					lock: true,
					text: "请稍等"
				});
				this.$http.post('api/v2/store/sellers/add', { spread_id, profit_rate }).then(({ data }) => {
					loading.close()
					this.dialogFormVisible = false;

					this.infiniteHandler()
					this.$message.success("添加成功")
				}).catch(() => {
					this.dialogFormVisible = false;

					loading.close()
				});
			},
			update () {
				let that = this
				const { spread_id, profit_rate } = this
				const loading = this.$loading({
					lock: true,
					text: "请稍等"
				});

				this.$http.post('api/v2/store/sellers/update', { spread_id, profit_rate }).then(({ data }) => {
					loading.close()
					this.infiniteHandler()
					this.$message.success("修改成功")
				}).catch(() => {
					this.infiniteHandler()
					loading.close()
				});
			},
			del (id) {
				let that = this;
				this.$confirm('您确定要删除该分销员吗', "提示", {
					confirmButtonText: "删除",
					cancelButtonText: "取消"
				})
					.then(() => {
						const loading = that.$loading({
							lock: true,
							text: "请稍等"
						});
						this.$http.post('api/v2/store/sellers/destroy', { spread_id: id }).then(({ data }) => {
							loading.close()
							that.infiniteHandler();
							this.$message.success("删除成功")
						})
					})
					.catch(() => {
						// console.log("“cancel”");
					});
			},
			copyGoods (uuid) {
				let url = location.origin + '/' + window.STORE_ID + '/goods/' + uuid + '.html?spread_id=' + this.spread_id
				this.$copyText(url).then((e) => {
					this.$toast('复制成功，赶快去微信、QQ粘贴给你的分销员推广吧');
				}, function (e) {
				})
			},
			onCancel (index) {
				this.spread_id = '';
				this.profit_rate = 0.08
				this.$refs[`popover-` + index].doClose()
			},
			infiniteHandler () {
				const loading = this.$loading({
					lock: true,
					text: "请稍等"
				});
				this.users = [];
				let param = {
					params: {
						page: this.page,
						per_page: this.display
					}
				};

				this.$http.get('api/v2/store/sellers', param).then(({ data }) => {
					this.users.push(...data.sellers.data);
					this.page = data.currentPage;
					this.total = data.sellers.total;
					loading.close()
				})
			}
		},
		created () {
			this.infiniteHandler()
		}
	};
</script>

<style lang="scss" scoped>
	/deep/.el-table {
		th {
			background: #ededed;
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
	/deep/.head-btn {
		margin-left: 40px;
		background: #fff;
		border: 1px solid #000;
		color: #000;
		padding: 11px 20px;
		font-size: 12px;
	}
	/deep/.el-dialog__body {
		padding: 35px 0 70px 60px;
	}
	/deep/.el-button--default {
		background: #ededed;
		color: #909399;
		border: 1px solid #909399;
		//border-radius: 50%;
	}
</style>