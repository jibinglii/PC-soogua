<template>
	<div class="header">
		<div class="top">
			<div class="container">
				<div class="left">
					<router-link v-if="isLogged"
											 :to="{ name: 'person.person' }">
						<a href="javascript:void(0)">{{currentUser.nickname}}</a>
					</router-link>

					<a @click="toLogout"
						 v-if="isLogged">退出</a>
					<router-link v-if="!isLogged"
											 :to="{name: 'auth.login'}"
											 tag="a">请登录</router-link>
					<router-link v-if="!isLogged"
											 :to="{name: 'auth.login'}"
											 tag="a">免费注册</router-link>
				</div>
				<div class="right">
					<router-link :to="{name: 'person.person'}"
											 tag="a">个人中心</router-link>
					<router-link :to="{name: 'help.help'}"
											 tag="a">帮助中心</router-link>
					<router-link :to="{name: 'collection'}"
											 tag="a">我的收藏</router-link>

				</div>
			</div>
		</div>
		<div class="center">
			<div class="container">
				<div class="left">
					<img class="head"
							 :src="currentStore.logo"
							 alt>
					<div class="desc">
						<div class="group-1">
							<span>{{currentStore.name}}</span>
							<i>实名认证</i>
						</div>
						<p>店铺介绍：{{currentStore.desc|ellipsis}}</p>
						<div class="group-2">
							<a href="javascript:">
								<img src="~$assets/images/kefu-white.png"
										 alt>
								<span @click="dialogVisible = true">联系商家</span>
							</a>

							<el-dialog :visible.sync="dialogVisible"
												 width="20%">
								<div class="ewm_order">
									<p>使用手机扫码二维码联系！</p>
									<img src="~$assets/images/erweima.png">
								</div>

							</el-dialog>

						</div>
					</div>
				</div>

			</div>
		</div>
		<div class="bottom">
			<div class="container">
				<div class="left">
					<router-link v-for="(item, index) in tabs"
											 :to="{name:item.id}"
											 :key="index">
						<div class="itembox"
								 :class="selected==item.id?'activeText':'text'"
								 @click="selected=item.id">
							<span>{{item.name}}</span>
						</div>
					</router-link>
				</div>
				<div class="right">
					<router-link v-for="(item, index) in navRight"
											 :to="{name:item.id}"
											 :key="index">
						<div class="itembox"
								 :class="selected==item.id?'activeText':'text'"
								 @click="selected=item.id">
							<span>{{item.name}}</span>
						</div>
					</router-link>
					<el-tooltip placement="bottom"
											effect="light">
						<img slot="content"
								 src="~$assets/images/erweima.png">
						<el-button>下载APP</el-button>
					</el-tooltip>

				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import { mapGetters, mapActions } from "vuex";
	import * as services from "$modules/home/services";
	export default {
		filters: {
			ellipsis (value) {
				if (!value) return ''
				if (value.length > 50) {
					return value.slice(0, 50) + '...'
				}
				return value
			}
		},

		data () {
			return {
				dialogVisible: false,
				selected: "home",
				tabs: [
					{
						id: "home",
						name: "首页",
						active: false
					},
					{
						id: "gamecenter",
						name: "游戏",
						active: false
					},
					{
						id: "goods.flow",
						name: "流量",
						active: false
					},
					{
						id: "goods.account",
						name: "账号",
						active: false
					},
					{
						id: "goods.service",
						name: "服务",
						active: false
					}
				],
				navRight: [
					{
						id: "person.person",
						name: "个人中心",
						active: false
					},
					// {
					// 	id: "",
					// 	name: "下载APP",
					// 	active: false
					// }
				]
			};
		},
		computed: {
			...mapGetters(["isLogged", "currentUser", "currentStore"])
		},
		watch: {
			selected: function (val) {
				// 监听selected值，更新缓存中的值
				localStorage.setItem("selectedStorage", val);
			}
		},
		beforeRouteLeave (to, from, next) {
			// 离开页面时设置为默认路由，很重要
			this.selected = "/";
			next();
		},
		mounted () {
			window.addEventListener("beforeunload", e => {
				// 监听页面刷新，保留当前路由的选中状态
				localStorage.setItem("selectedStorage", this.selected);
			});
		},
		created () {
			if (localStorage.getItem("selectedStorage") != null) {
				// 若缓存中没有值就设置为默认的路由
				this.selected = localStorage.getItem("selectedStorage");
			} else {
				this.selected = "home"; //
			}
		},
		mounted () {
			if (this.currentStore.name != undefined) window.document.title = this.currentStore.name;
		},
		methods: {
			...mapActions(["logout"]),
			selectedFun (val) {
				//切换导航时，将selected设为当前项
				this.selected = val;
			},
			toLogout () {
				this.$router.push({ name: "auth.login" });
				this.$message.success("退出成功，请重新登录")
				this.logout();
			},
			tipDown () {
				this.$message.error('请下载App联系客服或商家');
			}
		},
		components: {}
	};
