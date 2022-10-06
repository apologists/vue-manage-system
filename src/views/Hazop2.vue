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
      <el-tabs v-model="hazopMessage" @tab-click="handleClick">
        <el-tab-pane :label="`案件库`" name="first">
          <div>
            <el-button type="primary" @click="editVisible = true " style="float:right">新增</el-button>
          </div>
          <div class="handle-box">
            <el-input v-model="query.pullOffNode" placeholder="关键字" class="handle-input mr10"></el-input>
            <el-button type="primary" icon="el-icon-search" @click="handleSearch">搜索</el-button>
          </div>
          <el-table :data="caseData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
            <el-table-column v-if="false" prop="projectId" label="项目编号" width="55" align="center"></el-table-column>
            <el-table-column prop="caseId" label="项目编号" width="55" align="center"></el-table-column>
            <el-table-column prop="pullOffNode" label="原始拉偏点"></el-table-column>
            <el-table-column prop="deviation" label="偏差"></el-table-column>
            <el-table-column prop="abnormalCauses" label="非正常原因"></el-table-column>
            <el-table-column prop="adverseOutComes" label="不利后果"></el-table-column>
            <el-table-column prop="relationShips" label="可能性"></el-table-column>
            <el-table-column prop="riskSeverity" label="严重度"></el-table-column>
            <el-table-column prop="riskGrade" label="风险等级">
              <template #default="scope">
                <span v-if="scope.row.riskGrade>=0" style="color:green">{{ scope.row.riskGrade }}</span>
                <span v-if="scope.row.riskGrade>=1" style="color:yellow">{{ scope.row.riskGrade }}</span>
                <span v-if="scope.row.riskGrade>=2" style="color:purple">{{ scope.row.riskGrade }}</span>
                <span v-if="scope.row.riskGrade>=3" style="color:red">{{ scope.row.riskGrade }}</span>
                <span v-else style="color: #37B328">{{ scope.row.riskGrade }}</span>
              </template>
            </el-table-column>
            <el-table-column prop="existingMeasures" label="现有措施"></el-table-column>
            <el-table-column prop="suggestedActions" label="建议措施"></el-table-column>
            <el-table-column label="操作" width="180" align="center">
              <template #default="scope">
                <el-button type="text" icon="el-icon-delete" class="red" @click="handleCaseDelete(scope.$index, scope.row)">删除</el-button>
              </template>
            </el-table-column>
          </el-table>
          <!-- 编辑弹出框 -->
          <el-dialog title="编辑" v-model="editVisible" width="30%">
            <el-form label-width="70px">
              <el-form-item label="原始拉偏点">
                <el-input v-model="caseForm.pullOffNode"></el-input>
              </el-form-item>
              <el-form-item label="可能性">
                <el-input v-model="caseForm.relationShips"></el-input>
              </el-form-item>
              <el-form-item label="严重度">
                <el-input v-model="caseForm.riskSeverity"></el-input>
              </el-form-item>
              <el-form-item label="非正常原因">
                <el-input v-model="caseForm.abnormalCauses"></el-input>
              </el-form-item>
              <el-form-item label="不利后果">
                <el-input v-model="caseForm.adverseOutComes"></el-input>
              </el-form-item>
              <el-form-item label="风险等级">
                <el-input v-model="caseForm.riskGrade"></el-input>
              </el-form-item>
              <el-form-item label="现有措施">
                <el-input v-model="caseForm.existingMeasures"></el-input>
              </el-form-item>
              <el-form-item label="建议措施">
                <el-input v-model="caseForm.suggestedActions"></el-input>
              </el-form-item>
            </el-form>
            <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="saveCaseEdit">确 定</el-button>
                </span>
            </template>
          </el-dialog>
        </el-tab-pane>
      </el-tabs>
    </div>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {deleteHazop, updateHazop, fetchHazopData,updateCase,fetchCaseData,saveCase,deleteCase} from "../api/index";

export default {
  name: "projectList",
  data(){
    return{
      hazopMessage: 'first',
      tableData:[],
      projectId:""
    }
  },
  methods: {
    handleClick(tab, event) {
      sessionStorage.setItem('current_name', tab.props.name)
    },

    async updateEdit(index, data) {
      var projectId = this.$route.query.projectId;
      console.info(projectId);
      await updateCase({caseId: data.caseId, projectId: projectId})
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
      location.reload();
    },
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
      pullOffNode:"",
      relationShips: "",
      riskSeverity: "",
      riskGrade:"",
      existingMeasures: "",
      suggestedActions: "",
      caseId:"",
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

    let caseForm = reactive({
      pullOffNode:"",
      relationShips: "",
      riskSeverity: "",
      riskGrade:"",
      existingMeasures: "",
      suggestedActions: "",
      caseId:"",
      projectId:"",
      adverseOutComes:"",
      abnormalCauses:""
    });
    const handleCaseEdit = (index, row) => {
      idx = index;
      Object.keys(caseForm).forEach((item) => {
        caseForm[item] = row[item];
      });
      editVisible.value = true;
    };
    const saveCaseEdit = async () => {
      editVisible.value = false;
      await saveCase(caseForm);
      location.reload();
    };

    const handleCaseDelete = (index,data) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
          .then(async () => {
            await deleteCase({caseId: data.caseId});
            ElMessage.success("删除成功");
            location.reload();
          })
          .catch(() => {});
    };

    const query = reactive({
      pullOffNode: "",
      projectId:"",
    });
    const caseData = ref([]);
    // 获取表格数据
    const getCaseData = () => {
      fetchCaseData(query).then((res) => {
        console.info(res);
        caseData.value = res.data;
      });
    };
    getCaseData();

    // 查询操作
    const handleSearch = () => {
      query.pageIndex = 1;
      getCaseData();
    };

    return {
      editVisible,
      form,
      caseForm,
      caseData,
      query,
      saveCaseEdit,
      handleCaseEdit,
      handleSearch,
      handleDelete,
      handleEdit,
      saveEdit,
      handleCaseDelete,
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
