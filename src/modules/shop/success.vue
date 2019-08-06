<template>
	<div>
		<v-header />
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'person.person'}">个人中心</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'shop'}">店铺管理</el-breadcrumb-item>
				<el-breadcrumb-item>发布商品</el-breadcrumb-item>
			</el-breadcrumb>
			<steps />
			<div class="success">
				<img src="~$assets/images/success.png"
						 alt />
				<span>发布成功</span>
				<p>您的商品已提交审核，请注意查收消息或通知</p>
				<el-button @click.native.prevent="onHome()">返回店铺</el-button>
			</div>

		</div>
		<v-footer />
	</div>
</template>

<script>
	import VHeader from "$components/VHeader";
	import VFooter from "$components/VFooter";
	import Steps from "./components/steps";
	import GoodsItem from "$components/GoodsItem";
	import user from '$api/user'
	export default {
		mounted () {

			user.getAuthStatus().then(({ data }) => {
				if (data.auth_status.is_auth == 0 || data.auth_status.is_auth == 3) {
					this.$alert("您还没有认证，请点击确认进行认证").then(() => {
						this.$router.push({ name: "person.approve" });
					})
				}
			}).catch(error => {

				this.$alert("您还没有认证，请点击确认进行认证").then(() => {
					this.$router.push({ name: "person.approve" });
				})
			})

		},
		data () {
			return {
				checked: false,
				formInfo: {
					type: "",
					name: "",
					price: "",
					num: ""
				},
				formDesc: {
					desc: "",
					imgs: []
				}
			};
		},
		components: {
			VHeader,
			VFooter,
			Steps,
			GoodsItem
		},
		methods: {
			onHome () {
				this.$router.push({ name: "shop.profile" });
			}
		}
	};
</script>

<style lang="scss" scoped>
	.nav {
		line-height: 50px;
		span {
			font-size: 14px;
			font-weight: 400;
			color: #666;
			margin-right: 19px;
		}
		i {
			font-size: 14px;
			font-weight: bold;
			color: #000;
			margin-right: 19px;
		}
	}
	.success {
		min-height: 470px;
		background: #fff;
		display: flex;
		align-items: center;
		justify-content: center;
		flex-direction: column;
		img {
			width: 140px;
			height: auto;
		}
		span {
			font-size: 14px;
			font-weight: 400;
			color: #999;
		}
		p {
			font-size: 14px;
			margin-top: 35px;
			margin-bottom: 35px;
			max-width: 390px;
			font-weight: 400;
			text-align: center;
		}
	}
	.title {
		margin-top: 20px;
		margin-bottom: 16px;
		background: #fff;
		font-size: 14px;
		font-weight: 400;
		padding-left: 16px;
		line-height: 60px;
		border-bottom: 1px solid #ededed;
	}

	.recommend {
		width: 105%;
		overflow: hidden;
		margin-bottom: 60px;
	}

	.el-button {
		width: 120px;
		background: #000;
		border: 1px solid #000;
		color: #fff;
		padding: 10px 20px;
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
