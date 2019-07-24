
<template>
	<div>
		<v-header></v-header>
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>个人中心</el-breadcrumb-item>
				<el-breadcrumb-item>店铺管理</el-breadcrumb-item>
			</el-breadcrumb>
			<v-content>
				<div slot="aside">
					<v-aside></v-aside>
				</div>
				<div slot="main">
					<div class="shop">
						<div class="title">
							<span>店铺管理</span>
							<router-link tab="a"
													 :to="{name:'shop.profile'}">
								<i class="el-icon-setting"></i>&nbsp;
								<i>店铺设置</i>
							</router-link>
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
							<div class="operation">
								<a class="btn"
									 href="javascript:"
									 @click="toPublish">
									<img src="~$assets/images/fabu.png"
											 alt />
									<i>发布商品</i>
								</a>
								<span class="center"></span>
								<a class="btn"
									 href="javascript:"
									 @click="toPreview">
									<img src="~$assets/images/yulan.png"
											 alt />
									<i>预览店铺</i>
								</a>
							</div>
						</div>
					</div>
				</div>
			</v-content>
		</div>
		<v-footer></v-footer>
	</div>
</template>

<script>
	import VHeader from "$components/VHeader";
	import VFooter from "$components/VFooter";
	import VContent from "$components/VContent";
	import VAside from "$components/VAside";
	export default {
		data () {
			return {
				info: {}
			};
		},
		components: {
			VHeader,
			VFooter,
			VContent,
			VAside
		},
		methods: {
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
			this.getInfo()
		},
	};
</script>

<style lang="scss" scoped>
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
			padding: 20px 16px 270px 16px;
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
