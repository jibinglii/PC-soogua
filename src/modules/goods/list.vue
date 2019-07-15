<template>
  <div class="home">
    <v-header></v-header>

    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>游戏专区</el-breadcrumb-item>
      </el-breadcrumb>
      <div class="top">
        <div class="title">王者荣耀</div>
        <div class="cell">
          <span>选择类型：</span>
          <el-radio-group v-model="type">
            <el-radio-button v-for="(item,index) in types" :key="index" :label="item"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="cell">
          <span>游戏区服：</span>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in plats"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in plats"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
          <el-select v-model="value" placeholder="请选择">
            <el-option
              v-for="item in plats"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            ></el-option>
          </el-select>
        </div>
        <div class="cell">
          <span>账户绑定：</span>
          <el-radio-group v-model="type">
            <el-radio-button v-for="(item,index) in types" :key="index" :label="item"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="cell">
          <span>稀有皮肤：</span>
          <el-radio-group v-model="type">
            <el-radio-button v-for="(item,index) in types" :key="index" :label="item"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="cell">
          <span>强势英雄：</span>
          <el-radio-group v-model="type">
            <el-radio-button v-for="(item,index) in types" :key="index" :label="item"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="cell">
          <span>是否有申请记录：</span>
          <el-radio-group v-model="type">
            <el-radio-button v-for="(item,index) in types" :key="index" :label="item"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="cell">
          <span>至尊宝：</span>
          <el-radio-group v-model="type">
            <el-radio-button v-for="(item,index) in types" :key="index" :label="item"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="cell">
          <span>防沉迷设置：</span>
          <el-radio-group v-model="type">
            <el-radio-button v-for="(item,index) in types" :key="index" :label="item"></el-radio-button>
          </el-radio-group>
        </div>
        <div class="cell">
          <span>守护平台绑定：</span>
          <el-radio-group v-model="type">
            <el-radio-button v-for="(item,index) in types" :key="index" :label="item"></el-radio-button>
          </el-radio-group>
          <el-input v-model="min" placeholder></el-input>
          <i>至</i>
          <el-input v-model="max" placeholder></el-input>
          <el-button>确定</el-button>
        </div>
      </div>
      <el-container>
        <el-main>
          <div class="screen">
            <div class="left">
              <span
                v-for="(item,key) in ['最新发布','价格最低','价格最高']"
                :key="key"
                :class="{active:key==isActive}"
              >{{item}}</span>
            </div>
            <div class="right">
              共
              <span>283717</span>件相关商品
            </div>
          </div>
          <div class="list">
            <el-table :data="goodsData" style="width: 100%; text-align:center;">
              <el-table-column align="center" width="300px" prop="name" label="商品">
                <template slot-scope="scope">
                  <div class="goodsname">
                    <img src="~$assets/images/shangpinlogo@2x.png" alt />
                    <div class="text">
                      <span>{{scope.row.name}}</span>
                      <i>{{scope.row.type}}</i>
                      <i>{{scope.row.service}}</i>
                    </div>
                  </div>
                </template>
              </el-table-column>
              <el-table-column align="center" prop="price" label="价格"></el-table-column>
              <el-table-column align="center" prop="stock" label="库存"></el-table-column>
              <el-table-column align="center" prop="ensure" label="保障"></el-table-column>
              <el-table-column align="center" label="操作">
                <template slot-scope="scope">
                  <el-button
                    @click.native.prevent="onCopyLink(scope.row.link)"
                    type="button"
                    size="small"
                  >立即购买</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>

          <pagination :total="50" :pageSize="12" @currentChange="currentChange" />
        </el-main>
        <el-aside width="300px">
          <div class="aside-head">商品精选</div>
          <goods-item
            v-for="k in 4"
            :key="k"
            :styles="{width:'300px', marginBottom:'16px',background:'#fff'}"
          />
        </el-aside>
      </el-container>
    </div>

    <v-footer />
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";
import GoodsItem from "$components/GoodsItem";
import Pagination from "$components/Pagination";
export default {
  data() {
    return {
      value: "",
      isActive: 0,
      min: "",
      max: "",
      currentPage: 1,
      types: ["全部", "账号", "装备", "游戏币", "代练", "其他"],
      type: "全部",
      plats: [
        { value: "全部", label: "全部" },
        { value: "代练", label: "代练" },
        { value: "其他", label: "其他" }
      ],
      goodsData: [
        {
          name: "王者荣耀【苹果QQ】外婆缘 一大元素使武装战姬摄魂海克妮...",
          type: "商品类型：账号",
          service: "游戏区服：苹果QQ>老兵不死",
          price: "¥128.00",
          stock: "1件",
          ensure: "实名认证"
        },
        {
          name: "王者荣耀【苹果QQ】外婆缘 一大元素使武装战姬摄魂海克妮...",
          type: "商品类型：账号",
          service: "游戏区服：苹果QQ>老兵不死",
          price: "¥128.00",
          stock: "1件",
          ensure: "实名认证"
        },
        {
          name: "王者荣耀【苹果QQ】外婆缘 一大元素使武装战姬摄魂海克妮...",
          type: "商品类型：账号",
          service: "游戏区服：苹果QQ>老兵不死",
          price: "¥128.00",
          stock: "1件",
          ensure: "实名认证"
        },
        {
          name: "王者荣耀【苹果QQ】外婆缘 一大元素使武装战姬摄魂海克妮...",
          type: "商品类型：账号",
          service: "游戏区服：苹果QQ>老兵不死",
          price: "¥128.00",
          stock: "1件",
          ensure: "实名认证"
        }
      ]
    };
  },
  methods: {
    currentChange() {}
  },
  components: {
    VHeader,
    VFooter,
    GoodsItem,
    Pagination
  }
};
</script>

