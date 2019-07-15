<template>
  <div class="header">
    <div class="top">
      <div class="container">
        <div class="left">
          <router-link :to="{name: 'auth.login'}" tag="a">请登录</router-link>
          <router-link :to="{name: 'auth.login'}" tag="a">免费注册</router-link>
        </div>
        <div class="right">
          <router-link :to="{name: 'help'}" tag="a">帮助中心</router-link>
          <router-link :to="{name: 'collection'}" tag="a">我的收藏</router-link>
          <a href="javascript:">客服中心</a>
        </div>
      </div>
    </div>
    <div class="center">
      <div class="container">
        <div class="left">
          <img class="head" src="~$assets/images/headicon.png" alt>
          <div class="desc">
            <div class="group-1">
              <span>网络游戏专业品牌</span>
              <i>实名认证</i>
            </div>
            <p>店铺介绍：全区最全最牛B最无敌装备，有卖就有送。</p>
            <div class="group-2">
              <a href="javascript:">
                <img src="~$assets/images/kefu-white.png" alt>
                <span>联系商家</span>
              </a>
              <!-- <a href>
                <img src="~$assets/images/shoucang-6@2x.png" alt />
                <span>收藏</span>
              </a>-->
            </div>
          </div>
        </div>
        <div class="right">
          <p>
            在售商品：
            <span>100件</span>
          </p>
          <p>
            成交单量：
            <span>1032笔</span>
          </p>
          <p>
            订单成交率：
            <span>98%</span>
          </p>
        </div>
      </div>
    </div>
    <div class="bottom">
      <div class="container">
        <div class="left">
          <el-menu
            router
            :default-active="$route.path"
            class="el-menu-demo logo-nav-l"
            mode="horizontal"
            text-color="#999999"
            active-text-color="#ffffff"
          >
            <el-menu-item index="/">首页</el-menu-item>
            <el-menu-item index="/gamecenter">游戏</el-menu-item>
            <el-menu-item index="3">流量</el-menu-item>
            <el-menu-item index="4">账号</el-menu-item>
            <el-menu-item index="5">服务</el-menu-item>
          </el-menu>
        </div>
        <div class="right">
          <router-link :to="{name: 'person'}" tag="a">个人中心</router-link>
          <router-link :to="{name: 'person'}" tag="a">下载APP</router-link>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.header {
  background: url("/images/headerbg.png") center center no-repeat;
  background-size: cover;
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
      margin-right: 10px;
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
    float: left;
    .logo-nav-l {
      background-color: transparent;
      border: none;
      li.is-active {
        background-color: #555555;
      }
      li {
        float: left;
        padding: 0 30px;
        height: 49px;
        line-height: 49px;
        border: none;
      }
      li:hover {
        background-color: #555555;
      }
    }
  }
  .right {
    float: right;
    a{
      color:#fff;
      font-size: 14px;
      font-weight: 100;
      line-height: 50px;
      padding-left: 45px;
    }
  }
}
</style>
<template>
	<div class="header">
		<div class="top">
			<div class="container">
				<div class="left">
					<router-link v-if="isLogged"
											 :to="{ name: 'me.membercenter' }">
						<a href="javascript:void(0)">{{currentUser.nickname}}</a>
					</router-link>

					<a @click="logout()"
						 v-if="isLogged">退出</a>
					<router-link v-if="!isLogged"
											 :to="{name: 'auth.login'}"
											 tag="a">请登录</router-link>
					<router-link v-if="!isLogged"
											 :to="{name: 'auth.login'}"
											 tag="a">免费注册</router-link>
				</div>
				<div class="right">
					<router-link :to="{name: 'person'}"
											 tag="a">个人中心</router-link>
					<router-link :to="{name: 'help'}"
											 tag="a">帮助中心</router-link>
					<router-link :to="{name: 'collection'}"
											 tag="a">我的收藏</router-link>
					<a href="javascript:">客服中心</a>
				</div>
			</div>
		</div>
		<div class="center">
			<div class="container">
				<div class="left">
					<img class="head"
							 src="~$assets/images/headicon.png"
							 alt />
					<div class="desc">
						<div class="group-1">
							<span>网络游戏专业品牌</span>
							<i>实名认证</i>
						</div>
						<p>店铺介绍：全区最全最牛B最无敌装备，有卖就有送。</p>
						<div class="group-2">
							<a href="javascript:">
								<img src="~$assets/images/kefu-white.png"
										 alt />
								<span>联系商家</span>
							</a>
							<!-- <a href>
                <img src="~$assets/images/shoucang-6@2x.png" alt />
                <span>收藏</span>
              </a> -->
						</div>
					</div>
				</div>
				<div class="right">
					<p>
						在售商品：
						<span>100件</span>
					</p>
					<p>
						成交单量：
						<span>1032笔</span>
					</p>
					<p>
						订单成交率：
						<span>98%</span>
					</p>
				</div>
			</div>
		</div>
		<div class="bottom">
			<div class="container">
				<div class="left">
					<router-link :to="{name: 'home'}"
											 tag="a">首页</router-link>
					<router-link :to="{name: 'gamecenter'}"
											 tag="a">游戏</router-link>
					<a href="javascript:">流量</a>
					<a href="javascript:">账号</a>
					<a href="javascript:">服务</a>
				</div>
				<div class="right">
					<v-search />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
	import VSearch from "$components/VSearch";
	import { mapGetters, mapActions } from "vuex";
	import * as services from "$modules/home/services";
	export default {
		computed: {
			...mapGetters(["isLogged", "currentUser"])
		},
		methods: {
			...mapActions(["logout"]),
			handleSelect (key, keyPath) {
				console.log(key, keyPath);
			}
		},
		components: {
			VSearch
		}
	};
</script>

<style lang="scss" scoped>
	.header {
		background: url("/images/headerbg.png") center center no-repeat;
		background-size: cover;
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
				margin-right: 10px;
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
			float: left;
			a {
				margin-left: 43px;
				margin-right: 43px;
				color: #999;
				font-size: 16px;
				font-weight: 400;
				line-height: 50px;
				&:hover {
					color: #fff;
				}
			}
		}
		.right {
			float: right;
		}
	}
</style>
