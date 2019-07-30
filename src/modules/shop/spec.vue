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
			<div class="nav">
				<span>当前选择</span>
				<i>{{serverName}}</i>
				<router-link :to="{name:'shop.release'}">
				</router-link>
			</div>
			<div class="goods-info">
				<div class="title">商品信息</div>
				<div class="content">
					<el-form ref="form-info"
									 label-width="150px">
						<el-form-item v-for="item in spec"
													:key="item.id"
													:label="item.title">
							<el-col>
								<el-input :title="item.title"
													v-if="item.type == 'input'"
													v-model="specValue[item.id]"></el-input>
								<el-input :title="item.title"
													<x-spec-input
													v-else
													:data="item"
													v-model="specValue[item.id]">
									</x-spec-input>

							</el-col>
						</el-form-item>

					</el-form>
				</div>
			</div>

			<div class="bottom-nav">
				<span>当前选择：</span>
				<i>{{serverName}}</i>
			</div>

			<div class="nextstep">
				<el-button @click.native.prevent="onNext"
									 type="button"
									 size="medium">完成并保存</el-button>
			</div>
		</div>
		<v-footer />
	</div>
</template>

<script>
	import VHeader from "$components/VHeader";
	import VFooter from "$components/VFooter";
	import Steps from "./components/steps";
	import { mapGetters } from 'vuex'
	import XSpecInput from "./components/XSpecInput";

	export default {
		data () {
			return {
				gameId: this.$route.params.id,
				serverName: "...",
				saving: false,
				spec: [],
				specValue: {}
			};
		},
		components: {
			VHeader,
			VFooter,
			Steps,
			XSpecInput

		},
		computed: {
			...mapGetters(['currentUser']),
		},

		methods: {
			async	onNext () {
				if (!this.saving) {
					let param = { "spec": {} };
					this.saving = true;
					const loading = this.$loading({ lock: true, text: "规格信息保存中", });
					Object.keys(this.specValue).forEach((key) => {
						if (Array.isArray(this.specValue[key])) {
							param.spec[key] = this.specValue[key].join(',')
						} else {
							param.spec[key] = this.specValue[key]
						}
					});


					await this.$http.post("api/v1/goods/" + this.uuid, param)
						.then(data => {
							this.saving = false;
							loading.close()
							this.$router.replace({
								name: 'shop.success',
								params: {
									'status': 2
								}
							})
						})
						.catch(response => {
							this.$alert(response.data.message);
							this.saving = false;
							loading.close()
						});
				}
			},
			initParam () {
				this.serverName = this.getQueryString("server_name");
				this.uuid = this.getQueryString("id");
			},
			async initData () {
				const loading = this.$loading({ lock: true, text: "规格信息加载中", });
				await this.$http
					.get("/api/v1/game/" + this.gameId + '/spec')
					.then(({ data }) => {
						loading.close();
						this.spec.push(...data.spec)
					});
			}
		},
		mounted () {
			this.initParam();
			this.initData();
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
		.el-button {
			width: 70px;
			background: #fff;
			border: 1px solid #999;
			color: #000;
			padding: 10px 20px;
			font-size: 12px;
		}
	}
	.goods-info {
		background: #fff;
		.title {
			font-size: 14px;
			font-weight: bold;
			padding-left: 16px;
			line-height: 50px;
			background: #fff;
			border-bottom: 1px solid #ededed;
		}
		.content {
			padding: 25px 43px;
		}
		.info-tips {
			font-size: 12px;
			font-weight: 300;
			color: #999;
			img {
				vertical-align: middle;
			}
		}
	}
	.goods-desc {
		margin-top: 16px;
		background: #fff;
		.title {
			font-size: 14px;
			font-weight: bold;
			padding-left: 16px;
			line-height: 50px;
			background: #fff;
			border-bottom: 1px solid #ededed;
		}
		.content {
			padding: 25px 43px;
			/deep/.el-textarea__inner {
				height: 200px;
				width: 620px;
			}
			.size {
				position: absolute;
				bottom: 0;
				right: -320px;
				width: 38px;
				font-size: 14px;
				font-weight: 400;
				color: #999;
			}
			.up {
				position: relative;
				display: flex;
				align-items: center;
				justify-content: center;
				border: 1px solid #999;
				width: 650px;
				height: 184px;
				.desc-tips {
					width: 100%;
					position: absolute;
					bottom: 0;
					left: 0;
					text-align: center;
					font-size: 12px;
					font-weight: 300;
					color: #999;
				}
				.el-button {
					width: 220px;
					background: #fff;
					border: 2px dashed #999;
					color: #000;
					padding: 12px 20px;
					font-size: 14px;
				}
			}
		}
	}
	.cehckbox {
		margin: 30px 275px 0;
		a {
			color: #000;
		}
	}
	.el-form-item {
		position: relative;
		margin-bottom: 15px;
	}
	.el-select {
		display: block;
	}

	.bottom-nav {
		background: #fff;
		border-top: 1px solid #ededed;
		line-height: 50px;
		font-size: 14px;
		font-weight: 400;
		color: #666;
		padding-left: 20px;
	}
	.nextstep {
		margin-top: 103px;
		margin-bottom: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.el-button {
		width: 300px;
		background: #000;
		border: 1px solid #000;
		color: #fff;
		padding: 12px 20px;
		font-size: 16px;
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
	.imgTip {
		color: #666;
		font-size: 12px;
	}
	/deep/.el-breadcrumb__separator {
		color: #666;
	}
</style>
