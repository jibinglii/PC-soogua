<template>
	<div class="person">
		<v-header></v-header>
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>个人中心</el-breadcrumb-item>
				<el-breadcrumb-item>修改资料</el-breadcrumb-item>
			</el-breadcrumb>
			<v-content>
				<div slot="aside">
					<v-aside></v-aside>
				</div>
				<div slot="main">
					<div class="profile">
						<div class="title">修改资料设置</div>
						<div class="content">
							<div class="left">
								<el-form label-width="85px"
												 class="profile-form">
									<el-form-item label="昵称：">
										<el-input v-model="nickname"></el-input>
									</el-form-item>
									<el-form-item label="个性签名：">
										<el-input type="textarea"
															resize="none"
															v-model="sign"
															placeholder="请输入您的个性签名"></el-input>
										<span class="size">{{len}}/40</span>
									</el-form-item>
									<el-form-item>
										<el-button type="primary"
															 @click="submit()">确认</el-button>
									</el-form-item>
								</el-form>
							</div>
							<div class="right">
								<img :src="avatar"
										 alt>
								<input id="uploaderInput"
											 ref="filElem"
											 class="weui-uploader__input"
											 type="file"
											 accept="image/*"
											 multiple
											 @change="upload"
											 v-show="false">
								<el-button @click.native.prevent="editIcon">修改头像</el-button>
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
	import SparkMD5 from "spark-md5";
	export default {
		data () {
			return {
				editLogo: false,
				nickname: this.$user().nickname,
				sign: this.$user().sign,
				avatar: [this.$user().avatar]
			};
		},
		components: {
			VHeader,
			VFooter,
			VContent,
			VAside
		},
		computed: {
			len () {
				return this.sign.length || 0;
			}
		},
		watch: {
			sign (val) {
				if (val.length > 40) {
					this.sign = val.substr(0, 40);
				}
			}
		},
		methods: {
			submit () {
				let param = {
					nickname: this.nickname,
					sign: this.sign,
					avatar: this.avatar
				};
				const loading = this.$loading({ lock: true, text: "请稍等" });
				this.$http
					.post("api/v1/user/update-user", param)
					.then(({ data }) => {
						loading.close();
						this.$store.dispatch("loadUser");
						this.$router.back();
					})
					.catch(error => {
						loading.close();
					});
			},
			editIcon () {
				this.$refs.filElem.dispatchEvent(new MouseEvent("click"));
			},
			upload (e) {
				let file = event.target.files[0];
				const loading = this.$loading({ lock: true, text: "正在上传" });
				let param = new FormData(); //创建form对象
				this.md5(file, (err, md5) => {
					// 请求配置
					this.$http
						.post("api/v1/upload/policy", { filename: file.name, md5: md5 })
						.then(({ data }) => {
							let config = data;
							param.append("key", config.key);
							param.append("policy", config.policy);
							param.append("OSSAccessKeyId", config.OSSAccessKeyId);
							param.append("success_action_status", "200"); //让服务端返回200,不然，默认会返回204
							param.append("signature", config.signature);
							param.append("file", file, file.name); //通过append向form对象添加数据
							this.$http
								.post(config.server, param, { loading: false })
								.then(response => {
									loading.close()
									this.avatar = config.site_url;
									this.editLogo = true;
								})
								.catch(error => {
									loading.close()
									this.$message.error("设置失败，请重试");
								});
						});
				});
			},
			md5 (file, md5Fn) {
				let currentChunk = 0;
				const blobSlice =
					File.prototype.slice ||
					File.prototype.mozSlice ||
					File.prototype.webkitSlice;
				const chunkSize = 2097152;
				const chunks = Math.ceil(file.size / chunkSize);
				const spark = new SparkMD5.ArrayBuffer();
				const reader = new FileReader();

				loadNext();

				reader.onloadend = e => {
					spark.append(e.target.result); // Append array buffer
					currentChunk++;
					if (currentChunk < chunks) {
						loadNext();
					} else {
						md5Fn(null, spark.end());
					}
				};

				/////////////////////////
				function loadNext () {
					const start = currentChunk * chunkSize;
					const end =
						start + chunkSize >= file.size ? file.size : start + chunkSize;
					reader.readAsArrayBuffer(blobSlice.call(file, start, end));
				}
			}
		}
	};
</script>

<style lang="scss" scoped>
	.profile {
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
	}

	.content {
		display: flex;
		justify-content: space-between;
		padding: 30px 135px 70px 135px;
		.right {
			img {
				display: block;
				width: 139px;
				height: auto;
				max-width: 100%;
			}
			.el-button {
				margin-top: 30px;
				margin-left: 10px;
				width: 120px;
				border: 1px solid #a0a0a0;
				color: #000;
				background: #fff;
			}
		}
		.left {
			.profile-form {
				min-width: 400px;
				.el-form-item {
					margin-bottom: 30px;
					/deep/ &__label {
						text-align: left;
						color: #000;
					}
				}
				/deep/.el-textarea__inner {
					height: 180px;
				}
				.size {
					position: absolute;
					bottom: 0;
					right: 20px;
					width: 38px;
					font-size: 14px;
					font-weight: 400;
					color: #999;
				}
			}
		}
	}
	/deep/.el-input__inner {
		border: 1px solid #a0a0a0;
		color: #666;
	}

	.el-button--primary {
		color: #fff;
		background-color: #000;
		border-color: #000;
	}

	.el-button {
		width: 100%;
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
