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
			<div class="title">
				<div class="btn-group">
					<a :class="{active: type == 0}"
						 @click="setType(0)">手游</a>
					<a :class="{active: type == 1}"
						 @click="setType(1)">端游</a>
				</div>

			</div>
			<div class="tabs">
				<a v-for="(item, key) in indexs"
					 :key="key"
					 @click="changeIndex(item)"
					 :class="{active: item==index}">{{ item }}</a>
			</div>
			<div class="games">
				<router-link class="gameitem"
										 tag="a"
										 v-for="(item,key) in games"
										 :key="key"
										 :to="{name: 'shop.types',params: {'id': item.id}}">
					<img :src="item.logo"
							 alt />
					<span>{{item.name}}</span>
				</router-link>
			</div>
			<div class="nextstep">
				<!-- <el-button @click.native.prevent="onNext()"
									 type="button"
									 size="medium">下一步， 请选择商品类型</el-button> -->
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
				indexs: [
					"#",
					"A",
					"B",
					"C",
					"D",
					"E",
					"F",
					"G",
					"H",
					"I",
					"J",
					"K",
					"L",
					"M",
					"N",
					"O",
					"P",
					"Q",
					"R",
					"S",
					"T",
					"U",
					"V",
					"W",
					"X",
					"Y",
					"Z"
				],
				games: [
				],
				type: 0,
				index: '#',
				games: [],
				page: 1,
				infiniteId: +new Date(),
			};
		},
		components: {
			VHeader,
			VFooter,
			Steps
		}, methods: {
			getGame () {
				const loading = this.$loading({ lock: true, text: "请稍等", });
				this.$http.get('api/v1/games', {
					params: {
						type: this.type,
						letter: this.index,
						page: this.page
					}
				}).then(({ data }) => {
					loading.close();
					this.games = data.games.data;
				});
			},
			changeIndex (item) {
				this.index = item;
				this.getGame();
			},
			setType (type) {
				this.type = type;
				this.getGame();
			}
		}
		, created () {
			this.getGame();
		}
	};
</script>

<style lang="scss" scoped>
	.title {
		margin-top: 16px;
		padding-right: 14px;
		display: flex;
		justify-content: space-between;
		background: #fff;
		border-bottom: 1px solid #ededed;
		.btn-group {
			width: 320px;
			display: flex;
			a {
				flex: 1;
				display: block;
				text-align: center;
				font-size: 14px;
				font-weight: bold;
				line-height: 50px;
				background-color: #fff;
				color: #000;
				&.active {
					background-color: #000;
					color: #fff;
				}
			}
		}
		.search {
			margin-top: 5px;
			width: 330px;
			.el-button {
				width: 80px;
				background: #000;
				border: 1px solid #000;
				color: #fff;
				padding: 13px 20px;
				font-size: 12px;
				font-weight: bold;
			}
		}
	}

	.tabs {
		display: flex;
		height: 40px;
		background: #f9f9f9;
		padding: 0 15px;
		a {
			flex: 1;
			display: flex;
			align-items: center;
			justify-content: center;
			font-size: 14px;
			font-weight: bold;
			color: #999;
			&.active {
				font-weight: 400;
				color: #000;
				border-radius: 50%;
			}
		}
	}
	.games {
		display: flex;
		flex-wrap: wrap;
		padding: 15px;
		background: #fff;
		.gameitem {
			flex: 1;
			max-width: 12.5%;
			display: flex;
			align-items: center;
			justify-content: center;
			flex-direction: column;
			padding: 30px;
			img {
				width: 76px;
				height: 76px;
				margin-bottom: 15px;
			}
			span {
				font-size: 14px;
				font-weight: 400;
				color: #000;
				text-overflow: ellipsis;
				white-space: nowrap;
			}
		}
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