<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-cascades"></i> SIL验算
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div>
        <el-button type="primary" @click="updateEdit" style="float:right">新增</el-button>
      </div>
      <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
        <el-table-column prop="silSummaryId" label="编号" align="center"></el-table-column>
        <el-table-column label="传感器" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit1(scope.$index, scope.row)">冗余公式1</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit2(scope.$index, scope.row)">冗余公式2</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit3(scope.$index, scope.row)">冗余公式3</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit4(scope.$index, scope.row)">冗余公式4</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit5(scope.$index, scope.row)">冗余公式5</el-button>
          </template>
        </el-table-column>
        <el-table-column label="逻辑控制器" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit1(scope.$index, scope.row)">冗余公式1</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit2(scope.$index, scope.row)">冗余公式2</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit3(scope.$index, scope.row)">冗余公式3</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit4(scope.$index, scope.row)">冗余公式4</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit5(scope.$index, scope.row)">冗余公式5</el-button>
          </template>
        </el-table-column>
        <el-table-column label="执行器" width="180" align="center">
          <template #default="scope">
            <el-button type="text" icon="el-icon-edit" @click="handleEdit1(scope.$index, scope.row)">冗余公式1</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit2(scope.$index, scope.row)">冗余公式2</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit3(scope.$index, scope.row)">冗余公式3</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit4(scope.$index, scope.row)">冗余公式4</el-button>
            <el-button type="text" icon="el-icon-edit" @click="handleEdit5(scope.$index, scope.row)">冗余公式5</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="silSum" label="SIL验算结果" align="center"></el-table-column>
      </el-table>
    </div>

    <!-- 编辑弹出框 -->
    <el-dialog title="冗余公式1" v-model="editVisible1" width="30%">
      <el-form label-width="70px">
        <el-form-item  v-if="false" label="危险失效概率1">
          <el-input v-model="form.silSummaryId"></el-input>
        </el-form-item>
        <el-form-item label="危险失效概率">
          <el-input v-model="form.D1"></el-input>
        </el-form-item>
        <el-form-item label="检查时间间隔">
          <el-input v-model="form.Ti"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible1 = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit1">确 定</el-button>
                </span>
      </template>
    </el-dialog>
    <el-dialog title="冗余公式2" v-model="editVisible2" width="30%">
      <el-form label-width="70px">
        <el-form-item  v-if="false" label="危险失效概率1">
          <el-input v-model="form.silSummaryId"></el-input>
        </el-form-item>
        <el-form-item label="检查时间间隔">
          <el-input v-model="form.Ti"></el-input>
        </el-form-item>
        <el-form-item label="未检测到的危险失效概率">
          <el-input v-model="form.Du"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible2 = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit2">确 定</el-button>
                </span>
      </template>
    </el-dialog>
    <el-dialog title="冗余公式3" v-model="editVisible3" width="30%">
      <el-form label-width="70px">
        <el-form-item  v-if="false" label="危险失效概率1">
          <el-input v-model="form.silSummaryId"></el-input>
        </el-form-item>
        <el-form-item label="危险失效概率1">
          <el-input v-model="form.D1"></el-input>
        </el-form-item>
        <el-form-item label="危险失效概率2">
          <el-input v-model="form.D2"></el-input>
        </el-form-item>
        <el-form-item label="检查时间间隔">
          <el-input v-model="form.Ti"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible3 = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit3">确 定</el-button>
                </span>
      </template>
    </el-dialog>
    <el-dialog title="冗余公式4" v-model="editVisible4" width="30%">
      <el-form label-width="70px">
        <el-form-item  v-if="false" label="危险失效概率1">
          <el-input v-model="form.silSummaryId"></el-input>
        </el-form-item>
        <el-form-item label="检查时间间隔">
          <el-input v-model="form.Ti"></el-input>
        </el-form-item>
        <el-form-item label="未检测到的危险失效概率">
          <el-input v-model="form.Du"></el-input>
        </el-form-item>
        <el-form-item label="不可被检测到的危险故障概率">
          <el-input v-model="form.B"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible4 = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit4">确 定</el-button>
                </span>
      </template>
    </el-dialog>
    <el-dialog title="冗余公式5" v-model="editVisible5" width="30%">
      <el-form label-width="70px">
        <el-form-item  v-if="false" label="危险失效概率1">
          <el-input v-model="form.silSummaryId"></el-input>
        </el-form-item>
        <el-form-item label="危险失效概率">
          <el-input v-model="form.D1"></el-input>
        </el-form-item>
        <el-form-item label="检查时间间隔">
          <el-input v-model="form.Ti"></el-input>
        </el-form-item>
      </el-form>
      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible5 = false">取 消</el-button>
                    <el-button type="primary" @click="saveEdit5">确 定</el-button>
                </span>
      </template>
    </el-dialog>
  </div>
