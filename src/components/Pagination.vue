<template>
  <nav>
    <ul class="pagination">
      <li :class="{'disabled': current == 1}">
        <a href="javascript:;" @click="setCurrent(current - 1)">«</a>
      </li>
      <li :class="{'disabled': current == 1}">
        <a href="javascript:;" @click="setCurrent(1)">首页</a>
      </li>
      <li v-for="p in grouplist" :class="{'active': current == p.val}" :key="p.idx">
        <a href="javascript:;" @click="setCurrent(p.val)">{{ p.text }}</a>
      </li>
      <li :class="{'disabled': current == page}">
        <a href="javascript:;" @click="setCurrent(page)">尾页</a>
      </li>
      <li :class="{'disabled': current == page}">
        <a href="javascript:;" @click="setCurrent(current + 1)">»</a>
      </li>
    </ul>
  </nav>
</template>

<script type="es6">
export default {
  //import引入的组件需要注入到对象中才能使用
  components: {},
  name: "pagination",
  data() {
    //这里存放数据
    return {
      current: this.currentPage
    };
  },
  props: {
    total: {
      // 数据总条数
      type: Number,
      default: 0
    },
    display: {
      // 每页显示条数
      type: Number,
      default: 10
    },
    currentPage: {
      // 当前页码
      type: Number,
      default: 1
    },
    pagegroup: {
      // 分页条数
      type: Number,
      default: 5,
      coerce: function(v) {
        v = v > 0 ? v : 5;
        return v % 2 === 1 ? v : v + 1;
      }
    }
  },
  //监听属性 类似于data概念
  computed: {
    page: function() {
      // 总页数
      return Math.ceil(this.total / this.display);
    },
    grouplist: function() {
      // 获取分页页码
      var len = this.page,
        temp = [],
        list = [],
        count = Math.floor(this.pagegroup / 2),
        center = this.current;
      if (len <= this.pagegroup) {
        while (len--) {
          temp.push({ text: this.page - len, val: this.page - len });
        }
        return temp;
      }
      while (len--) {
        temp.push(this.page - len);
      }
      var idx = temp.indexOf(center);
      idx < count && (center = center + count - idx);
      this.current > this.page - count && (center = this.page - count);
      temp = temp.splice(center - count - 1, this.pagegroup);
      do {
        var t = temp.shift();
        list.push({
          text: t,
          val: t
        });
      } while (temp.length);
      if (this.page > this.pagegroup) {
        this.current > count + 1 &&
          list.unshift({ text: "...", val: list[0].val - 1 });
        this.current < this.page - count &&
          list.push({ text: "...", val: list[list.length - 1].val + 1 });
      }
      return list;
    }
  },
  //监控data中的数据变化
  watch: {},
  //方法集合
  methods: {
    setCurrent: function(idx) {
      if (this.current != idx && idx > 0 && idx < this.page + 1) {
        this.current = idx;
        this.$emit("pagechange", this.current);
      }
    }
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {},
  //生命周期 - 挂载完成（可以访问DOM元素）
  mounted() {}
};
</script>
<style lang='scss' scoped>
//@import url(); 引入公共css类
.pagination {
  overflow: hidden;
  display: table;
  margin: 0 auto;
  padding: 20px 0;
  li {
    float: left;
    height: 30px;
    border-radius: 5px;
    margin: 3px;
    color: #666;
    background-color: #fff;
    a {
      text-decoration: none;
      color: #000;
      display: block;
      width: 42px;
      height: 30px;
      text-align: center;
      line-height: 30px;
      font-size: 14px;
      border-radius: 5px;
      text-decoration: none;
    }
  }
  .active {
    background: #000;
    a {
      color: #fff;
    }
  }
  & :hover {
    background: #000;

    a {
      color: #fff;
    }
  }
}
</style>
