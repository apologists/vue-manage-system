<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> tab选项卡</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`基本信息`" name="first">
                  <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
                    <el-form-item label="公司名称" prop="name">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="装置" prop="device">
                      <el-input v-model="form.device"></el-input>
                    </el-form-item>
                    <el-form-item label="单元" prop="unit">
                      <el-input v-model="form.unit"></el-input>
                    </el-form-item>
                    <el-form-item label="项目编号" prop="projectId">
                      <el-input v-model="form.projectId"></el-input>
                    </el-form-item>
                    <el-form-item label="时间">
                      <el-col :span="11">
                        <el-form-item prop="date1">
                          <el-date-picker v-model="form.date" type="daterange" range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间" :size="size"
                          />
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="分析方法" prop="analyticalMethod">
                      <el-input v-model="form.analyticalMethod"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                      <el-input type="textarea" rows="5" v-model="form.remark"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onSubmit">保存</el-button>
                      <el-button @click="onReset">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane :label="`变量设置`" name="variableInfo">
                  <div class="container">
                    <div>
                      <el-button type="primary" @click="editVisible = true" style="float:right">新增</el-button>
                    </div>
                    <el-table :data="variableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                      <el-table-column prop="variableId" label="变量编号" width="55" align="center"></el-table-column>
                      <el-table-column prop="variableCN" label="中文名称"></el-table-column>
                      <el-table-column prop="variableEN" label="英文缩写"></el-table-column>
                      <el-table-column label="操作" width="180" align="center">
                        <template #default="scope">
