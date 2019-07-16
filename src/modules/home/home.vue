<template>
	<div class="home">
		<v-header></v-header>

		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
			</el-breadcrumb>
			<el-container>
				<el-main>
					<div class="screen">
						<el-dropdown>
							<span class="el-dropdown-link">
								价格
								<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>升序</el-dropdown-item>
								<el-dropdown-item>降序</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
						<el-dropdown>
							<span class="el-dropdown-link">
								销量
								<i class="el-icon-arrow-down el-icon--right"></i>
							</span>
							<el-dropdown-menu slot="dropdown">
								<el-dropdown-item>升序</el-dropdown-item>
								<el-dropdown-item>降序</el-dropdown-item>
							</el-dropdown-menu>
						</el-dropdown>
					</div>
					<div class="clearfix">
						<goods-item v-for="(item, index) in goods"
												:key="index"
												:goods="item"></goods-item>
					</div>
					<pagination :total="total"
											:current-page="current"
											@pagechange="getGoods"></pagination>
					<!-- <pagination :total="50" :pageSize="12" @currentChange="currentChange"/> -->
				</el-main>
				<el-aside width="300px">
					<div class="aside-head">本店销售排行</div>
					<div class="aside-item"
							 v-for="(item,key) in aside"
							 :key="key">
						<img class="icon"
								 src="~$assets/images/goods1.png"
								 alt>
						<div class="desc">
							<h4>{{item.title}}</h4>
							<h5>{{item.price}}</h5>
							<p>{{item.sellNum}}</p>
						</div>
					</div>
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
	import Pagination from "$components/Pagination";

	import * as services from "./services";

	export default {
		data () {
			return {
				goods: [],
				page: 1,
				infiniteId: +new Date(),
				type2: 0,
				total: 0, // 记录总条数
				display: 10, // 每页显示条数
				current: 1, // 当前的页数
				aside: [
					{
						title: "王者荣耀【苹果QQ】外婆缘 一大元素使武装战姬摄魂海克妮...",
						price: "¥128.00",
						sellNum: "已出售20件"
					},
					{
						title: "王者荣耀【苹果QQ】外婆缘 一大元素使武装战姬摄魂海克妮...",
						price: "¥128.00",
						sellNum: "已出售20件"
					},
					{
						title: "王者荣耀【苹果QQ】外婆缘 一大元素使武装战姬摄魂海克妮...",
						price: "¥128.00",
						sellNum: "已出售20件"
					}
				]
			};
		},
		watch: {
			type2 (val) {
				this.goods = [];
				this.infiniteId += 1;
			}
		},
		methods: {
			getGood (index, item) {
				this.page = 1;
				this.items = [];
				this.infiniteId += 1;
				this.type2 = item.id;
				this.getGoods(this.page);
			},
			getGoods (currentPage) {
				this.goods = [];
				let param = {
					params: {
						"fields[store_goods]":
							"id,title,amount,game_id,sale_nums,images,game_name,server_name",
						page: currentPage,
						display: this.display
					}
				};
				if (this.type2 != 0) {
					param["params"]["filter[type2]"] = this.type2;
				}
				services.goods({ param }).then(({ data }) => {
					if (data.goods.data.length > 0) {
						this.page = currentPage;
						this.total = data.goods.total;
						this.goods.push(...data.goods.data);
					}
				});
			}
		},
		mounted () {
			this.getGoods(this.page);
		},
		components: {
			VHeader,
			VFooter,
			GoodsItem,
			Pagination
		}
	};
</script>

<style lang="scss" scoped>
	.home {
		background: #f2f2f2;
		.container {
			width: 1200px;
			margin: 0 auto;
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

	.el-main {
		max-width: 884px;
		padding: 0;
		margin-right: 16px;
		overflow: hidden;
	}

	.aside-item {
		display: flex;
		margin-bottom: 1px;
		padding: 16px 14px;
		background-color: #fff;
		.icon {
			display: block;
			margin-right: 10px;
			width: 80px;
			height: 80px;
		}
		.desc {
			h4 {
				max-width: 181px;
				height: 32px;
				font-size: 12px;
				font-weight: 400;
				color: #000;
				line-height: 16px;
			}
			h5 {
				margin-top: 10px;
				max-width: 181px;
				font-size: 14px;
				font-weight: bold;
				color: #000;
				line-height: 20px;
			}
			p {
				font-size: 10px;
				font-weight: 400;
				color: #999;
				line-height: 18px;
			}
		}
	}

	.screen {
		padding: 20px 40px;
		background-color: #fff;
		margin-bottom: 15px;
		span {
			font-size: 16px;
			font-weight: 400;
			line-height: 20px;
			&:first-child {
				margin-right: 40px;
			}
		}
	}
	.aside-head {
		margin-bottom: 15px;
		font-size: 16px;
		font-weight: 400;
		text-align: center;
		line-height: 60px;
		background-color: #fff;
	}
</style>
