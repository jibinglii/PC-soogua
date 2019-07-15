<template>
  <div>
    <v-header />
    <div class="container">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <el-breadcrumb-item>您的位置：</el-breadcrumb-item>
        <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
        <el-breadcrumb-item>分销管理</el-breadcrumb-item>
        <el-breadcrumb-item>分销人员管理</el-breadcrumb-item>
      </el-breadcrumb>
      <v-content>
        <div slot="aside">
          <v-aside></v-aside>
        </div>

        <div slot="main">
          <v-tabs :tabs="mainTabs" activeTab="personnel" @changeTab="changeTab" />
          <v-tabs :tabs="childTabs" activeTab="all" @changeTab="changeChildTab" />
          <div class="personnellist">
            <el-table :data="personData" style="width: 100%; text-align:center;">
              <el-table-column align="center" prop="id" label="分销人员ID"></el-table-column>
              <el-table-column align="center" prop="name" label="分销人员名称"></el-table-column>
              <el-table-column align="center" prop="state" label="分销人员状态"></el-table-column>
              <el-table-column align="center" width="400px" label="操作">
                <template slot-scope="scope">
                  <el-popover
                    :ref="'popover-'+scope.$index"
                    placement="left-start"
                    width="400"
                    trigger="click"
                  >
                    <el-form ref="form" :model="curPerson" label-width="100px">
                      <el-form-item label="分销人员ID">
                        <el-input v-model="curPerson.id"></el-input>
                      </el-form-item>
                      <el-form-item label="分销员备注">
                        <el-input v-model="curPerson.name"></el-input>
                      </el-form-item>
                      <el-form-item label="分销佣金">
                        <el-input v-model="curPerson.prop"></el-input>
                      </el-form-item>
                      <el-form-item label="状态">
                        <el-radio-group v-model="curPerson.state">
                          <el-radio label="正常"></el-radio>
                          <el-radio label="停用"></el-radio>
                        </el-radio-group>
                      </el-form-item>
                      <el-form-item>
                        <el-button type="primary" @click="onSubmit">确认</el-button>
                        <el-button @click="onCancel(scope.$index)">取消</el-button>
                      </el-form-item>
                    </el-form>
                  </el-popover>
                  <el-button
                  style="background:#fff;color:#000"
                    @click.native.prevent="onManage(scope.$index)"
                    type="button"
                    size="small"
                    v-popover="'popover-'+scope.$index"
                  >管理</el-button>
                  <el-button
                    @click.native.prevent="onState(scope.row.id)"
                    type="button"
                    size="small"
                  >分销状况</el-button>
                </template>
              </el-table-column>
            </el-table>
          </div>
          <pagination :total="50" :pageSize="12" @currentChange="currentChange" />
        </div>
      </v-content>
    </div>
    <v-footer />
  </div>
</template>

<script>
import VHeader from "$components/VHeader";
import VFooter from "$components/VFooter";
import VContent from "$components/VContent";
import VAside from "$components/VAside";
import VTabs from "$components/tabs";
import Pagination from "$components/Pagination";
export default {
  data() {
    return {
      mainTabs: [
        { label: "分销任务", name: "task" },
        { label: "分销人员管理", name: "personnel" },
        { label: "分销订单管理", name: "order" }
      ],
      childTabs: [
        { label: "全部", name: "all" },
        { label: "已启用", name: "enable" },
        { label: "未启用", name: "disable" }
      ],
      showPopover: false,
      curPerson: {},

      personData: [
        {
          id: 928372,
          name: "隔壁老王",
          state: "正常"
        },
        {
          id: 928373,
          name: "隔壁老王",
          state: "正常"
        },
        {
          id: 928373,
          name: "隔壁老王",
          state: "正常"
        },
        {
          id: 928373,
          name: "隔壁老王",
          state: "正常"
        },
        {
          id: 928373,
          name: "隔壁老王",
          state: "正常"
        },
        {
          id: 928374,
          name: "隔壁老王",
          state: "正常"
        }
      ]
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
    changeTab(tab, event) {
      this.$router.push({ name: `distribution.${tab.name}` });
    },
    changeChildTab(tab, event) {
      console.log(`TCL: handleClick -> datatab.name,event${tab.name} ${event}`);
    },
    onState() {
      this.$router.push({
        name: `distribution.personnel.state`,
        params: { id: "123" }
      });
    },
    onManage(index) {
      console.log("TCL: onManage -> index", index);
      this.curPerson = this.personData[index];
      this.showPopover = true;
    },

    onSubmit() {},
    onCancel(index) {
      this.$refs[`popover-` + index].doClose()
    },
    currentChange() {}
  }
};
</script>

<style lang="scss" scoped>
/deep/.el-table {
  th {
    background: #ededed;
  }
}
/deep/.el-popover {
  background: #fff;
  border: 1px solid #ebeef5;
  padding: 35px;
  font-size: 14px;
}

/deep/.el-form-item__label {
  text-align: left;
  color: #000;
}

.el-button {
  background: #000;
  border: 1px solid #000;
  color: #fff;
  padding: 11px 20px;
  font-size: 12px;
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