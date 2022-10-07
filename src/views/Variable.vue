<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> tab选项卡</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="variableMessage" @tab-click="handleClick">
                <el-tab-pane :label="`基本信息`" name="frist">
                  <el-form ref="baseFormRef" :rules="rules" :model="baseForm" label-width="80px">
                    <el-form-item label="公司名称" prop="name">
                      <template v-if="baseFormData.name === null">
                        <el-input v-model="baseForm.name"></el-input>
                      </template>
                      <template v-else>
                        <el-input type="text" readonly v-model="baseFormData.name"/>
                      </template>
                    </el-form-item>
                    <el-form-item label="装置" prop="device">
                      <template v-if="baseFormData.device === null">
                        <el-input v-model="baseForm.device"></el-input>
                      </template>
                      <template v-else>
                        <el-input type="text" readonly v-model="baseFormData.device"/>
                      </template>
                    </el-form-item>
                    <el-form-item label="单元" prop="unit">
                      <template v-if="baseFormData.unit === null">
                        <el-input v-model="baseForm.unit"></el-input>
                      </template>
                      <template v-else>
                        <el-input type="text" readonly v-model="baseFormData.unit"/>
                      </template>
                    </el-form-item>
                    <el-form-item label="项目编号" prop="baseId">
                      <template v-if="baseFormData.baseId === null">
                        <el-input v-model="baseForm.baseId"></el-input>
                      </template>
                      <template v-else>
                        <el-input type="text" readonly v-model="baseFormData.baseId"/>
                      </template>
                    </el-form-item>
                    <el-form-item label="时间" v-show="baseFormData.name === null">
                      <el-col :span="11">
                        <el-form-item prop="date1" v-show="baseFormData.name === null">
                          <el-date-picker v-model="timeFrom" @change="setTime"  :clearable="false"
                                          type="daterange" range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间" :size="size"
                          />
                        </el-form-item>
                      </el-col>

                    </el-form-item>
                    <el-form-item label="分析方法" prop="analyticalMethod">
                      <template v-if="baseFormData.analyticalMethod === null">
                        <el-input v-model="baseForm.analyticalMethod"></el-input>
                      </template>
                      <template v-else>
                        <el-input type="text" readonly v-model="baseFormData.analyticalMethod"/>
                      </template>
                    </el-form-item>
                    <el-form-item label="备注" prop="remark">
                      <template v-if="baseFormData.remark === null">
                        <el-input v-model="baseForm.remark"></el-input>
                      </template>
                      <template v-else>
                        <el-input type="text" readonly v-model="baseFormData.remark"/>
                      </template>
                    </el-form-item>
                    <el-form-item>
                      <el-form-item v-show="baseFormData.name === null">
                      <el-button type="primary" @click="baseOnSubmit">保存</el-button>
                      <el-button @click="baseOnReset">重置</el-button>
                      </el-form-item>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane :label="`变量设置`" name="second">
                  <div class="container">
                    <div>
                      <el-button type="primary" @click="editVisible = true" style="float:right">新增</el-button>
                    </div>
                    <el-table :data="variableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                      <el-table-column prop="date" label="项目编号" width="55" align="center" type="index"></el-table-column>
                      <el-table-column v-if="false" prop="variableId" label="变量编号" width="55" align="center"></el-table-column>
                      <el-table-column prop="variableCn" label="中文名称"></el-table-column>
                      <el-table-column prop="variableEn" label="英文缩写"></el-table-column>
                      <el-table-column label="操作" width="180" align="center">
                        <template #default="scope">
                          <el-button type="text" icon="el-icon-delete" class="red"
                                     @click="variableDelete(scope.$index, scope.row)">删除</el-button>
                        </template>
                      </el-table-column>
                    </el-table>
                    <!-- 编辑弹出框 -->
                    <el-dialog title="编辑" v-model="editVisible" width="30%">
                      <el-form ref="variableFormRef" :rules="rules" :model="variableForm" label-width="70px">
                        <el-form-item label="中文名称">
                          <el-input v-model="variableForm.variableCn"></el-input>
                        </el-form-item>
                        <el-form-item label="英文缩写">
                          <el-input v-model="variableForm.variableEn"></el-input>
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
                <el-tab-pane :label="`变量关系`" name="third">
                  <div class="container">
                    <div>
                      <el-button type="primary" @click="editVisible = true" style="float:right">新增</el-button>
                    </div>
                    <el-table :data="formulaData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                      <el-table-column prop="date" label="项目编号" width="55" align="center" type="index"></el-table-column>
                      <el-table-column v-if="false" prop="formulaId" label="变量公式编号" width="55" align="center"></el-table-column>
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
                  <router-link :to="{path:'./variable2',query:{projectId:projectId}}">
                    <el-button type="primary" style="float:right">SDG图</el-button>
                  </router-link>
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
                  <router-link :to="{path:'./variable3',query:{projectId:projectId}}">
                    <el-button type="primary" style="float:right">SDG图</el-button>
                  </router-link>
                <el-table :data="adverseOutcomesData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                  <el-table-column prop="date" label="项目编号" width="55" align="center" type="index"></el-table-column>
                  <el-table-column v-if="false" prop="adverseOutComesId" label="编号" width="55" align="center"></el-table-column>
                  <el-table-column prop="pullOffNode" label="节点" align="center"></el-table-column>
                  <el-table-column prop="deviate" label="偏离" width="55" align="center"></el-table-column>
                  <el-table-column prop="variableName" label="变量名称" align="center"></el-table-column>
                  <el-table-column prop="deviation" label="偏差" width="55" align="center"></el-table-column>
                  <el-table-column prop="evolutionaryPath" label="演变路径" align="center"></el-table-column>
                  <el-table-column prop="adverseOutComes" label="不利后果" width="55" align="center"></el-table-column>
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
                    <el-form-item label="节点">
                      <el-input v-model="adverseOutcomesForm.pullOffNode"></el-input>
                    </el-form-item>
                    <el-form-item label="偏离">
                      <el-input v-model="adverseOutcomesForm.deviate"></el-input>
                    </el-form-item>
                    <el-form-item label="变量名称">
                      <el-input v-model="adverseOutcomesForm.variableName"></el-input>
                    </el-form-item>
                    <el-form-item label="偏差">
                      <el-input v-model="adverseOutcomesForm.deviation"></el-input>
                    </el-form-item>
                    <el-form-item label="演变路径">
                      <el-input v-model="adverseOutcomesForm.evolutionaryPath"></el-input>
                    </el-form-item>
                    <el-form-item label="不利后果">
                      <el-input v-model="adverseOutcomesForm.adverseOutComes"></el-input>
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
                  <router-link :to="{path:'./variable3',query:{projectId:projectId}}">
                    <el-button type="primary" style="float:right">SDG图</el-button>
                  </router-link>
                <div>
                  <el-button type="primary" @click="editVisible = true " style="float:right">新增</el-button>
                </div>
                <el-table :data="abnormalCausesData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                  <el-table-column prop="date" label="项目编号" width="55" align="center" type="index"></el-table-column>
                  <el-table-column v-if="false" prop="abnormalCausesId" label="编号" width="55" align="center"></el-table-column>
                  <el-table-column prop="consequenceNode" label="节点" align="center"></el-table-column>
                  <el-table-column prop="deviate" label="偏离" width="55" align="center"></el-table-column>
                  <el-table-column prop="variableName" label="变量名称" align="center"></el-table-column>
                  <el-table-column prop="deviation" label="偏差" width="55" align="center"></el-table-column>
                  <el-table-column prop="evolutionaryPath" label="演变路径" align="center"></el-table-column>
                  <el-table-column prop="abnormalCauses" label="非正常因素" width="55" align="center"></el-table-column>
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
                    <el-form-item label="节点">
                      <el-input v-model="abnormalCausesForm.consequenceNode"></el-input>
                    </el-form-item>
                    <el-form-item label="偏离">
                      <el-input v-model="abnormalCausesForm.deviate"></el-input>
                    </el-form-item>
                    <el-form-item label="变量名称">
                      <el-input v-model="abnormalCausesForm.variableName"></el-input>
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
import { DataSet, Network } from 'vis';
import {ElMessage, ElMessageBox} from "element-plus";
import {
  fetchAdverseOutcomesData, deleteAdverseOutcomes, createAdverseOutcomes,
  fetchAbnormalCausesData, deleteAbnormalCauses, createAbnormalCauses,
  fetchVariableData,deleteVariable,createVariable,
  fetchFormulaData,deleteFormula,createFormula,
  fetchVariableMatrixData,createBase,fetchBaseDate,
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
        const baseFormRef = ref(null);
        const baseForm = reactive({
          baseId:"",
          name: "",
          device:"",
          unit:"",
          projectId:"",
          baseBeginTime:"",
          baseEndTime:"",
          analyticalMethod:"",
          remark:""
      });
        //变量
        const variableFormRef = ref(null);
        const variableForm = reactive({
          variableCn:"",
          variableEn:"",
          projectId:""
      });

       //变量公式
        const formulaFormRef = ref(null);
        const formulaForm = reactive({
          formula:"",
          projectId:""
      });
        //不利结果
        const adverseOutcomesFormRef = ref(null);
        const adverseOutcomesForm = reactive({
          pullOffNode: "",
          deviate:"",
          variableName:"",
          deviation:"",
          evolutionaryPath: "",
          adverseOutComes:"",
          projectId:""
      });

        //非正常因素
        const abnormalCausesFormRef = ref(null);
        const abnormalCausesForm = reactive({
          consequenceNode: "",
          deviate:"",
          variableName:"",
          deviation:"",
          evolutionaryPath: "",
          abnormalCauses:"",
          projectId:""
      });

        // 表格编辑时弹窗和保存
        const editVisible = ref(false);
        const message = ref("first");

        // 变量提交
        const variableOnSubmit = () => {
        editVisible.value = false;
        variableFormRef.value.validate(async (valid) => {
          if (valid) {
            await createVariable(variableForm);
            ElMessage.success("提交成功！");
            location.reload();
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
        const variableDelete = (index,data) => {
        // 二次确认删除
        ElMessageBox.confirm("确定要删除吗？", "提示", {
          type: "warning",
        })
            .then(async () => {
              await deleteVariable({variableId: data.variableId});
              ElMessage.success("删除成功");
              location.reload();
            })
            .catch(() => {});
      };


        // 公式提交
        const formulaOnSubmit = () => {
        editVisible.value = false;
        // 表单校验
        formulaFormRef.value.validate(async (valid) => {
          if (valid) {
            const res = await createFormula(formulaForm);
            if (res.data != null) {
              ElMessage.success("提交成功！");
            }else {
              ElMessage.error("请确认变量存在");
            }
            location.reload();
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
        const formulaDelete = (index,data) => {
        // 二次确认删除
        ElMessageBox.confirm("确定要删除吗？", "提示", {
          type: "warning",
        })
            .then(() => {
              deleteFormula({formulaId : data.formulaId});
              ElMessage.success("删除成功");
              location.reload();
            })
            .catch(() => {});
      };

        // 不利结果提交
        const adverseOutcomesOnSubmit = () => {
        editVisible.value = false;
        // 表单校验
        adverseOutcomesFormRef.value.validate(async (valid) => {
          if (valid) {
            const res = await createAdverseOutcomes(adverseOutcomesForm);
            if (res.data != null) {
              ElMessage.success("提交成功！");
            }else {
              ElMessage.error("请确认拉偏节点存在！");
            }
            location.reload();
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
        const adverseOutcomesDelete = (index,data) => {
        // 二次确认删除
        ElMessageBox.confirm("确定要删除吗？", "提示", {
          type: "warning",
        })
            .then(async () => {
              await deleteAdverseOutcomes({adverseOutComesId: data.adverseOutComesId});
              ElMessage.success("删除成功");
              location.reload();
            })
            .catch(() => {});
      };

        // 非正常因素提交
        const abnormalCausesOnSubmit = () => {
        editVisible.value = false;
        // 表单校验
        abnormalCausesFormRef.value.validate(async (valid) => {
          if (valid) {
            const res = await createAbnormalCauses(abnormalCausesForm);
            if (res.data !=null) {
              ElMessage.success("提交成功！");
            }else {
              ElMessage.error("请确定拉偏节点存在");
            }
            location.reload();
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
        const abnormalCausesDelete = (index,data) => {
        // 二次确认删除
        ElMessageBox.confirm("确定要删除吗？", "提示", {
          type: "warning",
        })
            .then(async () => {
              await deleteAbnormalCauses({abnormalCausesId: data.abnormalCausesId});
              ElMessage.success("删除成功");
              location.reload();
            })
            .catch(() => {});
      };

      // 公式提交
      const baseOnSubmit = () => {
        editVisible.value = false;
        // 表单校验
        baseFormRef.value.validate(async (valid) => {
          if (valid) {
            await createBase(baseForm);
            ElMessage.success("提交成功！");
            location.reload();
          } else {
            return false;
          }
        });
      };
      // 公式重置
      const  baseOnReset = () => {
        baseFormRef.value.resetFields();
      };
        return {
            rules,
            baseFormRef,
            baseForm,
            message,
            editVisible,
            variableFormRef,
            variableForm,
            formulaFormRef,
            formulaForm,
            adverseOutcomesFormRef,
            adverseOutcomesForm,
            abnormalCausesFormRef,
            abnormalCausesForm,
            baseOnSubmit,
            baseOnReset,
            variableOnSubmit,
            variableOnReset,
            variableDelete,
            formulaDelete,
            formulaOnReset,
            formulaOnSubmit,
            adverseOutcomesOnSubmit,
            adverseOutcomesOnReset,
            adverseOutcomesDelete,
            abnormalCausesDelete,
            abnormalCausesOnReset,
            abnormalCausesOnSubmit,
        };
    },
  data(){
    return{
      timeFrom:[],
      baseFormData:{},
      formulaData:[],
      variableMatrixData:[],
      variableData:[],
      adverseOutcomesData:[],
      abnormalCausesData:[],
      variableMessage: 'first',
      projectId:{}
    }
  },
  methods: {
    handleClick(tab, event) {
      sessionStorage.setItem('current_name', tab.props.name)
    },
    setTime(e) {
      this.baseForm.baseBeginTime = e[0]
      this.baseForm.baseEndTime = e[1]
    },
  },
  created() {
    this.variableMessage = sessionStorage.getItem('current_name')
    if (sessionStorage.getItem('current_name') == null){
      this.variableMessage = 'first'
    }else{
      this.variableMessage = sessionStorage.getItem('current_name')
    }
  },
  mounted() {
    var projectId = this.$route.query.projectId;
    this.baseForm.projectId = projectId;
    this.adverseOutcomesForm.projectId = projectId;
    this.abnormalCausesForm.projectId = projectId;
    this.formulaForm.projectId = projectId;
    this.variableForm.projectId = projectId;
    this.projectId = projectId;
    const query = reactive({
      projectId: projectId
    });
    //获取公式数据
    const getFormulaData = () => {
      fetchFormulaData(query).then((res) => {
        this.formulaData = res.data.records;
      });
    };
    getFormulaData();

    //获取变量关系表数据
    const getVariableMatrixData = () => {
      fetchVariableMatrixData(query).then((res) => {
        this.variableMatrixData = res.data.variableMatrixData;
        this.variableMatrixList = res.data.variableMatrixList;
      });
    };
    getVariableMatrixData();

    //获取变量数据
    const getVariableData = () => {
      fetchVariableData(query).then((res) => {
        this.variableData = res.data.records;
      });
    };
    getVariableData();

    //获取不利结果数据
    const getAdverseOutcomesData = () => {
      fetchAdverseOutcomesData(query).then((res) => {
        this.adverseOutcomesData = res.data.records;
      });
    };
    getAdverseOutcomesData();

    //非正常因素数据获取
    const getAbnormalCausesData = () => {
      fetchAbnormalCausesData(query).then((res) => {
        if (res.code ==="200") {
          this.abnormalCausesData = res.data.records
        }
      });
    };
    getAbnormalCausesData();

    const getBaseDate = () => {
      fetchBaseDate(query).then((res) => {
        console.info(res.data);
        this.baseFormData = res.data;
      });
    };
    getBaseDate();
  },
};
</script>

<style lang="scss" scoped>
.message-title {
    cursor: pointer;
}
.handle-row {
    margin-top: 30px;
}

.view_content {
  width: 1800px;
  height: 1600px;
  .vis-network {
  height: 1500px;
}
}
</style>

