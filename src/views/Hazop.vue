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
        <el-table-column prop="relationShips" label="可能性"></el-table-column>
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
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="编辑" v-model="editVisible" width="30%">
      <el-form label-width="70px">
        <el-form-item label="可能性">
          <el-input v-model="form.relationShips"></el-input>
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
import {deleteHazop, updateHazop, fetchHazopData} from "../api/index";

export default {
  name: "projectList",
  data(){
    return{
      tableData:[]
    }
  },
  mounted() {
    var projectId = this.$route.query.projectId;
    this.form.projectId = projectId;
    const query = reactive({
      projectId: projectId
    });
    // 获取表格数据
    const getData = () => {
      fetchHazopData(query).then((res) => {
        this.tableData = res.data.records;
      });
    };
    getData();
  },
  setup() {
    // 删除操作
    const handleDelete = (index,data) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
          .then(async () => {
            await deleteHazop({hazopId: data.hazopId});
            ElMessage.success("删除成功");
            location.reload();
          })
          .catch(() => {});
    };

    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    let form = reactive({
      relationShips: "",
      riskSeverity: "",
      riskGrade:"",
      existingMeasures: "",
      suggestedActions: "",
      hazopId:"",
      projectId:"",
    });
    let idx = -1;
    const handleEdit = (index, row) => {
      idx = index;
      Object.keys(form).forEach((item) => {
        form[item] = row[item];
      });
      editVisible.value = true;
    };
    const saveEdit = async () => {
      editVisible.value = false;
      await updateHazop(form);
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
      location.reload();
    };

    return {
      editVisible,
      form,
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
