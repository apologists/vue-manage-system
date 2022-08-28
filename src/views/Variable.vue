<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> tab选项卡</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`基本信息`" name="first2">
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
                  <div>
                    <el-button type="primary" @click="editVisible = true " style="float:right">导出</el-button>
                  </div>
                  <router-link :to="{path:'./variable2',query:{id:1}}">
                    <el-button type="primary" style="float:right">SDG图</el-button>
                  </router-link>
                <el-table :data="adverseOutcomesData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                  <el-table-column prop="adverseOutComesId" label="编号" width="55" align="center"></el-table-column>
                  <el-table-column prop="pullOffNode" label="原始拉偏点" align="center"></el-table-column>
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
                    <el-form-item label="原始拉偏点">
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
                  <div>
                    <el-button type="primary" @click="editVisible = true " style="float:right">导出</el-button>
                  </div>
                <div>
                  <el-button type="primary" @click="editVisible = true " style="float:right">新增</el-button>
                </div>
                <el-table :data="abnormalCausesData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                  <el-table-column prop="abnormalCausesId" label="编号" width="55" align="center"></el-table-column>
                  <el-table-column prop="consequenceNode" label="原始拉偏点" align="center"></el-table-column>
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
                    <el-form-item label="原始拉偏点">
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
                <el-tab-pane :label="`SDG图`" onclick="mounted()"  name="first">
                  <div id="view_content" onclick="mounted()"></div>
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
  fetchData,
  fetchAdverseOutcomesData, deleteAdverseOutcomes, createAdverseOutcomes,
  fetchAbnormalCausesData, deleteAbnormalCauses, createAbnormalCauses,
  fetchVariableData,deleteVariable,createVariable,
  fetchFormulaData,deleteFormula,createFormula,
  fetchVariableMatrixData,
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
          variableCn:"",
          variableEn:""
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
          variableName:"",
          deviation:"",
          evolutionaryPath: "",
          adverseOutComes:""
      });
        const adverseOutcomesData = ref([]);

        //非正常因素
        const abnormalCausesFormRef = ref(null);
        const abnormalCausesForm = reactive({
          consequenceNode: "",
          deviate:"",
          variableName:"",
          deviation:"",
          evolutionaryPath: "",
          abnormalCauses:""
      });
        const abnormalCausesData = ref([]);
        // 获取表格数据
        const getData = () => {
        fetchData().then((res) => {
          if (res.code === "200") {
            tableData.value = res.data.records;
            pageTotal.value = res.data.total || 50;
          }
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
        const message = ref("first");

        //获取变量数据
        const getVariableData = () => {
        fetchVariableData().then((res) => {
          variableData.value = res.data.records;
          pageTotal.value = res.data.total || 50;
        });
      };
        getVariableData();
        // 变量提交
        const variableOnSubmit = () => {
        editVisible.value = false;
        variableFormRef.value.validate(async (valid) => {
          if (valid) {
            variableData.value.push({
              variableCn: variableForm.variableCn,
              variableEn: variableForm.variableEn
            });
            await createVariable(variableForm);
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
        const variableDelete = (index,data) => {
        // 二次确认删除
        ElMessageBox.confirm("确定要删除吗？", "提示", {
          type: "warning",
        })
            .then(async () => {
              await deleteVariable({variableId: data.variableId});
              ElMessage.success("删除成功");
              variableData.value.splice(index, 1);
            })
            .catch(() => {});
      };


        //获取公式数据
        const getFormulaData = () => {
        fetchFormulaData().then((res) => {
          formulaData.value = res.data.records;
          pageTotal.value = res.data.total || 50;
        });
      };
        getFormulaData();
        // 公式提交
        const formulaOnSubmit = () => {
        editVisible.value = false;
        // 表单校验
        formulaFormRef.value.validate(async (valid) => {
          if (valid) {
            formulaData.value.push({
              formula: formulaForm.formula
            });
            await createFormula(formulaForm);
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
        const formulaDelete = (index,data) => {
        // 二次确认删除
        ElMessageBox.confirm("确定要删除吗？", "提示", {
          type: "warning",
        })
            .then(() => {
              deleteFormula({formulaId : data.formulaId});
              ElMessage.success("删除成功");
              formulaData.value.splice(index, 1);
            })
            .catch(() => {});
      };

        //获取变量关系表数据
        const getVariableMatrixData = () => {
          fetchVariableMatrixData().then((res) => {
            variableMatrixData.value = res.data.records;
            variableMatrixList.value = res.data.total;
          });
        };
        getVariableMatrixData();

        //获取不利结果数据
        const getAdverseOutcomesData = () => {
        fetchAdverseOutcomesData().then((res) => {
          adverseOutcomesData.value = res.data.records;
          pageTotal.value = res.data.total || 50;
        });
      };
        getAdverseOutcomesData();
        // 不利结果提交
        const adverseOutcomesOnSubmit = () => {
        editVisible.value = false;
        // 表单校验
        adverseOutcomesFormRef.value.validate(async (valid) => {
          if (valid) {
            adverseOutcomesData.value.push({
              pullOffNode: adverseOutcomesForm.pullOffNode,
              deviate: adverseOutcomesForm.deviate,
              variableName: adverseOutcomesForm.variableName,
              deviation: adverseOutcomesForm.deviation,
              evolutionaryPath: adverseOutcomesForm.evolutionaryPath,
              adverseOutComes: adverseOutcomesForm.adverseOutComes
            });
            await createAdverseOutcomes(adverseOutcomesForm);
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
        const adverseOutcomesDelete = (index,data) => {
        // 二次确认删除
        ElMessageBox.confirm("确定要删除吗？", "提示", {
          type: "warning",
        })
            .then(async () => {
              await deleteAdverseOutcomes({adverseOutComesId: data.adverseOutComesId});
              ElMessage.success("删除成功");
              adverseOutcomesData.value.splice(index, 1);
            })
            .catch(() => {});
      };

        //非正常因素数据获取
        const getAbnormalCausesData = () => {
        fetchAbnormalCausesData().then((res) => {
          if (res.code ==="200") {
            abnormalCausesData.value = res.data.records;
            pageTotal.value = res.data.total || 50;
          }
        });
      };
        getAbnormalCausesData();
        // 非正常因素提交
        const abnormalCausesOnSubmit = () => {
        editVisible.value = false;
        // 表单校验
        abnormalCausesFormRef.value.validate(async (valid) => {
          if (valid) {
            abnormalCausesData.value.push({
              consequenceNode: abnormalCausesForm.consequenceNode,
              deviate: abnormalCausesForm.deviate,
              variableName: abnormalCausesForm.variableName,
              deviation: abnormalCausesForm.deviation,
              evolutionaryPath: abnormalCausesForm.evolutionaryPath,
              abnormalCauses: abnormalCausesForm.abnormalCauses
            });
            await createAbnormalCauses(abnormalCausesForm);
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
        const abnormalCausesDelete = (index,data) => {
        // 二次确认删除
        ElMessageBox.confirm("确定要删除吗？", "提示", {
          type: "warning",
        })
            .then(async () => {
              await deleteAbnormalCauses({abnormalCausesId: data.abnormalCausesId});
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
            handlePageChange,
            handleDelete,
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
    created() {
  },
    mounted() {
    this.init()
  },
    methods: {
    init() {
      // // create an array with nodes
      const nodes = new DataSet([
        {id: 1, label: 'Node 1'},
        {id: 2, label: 'Node 2'},
        {id: 3, label: 'Node 3'},
        {id: 4, label: 'Node 4'},
        {id: 5, label: 'Node 5'},
      ]);
      // // create an array with edges
      const edges = new DataSet([
        {from: 1, to: 3},
        {from: 2, to: 4},
        {from: 2, to: 5},
        {from: 2, to: 3},
      ]);
      // create a network
      const container = document.querySelector('#view_content');
      // provide the data in the vis format
      const data = {
        nodes: nodes,
        edges: edges,
      };
      const options = {
        //节点样式
        nodes: {
          shape: 'circle', //设置节点node样式为矩形
          fixed: false, //节点node固定可移动
          color: '#faf8f8',
          font: {
            color: '#000000', //字体的颜色
            size: 20, //显示字体大小
          },
          scaling: {
            min: 16,
            max: 32, //缩放效果比例
          },
        },
        //连接线的样式
        edges: {
          color: {
            color: 'rgb(10,10,10)',
            highlight: 'rgb(10,10,10)',
            hover: 'green',
            inherit: 'from',
            opacity: 1.0,
          },
          font: {
            align: 'top', //连接线文字位置
          },
          smooth: true, //是否显示方向箭头
          arrows: {to: true}, //箭头指向from节点
          // physics:false
        },
        // layout: {
        //   //以分层方式定位节点
        //   hierarchical: {
        //     direction: 'LR', //分层排序方向
        //     sortMethod: 'directed', //分层排序方法
        //     levelSeparation: 400, //不同级别之间的距离
        //   },
        // },
        interaction: {
          navigationButtons: true,
          // hover: true, //鼠标移过后加粗该节点和连接线
          selectConnectedEdges: false, //选择节点后是否显示连接线
        },
      };
      // initialize your network!
      this.network = new Network(container, data, options)
      // this.network.on('click', (e) => this.showDetail(e)) //单击事件
      // this.network.on('doubleClick', (e) => this.enterService(e)) //双击事件
      //生成图后才生成canvas元素，此处设置画布大小
      let element = document.getElementsByTagName('canvas')[0]
      element.height = '1000'
    },
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

