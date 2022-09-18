<template id="matrix">
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> tab选项卡</el-breadcrumb-item>
            </el-breadcrumb>
          <el-text v-model="query.projectId" placeholder="用户名" class="handle mr10"></el-text>
        </div>
        <div class="container">
            <el-tabs v-model="riskMessage" @tab-click="handleClick">
                <el-tab-pane :label="`一般信息`" name="first">
                  <el-form ref="matrixFormRef" :rules="rules" :model="matrixForm" label-width="80px" :data="matrixFormData">
                    <el-form-item label="矩阵名称" prop="matrixName">
                      <template v-if="matrixFormData.matrixName === null">
                        <el-input v-model="matrixForm.matrixName"></el-input>
                      </template>
                      <template v-else>
                        <el-input type="text" readonly v-model="matrixFormData.matrixName" label="矩阵名称"/>
                      </template>
                    </el-form-item>
                    <el-form-item label="描述" prop="desc">
                      <template v-if="matrixFormData.matrixDesc === null">
                        <el-input v-model="matrixForm.matrixDesc"></el-input>
                      </template>
                      <template v-else>
                        <el-input type="text" readonly v-model="matrixFormData.matrixDesc" label="描述"/>
                      </template>
                    </el-form-item>
                    <el-form-item label="阶数" prop="matrixUnit">
                      <el-col :span="12">
                        <template v-if="matrixFormData.horizontal === null">
                          <el-input v-model="matrixForm.horizontal" label="行"/>
                        </template>
                        <template v-else>
                          <el-input type="text" readonly v-model="matrixFormData.horizontal" label="行"/>
                        </template>
                      </el-col>
                      <el-col :span="12">
                        <el-tag> —— </el-tag>
                      </el-col>
                      <el-col :span="12">
                        <template v-if="matrixFormData.longitudinal === null">
                          <el-input v-model="matrixForm.longitudinal" label="列"/>
                        </template>
                        <template v-else>
                          <el-input type="text" readonly v-model="matrixFormData.longitudinal" label="列"/>
                        </template>
                      </el-col>
                    </el-form-item>
                    <el-form-item v-show="matrixFormData.matrixDesc === null">
                      <el-button type="primary" @click="matrixOnSubmit">保存</el-button>
                      <el-button @click="matrixOnReset">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane :label="`风险严重度`" name="second">
                  <div>
                    <el-button type="primary" @click="editVisible = true " style="float:right">新增</el-button>
                  </div>
                  <el-table :data="riskData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                    <el-table-column prop="riskId" label="编码" width="55" align="center"></el-table-column>
                    <el-table-column prop="grade" label="等级" align="center"></el-table-column>
                    <el-table-column prop="severity" label="严重程度" width="55" align="center"></el-table-column>
                    <el-table-column prop="personnel" label="人员" align="center"></el-table-column>
                    <el-table-column prop="property" label="财产" width="55" align="center"></el-table-column>
                    <el-table-column prop="environment" label="环境" align="center"></el-table-column>
                    <el-table-column prop="reputation" label="声誉" width="55" align="center"></el-table-column>
                    <el-table-column prop="laws" label="法律法规" align="center"></el-table-column>
                    <el-table-column prop="lockout" label="停工" align="center"></el-table-column>
                    <el-table-column label="操作" width="180" align="center">
                      <template #default="scope">
                        <el-button type="text" icon="el-icon-delete" class="red"
                                   @click="riskDelete(scope.$index,scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <!-- 编辑弹出框 -->
                  <el-dialog title="编辑" v-model="editVisible" width="30%">
                    <el-form ref="riskFormRef" :rules="rules" :model="riskForm" label-width="70px">
                      <el-form-item label="等级">
                        <el-input v-model="riskForm.grade"></el-input>
                      </el-form-item>
                      <el-form-item label="严重程度">
                        <el-input v-model="riskForm.severity"></el-input>
                      </el-form-item>
                      <el-form-item label="人员">
                        <el-input v-model="riskForm.personnel"></el-input>
                      </el-form-item>
                      <el-form-item label="财产">
                        <el-input v-model="riskForm.property"></el-input>
                      </el-form-item>
                      <el-form-item label="环境">
                        <el-input v-model="riskForm.environment"></el-input>
                      </el-form-item>
                      <el-form-item label="声誉">
                        <el-input v-model="riskForm.reputation"></el-input>
                      </el-form-item>
                      <el-form-item label="法律法规">
                        <el-input v-model="riskForm.laws"></el-input>
                      </el-form-item>
                      <el-form-item label="停工">
                        <el-input v-model="riskForm.lockout"></el-input>
                      </el-form-item>
                    </el-form>
                    <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="editVisible = false">取 消</el-button>
                        <el-button type="primary" @click="riskOnSubmit">确 定</el-button>
                      </span>
                    </template>
                  </el-dialog>
              </el-tab-pane>
                <el-tab-pane :label="`可能性`" name="third">
                      <el-button type="primary" @click="editVisible = true " style="float:right">新增</el-button>
                      <el-dialog title="编辑" v-model="editVisible" width="30%">
                      <el-form ref="relationFormRef" :model="relationForm" label-width="80px">
                        <el-form-item label="频率等级">
                          <el-input v-model="relationForm.frequencyLevel"></el-input>
                        </el-form-item>
                        <el-form-item label="频率值">
                          <el-input v-model="relationForm.frequencyValue"></el-input>
                        </el-form-item>
                        <el-form-item label="描述">
                          <el-input v-model="relationForm.frequencyDesc"></el-input>
                        </el-form-item>
                      </el-form>
                      <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="editVisible = false">取 消</el-button>
                        <el-button type="primary" @click="relationOnSubmit">确 定</el-button>
                      </span>
                        </template>
                      </el-dialog>
                    <el-table :data="relationData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                      <el-table-column prop="frequencyId" label="编号" width="55" align="center"></el-table-column>
                      <el-table-column prop="frequencyLevel" label="频率等级" align="center"></el-table-column>
                      <el-table-column prop="frequencyValue" label="频率值" width="55" align="center"></el-table-column>
                      <el-table-column prop="frequencyDesc" label="描述" align="center"></el-table-column>
                      <el-table-column label="操作" width="180" align="center">
                        <template #default="scope">
                          <el-button type="text" icon="el-icon-delete" class="red"
                                     @click="relationDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
              </el-tab-pane>
                <el-tab-pane :label="`风险等级`" name="fourth">
                    <el-table :data="riskGradeData" border class="table" ref="multipleTable" header-cell-class-name="table-header" :cell-style="tableCellStyle">
                      <el-table-column prop="riskGradeId" label="编号" width="55" align="center"></el-table-column>
                      <el-table-column prop="riskGradeCode" label="Code" align="center"></el-table-column>
                      <el-table-column prop="riskGradeColor" label="Color" width="55" align="center"></el-table-column>
                      <el-table-column prop="riskGradeDesc" label="描述" align="center"></el-table-column>
                      <el-table-column prop="riskGrade" label="风险等级" width="55" align="center">
                      </el-table-column>
                      <el-table-column prop="riskGradeMeasure" label="应采用的行动/控制措施" align="center"></el-table-column>
                      <el-table-column prop="term" label="实时期限" width="55" align="center"></el-table-column>
                      <el-table-column prop="remark" label="备注" align="center"></el-table-column>
                      <el-table-column label="操作" width="180" align="center">
                        <template #default="scope">
                          <el-button type="text" icon="el-icon-edit" @click="riskGradeHandleEdit(scope.$index, scope.row)">编辑
                          </el-button>
                          <el-button type="text" icon="el-icon-delete" class="red"
                                     @click="riskGradeDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <el-dialog title="编辑" v-model="editVisible" width="30%">
                      <el-form label-width="70px">
                        <el-form-item label="描述">
                          <el-input v-model="riskGradeForm.riskGradeDesc"></el-input>
                        </el-form-item>
                        <el-form-item label="风险等级">
                          <el-input v-model="riskGradeForm.riskGrade"></el-input>
                        </el-form-item>
                        <el-form-item label="控制措施">
                          <el-input v-model="riskGradeForm.riskGradeMeasure"></el-input>
                        </el-form-item>
                        <el-form-item label="实时期限">
                          <el-input v-model="riskGradeForm.term"></el-input>
                        </el-form-item>
                        <el-form-item label="备注">
                          <el-input v-model="riskGradeForm.remark"></el-input>
                        </el-form-item>
                      </el-form>
                      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="riskGradeSaveEdit">确 定</el-button>
                </span>
                      </template>
                    </el-dialog>
                </el-tab-pane >
                <el-tab-pane :label="`矩阵`" name="fifth">
                  <el-table :data="matrixData" border stripe style="width: 100%" :cell-style="matrixCellStyle">
                    <el-table-column
                        :prop="index"
                        :label="item"
                        v-for="(item, index) in matrixList"
                        :key="index"
                    >
                    </el-table-column>
                  </el-table>
                </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import {reactive, ref} from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {
  createMatrix,
  createRelation,
  createRisk,
  deleteRelation,
  deleteRisk,
  fetchMatrixData,
  fetchRelationData,
  fetchRiskData,
  fetchRiskGradeData,
  updateRiskGrade,
  fetchMatrixSuammryData
} from "../api";