<style lang="scss" scoped>
.top {
  background: #fff;
  margin-bottom: 16px;
  .title {
    font-size: 14px;
    font-weight: 400;
    padding-left: 16px;
    line-height: 50px;
    border-bottom: 1px solid #ededed;
  }
}
.cell {
  padding-left: 20px;
  padding-right: 20px;
  border-bottom: 1px solid #ededed;
  span {
    display: inline-block;
    font-size: 14px;
    font-weight: bold;
    color: #666;
    width: 150px;
    text-align: center;
  }
}
.el-input {
  width: 90px;
  margin-left: 20px;
  margin-right: 20px;
}
.el-button {
  background: #000;
  border: 1px solid #000;
  color: #fff;
  font-size: 12px;
}
/deep/.el-input__inner {
  height: 36px;
  font-size: 12px;
  line-height: 36px;
}
/deep/.el-radio-button:first-child .el-radio-button__inner {
  border-left: 0;
  border-radius: 0;
}

/deep/.el-radio-button__inner {
  &:hover {
    color: #000;
  }
  border: 0;
}
/deep/.el-radio-button__orig-radio:checked + .el-radio-button__inner {
  color: #000;
  background-color: #fff;
  border-color: #fff;
  -webkit-box-shadow: -1px 0 0 0 #fff;
  box-shadow: -1px 0 0 0 #fff;
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

.el-main {
  max-width: 884px;
  padding: 0;
  margin-right: 16px;
  overflow: hidden;
}

.screen {
  height: 50px;
  padding-left: 20px;
  padding-right: 20px;
  background-color: #fff;
  margin-bottom: 15px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  .left {
    font-size: 14px;
    font-weight: bold;
    line-height: 50px;
    span {
      cursor: pointer;
      margin-right: 50px;
      color: #999;
      &.active {
        color: #000;
      }
    }
  }
  .right {
    font-size: 14px;
    font-weight: bold;
    line-height: 50px;
    color: #999;
    span {
      color: #000;
    }
  }
}

.goodsname {
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 88px;
    height: 88px;
    margin-right: 10px;
  }
  .text {
    display: flex;
    flex-direction: column;

    span {
      flex: 1;
      font-size: 14px;
      height: 28px;
      font-weight: 400;
      color: #000;
      text-align: left;
      overflow: hidden;
      text-overflow: ellipsis;
      display: -webkit-box;
      -webkit-box-orient: vertical;
      -webkit-line-clamp: 2;
    }
    i {
      font-size: 12px;
      font-weight: 400;
      color: #666;
      text-align: left;
    }
  }
}
.aside-head {
  margin-bottom: 15px;
  padding-left: 16px;
  font-size: 16px;
  font-weight: 400;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
}
</style>