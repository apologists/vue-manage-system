<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> 项目列表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="date" label="项目编号" width="55" align="center" type="index"></el-table-column>
        <el-table-column v-if="false" prop="projectId" label="项目编号" width="55" align="center"></el-table-column>
        <el-table-column prop="projectName" label="项目名称"></el-table-column>
        <el-table-column label="PJG图" align="center">
          <template #default="scope">
            <el-image class="table-td-thumb" :src="scope.row.thumb" :preview-src-list="[scope.row.thumb]">
            </el-image>
          </template>
        </el-table-column>
        <el-table-column prop="projectDesc" label="项目简介"></el-table-column>
        <el-table-column label="操作" width="300" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <router-link :to="{path:'./matrix',query:{projectId:scope.row.projectId}}">
              <el-button type="text" icon="el-icon-edit">风险矩阵</el-button>
            </router-link>
            <router-link :to="{path:'./variable',query:{projectId:scope.row.projectId}}">
              <el-button type="text" icon="el-icon-edit">SDG建模</el-button>
            </router-link>
            <router-link :to="{path:'./hazop',query:{projectId:scope.row.projectId}}">
              <el-button type="text" icon="el-icon-edit">hazop分析</el-button>
            </router-link>
            <router-link :to="{path:'./lopa',query:{projectId:scope.row.projectId}}">
              <el-button type="text" icon="el-icon-edit">lopa分析</el-button>
            </router-link>
            <router-link :to="{path:'./charts',query:{projectId:scope.row.projectId}}">
              <el-button type="text" icon="el-icon-edit">schart图表</el-button>
            </router-link>
            <router-link :to="{path:'./SIL',query:{projectId:scope.row.projectId}}">
              <el-button type="text" icon="el-icon-edit">SIL验算</el-button>
            </router-link>
            <el-button type="text" icon="el-icon-delete" class="red"
                       @click="handleDelete(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="pagination">
        <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                       :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
      </div>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="项目名称">
          <el-input v-model="form.projectName"></el-input>
        </el-form-item>
        <el-form-item label="项目简介">
          <el-input v-model="form.projectDesc"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit">确 定</el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {deleteProject,updateProject, fetchData} from "../api/index";

export default {
  name: "projectList",
  setup() {
    const query = reactive({
      desc: "",
      name: "",
      pageIndex: 1,
      pageSize: 10,
    });
    const tableData = ref([]);
    const pageTotal = ref(0);
    // 获取表格数据
    const getData = () => {
      fetchData(query).then((res) => {
        if (res.code === "200") {
          tableData.value = res.data.records;
          pageTotal.value = res.data.total || 50;
        }
      });
    };
    getData();

    // 查询操作
    const handleSearch = () => {
      query.pageIndex = 1;
      getData();
    };
    // 分页导航
    const handlePageChange = (val) => {
      query.pageIndex = val;
      getData();
    };

    // 删除操作
    const handleDelete = (index) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
          .then(async () => {
            const res = await deleteProject( {projectId : index.projectId});
            if (res.code === "200") {
              ElMessage.success("删除成功");
              window.location.reload();
            }
          })
          .catch(() => {});
    };

    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    let form = reactive({
      projectId:"",
      projectName: "",
      projectDesc: "",
    });
    let idx = -1;
    const handleEdit = (index, row) => {
      idx = index;
      Object.keys(form).forEach((item) => {
        form[item] = row[item];
      });
      console.log(form);
      editVisible.value = true;
    };

    const LopaEdit = (index, row) => {
        this.$router.push({
        path: '/lopa'
      })
    };
    const saveEdit = async () => {
      editVisible.value = false;
      const res = await updateProject(form);
      if (res.code === "200") {
        ElMessage.success(`修改第 ${idx + 1} 行成功`);
      }
      Object.keys(form).forEach((item) => {
        tableData.value[idx][item] = form[item];
      });
    };

    return {
      query,
      tableData,
      pageTotal,
      editVisible,
      form,
      handleSearch,
      handlePageChange,
      handleDelete,
      handleEdit,
      saveEdit,
      LopaEdit,
    };
  },
};
</script>

<style scoped>
.handle-box {
  margin-bottom: 20px;
}

.handle-select {
  width: 120px;
}

.handle-input {
  width: 300px;
  display: inline-block;
}
.table {
  width: 100%;
  font-size: 14px;
}
.red {
  color: #ff0000;
}
.mr10 {
  margin-right: 10px;
}
.table-td-thumb {
  display: block;
  margin: auto;
  width: 40px;
  height: 40px;
}
</style>
