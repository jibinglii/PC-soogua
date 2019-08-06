<template>
	<div class="home">
		<v-header></v-header>

		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{name:'home'}">首页</el-breadcrumb-item>
			</el-breadcrumb>
			<el-container>
				<el-main>
					<div class="screen">最新商品</div>
					<div class="clearfix">
						<goods-item v-for="(item, index) in goods"
												:key="index"
												:goods="item"></goods-item>
					</div>
					<pagination :total="total"
											:display="display"
											:current-page="page"
											@pagechange="getGoods"></pagination>
				</el-main>
				<el-aside width="300px">
					<div class="aside-head">商品精选</div>
					<div @click="toInfo(item.uuid)"
							 class="aside-item"
							 v-for="(item,key) in recommend.slice(0,7)"
							 :key="key">
						<img class="icon"
								 :src="item.logo"
								 alt>
						<div class="desc">

							<h4>{{item.content|ellipsis}}</h4>
							<h5>￥{{item.amount}}</h5>
							<p>库存{{item.store_nums}}件</p>
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
		filters: {
			ellipsis (value) {
				if (!value) return ''
				if (value.length > 30) {
					return value.slice(0, 30) + '...'
				}
				return value
			}
		},
		data () {
			return {
				goods: [],
				recommend: [],
				total: 0, // 记录总条数
				display: 9, // 每页显示条数
				page: 1 // 当前的页数
			};
		},

		methods: {
			toInfo (id) {

				this.$router.push({ name: "goods", params: { goods: id } });
			},
			async getGoods (currentPage) {
				let param = {
					params: {
						"fields[store_goods]":
							"id,title,amount,game_id,sale_nums,images,game_name,server_name,content",
						page: currentPage,
						per_page: this.display
					}
				};

				services
					.goods(param)
					.then(({ data }) => {
						this.goods = [];
						this.page = data.goods.current_page;

						this.total = data.goods.total;
						this.goods = data.goods.data;
					})
					.catch(({ response }) => {

					});
			},
			// 商品精选
			async getRecommend () {
				services.getRecommend().then(data => {
					this.recommend = data.data.goods.data;
				});
			}
		},
		mounted () {
			this.getGoods(this.page);
			this.getRecommend();
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
			min-height: 500px;
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
		padding: 20px 15px;
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
