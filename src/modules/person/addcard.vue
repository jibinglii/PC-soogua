<template>
	<div class="person">
		<v-header></v-header>
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'person.person'}">个人中心</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'person.card'}">银行卡管理</el-breadcrumb-item>
				<el-breadcrumb-item>填写银行卡信息</el-breadcrumb-item>
			</el-breadcrumb>
			<v-content>
				<div slot="aside">
					<v-aside></v-aside>
				</div>
				<div slot="main">
					<div class="addcard">
						<div class="title">银行卡管理</div>
						<div class="content">
							<van-radio-group v-model="cardtype"
															 class="bankType">
								选择账号类型：
								<van-radio name="bank">银行卡</van-radio>
								<van-radio name="alipay">支付宝</van-radio>
								<van-radio name="wechat">微信</van-radio>
							</van-radio-group>
							<van-cell-group v-if="cardtype=='bank'">
								<van-cell v-if="hasRealname"
													title="姓名">{{bankinfo.realname}}</van-cell>
								<van-field v-if="!hasRealname"
													 v-model="bankinfo.realname"
													 label="姓名"
													 placeholder="请输入您的姓名" />
								<van-field v-model="bankinfo.id_card"
													 label="身份证号"
													 placeholder="请输入您的身份证号" />
								<van-field v-model="bankinfo.bankno"
													 label="银行卡号"
													 placeholder="请输入银行卡号" />
								<van-field v-model="bankinfo.mobile"
													 label="预留手机号"
													 placeholder="请输入银行卡预留电话" />
							</van-cell-group>
							<van-cell-group v-if="cardtype=='alipay'">
								<van-cell v-if="hasRealname"
													title="姓名">{{bankinfo.realname}}</van-cell>
								<van-field v-if="!hasRealname"
													 v-model="bankinfo.realname"
													 label="姓名"
													 placeholder="请输入您的姓名" />
								<van-field v-model="bankinfo.bankno"
													 label="支付宝账号"
													 placeholder="请输入您的账号" />
								<van-field v-model="bankinfo.mobile"
													 label="预留手机号"
													 placeholder="请输入银行卡预留电话" />
							</van-cell-group>
							<van-cell-group v-if="cardtype=='wechat'">
								<van-cell v-if="hasRealname"
													title="姓名">{{bankinfo.realname}}</van-cell>
								<van-field v-if="!hasRealname"
													 v-model="bankinfo.realname"
													 label="姓名"
													 placeholder="请输入您的姓名" />
								<van-field v-model="bankinfo.bankno"
													 label="微信"
													 placeholder="请输入您的账号" />
								<van-field v-model="bankinfo.mobile"
													 label="预留手机号"
													 placeholder="请输入银行卡预留电话" />
							</van-cell-group>
							<van-checkbox v-model="checked">
								同意
								<span @click="showAgree">《绑卡服务协议》</span>
							</van-checkbox>
							<agree title="绑卡服务协议"
										 ref="agree"
										 :content="protocol" />
							<div class="btn">
								<el-button @click.native.prevent="next()"
													 type="button"
													 size="primary">确认</el-button>
								<el-button @click.native.prevent="back()"
													 type="button"
													 size="primary"
													 class="back">返回</el-button>
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
	import CellGroup from "vant/lib/cell-group";
	import "vant/lib/cell-group/style";
	import DropdownMenu from "vant/lib/dropdown-menu";
	import "vant/lib/dropdown-menu/style";
	import DropdownItem from "vant/lib/dropdown-item";
	import "vant/lib/dropdown-item/style";
	import Field from "vant/lib/field";
	import "vant/lib/field/style";
	import Checkbox from "vant/lib/checkbox";
	import "vant/lib/checkbox/style";
	import RadioGroup from "vant/lib/radio-group";
	import "vant/lib/radio-group/style";
	import Radio from "vant/lib/radio";
	import "vant/lib/radio/style";
	import Agree from "$components/Agree";
	import protocol from "$api/protocol";
	export default {
		data () {
			return {
				hasRealname: false,
				saving: false,
				checked: false,
				bankinfo: {
					bankno: "",
					realname: "",
					mobile: "",
					id_card: "",
					bank: "bank",
					is_default: 1
				},
				cardtype: "bank",
				protocol: ""
			};
		},
		components: {
			VHeader,
			VFooter,
			VContent,
			VAside,
			Agree,
			[DropdownMenu.name]: DropdownMenu,
			[DropdownItem.name]: DropdownItem,
			[CellGroup.name]: CellGroup,
			[Field.name]: Field,
			[Checkbox.name]: Checkbox,
			[RadioGroup.name]: RadioGroup,
			[Radio.name]: Radio
		},
		created () {
			this.getProtocol();
		},
		methods: {
			next () {
				if (!this.checked) {
					this.$message.error("请勾选《用户协议》");
				} else {
					if (!this.saving) {
						this.saving = true;
						const loading = this.$loading({
							lock: true,
							text: "信息保存中"
						});
						this.$http
							.post(
								"api/v1/bankcard",
								_.assign(this.bankinfo, { bank: this.cardtype })
							)
							.then(({ data }) => {

								this.saving = false;

								let redirect = this.$route.query["redirect"];
								if (data.need_confirm) {
									// todo fuyou
									let url =
										"/shop/bankcardsms.html?id=" +
										data.card.id +
										"&m=" +
										data.card.mobile +
										"&tssn=" +
										data.tssn +
										"&redirect=" +
										redirect;
									location.href = url;
								} else if (redirect != "" && redirect != undefined) {
									redirect = decodeURIComponent(redirect);
									location.replace(redirect);
								} else {
									this.$router.replace({ name: "person.card" });
								}
							})
							.catch(() => {
								loading.close();
							});
					}
				}
			},
			back () {
				this.$router.push({ name: "person.card" });
			},
			showAgree () {
				this.$refs.agree.show();
			},
			getProtocol () {
				protocol.getProtocol("store_add_band").then(({ data }) => {
					this.protocol = data.content;
				});
			}
		}
	};
