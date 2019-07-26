<template>
	<div class="order">
		<v-header></v-header>
		<div class="container">
			<el-breadcrumb separator-class="el-icon-arrow-right">
				<el-breadcrumb-item>您的位置：</el-breadcrumb-item>
				<el-breadcrumb-item :to="{ name:'home'}">首页</el-breadcrumb-item>
				<el-breadcrumb-item>个人中心</el-breadcrumb-item>
				<el-breadcrumb-item>订单管理</el-breadcrumb-item>
			</el-breadcrumb>
			<v-content>
				<div slot="aside">
					<v-aside></v-aside>
				</div>
				<div slot="main">
					<div class="title">查看我的订单</div>
					<v-tabs :tabs="tabs"
									activeTab="-1"
									@changeTab="changeTab" />
					<div class="goodslist">
						<el-table :data="orderData"
											style="width: 100%; text-align:center;"
											@row-click="onDetails">
							<el-table-column align="center"
															 prop="id"
															 label="订单编号"></el-table-column>
							<el-table-column align="center"
															 width="130"
															 prop="goods_server"
															 label="服务器名称"></el-table-column>
							<el-table-column align="center"
															 width="250"
															 label="商品名称">
								<template slot-scope="scope">
									<div class="goodsname">
										<img :src='scope.row.goods_logo'
												 alt />
										<span>{{scope.row.goods_title}}</span>
									</div>
								</template>
							</el-table-column>
							<el-table-column align="center"
															 prop="goods_price"
															 label="价格"></el-table-column>
							<el-table-column align="center"
															 prop="num"
															 label="数量"></el-table-column>
							<el-table-column align="center"
															 prop="total_amount"
															 label="总支付"></el-table-column>
							<el-table-column align="center"
															 prop="status_label"
															 :formatter="statusFormat"
															 label="订单状态"></el-table-column>
							<el-table-column align="center"
															 label="操作">
								<template slot-scope="scope">
									<el-button v-if="scope.row.status==2"
														 @click.native.prevent="confirm(scope.row.id,scope.$index)"
														 type="button"
														 size="small">确认收货</el-button>
									<el-button v-if="scope.row.status==0"
														 @click.native.prevent="destroy(scope.row.id,scope.$index)"
														 type="button"
														 size="small">删除</el-button>
								</template>
							</el-table-column>
						</el-table>
					</div>

          <pagination :total="total" :current-page="page" :display="display" @pagechange="getOrder"></pagination>
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
import VTabs from "$components/tabs";
import Pagination from "$components/Pagination";
import * as services from "$modules/buyerorder/services";

	export default {
		data () {
			return {
				searchForm: { order: "" },
				tabs: [
					{ label: "全部订单", name: "-1" },
					{ label: "待支付", name: "0" },
					{ label: "待发货", name: "1" },
					{ label: "已发货", name: "2" },
					{ label: "已完成", name: "3" },
					{ label: "退换货", name: "4", }
				],
				orderData: [],
				page: 1,
				infiniteId: +new Date(),
				total: 0, // 记录总条数
				status: -1,
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
		methods: {
			statusFormat (row, column) {
				if (row.closed) {
					return "订单已关闭"
				} else {
					return row.status_label
				}
			},
			confirm (id, index) {
				let message = "您确定要[确认收货]该订单吗？";
				let that = this;
				this.$confirm(message, '提示', {
					confirmButtonText: '确认收货',
					cancelButtonText: '取消',
				}).then(function () {
					const loading = that.$loading({
						lock: true,
						text: "请稍等",
					});
					services.orderConfirm(id).then(data => {
						loading.close();
						that.$message.success(data);
						that.orderData[index].status_label = '已完成';
						that.orderData[index].status = '3';
					}).catch(fail => {
						loading.close();
						//that.$message.error(fail.data.message);
					});
				})
					.catch(() => {
						loading.close();
						console.log('“cancel”');
					});
			},
			destroy (id, index) {
				let message = "您确定要[删除]该订单吗？";
				let that = this;
				this.$confirm(message, '提示', {
					confirmButtonText: '删除',
					cancelButtonText: '取消',
				}).then(function () {
					const loading = that.$loading({
						lock: true,
						text: "请稍等",
					});
					services.orderDelete(id).then(({ message }) => {
						loading.close();
						that.$message.success(message);
						//删除orderData中的这一行数据
						that.$delete(that.orderData, index)
					}).catch(fail => {
						loading.close();
						//that.$message.error(fail.data.message);
					});
				})
					.catch(() => {
						loading.close();
						console.log('“cancel”');
					});
			},
			changeTab (tab, event) {
				this.page = 1;
				this.status = tab.name;
				this.getOrder(this.page);
			},
			onDetails (row) {
				this.$router.push({
					name: "buyer.orderview",
					params: {
						order: row.id
					}
				});
			},
			getOrder (currentPage) {

				this.orderData = [];
				let param = {
					params: {
						page: currentPage,
					}
				};

				if (this.status != -1) {
					param['params']['status'] = this.status
				}
				this.$http.get('/api/v1/user/orders', param).then(({ data }) => {

					this.orderData = data.orders.data;
					this.page = data.currentPage;
					this.total = data.orders.total;

				})			}
		},
		created () {
			this.getOrder(this.page);
		}
	};
</script>

<style lang="scss" scoped>
.title {
  font-size: 14px;
  font-weight: 400;
  padding-left: 16px;
  line-height: 50px;
  border-bottom: 1px solid #ededed;
  background: #fff;
}

.form-inline {
  margin-top: 17px;
  width: 350px;
  .el-form-item {
    margin-bottom: 17px;
  }
  .el-button {
    width: 80px;
  }
}

.goodslist {
  margin-top: 16px;
  margin-bottom: 30px;
  .goodsname {
    display: flex;
    align-items: center;
    img {
      flex: 0.7;
      width: 88px;
      height: 88px;
      margin-right: 17px;
    }
    span {
      flex: 1;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 3;
    }
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

.el-button {
  width: 80px;
  background: #000;
  border: 1px solid #000;
  color: #fff;
  padding: 10px 10px;
  font-size: 12px;
}
</style>
