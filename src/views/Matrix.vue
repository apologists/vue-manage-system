<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> tab选项卡</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`一般信息`" name="baseInfo">
                  <el-form ref="matrixFormRef" :rules="rules" :model="matrixForm" label-width="80px">
                    <el-form-item label="矩阵名称" prop="name">
                      <el-input v-model="matrixForm.name"></el-input>
                    </el-form-item>
                    <el-form-item label="描述" prop="desc">
                      <el-input v-model="matrixForm.desc"></el-input>
                    </el-form-item>
                    <el-form-item label="阶数" prop="unit">
                      <el-col :span="12">
                        <el-input
                            v-model="matrixForm.horizontal"
                            label="行"
                        />
                      </el-col>
                      <el-col :span="12">
                        <el-tag> —— </el-tag>
                      </el-col>
                      <el-col :span="12">
                        <el-input
                            v-model="matrixForm.longitudinal"
                            label="列"
                        />
                      </el-col>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="matrixOnSubmit">保存</el-button>
                      <el-button @click="matrixOnReset">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane :label="`风险严重度`" name="riskSeverity">
                  <div>
                    <el-button type="primary" @click="editVisible = true " style="float:right">新增</el-button>
                  </div>
                  <el-table :data="riskData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                    <el-table-column prop="id" label="编码" width="55" align="center"></el-table-column>
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
                                   @click="riskDelete(scope.$index, scope.row)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="pagination">
                    <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                                   :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
                  </div>
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
                <el-tab-pane :label="`可能性`" name="relationships">
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
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                                     :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
                    </div>
              </el-tab-pane>
                <el-tab-pane :label="`风险等级`" name="riskGrade">
                    <el-table :data="riskGradeData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                      <el-table-column prop="riskGradeId" label="编号" width="55" align="center"></el-table-column>
                      <el-table-column prop="riskGradeCode" label="Code" align="center"></el-table-column>
                      <el-table-column prop="riskGradeColor" label="Color" width="55" align="center"></el-table-column>
                      <el-table-column prop="riskGradeDesc" label="描述" align="center"></el-table-column>
                      <el-table-column prop="riskGrade" label="风险等级" width="55" align="center"></el-table-column>
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
                    <div class="pagination">
                      <el-pagination background layout="total, prev, pager, next" :current-page="query.pageIndex"
                                     :page-size="query.pageSize" :total="pageTotal" @current-change="handlePageChange"></el-pagination>
                    </div>
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
                </el-tab-pane>
                <el-tab-pane :label="`矩阵`" name="matrix">
                  <el-table :data="testDatas" border stripe style="width: 100%">
                    <el-table-column
                        :prop="index"
                        :label="item"
                        v-for="(item, index) in columnList"
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
import { ref, reactive } from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {fetchMatrixData, fetchRelationData, fetchRiskData, fetchRiskGradeData} from "../api";
export default {
    name: "matrix",
    setup() {
      const rules = {
        name: [
          { required: true, message: "请输入矩阵名称", trigger: "blur" },
        ],
        desc: [
          { required: true, message: "请输入矩阵描述", trigger: "blur" },
        ],
        longitudinal: [
          { required: true, message: "请输入单元", trigger: "blur" },
        ],
        horizontal: [
          { required: true, message: "请输入项目编号", trigger: "blur" },
        ],
        unit: [
          { required: true, message: "请矩阵行与列", trigger: "blur" },
        ],
        analyticalMethod: [
          { required: true, message: "请输入分析方法", trigger: "blur" },
        ],
        remark: [
          { required: true, message: "请输入备注", trigger: "blur" },
        ],
      };
      const matrixFormRef = ref(null);
      const matrixForm = reactive({
          name: "",
          desc:"",
          horizontal:"",
          longitudinal:"",
      });
      const riskFormRef = ref(null);
      const riskForm = reactive({
        grade: "",
        severity:"",
        personnel:"",
        property:"",
        environment: "",
        reputation:"",
        laws:"",
        lockout:"",
      });
      const relationFormRef = ref(null);
      const relationForm = reactive({
        frequencyLevel: "",
        frequencyValue:"",
        frequencyDesc:"",
      });
      const riskGradeForm = reactive({
        riskGradeDesc:"",
        riskGrade:"",
        riskGradeMeasure:"",
        term:"",
        remark:""
      });
      const riskGradeFormRef = ref(null);

      const query = reactive({
        desc: "",
        name: "",
        pageIndex: 1,
        pageSize: 10,
      });
      const matrixData = ref([]);
      const relationData = ref([]);
      const riskData = ref([]);
      const riskGradeData = ref([]);
      const testDatas = ref([]);
      const columnList = ref();
      const pageTotal = ref(0);

      const getMatrixData = () => {
        fetchMatrixData(query).then((res) => {
          testDatas.value = res.testDatas;
          columnList.value = res.columnList;
          pageTotal.value = res.pageTotal || 50;
        });
      };
      getMatrixData();

      const getRelationData = () => {
        fetchRelationData(query).then((res) => {
          relationData.value = res.list;
          pageTotal.value = res.pageTotal || 50;
        });
      };
      getRelationData();

      const getRiskData = () => {
        fetchRiskData(query).then((res) => {
          riskData.value = res.list;
          pageTotal.value = res.pageTotal || 50;
        });
      };
      getRiskData();

      const getRiskGrafeData = () => {
        fetchRiskGradeData(query).then((res) => {
          riskGradeData.value = res.list;
          pageTotal.value = res.pageTotal || 50;
        });
      };
      getRiskGrafeData();

      // 删除操作
      const relationDelete = (index) => {
        // 二次确认删除
        ElMessageBox.confirm("确定要删除吗？", "提示", {
          type: "warning",
        })
            .then(() => {
              ElMessage.success("删除成功");
              relationData.value.splice(index, 1);
            })
            .catch(() => {});
      };
      // 删除操作
      const riskDelete = (index) => {
        // 二次确认删除
        ElMessageBox.confirm("确定要删除吗？", "提示", {
          type: "warning",
        })
            .then(() => {
              ElMessage.success("删除成功");
              riskData.value.splice(index, 1);
            })
            .catch(() => {});
      };
      // 删除操作
      const riskGradeDelete = (index) => {
        // 二次确认删除
        ElMessageBox.confirm("确定要删除吗？", "提示", {
          type: "warning",
        })
            .then(() => {
              ElMessage.success("删除成功");
              riskGradeData.value.splice(index, 1);
            })
            .catch(() => {});
      };

      // 表格编辑时弹窗和保存
      const editVisible = ref(false);
      let idx = -1;
      const riskGradeHandleEdit = (index, row) => {
        idx = index;
        Object.keys(riskGradeForm).forEach((item) => {
          riskGradeForm[item] = row[item];
        });
        editVisible.value = true;
      };
      const riskGradeSaveEdit = () => {
        editVisible.value = false;
        ElMessage.success(`修改第 ${idx + 1} 行成功`);
        Object.keys(riskGradeForm).forEach((item) => {
          riskGradeData.value[idx][item] = riskGradeForm[item];
        });
      };
        // 矩阵提交
        const matrixOnSubmit = () => {
        // 表单校验
          matrixFormRef.value.validate((valid) => {
          if (valid) {
            console.log(matrixForm);
            ElMessage.success("提交成功！");
          } else {
            return false;
          }
        });
      };
        // 矩阵重置
        const  matrixOnReset = () => {
          matrixFormRef.value.resetFields();
      };

        // 风险提交
        const riskOnSubmit = () => {
          editVisible.value = false;
          // 表单校验
          riskFormRef.value.validate((valid) => {
          if (valid) {
                riskData.value.push({
                grade: riskForm.grade,
                severity:riskForm.severity,
                personnel:riskForm.personnel,
                property:riskForm.property,
                environment: riskForm.environment,
                reputation:riskForm.reputation,
                laws:riskForm.laws,
                lockout:riskForm.lockout,
            });
            console.log(riskForm);
            ElMessage.success("提交成功！");
          } else {
            return false;
          }
        });
      };
        // 风险重置
        const  riskOnReset = () => {
          riskFormRef.value.resetFields();
      };

        // 频率提交
        const relationOnSubmit = () => {
        editVisible.value = false;
        // 表单校验
          relationFormRef.value.validate((valid) => {
          if (valid) {
              relationData.value.push({
                frequencyLevel: relationForm.frequencyLevel,
                frequencyValue:relationForm.frequencyValue,
                frequencyDesc:relationForm.frequencyDesc
            });
            console.log(relationForm);
            ElMessage.success("提交成功！");
          } else {
            return false;
          }
        });
      };
         // 频率重置
        const  relationOnReset = () => {
          relationFormRef.value.resetFields();
      };
        const message = ref("first");

        const handleDel = (index) => {
            const item = state.read.splice(index, 1);
            state.recycle = item.concat(state.recycle);
        };
        const handleRestore = (index) => {
            const item = state.recycle.splice(index, 1);
            state.read = item.concat(state.read);
        };

        // 分页导航
        const handlePageChange = (val) => {
        query.pageIndex = val;
        getData();
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
            message,
            query,
            matrixData,
            relationData,
            riskData,
            riskGradeData,
            testDatas,
            columnList,
            pageTotal,
            editVisible,
            handleDel,
            handleRestore,
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
            handlePageChange,
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