</script>

<style lang="scss" scoped>
	.bankType {
		display: flex;
		padding: 10px 0px;
		.van-radio {
			padding-left: 20px;
		}
	}
	/deep/.van-field__label {
		width: 105px;
	}
	.van-cell {
		border: 1px solid #a0a0a0;
		margin-top: 30px;
		width: 340px;
	}
	/deep/.van-popup {
		height: 100%;
	}
	.van-checkbox {
		margin-top: 11px;
		font-size: 14px;
		color: #000;
		font-weight: 400;
		span {
			color: #f4c93a;
		}
	}
	/deep/.van-hairline--top-bottom::after {
		border-width: 0;
	}
	.addcard {
		min-height: 728px;
		background: #fff;
		margin-bottom: 100px;
		.title {
			font-size: 14px;
			font-weight: 400;
			padding-left: 16px;
			line-height: 60px;
			border-bottom: 1px solid #ededed;
		}
		.content {
			position: relative;
			padding-top: 10px;
			padding-left: 60px;
		}
	}
	.sendsms {
		color: #f4c93a;
		font-size: 14px;
		font-weight: 400;
		cursor: pointer;
	}
	.smstip {
		position: absolute;
		bottom: 125px;
		right: 380px;
		font-size: 14px;
		font-weight: 400;
		color: #999;
	}
	/deep/.el-input__inner {
		border: 0;
		color: #323233;
		height: 24px;
		line-height: 24px;
		padding: 0 40px 0 0;
	}
	/deep/.el-input__icon {
		line-height: 24px;
	}

	.btn {
		width: 340px;
		display: flex;
		justify-content: space-evenly;
		.el-button--primary {
			color: #fff;
			background-color: #000;
			border-color: #000;
		}
		.el-button {
			margin-top: 40px;
			width: 110px;
		}
		.back {
			background: transparent;
			border-color: #000;
			color: #000;
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
