<template>
	<div>
		<v-header />
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'person.person'}">个人中心</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'distribution.personnel'}">分销管理</el-breadcrumb-item>
				<el-breadcrumb-item>分销任务</el-breadcrumb-item>
			</el-breadcrumb>
			<v-content>
				<div slot="aside">
					<v-aside></v-aside>
				</div>
				<div slot="main">
					<v-tabs :tabs="tabs"
									activeTab="task"
									@changeTab="changeTab" />
					<div class="tasklist">
						<el-table :data="goods"
											style="width: 100%; text-align:center;">
							<el-table-column align="center"
															 prop="store.name"
															 label="店铺名称"></el-table-column>
							<el-table-column align="center"
															 prop="type"
															 :formatter="typeFormat"
															 label="商品类型"></el-table-column>
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
															 label="操作">
								<template slot-scope="scope">
									<el-button @click.stop="copy(scope.row.uuid)"
														 type="button"
														 size="small">复制链接</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>
					<!-- <pagination :total="total"
											:display="display"
											:current-page="page"
											@currentChange="getGoods" /> -->
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
	import Vue from 'vue'
	import VueClipboard from 'vue-clipboard2'

	VueClipboard.config.autoSetContainer = true
	Vue.use(VueClipboard);
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
				goods: [],
				// page: 1,
				// total: 0, // 记录总条数
				// display: 15,
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
			getGoods (currentPage) {
				this.goods = []
				const loading = this.$loading({
					lock: true,
					text: "请稍等"
				});
				// let param = {
				// 	params: {
				// 		page: this.page,
				// 		per_page: this.display
				// 	}
				// };

				this.$http.get('api/v2/store/sellers/my-drp-goods').then(({ data }) => {
					loading.close();
					this.goods = data.goods
					// this.page = data.currentPage;
					// this.total = data.orders.total;
				})
			},
			typeFormat (row, column) {
				switch (row.type) {
					case 0:
						return "游戏"
						break;
					case 1:
						return "游戏"
						break;
					case 2:
						return "流量"
						break;
					case 3:
						return "账号"
						break;
					case 4:
						return "服务"
						break;

				}

			},
			copy (uuid) {
				let url = location.origin + '/' + window.STORE_ID + '/goods/' + uuid + '.html?spread_id=' + this.$user().id
				this.$copyText(url).then((e) => {
					this.$message.success("复制成功，赶快去微信、QQ粘贴分享给你的好友吧");
					this.showShare = false
				}, function (e) {
				})
			}
		},
		created () {

			if (this.showPeople && !this.isFenxiaoyuan) {
				this.$router.push({ name: 'distribution.personnel' });
				return false;
			}
			this.getGoods()
		}
	};
</script>

<style lang="scss" scoped>
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