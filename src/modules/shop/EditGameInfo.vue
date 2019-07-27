<template>
	<div>
		<v-header />
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>店铺管理</el-breadcrumb-item>
				<el-breadcrumb-item>修改商品</el-breadcrumb-item>
			</el-breadcrumb>
			<steps />
			<div class="nav">
				<span>当前选择</span>
				<i>{{goods.game_name}}-{{goods.server_name}}</i>
			</div>
			<div class="goods-info">
				<div class="title">商品信息</div>
				<div class="content">
					<el-form ref="form-info"
									 :model="param"
									 label-width="80px">
						<el-form-item label="商品标题">
							<el-col :span="22">
								<el-input v-model="param.title"
													title="商品标题"
													placeholder="一句话介绍下商品吧"
													:maxlength="20"></el-input>
							</el-col>
						</el-form-item>
						<el-form-item label="发布价格">
							<el-col :span="22">
								<el-input v-model="param.amount"
													title="发布价格"
													type="number"
													placeholder="5元-100万之间"
													unit="元"
													:min="5"
													:max="1000000"></el-input>
							</el-col>
							<el-col class="line"
											:span="2">元</el-col>
						</el-form-item>
						<el-form-item label="发布数量">
							<el-col :span="22">
								<el-input v-model.number="param.store_nums"
													title="发布数量"
													type="number"
													placeholder="请输入数量"
													unit="件"
													:min="1"></el-input>
							</el-col>
							<el-col class="line"
											:span="2">件</el-col>
						</el-form-item>
					</el-form>
					<div class="info-tips">
						<img src="~$assets/images/gantan.png"
								 alt />
						<span>您当前商品成交后，所需服务费为 {{service_fee}}元</span>
					</div>
				</div>
			</div>
			<div class="goods-desc">
				<div class="title">商品描述</div>
				<div class="content">
					<el-form ref="form-desc"
									 :model="param"
									 label-width="100px">
						<el-form-item label="详情描述"
													prop="content">
							<el-input type="textarea"
												resize="none"
												v-model="param.content"
												text
												placeholder="在这里描述您的商品"
												rows="5"></el-input>
							<span class="size">{{size}}/300</span>
						</el-form-item>
						<el-form-item label="上传图片：">
							<div style="width:650px;">
								<!--  -->
								<el-upload action="#"
													 :file-list="fileList"
													 list-type="picture-card"
													 :auto-upload="true"
													 :multiple="true"
													 accept="image/*"
													 :limit="15"
													 :http-request="upload"
													 :on-remove="imgRemove">
									<i slot="default"
										 class="el-icon-plus"></i>
									<div slot="file"
											 slot-scope="{file}">
										<img class="el-upload-list__item-thumbnail"
												 :src="file.url"
												 alt="nihao a ">
										<span class="el-upload-list__item-actions">
											<span class="el-upload-list__item-preview"
														@click="handlePictureCardPreview(file)">
												<i class="el-icon-zoom-in"></i>
											</span>
											<span v-if="!disabled"
														class="el-upload-list__item-delete"
														@click="handleDownload(file)">
												<i class="el-icon-download"></i>
											</span>
											<span v-if="!disabled"
														class="el-upload-list__item-delete"
														@click="handleRemove(file)">
												<i class="el-icon-delete"></i>
											</span>
										</span>
									</div>
								</el-upload>
								<el-dialog :visible.sync="dialogVisible">
									<img width="100%"
											 :src="dialogImageUrl"
											 alt="">
								</el-dialog>

								<span class="imgTip">一次最多可选15张，可以上传你认为有卖点的商品图片，请勿添加联系方式和其他平台信息，否则将导致商品下架。</span>
								<!--  -->
							</div>

						</el-form-item>
					</el-form>
					<el-checkbox class="cehckbox"
											 v-model="isagree"
											 checked>
						我同意
						<a href>《中国网络游戏服务寄售交易协议》</a>
					</el-checkbox>
				</div>
			</div>
			<div class="bottom-nav">
				<span>当前选择：</span>
				<i>{{goods.game_name}}-{{goods.server_name}}</i>
			</div>

			<div class="nextstep">
				<el-button @click.native.prevent="next"
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
	import SparkMD5 from 'spark-md5'
	import { mapGetters } from 'vuex'
	import protocol from '$api/protocol';

	export default {
		data () {
			return {
				goods: {},
				serverName: "...",
				param: {
					title: '',
					content: '',
					amount: 0,
					store_nums: 1,
					images: [],
				},

				isagree: true,
				saving: false,
				saleProtocol: '',
				service_fee: 0,
				dialogImageUrl: '',
				dialogVisible: false,
				fileList: [],
				//
			};
		},
		components: {
			VHeader,
			VFooter,
			Steps
		},
		computed: {
			size () {
				return this.param.content.length || 0;
			},
			...mapGetters(['currentUser']),
			serviceFee () {
				return this.param.amount * this.currentUser.service_fee;
			},
			hasSpec () {
				return this.goods.game.specs.length > 0
			}
		},
		created () {
			this.getGoods(this.$route.params.id);
			this.getSaleProtocol();
		},
		watch: {
			formDesc (newValue, oldValue) { }
		},
		methods: {

			getSaleProtocol () {
				protocol.getProtocol('transaction').then(({ data }) => {
					this.saleProtocol = data.content
				})
			},
			next () {
				if (!this.isagree) {
					this.$alert("请勾选《商品寄售服务协议》");
				} else {
					if (!this.saving) {
						this.saving = true;
						this.imagesToArr();
						const loading = this.$loading({ lock: true, text: "商品保存中", });
						this.$http.post('api/v1/goods/update/' + this.goods.uuid, this.param).then((res) => {
							this.saving = false;
							loading.close()
							if (this.hasSpec) {
								this.$router.push({
									name: 'shop.editGameSpec',
									params: { id: this.goods.game_id },
									query: {
										id: this.goods.uuid
									}
								})
							} else {
								this.$router.back()
							}
						}).catch(fail => {
							this.saving = false;
							loading.close()
						});
					}
				}
			},
			async getGoods (id) {
				const that = this;
				const loading = this.$loading({ lock: true, text: "请稍后", });
				await this.$http.get('api/v1/goods/' + id, {
					loading: true,
					params: { include: 'game.specs' }
				}).then(({ data }) => {
					loading.close()
					this.$nextTick(() => {
						let goods = data.goods;
						this.goods = goods;

						goods.images.forEach(function (url, index) {
							let item = {
								uid: index,
								url: url
							};
							that.fileList.push(item);
						});
						this.param = {
							amount: goods.amount,
							title: goods.title,
							store_nums: goods.store_nums,
							content: goods.content,
							images: goods.images
						}
					})
				})
			},
			showAgree () {
				this.$refs.agree.show();
			},

			imgRemove (file, fileList) {
				let uid = file.uid;
				fileList = this.fileList
				fileList.forEach(function (item, index) {
					if (uid == item.uid) {
						fileList.splice(index, 1);
					}
				})
			},
			imagesToArr () {
				this.param.images = [];
				let that = this;
				this.fileList.forEach(function (item) {
					that.param.images.push(item.url);
				});
			},
			upload (file) {
				const loading = this.$loading({ lock: false, text: "上传中", });
				file = file.file;
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
							let uid = file.uid;
							let item = {
								uid: uid,
								url: config.site_url
							};
							this.fileList.push(item);
							loading.close();
						}).catch((error => {
							loading.close();
							this.$toast('上传失败')
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
		width: 380px;
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