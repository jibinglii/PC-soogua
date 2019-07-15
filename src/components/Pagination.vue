<template>
  <div class="pagination">
    <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-size="pageSize"
      layout="prev, pager, next, total, jumper, slot"
      :total="total"
      prev-text="上一页"
      next-text="下一页"
    >
      <button type="button" class="confirm" @click="toPage">确定</button>
    </el-pagination>
  </div>
</template>

<script>
export default {
  data() {
    return {
      currentPage: 1
    }
  },
  props: {
    total: {
      type: Number,
      default: 0
    },
    pageSize: {
      type: Number,
      default: 0
    }
  },
  methods: {
    handleSizeChange(val) {
      console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      console.log(`当前页: ${val}`);
      this.$emit("currentChange", val);
    },
    toPage() {
      let keyCoke = 13;
      let keyboardEvent = document.createEvent("KeyboardEvent");
      let initMethod =
        typeof keyboardEvent.initKeyboardEvent !== "undefined"
          ? "initKeyboardEvent"
          : "initKeyEvent";
      keyboardEvent[initMethod](
        "keydown",
        true,
        true,
        window,
        false,
        false,
        false,
        false,
        keyCoke,
        0
      );
      document.dispatchEvent(keyboardEvent);
    }
  }
};
</script>

<style lang="scss" scoped>
.pagination {
  margin: 60px auto;
  .el-pagination {
    text-align: center;
    /deep/.btn-prev {
      padding-left: 12px;
      border-radius: 4px;
    }
    /deep/.btn-next {
      padding-right: 12px;
      border-radius: 4px;
    }
    /deep/.el-pager {
      li {
        color: #000;
        margin-right: 4px;
        border-radius: 4px;
        &.active {
          color: #fff;
          background: #000;
        }
        &:first-child {
          margin-left: 4px;
        }
      }
    }
  }
  /deep/.el-pagination__total {
    margin-left: 48px;
    margin-right: 10px;
    font-weight: 400;
    color: #000;
  }
  /deep/.el-pagination__jump {
    margin-left: 0;
    font-weight: 400;
    color: #000;
  }
  .confirm {
    margin-left: 30px;
    padding-left: 10px;
    padding-right: 10px;
    font-size: 14px;
    font-weight: 400;
    border-radius: 4px;
    color: #fff;
    background: #000;
  }
}
</style>