export default {
  name: "matrix",
  data() {
    return {
      riskData:[],
      relationData:[],
      matrixData:[],
      riskGradeData:[],
      riskMessage: 'first',
      matrixFormData:{},
    }
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
      console.log(tab.props.name);
      sessionStorage.setItem('current_name', tab.props.name)
    },
    tableCellStyle ({row, column, rowIndex, columnIndex}) {
      if(columnIndex === 2) {      // 表格的第11行做处理
        if(row.riskGrade === '很高') {             // 如果是低风险背景色蓝色，字体色白色
          return 'background:red'
        }else if(row.riskGrade === '高') {       // 较大风险
          return 'background:purple'
        }else if(row.riskGrade === '中') {       // 较大风险
            return 'background:yellow'
        }else if(row.riskGrade === '低') {       // 重大风险
          return 'background:green'
        } else {                    // 一般风险
          return 'background:white'
        }
      }else {
        return ''
      }
    },
    matrixCellStyle ({row, column, rowIndex, columnIndex}) {
      if(columnIndex === 1) {      // 表格的第11行做处理
        const str = row[1].split("（")[0];
        if(str === '很高') {             // 如果是低风险背景色蓝色，字体色白色
          return 'background:red'
        }else if(str === '高') {       // 较大风险
          return 'background:purple'
        }else if(str === '中') {       // 较大风险
          return 'background:yellow'
        }else if(str === '低') {       // 重大风险
          return 'background:green'
        } else {                    // 一般风险
          return 'background:green'
        }
      }else if(columnIndex === 2) {      // 表格的第11行做处理
        const str = row[2].split("（")[0];
        if(str === '很高') {             // 如果是低风险背景色蓝色，字体色白色
          return 'background:red'
        }else if(str === '高') {       // 较大风险
          return 'background:purple'
        }else if(str === '中') {       // 较大风险
          return 'background:yellow'
        }else if(str === '低') {       // 重大风险
          return 'background:green'
        } else {                    // 一般风险
          return 'background:green'
        }
      }else if(columnIndex === 3) {      // 表格的第11行做处理
        const str = row[3].split("（")[0];
        if(str === '很高') {             // 如果是低风险背景色蓝色，字体色白色
          return 'background:red'
        }else if(str === '高') {       // 较大风险
          return 'background:purple'
        }else if(str === '中') {       // 较大风险
          return 'background:yellow'
        }else if(str === '低') {       // 重大风险
          return 'background:green'
        } else {                    // 一般风险
          return 'background:green'
        }
      }
      else if(columnIndex === 4) {
        const str = row[4].split("（")[0];
        if(str === '很高') {             // 如果是低风险背景色蓝色，字体色白色
          return 'background:red'
        }else if(str === '高') {       // 较大风险
          return 'background:purple'
        }else if(str === '中') {       // 较大风险
          return 'background:yellow'
        }else if(str === '低') {       // 重大风险
          return 'background:green'
        } else {                    // 一般风险
          return 'background:green'
        }
      }
      else if(columnIndex === 5) {
        const str = row[5].split("（")[0];
        if(str === '很高') {             // 如果是低风险背景色蓝色，字体色白色
          return 'background:red'
        }else if(str === '高') {       // 较大风险
          return 'background:purple'
        }else if(str === '中') {       // 较大风险
          return 'background:yellow'
        }else if(str === '低') {       // 重大风险
          return 'background:green'
        } else {                    // 一般风险
          return 'background:green'
        }
      }
      else if(columnIndex === 6) {
        const str = row[6].split("（")[0];
        if(str === '很高') {             // 如果是低风险背景色蓝色，字体色白色
          return 'background:red'
        }else if(str === '高') {       // 较大风险
          return 'background:purple'
        }else if(str === '中') {       // 较大风险
          return 'background:yellow'
        }else if(str === '低') {       // 重大风险
          return 'background:green'
        } else {                    // 一般风险
          return 'background:green'
        }
      }
      else if(columnIndex === 7) {
        const str = row[7].split("（")[0];
        if(str === '很高') {             // 如果是低风险背景色蓝色，字体色白色
          return 'background:red'
        }else if(str === '高') {       // 较大风险
          return 'background:purple'
        }else if(str === '中') {       // 较大风险
          return 'background:yellow'
        }else if(str === '低') {       // 重大风险
          return 'background:green'
        } else {                    // 一般风险
          return 'background:green'
        }
      }
      else if(columnIndex === 8) {
        const str = row[8].split("（")[0];
        if(str === '很高') {             // 如果是低风险背景色蓝色，字体色白色
          return 'background:red'
        }else if(str === '高') {       // 较大风险
          return 'background:purple'
        }else if(str === '中') {       // 较大风险
          return 'background:yellow'
        }else if(str === '低') {       // 重大风险
          return 'background:green'
        } else {                    // 一般风险
          return 'background:green'
        }
      }
      else if(columnIndex === 9) {
        const str = row[9].split("（")[0];
        if(str === '很高') {             // 如果是低风险背景色蓝色，字体色白色
          return 'background:red'
        }else if(str === '高') {       // 较大风险
          return 'background:purple'
        }else if(str === '中') {       // 较大风险
          return 'background:yellow'
        }else if(str === '低') {       // 重大风险
          return 'background:green'
        } else {                    // 一般风险
          return 'background:green'
        }
      }
      else {
        return ''
      }
    },
  },
  created() {
    this.riskMessage = sessionStorage.getItem('current_name')
    if (sessionStorage.getItem('current_name') == null){
      this.riskMessage = 'first'
    }else{
      this.riskMessage = sessionStorage.getItem('current_name')
    }
  },
  mounted() {
    var projectId = this.$route.query.projectId;
    this.relationForm.projectId = projectId;
    this.riskForm.projectId = projectId;
    this.riskGradeForm.projectId = projectId;
    this.matrixForm.projectId = projectId;
    const query = reactive({
      projectId:projectId
    });

    const getMatrixData = () => {
      fetchMatrixData(query).then((res) => {
        this.matrixList = res.data.matrixList;
        this.matrixData = res.data.matrixData;
      });
    };
    getMatrixData();

    const getRiskData = () => {
      fetchRiskData(query).then((res) => {
        this.riskData = res.data.records;
      });
    };
    getRiskData();

    const getRelationData = () => {
      fetchRelationData(query).then((res) => {
        this.relationData = res.data.records;
      });
    };
    getRelationData();

    //获取矩阵
    const getMatrixSuammryData = () => {
      fetchMatrixSuammryData(query).then((res) => {
        this.matrixFormData = res.data;
        console.info(this.matrixFormData);
      });
    };
    getMatrixSuammryData();

    //获取风险等级
    const getRiskGrafeData = () => {
      fetchRiskGradeData(query).then((res) => {
        this.riskGradeData = res.data.records;
      });
    };
    getRiskGrafeData();
  },

  setup: function () {
    const rules = {
      riskGrade: [
        {required: true, message: "请输入风险等级为1~4", trigger: "blur"},
      ],
      matrixName: [
        {required: true, message: "请输入矩阵名称", trigger: "blur"},
      ],
      matrixDesc: [
        {required: true, message: "请输入矩阵描述", trigger: "blur"},
      ],
      longitudinal: [
        {required: true, message: "请输入单元", trigger: "blur"},
      ],
      horizontal: [
        {required: true, message: "请输入项目编号", trigger: "blur"},
      ],
      unit: [
        {required: true, message: "请矩阵行与列", trigger: "blur"},
      ],
      analyticalMethod: [
        {required: true, message: "请输入分析方法", trigger: "blur"},
      ],
      remark: [
        {required: true, message: "请输入备注", trigger: "blur"},
      ],
    };
    const matrixFormRef = ref(null);
    const matrixForm = reactive({
      matrixName: "",
      matrixDesc: "",
      horizontal: "",
      longitudinal: "",
      projectId:"",
    });
    const riskFormRef = ref(null);
    const riskForm = reactive({
      grade: "",
      severity: "",
      personnel: "",
      property: "",
      environment: "",
      reputation: "",
      laws: "",
      lockout: "",
      projectId:""
    });
    const relationFormRef = ref(null);
    const relationForm = reactive({
      frequencyLevel: "",
      frequencyValue: "",
      frequencyDesc: "",
      projectId:""
    });
    const riskGradeForm = reactive({
      riskGradeDesc: "",
      riskGrade: "",
      riskGradeMeasure: "",
      term: "",
      remark: "",
      riskGradeId:"",
      projectId:""
    });
    const riskGradeFormRef = ref(null);
    const query = reactive({
      projectId:""
    });

    // 表格编辑时弹窗和保存
    const editVisible = ref(false);
    let idx = -1;

    // 矩阵提交
    const matrixOnSubmit = () => {
      // 表单校验
      matrixFormRef.value.validate(async (valid) => {
        if (valid) {
          const res = await createMatrix(matrixForm);
          if (res.code === "200") {
            location.reload();
            ElMessage.success("提交成功！");
          }
        } else {
          return false;
        }
      });
    };
    // 矩阵重置
    const matrixOnReset = () => {
      matrixFormRef.value.resetFields();
    };

    // 风险提交
    const riskOnSubmit = () => {
      editVisible.value = false;
      // 表单校验
      riskFormRef.value.validate(async (valid) => {
        if (valid) {
          const res = await createRisk(riskForm);
          if (res.data != null) {
            location.reload();
            ElMessage.success("提交成功！");
          }else {
            ElMessage.error("添加风险严重程度数量超过矩阵行数");
          }
        } else {
          return false;
        }
      });
    };
    // 风险重置
    const riskOnReset = () => {
      riskFormRef.value.resetFields();
    };
    // 风险删除
    const riskDelete = (index, data) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
          .then(() => {
            deleteRisk({riskId: data.riskId});
            location.reload();
            ElMessage.success("删除成功");
          })
          .catch(() => {
          });
    };

    const relationOnSubmit = () => {
      editVisible.value = false;
      // 表单校验
      relationFormRef.value.validate(async (valid) => {
        if (valid) {
          const res = await createRelation(relationForm);
          if (res.data != null) {
            location.reload();
            ElMessage.success("提交成功！");
          }else {
            ElMessage.error("添加可能性数量超过矩阵列数");
          }
        } else {
          return false;
        }
      });
    };
    // 频率重置
    const relationOnReset = () => {
      relationFormRef.value.resetFields();
    };
    // 频率删除
    const relationDelete = (index,data) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
          .then(() => {
            deleteRelation({frequencyId: data.frequencyId});
            location.reload();
            ElMessage.success("删除成功");
          })
          .catch(() => {
          });
    };

    // 风险等级删除
    const riskGradeDelete = (index) => {
      // 二次确认删除
      ElMessageBox.confirm("确定要删除吗？", "提示", {
        type: "warning",
      })
          .then(() => {
            deleteRelation({riskGradeId: data.riskGradeId});
            location.reload();
            ElMessage.success("删除成功");
          })
          .catch(() => {
          });
    };
    // 风险等级更新
    const riskGradeHandleEdit = (index, row) => {
      idx = index;
      Object.keys(riskGradeForm).forEach((item) => {
        riskGradeForm[item] = row[item];
      });
      editVisible.value = true;
    };
    const riskGradeSaveEdit = async () => {
      editVisible.value = false;
      const res = await updateRiskGrade(riskGradeForm);
      location.reload();
      ElMessage.success(`修改第 ${idx + 1} 行成功`);
    };

    return {
      rules,
      matrixFormRef,
      matrixForm,
      riskFormRef,
      riskForm,
      relationForm,
      relationFormRef,
      riskGradeForm,
      riskGradeFormRef,
      query,
      editVisible,
      matrixOnSubmit,
      matrixOnReset,
      riskOnSubmit,
      riskOnReset,
      relationOnSubmit,
      relationOnReset,
      riskDelete,
      riskGradeDelete,
      relationDelete,
      riskGradeHandleEdit,
      riskGradeSaveEdit,
    };
  },
};
</script>

<style>
.message-title {
    cursor: pointer;
}
.handle-row {
    margin-top: 30px;
}
</style>

