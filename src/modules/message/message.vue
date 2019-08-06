<template>
	<div class="person">
		<v-header></v-header>
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'person.person'}">个人中心</el-breadcrumb-item>
				<el-breadcrumb-item>我的消息</el-breadcrumb-item>
			</el-breadcrumb>
			<v-content>
				<div slot="aside">
					<v-aside></v-aside>
				</div>
				<div slot="main">
					<v-tabs :tabs="tabs"
									activeTab="notice"
									@changeTab="changeTab" />
					<el-checkbox-group v-model="checked"
														 @change="handleCheckedChange">
						<el-checkbox class="check-item"
												 v-for="(item,key) in options"
												 :key="key"
												 :label="key"
												 name="type">
							<a class="box"
								 @click.prevent="onDetails(key)">
								<span>{{item.title}}</span>
								<i>{{item.time}}</i>
							</a>
						</el-checkbox>
					</el-checkbox-group>
					<div class="select">
						<el-checkbox class="check-all"
												 v-model="checkAll"
												 @change="handleCheckAllChange">全选</el-checkbox>
						<el-button type="primary"
											 icon="el-icon-delete">删除选中</el-button>
					</div>
					<pagination :total="50"
											:pageSize="12"
											@currentChange="currentChange" />
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
	const noticeOptions = [
		{ title: "dfdfdf", time: "2019-04-23  17:39:22" },
		{ title: "dfdfdf", time: "2019-04-23  17:39:22" }
	];
	const msgOptions = [
		{ title: "121dfdfdf", time: "2019-04-23  17:39:22" },
		{ title: "121dfdfdf", time: "2019-04-23  17:39:22" }
	];
	export default {
		data () {
			return {
				curTab: "notice",
				options: [], //所有的数据
				checked: [], //选中的数据
				checkAll: false, //是否所有都选中
				tabs: [
					{ label: "系统公告", name: "notice" },
					{ label: "系统消息", name: "msg" }
				]
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
		created () {
			this.options = noticeOptions;
		},
		methods: {
			changeTab (tab) {
				this.curTab = tab.name;
				this.options = eval(`${tab.name}Options`);
			},
			onDetails (index) {
				this.$router.push({
					name: "message.details"
				});
			},
			currentChange () {

			},
			handleCheckAllChange (val) {

				let arr = [];
				if (val) {
					for (let i = 0, l = this.options.length;i < l;i++) {
						arr.push(i);
					}
				}
				this.checked = arr;
				this.isIndeterminate = false;
			},
			handleCheckedChange (value) {

				let checkedCount = value.length;
				this.checkAll = checkedCount === this.options.length;
			}
		}
	};
</script>

<style lang="scss" scoped>
	.check-item {
		display: block;
		background: #fff;
		color: #000;
		margin-right: 0;
		padding-left: 20px;
		padding-right: 20px;
		border-bottom: 1px solid #ededed;
		height: 60px;
		/deep/.el-checkbox__label {
			width: 100%;
			padding-left: 20px;
			padding-right: 10px;
		}
	}

	/deep/.el-checkbox__input.is-checked + .el-checkbox__label {
		color: #000;
	}
	/deep/.el-checkbox__input.is-checked .el-checkbox__inner {
		background-color: #000;
		border-color: #000;
	}

	.box {
		display: flex;
		justify-content: space-between;
		align-items: center;
		height: 60px;
		width: 100%;
		.time {
			display: block;
			font-size: 14px;
			font-weight: 400;
			color: #999;
		}
	}
	.select {
		display: flex;
		align-items: center;
		height: 60px;
		background: #fff;
		.el-button {
			color: #000;
			background-color: #ededed;
			border-color: #dcdcdc;
		}
		.check-all {
			background: #fff;
			color: #000;
			margin-left: 20px;
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
