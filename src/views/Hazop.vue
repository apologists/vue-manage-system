<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> HAZOP分析
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="hazopId" label="项目编号" width="55" align="center"></el-table-column>
        <el-table-column prop="pullOffNode" label="原始拉偏点"></el-table-column>
        <el-table-column prop="deviation" label="偏差"></el-table-column>
        <el-table-column prop="abnormalCauses" label="非正常原因"></el-table-column>
        <el-table-column prop="adverseOutcomes" label="不利后果"></el-table-column>
        <el-table-column prop="relationships" label="可能性"></el-table-column>
        <el-table-column prop="riskSeverity" label="严重度"></el-table-column>
        <el-table-column prop="riskGrade" label="风险等级"></el-table-column>
        <el-table-column prop="existingMeasures" label="现有措施"></el-table-column>
        <el-table-column prop="suggestedActions" label="建议措施"></el-table-column>
        <el-table-column label="操作" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit(scope.$index, scope.row)">编辑
            </el-button>
            <el-button type="text" icon="el-icon-delete" class="red"
                       @click="handleDelete(scope.$index, scope.row)">删除</el-button>
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
        <el-form-item label="可能性">
          <el-input v-model="form.relationships"></el-input>
        </el-form-item>
        <el-form-item label="严重度">
          <el-input v-model="form.riskSeverity"></el-input>
        </el-form-item>
        <el-form-item label="现有措施">
          <el-input v-model="form.existingMeasures"></el-input>
        </el-form-item>
        <el-form-item label="建议措施">
          <el-input v-model="form.suggestedActions"></el-input>
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
import {fetchHazopData} from "../api/index";

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
      fetchHazopData(query).then((res) => {
        tableData.value = res.list;
        pageTotal.value = res.pageTotal || 50;
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
          .then(() => {
            ElMessage.success("删除成功");
            tableData.value.splice(index, 1);
          })
          .catch(() => {});
    };

    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    let form = reactive({
      relationships: "",
      riskSeverity: "",
      riskGrade:"",
      existingMeasures: "",
      suggestedActions: "",
    });
    let idx = -1;
    const handleEdit = (index, row) => {
      idx = index;
      Object.keys(form).forEach((item) => {
        form[item] = row[item];
      });
      editVisible.value = true;
    };
    const saveEdit = () => {
      editVisible.value = false;
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
      Object.keys(form).forEach((item) => {
        if(item==="riskGrade"){
          tableData.value[idx][item] = form["riskSeverity"]*form["relationships"];
        }else{
          tableData.value[idx][item] = form[item];
        }
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
