<template>
	<div class="upload">
		<span>{{content[prop].title}}</span>
		<div class="up-graphic">
			<img :src="image"
					 alt />

			<input id="uploaderInput"
						 ref="filElem"
						 class="weui-uploader__input"
						 type="file"
						 accept="image/*"
						 multiple=""
						 @change="upload"
						 v-show="false">
			<el-button @click="editIcon"
								 type="primary">点击上传</el-button>

			</el-upload>
		</div>
		<i>示例：</i>
		<div class="eg-graphic">
			<img :src="content[prop].exampleImg" />
			<el-button size="small"
								 type="primary"
								 @click="showDialog=true">查看详情要求</el-button>
		</div>
		<s>{{content[prop].desc}}</s>
		<el-dialog :title="dialogContent[prop].title"
							 :visible.sync="showDialog">
			<div class="dialog-img">
				<img :src="dialogContent[prop].img"
						 alt />
			</div>
			<p>{{dialogContent[prop].desc}}</p>
		</el-dialog>
	</div>
</template>

<script>
	import SparkMD5 from 'spark-md5'
	export default {

		data () {
			return {
				logo: '',
				showDialog: false,
				content: {
					zheng: {
						title: "正面身份证照片：",
						desc: "证件上文字清晰可识别",
						defaultImg: require("../../assets/images/zheng-default.png"),
						exampleImg: require("../../assets/images/zheng.png")
					},
					fan: {
						title: "反面身份证照片：",
						desc: "签发机关要清晰 \n必须要有效期内的身份证",
						defaultImg: require("../../assets/images/zheng-default.png"),
						exampleImg: require("../../assets/images/fan.png")
					},
					shouchi: {
						title: "手持身份证照片：",
						desc: "必须是本人手持身份证件",
						defaultImg: require("../../assets/images/zheng-default.png"),
						exampleImg: require("../../assets/images/shouchi.png")
					}
				},
				dialogContent: {
					zheng: {
						title: "查看详情",
						img: require("../../assets/images/zheng.png"),
						desc:
							"1. 身份证上的信息不能被遮挡，且清晰可见 \n 2. 照片请勿进行任何软件处理\n 3. 照片支持ipge/ipg/gif/bmp/p"
					},
					fan: {
						title: "查看详情",
						img: require("../../assets/images/fan.png"),
						desc:
							"1. 身份证上的信息不能被遮挡，且清晰可见 \n 2. 照片请勿进行任何软件处理 \n 3. 照片支持ipge/ipg/gif/bmp/p"
					},
					shouchi: {
						title: "查看详情",
						img: require("../../assets/images/shouchi.png"),
						desc:
							"1. 身份证上的信息不能被遮挡，且清晰可见 \n 2. 照片请勿进行任何软件处理 \n 3. 照片支持ipge/ipg/gif/bmp/p"
					}
				}
			};
		},
		props: {
			prop: {
				type: String,
				default: ""
			},
			image: {
				type: String,
				default: ""
			}
		},
		methods: {
			handlePreview () {

			},
			handleExceed () {

			},
			editIcon () {
				this.$refs.filElem.dispatchEvent(new MouseEvent('click'))
			},
			upload (e) {
				let file = event.target.files[0];
				const loading = this.$loading({
					lock: true,
					text: "正在上传",
				});
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
							loading.close()

							let data = {
								url: config.site_url,
								type: this.prop
							}
							this.$emit('upload', data);
						}).catch((error => {
							loading.close()
							this.$message.error("上传失败");
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
	.upload {
		display: flex;
		span {
			text-align: right;
			min-width: 130px;
			margin-right: 13px;
			&::before {
				content: "*";
				color: red;
			}
		}
		i {
			min-width: 69px;
			text-align: right;
			margin-right: 13px;
		}
		s {
			min-width: 120px;
			text-decoration: none;
			color: #d20404;
		}
		.up-graphic {
			min-width: 250px;
			.up {
				display: flex;
				flex-direction: column;
				align-items: center;
				.el-button {
					width: 120px;
					color: #fff;
					border: 1px solid #000;
					background: #000;
				}
			}
			img {
				width: 250px;
				height: 158px;
			}
		}
		.eg-graphic {
			min-width: 250px;
			margin-right: 20px;
			display: flex;
			flex-direction: column;
			align-items: center;
			img {
				width: 100%;
				height: 158px;
			}
			.el-button {
				margin-top: 20px;
				width: 120px;
				color: #999;
				border: 1px solid #ededed;
				background: #ededed;
			}
		}
	}
	/deep/.el-dialog__header {
		padding: 15px 30px;
	}
	/deep/.el-dialog__headerbtn {
		top: 12px;
		right: 30px;
	}
	.dialog-img {
		display: flex;
		align-items: center;
		justify-content: center;
		margin-bottom: 38px;
	}
	/deep/ .el-button--primary {
		color: #fff;
		background-color: #000;
		border-color: #000;
	}
</style>