<template>
	<div>
		<v-header />
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>游戏专区</el-breadcrumb-item>
			</el-breadcrumb>
			<steps />
			<div class="nav">
				<span>当前选择</span>
				<i>{{gameName}}</i>
				<router-link :to="{name:'shop.release'}">
					<el-button>修改</el-button>
				</router-link>

			</div>
			<div class="goods-type">
				<el-row :gutter="34">
					<el-col :span="4">
						<template>
							<el-select v-model="currentGoodType"
												 placeholder="交易类型"
												 @change="setcurrentGoodTypeName">
								<el-option v-for="(item,index) in goodsTypes"
													 :key="index"
													 :label="item"
													 :value="index">
								</el-option>
							</el-select>
						</template>
					</el-col>
					<el-col :span="1"></el-col>
					<el-col :span="4">
						<template>
							<el-select v-model="currentMobileType"
												 placeholder="平台类型"
												 @change="setcurrentMobileTypeName">
								<el-option v-for="(item,index) in platform"
													 :key="index"
													 :label="item"
													 :value="index">
								</el-option>
							</el-select>
						</template>
					</el-col>
					<el-col :span="1"></el-col>
					<el-col :span="4">
						<template>
							<el-select v-model="serverType"
												 filterable
												 placeholder="所在区"
												 @change="changeServerType">
								<el-option v-for="(item,index) in servers"
													 :key="index"
													 :label="index"
													 :value="index">
								</el-option>
							</el-select>
						</template>
					</el-col>
					<el-col :span="1"></el-col>
					<el-col :span="4">
						<template>
							<el-select v-model="currentServerId"
												 filterable
												 placeholder="所在服务器"
												 @change="changeServer">
								<el-option v-for="(item,index) in serverList"
													 :key="item"
													 :label="index"
													 :value="item">
								</el-option>
							</el-select>
						</template>
					</el-col>
				</el-row>
			</div>
			<div class="bottom-nav">
				<span>您当亲选择的类目：</span>
				<i>{{gameName}}>{{currentGoodTypeName}}>{{currentMobileTypeName}}>{{currentServerTypeName}}>{{currentServerName}}</i>
			</div>

			<div class="nextstep">
				<el-button @click.native.prevent="onNext"
									 type="button"
									 size="medium">下一步</el-button>
			</div>
		</div>
		<v-footer />
	</div>
</template>

<script>
	import VHeader from "$components/VHeader";
	import VFooter from "$components/VFooter";
	import Steps from "./components/steps";
	export default {
		data () {
			return {
				gameId: this.$route.params.id,
				gameName: '-',
				currentGoodType: '',
				currentMobileType: '',
				currentServerId: null,
				currentGoodTypeName: '交易类型',
				currentMobileTypeName: '平台类型',
				currentServerTypeName: '所在区',
				currentServerName: '服务器',
				serverName: '',
				goodsTypes: {},
				serverType: '',
				serverList: [],
				servers: undefined,
				hasSpec: 0,
				platform: { "0": "苹果端", "1": "安卓端", "2": "PC端" }
			};
		},
		methods: {
			async initData () {
				await this.$http.get('/api/v1/game/' + parseInt(this.gameId), { loading: true }).then(({ data }) => {
					let res = data;
					this.gameName = res.game.name;
					this.servers = res.gameServer;
					this.goodsTypes = res.game.types_label;
					if (res.spec.length > 0) this.hasSpec = 1;
				})
			},
			changeServerType (e) {
				this.currentServerId = null;
				this.currentServerTypeName = e;
				this.currentServerName = '';
				this.serverList = this.servers[e]
			},
			setcurrentGoodTypeName (e) {
				this.currentGoodTypeName = this.goodsTypes[e]
			},
			setcurrentMobileTypeName (e) {
				this.currentMobileTypeName = this.platform[e];
			},
			changeServer (e) {
				for (let key in this.serverList) {
					if (e == this.serverList[key])
						this.currentServerName = key;
				}
			},
			onNext () {
				let pass = true;
				let message = "";
				if (this.currentGoodType == '') {
					message = "请选择交易类型"

				} else if (this.currentMobileType == '') {
					message = "请选择平台类型"

				} else if (this.currentServerId == null) {
					message = "请选择所在区服"
				}
				if (message != "") pass = false;
				if (!pass) {
					this.$message.error(message);
				} else {
					this.serverName = this.gameName + "/" + this.currentServerTypeName + "/" + this.currentServerName;
					this.$router.push({
						name: 'shop.fill',
						params: { 'id': this.gameId },
						query: {
							server_id: this.currentServerId,
							spec: this.hasSpec,
							type: this.currentGoodType,
							device: this.currentMobileType,
							server_name: this.serverName
						}
					})
				}
			}
		},
		mounted () {
			this.initData();
		},
		mounted () {
			this.initData();
		},
		components: {
			VHeader,
			VFooter,
			Steps
		},
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
			border: 1px dashed #999;
			color: #000;
			padding: 10px 20px;
			font-size: 12px;
		}
	}
	.goods-type {
		min-height: 400px;
		padding: 42px 44px;
		background: #fff;
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
		margin-top: 60px;
		margin-bottom: 60px;
		display: flex;
		align-items: center;
		justify-content: center;
		.el-button {
			width: 300px;
			background: #000;
			border: 1px solid #000;
			color: #fff;
			padding: 12px 20px;
			font-size: 16px;
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