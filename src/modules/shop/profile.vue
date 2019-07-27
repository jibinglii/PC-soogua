<template>
	<div class="person">
		<v-header></v-header>
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'person.person'}">个人中心</el-breadcrumb-item>
				<el-breadcrumb-item>店铺管理</el-breadcrumb-item>
			</el-breadcrumb>
			<v-content>
				<div slot="aside">
					<v-aside></v-aside>
				</div>
				<div slot="main">
					<div class="profile">
						<div class="title">店铺设置</div>
						<div class="content">
							<div class="left">
								<el-form :model="profile"
												 :rules="rules"
												 ref="profile"
												 label-width="85px"
												 class="profile-form">
									<el-form-item label="店铺名称"
																prop="name"
																placeholder="请输入店铺名称">
										<el-input v-model="profile.name"
															:disabled="true"></el-input>
									</el-form-item>
									<el-form-item label="店铺介绍"
																prop="desc">
										<el-input type="textarea"
															resize="none"
															v-model="profile.desc"
															placeholder="请输入店铺介绍"></el-input>
										<span class="size">{{size}}/50</span>
									</el-form-item>
									<el-form-item>
										<el-button type="primary"
															 @click="submit">确认</el-button>
									</el-form-item>
								</el-form>
							</div>
							<div class="right">
								<img :src="profile.logo"
										 alt />
								<!-- <el-upload class="up-img"
													 action="#"
													 :on-preview="handlePreview"
													 :on-exceed="handleExceed"
													 :limit="1"
													 :on-change="update"> -->
								<input id="uploaderInput"
											 ref="filElem"
											 class="weui-uploader__input"
											 type="file"
											 accept="image/*"
											 multiple=""
											 @change="upload"
											 v-show="false">
								<el-button @click="editIcon"
													 type="primary">上传店铺logo</el-button>
								<!-- </el-upload> -->
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
	import SparkMD5 from 'spark-md5'
	export default {
		data () {
			return {
				identity: true,
				editLogo: false,
				profile: {
					name: this.$currentStore().name,
					desc: this.$currentStore().desc,
					logo: this.$currentStore().logo
				},
				rules: {
					name: [
						{ min: 3, max: 15, message: "长度在 3 到 15 个字符", trigger: "blur" }
					],
					desc: [
						{ max: 50, message: "长度不得超过50个字符", trigger: "blur" }
					]
				}
			};
		},
		components: {
			VHeader,
			VFooter,
			VContent,
			VAside
		},
		computed: {
			size () {
				return this.profile.desc.length || 0;
			},
		},
		methods: {
			submit () {
				if (this.profile.desc.length > 50) {
					this.$message.error("字数不超过50");
					return false;
				}
				let param = { name: this.profile.name, desc: this.profile.desc, logo: this.profile.logo }
				const loading = this.$loading({ lock: true, text: "请稍等", });
				this.$http.post('api/v2/store/update', param).then(({ data }) => {
					loading.close();
					this.$message.success('店铺信息修改成功');
					this.$store.dispatch('storeInfo')
					this.$router.back()
				}).catch((error => {
					loading.close();
				}))

			},
			editIcon () {
				this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
			},
			upload (e) {
				let file = event.target.files[0];
				this.$toast.loading('正在上传...');
				let param = new FormData(); //创建form对象
				this.md5(file, (err, md5) => {
					// 请求配置
					this.$http.post('api/v1/upload/policy', { filename: file.name, md5: md5 }).then(({ data }) => {
						let config = data;
						param.append('key', config.key);
						param.append('policy', config.policy);
						param.append('OSSAccessKeyId', config.OSSAccessKeyId);
						param.append('success_action_status', '200'); //让服务端返回200,不然，默认会返回204
						param.append('signature', config.signature);
						param.append('file', file, file.name);//通过append向form对象添加数据
						this.$http.post(config.server, param, { loading: false }).then((response) => {
							this.$toast.clear();
							this.profile.logo = config.site_url;
							this.editLogo = true;
						}).catch((error => {
							this.$toast.clear();
							this.$message.error("设置失败，请重试");
						}))
					})
				})
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
						loadNext()
					} else {
						md5Fn(null, spark.end())
					}
				};

				/////////////////////////
				function loadNext () {
					const start = currentChunk * chunkSize;
					const end = start + chunkSize >= file.size ? file.size : start + chunkSize;
					reader.readAsArrayBuffer(blobSlice.call(file, start, end))
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
			display: flex;
			flex-direction: column;
			align-items: center;
			img {
				display: block;
				width: 106px;
				height: auto;
				max-width: 100%;
			}
			.el-button {
				margin-top: 30px;
				margin-left: 10px;
				width: 160px;
				border: 1px solid #000;
				color: #fff;
				background: #000;
			}
		}
		.left {
			.identity {
				font-size: 14px;
				font-weight: 400;
				h5 {
					color: #999;
					margin-bottom: 30px;
				}
				p {
					color: #000;
					margin-bottom: 30px;
				}
			}
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