<!--                          <el-button type="text" icon="el-icon-edit" @click="variableEdit(scope.$index, scope.row)">编辑-->
<!--                          </el-button>-->
                          <el-button type="text" icon="el-icon-delete" class="red"
                                     @click="variableDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <!-- 编辑弹出框 -->
                    <el-dialog title="编辑" v-model="editVisible" width="30%">
                      <el-form ref="variableFormRef" :rules="rules" :model="variableForm" label-width="70px">
                        <el-form-item label="中文名称">
                          <el-input v-model="variableForm.variableCN"></el-input>
                        </el-form-item>
                        <el-form-item label="英文缩写">
                          <el-input v-model="variableForm.variableEN"></el-input>
                        </el-form-item>
                      </el-form>
                      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="variableOnSubmit">确 定</el-button>
                </span>
                      </template>
                    </el-dialog>
                  </div>
                </el-tab-pane>
                <el-tab-pane :label="`变量关系`" name="formula">
                  <div class="container">
                    <div>
                      <el-button type="primary" @click="editVisible = true" style="float:right">新增</el-button>
                    </div>
                    <el-table :data="formulaData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                      <el-table-column prop="formulaId" label="变量公式编号" width="55" align="center"></el-table-column>
                      <el-table-column prop="formula" label="变量公式" align="center"></el-table-column>
                      <el-table-column label="操作" width="180" align="center">
                        <template #default="scope">
                          <el-button type="text" icon="el-icon-delete" class="red"
                                     @click="formulaDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <!-- 编辑弹出框 -->
                    <el-dialog title="编辑" v-model="editVisible" width="30%">
                      <el-form ref="formulaFormRef" :rules="rules" :model="formulaForm" label-width="70px">
                        <el-form-item label="变量公式">
                          <el-input v-model="formulaForm.formula"></el-input>
                        </el-form-item>
                      </el-form>
                      <template #footer>
                <span class="dialog-footer">
                    <el-button @click="editVisible = false">取 消</el-button>
                    <el-button type="primary" @click="formulaOnSubmit">确 定</el-button>
                </span>
                      </template>
                    </el-dialog>
                  </div>
              </el-tab-pane>
                <el-tab-pane :label="`变量关系表`" name="variableMatrix">
                <el-table :data="variableMatrixData" border stripe style="width: 100%">
                  <el-table-column
                      :prop="index"
                      :label="item"
                      v-for="(item, index) in variableMatrixList"
                      :key="index"
                  >
                  </el-table-column>
                </el-table>
              </el-tab-pane>
                <el-tab-pane :label="`不利结果`" name="adverseOutcomes">
                  <div>
                    <el-button type="primary" @click="editVisible = true " style="float:right">新增</el-button>
                  </div>
                <el-table :data="adverseOutcomesData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                  <el-table-column prop="adverseOutcomesId" label="编号" width="55" align="center"></el-table-column>
                  <el-table-column prop="pullOffNode" label="原始拉偏点" align="center"></el-table-column>
                  <el-table-column prop="deviate" label="偏离" width="55" align="center"></el-table-column>
                  <el-table-column prop="VariableName" label="变量名称" align="center"></el-table-column>
                  <el-table-column prop="deviation" label="偏差" width="55" align="center"></el-table-column>
                  <el-table-column prop="evolutionaryPath" label="演变路径" align="center"></el-table-column>
                  <el-table-column prop="adverseOutcomes" label="不利后果" width="55" align="center"></el-table-column>
                  <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                      <el-button type="text" icon="el-icon-delete" class="red"
                                 @click="adverseOutcomesDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 编辑弹出框 -->
                <el-dialog title="编辑" v-model="editVisible" width="30%">
                  <el-form ref="adverseOutcomesFormRef" :rules="rules" :model="adverseOutcomesForm" label-width="70px">
                    <el-form-item label="原始拉偏点">
                      <el-input v-model="adverseOutcomesForm.pullOffNode"></el-input>
                    </el-form-item>
                    <el-form-item label="偏离">
                      <el-input v-model="adverseOutcomesForm.deviate"></el-input>
                    </el-form-item>
                    <el-form-item label="变量名称">
                      <el-input v-model="adverseOutcomesForm.VariableName"></el-input>
                    </el-form-item>
                    <el-form-item label="偏差">
                      <el-input v-model="adverseOutcomesForm.deviation"></el-input>
                    </el-form-item>
                    <el-form-item label="演变路径">
                      <el-input v-model="adverseOutcomesForm.evolutionaryPath"></el-input>
                    </el-form-item>
                    <el-form-item label="不利后果">
                      <el-input v-model="adverseOutcomesForm.adverseOutcomes"></el-input>
                    </el-form-item>
                  </el-form>
                  <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="editVisible = false">取 消</el-button>
                        <el-button type="primary" @click="adverseOutcomesOnSubmit">确 定</el-button>
                      </span>
                  </template>
                </el-dialog>
              </el-tab-pane>
                <el-tab-pane :label="`非正常因素`" name="abnormalCauses">
                <div>
                  <el-button type="primary" @click="editVisible = true " style="float:right">新增</el-button>
                </div>
                <el-table :data="abnormalCausesData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                  <el-table-column prop="abnormalCausesId" label="编号" width="55" align="center"></el-table-column>
                  <el-table-column prop="consequenceNode" label="原始拉偏点" align="center"></el-table-column>
                  <el-table-column prop="deviate" label="偏离" width="55" align="center"></el-table-column>
                  <el-table-column prop="VariableName" label="变量名称" align="center"></el-table-column>
                  <el-table-column prop="deviation" label="偏差" width="55" align="center"></el-table-column>
                  <el-table-column prop="evolutionaryPath" label="演变路径" align="center"></el-table-column>
                  <el-table-column prop="abnormalCauses" label="不利后果" width="55" align="center"></el-table-column>
                  <el-table-column label="操作" width="180" align="center">
                    <template #default="scope">
                      <el-button type="text" icon="el-icon-delete" class="red"
                                 @click="abnormalCausesDelete(scope.$index, scope.row)">删除</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <!-- 编辑弹出框 -->
                <el-dialog title="编辑" v-model="editVisible" width="30%">
                  <el-form ref="abnormalCausesFormRef" :rules="rules" :model="abnormalCausesForm" label-width="70px">
                    <el-form-item label="原始拉偏点">
                      <el-input v-model="abnormalCausesForm.consequenceNode"></el-input>
                    </el-form-item>
                    <el-form-item label="偏离">
                      <el-input v-model="abnormalCausesForm.deviate"></el-input>
                    </el-form-item>
                    <el-form-item label="变量名称">
                      <el-input v-model="abnormalCausesForm.VariableName"></el-input>
                    </el-form-item>
                    <el-form-item label="偏差">
                      <el-input v-model="abnormalCausesForm.deviation"></el-input>
                    </el-form-item>
                    <el-form-item label="演变路径">
                      <el-input v-model="abnormalCausesForm.evolutionaryPath"></el-input>
                    </el-form-item>
                    <el-form-item label="非正常原因">
                      <el-input v-model="abnormalCausesForm.abnormalCauses"></el-input>
                    </el-form-item>
                  </el-form>
                  <template #footer>
                      <span class="dialog-footer">
                        <el-button @click="editVisible = false">取 消</el-button>
                        <el-button type="primary" @click="abnormalCausesOnSubmit">确 定</el-button>
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
import {ElMessage, ElMessageBox} from "element-plus";
import {
  fetchData,
  fetchAdverseOutcomesData,
  fetchAbnormalCausesData,
  fetchVariableData,
  fetchFormulaData, fetchMatrixData, fetchVariableMatrixData
} from "../api";
export default {
    name: "tabs",
    setup() {
        const rules = {
        name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
        device: [
          { required: true, message: "请输入装置名称", trigger: "blur" },
        ],
        unit: [
          { required: true, message: "请输入单元", trigger: "blur" },
        ],
        projectId: [
          { required: true, message: "请输入项目编号", trigger: "blur" },
        ],
        date: [
          { required: true, message: "请选择项目时间", trigger: "blur" },
        ],
        analyticalMethod: [
          { required: true, message: "请输入分析方法", trigger: "blur" },
        ],
        remark: [
          { required: true, message: "请输入备注", trigger: "blur" },
        ],
        };
        const formRef = ref(null);
        const form = reactive({
        name: "",
        device:"",
        unit:"",
        projectId:"",
        date:"",
        analyticalMethod:"",
        remark:""
      });
        const tableData = ref([]);
        const pageTotal = ref(0);
        //变量
        const variableFormRef = ref(null);
        const variableForm = reactive({
          variableCN:"",
          variableEN:""
      });
        const variableData = ref([]);

       //变量公式
        const formulaFormRef = ref(null);
        const formulaForm = reactive({
          formula:""
      });
        const formulaData = ref([]);

        const variableMatrixData = ref([]);
        const variableMatrixList = ref();
        //不利结果
        const adverseOutcomesFormRef = ref(null);
        const adverseOutcomesForm = reactive({
          pullOffNode: "",
          deviate:"",
          VariableName:"",
          deviation:"",
          evolutionaryPath: "",
          adverseOutcomes:""
      });
        const adverseOutcomesData = ref([]);

        //非正常因素
        const abnormalCausesFormRef = ref(null);
        const abnormalCausesForm = reactive({
          consequenceNode: "",
          deviate:"",
          VariableName:"",
          deviation:"",
          evolutionaryPath: "",
          abnormalCauses:""
      });
        const abnormalCausesData = ref([]);
        // 获取表格数据
        const getData = () => {
        fetchData().then((res) => {
          tableData.value = res.list;
          pageTotal.value = res.pageTotal || 50;
        });
      };
        getData();
        // 分页导航
        const handlePageChange = (val) => {
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
        let form2 = reactive({
        id: "",
        dsc: "",
        Pd: "",
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
          tableData.value[idx][item] = form[item];
        });
      };
        // 提交
        const onSubmit = () => {
        // 表单校验
        formRef.value.validate((valid) => {
          if (valid) {
            console.log(form);
            ElMessage.success("提交成功！");
          } else {
            return false;
          }
        });
      };
        // 重置
        const onReset = () => {
        formRef.value.resetFields();
      };
        const message = ref("first");

        //获取变量数据
        const getVariableData = () => {
        fetchVariableData().then((res) => {
          variableData.value = res.list;
          pageTotal.value = res.pageTotal || 50;
        });
      };
        getVariableData();
        // 变量提交
        const variableOnSubmit = () => {
        editVisible.value = false;
        // 表单校验
        variableFormRef.value.validate((valid) => {
          if (valid) {
            variableData.value.push({
              variableCN: variableForm.variableCN,
              variableEN: variableForm.variableEN
            });
            console.log(variableForm);
            ElMessage.success("提交成功！");
          } else {
            return false;
          }
        });
      };
        // 变量重置
        const  variableOnReset = () => {
        variableFormRef.value.resetFields();
      };
        // 删除变量
        const variableDelete = (index) => {
        // 二次确认删除
        ElMessageBox.confirm("确定要删除吗？", "提示", {
          type: "warning",
        })
            .then(() => {
              ElMessage.success("删除成功");
              variableData.value.splice(index, 1);
            })
            .catch(() => {});
      };
        //打开变量弹窗
        const variableEdit = (index, row) => {
        idx = index;
        Object.keys(variableForm).forEach((item) => {
          variableForm[item] = row[item];
        });
        editVisible.value = true;
      };


       //获取公式数据
        const getFormulaData = () => {
        fetchFormulaData().then((res) => {
          formulaData.value = res.list;
          pageTotal.value = res.pageTotal || 50;
        });
      };
        getFormulaData();
        // 公式提交
        const formulaOnSubmit = () => {
        editVisible.value = false;
        // 表单校验
        formulaFormRef.value.validate((valid) => {
          if (valid) {
            formulaData.value.push({
              formula: formulaForm.formula
            });
            console.log(formulaForm);
            ElMessage.success("提交成功！");
          } else {
            return false;
          }
        });
      };
        // 公式重置
        const  formulaOnReset = () => {
        formulaFormRef.value.resetFields();
      };
        // 删除公式
        const formulaDelete = (index) => {
        // 二次确认删除
        ElMessageBox.confirm("确定要删除吗？", "提示", {
          type: "warning",
        })
            .then(() => {
              ElMessage.success("删除成功");
              formulaData.value.splice(index, 1);
            })
            .catch(() => {});
      };
        //打开公式弹窗
        const formulaEdit = (index, row) => {
        idx = index;
        Object.keys(formulaForm).forEach((item) => {
          formulaForm[item] = row[item];
        });
        editVisible.value = true;
      };

        //获取变量关系表数据
        const getVariableMatrixData = () => {
          fetchVariableMatrixData().then((res) => {
            variableMatrixData.value = res.variableMatrixData;
            variableMatrixList.value = res.variableMatrixList;
          });
        };
        getVariableMatrixData();


        //获取不利结果数据
        const getAdverseOutcomesData = () => {
        fetchAdverseOutcomesData().then((res) => {
          adverseOutcomesData.value = res.list;
          pageTotal.value = res.pageTotal || 50;
        });
      };
        getAdverseOutcomesData();
        // 不利结果提交
        const adverseOutcomesOnSubmit = () => {
        editVisible.value = false;
        // 表单校验
        adverseOutcomesFormRef.value.validate((valid) => {
          if (valid) {
            adverseOutcomesData.value.push({
              pullOffNode: adverseOutcomesForm.pullOffNode,
              deviate:adverseOutcomesForm.deviate,
              VariableName:adverseOutcomesForm.VariableName,
              deviation:adverseOutcomesForm.deviation,
              evolutionaryPath: adverseOutcomesForm.evolutionaryPath,
              adverseOutcomes:adverseOutcomesForm.adverseOutcomes
            });
            console.log(adverseOutcomesForm);
            ElMessage.success("提交成功！");
          } else {
            return false;
          }
        });
      };
        // 不利结果重置
        const  adverseOutcomesOnReset = () => {
        adverseOutcomesFormRef.value.resetFields();
      };
        // 删除不利结果
        const adverseOutcomesDelete = (index) => {
        // 二次确认删除
        ElMessageBox.confirm("确定要删除吗？", "提示", {
          type: "warning",
        })
            .then(() => {
              ElMessage.success("删除成功");
              adverseOutcomesData.value.splice(index, 1);
            })
            .catch(() => {});
      };

        //非正常因素数据获取
        const getAbnormalCausesData = () => {
        fetchAbnormalCausesData().then((res) => {
          abnormalCausesData.value = res.list;
          pageTotal.value = res.pageTotal || 50;
        });
      };
        getAbnormalCausesData();
        // 非正常因素提交
        const abnormalCausesOnSubmit = () => {
        editVisible.value = false;
        // 表单校验
        abnormalCausesFormRef.value.validate((valid) => {
          if (valid) {
            abnormalCausesData.value.push({
              consequenceNode:  abnormalCausesForm.consequenceNode,
              deviate: abnormalCausesForm.deviate,
              VariableName: abnormalCausesForm.VariableName,
              deviation: abnormalCausesForm.deviation,
              evolutionaryPath:  abnormalCausesForm.evolutionaryPath,
              abnormalCauses: abnormalCausesForm.abnormalCauses
            });
            console.log(abnormalCausesForm);
            ElMessage.success("提交成功！");
          } else {
            return false;
          }
        });
      };
        // 非正常因素重置
        const  abnormalCausesOnReset = () => {
        abnormalCausesFormRef.value.resetFields();
      };
        // 删除非正常因素
        const abnormalCausesDelete = (index) => {
        // 二次确认删除
        ElMessageBox.confirm("确定要删除吗？", "提示", {
          type: "warning",
        })
            .then(() => {
              ElMessage.success("删除成功");
              abnormalCausesData.value.splice(index, 1);
            })
            .catch(() => {});
      };
        return {
            rules,
            formRef,
            form,
            message,
            tableData,
            pageTotal,
            editVisible,
            form2,
            variableFormRef,
            variableForm,
            variableData,
            formulaFormRef,
            formulaForm,
            formulaData,
            variableMatrixData,
            variableMatrixList,
            adverseOutcomesFormRef,
            adverseOutcomesForm,
            adverseOutcomesData,
            abnormalCausesFormRef,
            abnormalCausesForm,
            abnormalCausesData,
            onSubmit,
            onReset,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
            variableOnSubmit,
            variableOnReset,
            variableDelete,
            variableEdit,
            formulaDelete,
            formulaOnReset,
            formulaOnSubmit,
            formulaEdit,
            adverseOutcomesOnSubmit,
            adverseOutcomesOnReset,
            adverseOutcomesDelete,
            abnormalCausesDelete,
            abnormalCausesOnReset,
            abnormalCausesOnSubmit,
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