</script>

<style lang="scss" scoped>
	.header {
		background: url("/images/headerbg.png") center center no-repeat;
		background-size: cover;
	}
	.container {
		width: 1200px;
		margin: 0 auto;
	}
	.top {
		width: 100%;
		height: 40px;
		background-color: #222;
		opacity: 0.7;
		color: #999;
		.left {
			float: left;
			a {
				margin-left: 57px;
				color: #999;
				font-size: 12px;
				font-weight: 400;
				line-height: 40px;
				&:first-child {
					margin-left: 0;
				}
				&:hover {
					color: #fff;
				}
			}
		}
		.right {
			float: right;
			a {
				margin-left: 47px;
				color: #999;
				font-size: 12px;
				font-weight: 400;
				line-height: 40px;
				&:first-child {
					margin-left: 0;
				}
				&:hover {
					color: #fff;
				}
			}
		}
	}
	.center {
		width: 100%;
		height: 142px;
		display: flex;
		align-items: center;
		color: #999;
		.left {
			float: left;
			display: flex;
			.head {
				display: block;
				margin-right: 20px;
				width: 80px;
				height: 80px;
			}
			.desc {
				.group-1 {
					span {
						font-size: 18px;
						color: #fff;

						font-weight: bold;
						margin-right: 10px;
					}
					i {
						display: inline-block;
						font-size: 10px;
						line-height: 18px;
						padding: 0 5px;
						color: #000;
						background-color: #f4c93a;
					}
				}
				p {
					margin-top: 8px;
					font-size: 14px;
					font-weight: 400;
					color: #999;
				}
				.group-2 {
					margin-top: 10px;
					font-size: 12px;
					font-weight: 400;
					a {
						span {
							color: #fff;
						}

						img {
							width: 30px;
							height: 30px;
							vertical-align: middle;
						}

						&:first-child {
							margin-right: 20px;
						}
					}
				}
			}
		}
		.right {
			float: right;
			padding-right: 20px;
			p {
				margin-top: 10px;
				font-size: 12px;
				font-weight: 400;
				color: #fff;
				span {
					color: #f4c93a;
				}
			}
		}
	}
	.bottom {
		width: 100%;
		height: 50px;
		background-color: #222;
		opacity: 0.7;
		color: #999;
		.left {
			a {
				float: left;
				.itembox {
					margin-right: 60px;
					color: #999;
					font-size: 16px;
					font-weight: 400;
					line-height: 50px;
					padding: 0 35px;
					&:hover {
						color: #fff;
					}
				}
				.activeText {
					background: #4c4a4a;
					color: #fff;
				}
			}
		}
		.right {
			float: right;
			display: flex;
			a {
				color: #fff;
				padding-left: 30px;
				.itembox {
					color: #999;
					font-size: 15px;
					font-weight: 400;
					line-height: 50px;
					padding: 0 20px;
					&:hover {
						color: #fff;
					}
				}
				.activeText {
					background: #4c4a4a;
					color: #fff;
				}
			}
			/deep/.el-tooltip {
				color: #999;
				background: #222;
				font-size: 15px;
				font-weight: 400;
				line-height: 50px;
				padding: 0 20px;
				border: 0;
				&:hover {
					color: #fff;
				}
			}
		}
	}
	/deep/.ewm_order {
		display: flex;
		flex-direction: column;
		padding: 30px 0;

		p {
			font-size: 14px;
			font-weight: bold;
			width: 45%;
			margin: 0 auto;
			text-align: center;
		}

		img {
			padding: 15px 0;
			margin: 0 auto;
		}
	}
</style>