</template>

<script>
import { ref, reactive } from "vue";
import { ElMessage, ElMessageBox } from "element-plus";
import {deleteSilSummary, fetchSilSummaryData, updateSil1,updateSil2,updateSil3,updateSil4,updateSil5,SaveSilSummary} from "../api/index";

export default {
  name: "projectList",
  data(){
    return{
      tableData:[]
    }
  },
  methods: {
    async updateEdit() {
      var projectId = this.$route.query.projectId;
      console.info(projectId);
      await SaveSilSummary({projectId: projectId})
      location.reload();
    },
  },
  mounted() {
    var projectId = this.$route.query.projectId;
    this.form.projectId = projectId;
    const query = reactive({
      projectId: projectId
    });

    const getData = () => {
      fetchSilSummaryData(query).then((res) => {
        this.tableData = res.data;
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
            await deleteSilSummary({SilSummaryId: data.SilSummaryId});
            ElMessage.success("删除成功");
          })
          .catch(() => {});
    };

    // 表格编辑时弹窗和保存
    const editVisible1 = ref(false);
    const editVisible2 = ref(false);
    const editVisible3 = ref(false);
    const editVisible4 = ref(false);
    const editVisible5 = ref(false);
    let form = reactive({
      D1:"",
      D2: "",
      Du: "",
      S:"",
      B: "",
      Ti:"",
      projectId:"",
      silSummaryId:"",
    });
    let idx = -1;
    const handleEdit1 = (index, row) => {
      idx = index;
      Object.keys(form).forEach((item) => {
        form[item] = row[item];
      });
      editVisible1.value = true;
    };
    const saveEdit1 = async () => {
      console.info("修改成功")
      editVisible1.value = false;
      await updateSil1(form);
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
      location.reload();
    };

    const handleEdit2 = (index, row) => {
      idx = index;
      Object.keys(form).forEach((item) => {
        form[item] = row[item];
      });
      editVisible2.value = true;
    };
    const saveEdit2 = async () => {
      console.info("修改成功")
      editVisible2.value = false;
      await updateSil2(form);
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
      location.reload();
    };

    const handleEdit3 = (index, row) => {
      idx = index;
      Object.keys(form).forEach((item) => {
        form[item] = row[item];
      });
      editVisible3.value = true;
    };
    const saveEdit3 = async () => {
      console.info("修改成功")
      editVisible3.value = false;
      await updateSil3(form);
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
      location.reload();
    };

    const handleEdit4 = (index, row) => {
      idx = index;
      Object.keys(form).forEach((item) => {
        form[item] = row[item];
      });
      editVisible4.value = true;
    };
    const saveEdit4 = async () => {
      console.info("修改成功")
      editVisible4.value = false;
      await updateSil4(form);
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
      location.reload();
    };

    const handleEdit5 = (index, row) => {
      idx = index;
      Object.keys(form).forEach((item) => {
        form[item] = row[item];
      });
      editVisible5.value = true;
    };
    const saveEdit5 = async () => {
      console.info("修改成功")
      editVisible5.value = false;
      await updateSil5(form);
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
      location.reload();
    };

    return {
      editVisible1,
      editVisible2,
      editVisible3,
      editVisible4,
      editVisible5,
      form,
      handleDelete,
      handleEdit1,
      saveEdit1,
      handleEdit2,
      saveEdit2,
      handleEdit3,
      saveEdit3,
      handleEdit4,
      saveEdit4,
      handleEdit5,
      saveEdit5,
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
