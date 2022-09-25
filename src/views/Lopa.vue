<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> LOPA分析
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="lopaId" label="编号" v-if="false" align="center"></el-table-column>
        <el-table-column prop="scenarioDesc" label="场景描述" width="55" align="center"></el-table-column>
        <el-table-column prop="consequencesDesc" label="后果描述"></el-table-column>
        <el-table-column prop="eventIe" label="初始事件IE"></el-table-column>
        <el-table-column prop="ignitionProbability" label="点火概率"></el-table-column>
        <el-table-column prop="exposureProbability" label="人员暴露概率"></el-table-column>
        <el-table-column prop="lethalityRate" label="致死率"></el-table-column>
        <el-table-column prop="protectionDesc" label="独立保护层描述"></el-table-column>
        <el-table-column prop="protectionRate" label="独立保护层总丢失概率"></el-table-column>
        <el-table-column prop="accidentRate" label="事故发生概率"></el-table-column>
        <el-table-column prop="allowAccidentRate" label="可容许事故发生概率"></el-table-column>
        <el-table-column prop="silGrade" label="需求SIL等级"></el-table-column>
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
        <el-form-item label="要求等级">
          <el-radio v-model="form.level" label=2>高</el-radio>
          <el-radio v-model="form.level" label=1>低</el-radio>
        </el-form-item>
        <el-form-item label="场景描述">
          <el-input v-model="form.scenarioDesc"></el-input>
        </el-form-item>
        <el-form-item label="后果描述">
          <el-input v-model="form.consequencesDesc"></el-input>
        </el-form-item>
        <el-form-item label="初始事件IE">
          <el-input v-model="form.eventIE"></el-input>
        </el-form-item>
        <el-form-item label="点火概率">
          <el-input v-model="form.ignitionProbability"></el-input>
        </el-form-item>
        <el-form-item label="人员暴露概率">
          <el-input v-model="form.exposureProbability"></el-input>
        </el-form-item>
        <el-form-item label="致死率">
          <el-input v-model="form.lethalityRate"></el-input>
        </el-form-item>
        <el-form-item label="独立保护层描述">
          <el-input v-model="form.protectionDesc"></el-input>
        </el-form-item>
        <el-form-item label="独立保护层总丢失概率">
          <el-input v-model="form.protectionRate"></el-input>
        </el-form-item>
        <el-form-item label="可容许事故发生概率">
          <el-input v-model="form.allowAccidentRate"></el-input>
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
import {deleteLopa, fetchLopaData, updateLopa} from "../api/index";

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

    const getData = () => {
      fetchLopaData(query).then((res) => {
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
            await deleteLopa({lopaId: data.lopaId});
            ElMessage.success("删除成功");
          })
          .catch(() => {});
    };

    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    let form = reactive({
      lopaId:"",
      scenarioDesc: "",
      consequencesDesc: "",
      eventIE:"",
      ignitionProbability: "",
      exposureProbability: "",
      lethalityRate: "",
      protectionDesc: "",
      protectionRate:"",
      allowAccidentRate: "",
      accidentRate:"",
      SILGrade:"",
      projectId:"",
      level:""
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
      console.info("修改成功")
      editVisible.value = false;
      await updateLopa(form);
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
