<template>
    <div class="">
        <div class="crumbs">
            <el-breadcrumb separator="/">
                <el-breadcrumb-item><i class="el-icon-lx-copy"></i> tab选项卡</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        <div class="container">
            <el-tabs v-model="message">
                <el-tab-pane :label="`基本信息`" name="baseInfo">
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
                <el-tab-pane :label="`节点配置`" name="noteInfo">
                  <div class="container">
                    <el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
                      <el-table-column prop="id" label="节点编号" width="55" align="center"></el-table-column>
                      <el-table-column prop="name" label="节点名称"></el-table-column>
                      <el-table-column prop="desc" label="节点描述"></el-table-column>
                      <el-table-column prop="Pid" label="节点Pid"></el-table-column>
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
                    <!-- 编辑弹出框 -->
                    <el-dialog title="编辑" v-model="editVisible" width="30%">
                      <el-form label-width="70px">
                        <el-form-item label="节点名称">
                          <el-input v-model="form.name"></el-input>
                        </el-form-item>
                        <el-form-item label="节点描述">
                          <el-input v-model="form.desc"></el-input>
                        </el-form-item>
                        <el-form-item label="节点Pid">
                          <el-input v-model="form.Pid"></el-input>
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
                </el-tab-pane>
                <el-tab-pane :label="`风险矩阵设置`" name="matrix">
                    <template v-if="message === 'third'">
                        <el-table :data="state.recycle" :show-header="false" style="width: 100%">
                            <el-table-column>
                                <template #default="scope">
                                    <span class="message-title">{{scope.row.title}}</span>
                                </template>
                            </el-table-column>
                            <el-table-column prop="date" width="150"></el-table-column>
                            <el-table-column width="120">
                                <template #default="scope">
                                    <el-button @click="handleRestore(scope.$index)">还原</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                        <div class="handle-row">
                            <el-button type="danger">清空回收站</el-button>
                        </div>
                    </template>
                </el-tab-pane>
                <el-tab-pane :label="`SDG建模`" name="sdg">
                <el-table :data="state.unread" :show-header="false" style="width: 100%">
                  <el-table-column>
                    <template #default="scope">
                      <span class="message-title">{{scope.row.title}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="date" width="180"></el-table-column>
                  <el-table-column width="120">
                    <template #default="scope">
                      <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="handle-row">
                  <el-button type="primary">全部标为已读</el-button>
                </div>
              </el-tab-pane>
                <el-tab-pane :label="`Hazop分析`" name="hazop">
                <template v-if="message === 'second'">
                  <el-table :data="state.read" :show-header="false" style="width: 100%">
                    <el-table-column>
                      <template #default="scope">
                        <span class="message-title">{{scope.row.title}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="date" width="150"></el-table-column>
                    <el-table-column width="120">
                      <template #default="scope">
                        <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="handle-row">
                    <el-button type="danger">删除全部</el-button>
                  </div>
                </template>
              </el-tab-pane>
                <el-tab-pane :label="`Lopa分析`" name="lopa">
                <template v-if="message === 'third'">
                  <el-table :data="state.recycle" :show-header="false" style="width: 100%">
                    <el-table-column>
                      <template #default="scope">
                        <span class="message-title">{{scope.row.title}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="date" width="150"></el-table-column>
                    <el-table-column width="120">
                      <template #default="scope">
                        <el-button @click="handleRestore(scope.$index)">还原</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="handle-row">
                    <el-button type="danger">清空回收站</el-button>
                  </div>
                </template>
              </el-tab-pane>
                <el-tab-pane :label="`Hazop统计`" name="statistics">
                <el-table :data="state.unread" :show-header="false" style="width: 100%">
                  <el-table-column>
                    <template #default="scope">
                      <span class="message-title">{{scope.row.title}}</span>
                    </template>
                  </el-table-column>
                  <el-table-column prop="date" width="180"></el-table-column>
                  <el-table-column width="120">
                    <template #default="scope">
                      <el-button size="small" @click="handleRead(scope.$index)">标为已读</el-button>
                    </template>
                  </el-table-column>
                </el-table>
                <div class="handle-row">
                  <el-button type="primary">全部标为已读</el-button>
                </div>
              </el-tab-pane>
                <el-tab-pane :label="`画图`" name="drawing">
                <template v-if="message === 'second'">
                  <el-table :data="state.read" :show-header="false" style="width: 100%">
                    <el-table-column>
                      <template #default="scope">
                        <span class="message-title">{{scope.row.title}}</span>
                      </template>
                    </el-table-column>
                    <el-table-column prop="date" width="150"></el-table-column>
                    <el-table-column width="120">
                      <template #default="scope">
                        <el-button type="danger" @click="handleDel(scope.$index)">删除</el-button>
                      </template>
                    </el-table-column>
                  </el-table>
                  <div class="handle-row">
                    <el-button type="danger">删除全部</el-button>
                  </div>
                </template>
              </el-tab-pane>
            </el-tabs>
        </div>
    </div>
</template>

<script>
import { ref, reactive } from "vue";
import {ElMessage, ElMessageBox} from "element-plus";
import {fetchData} from "../api";
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
        fetchData(query).then((res) => {
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
      let form2 = reactive({
        name: "",
        desc: "",
        Pid: "",
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
        const state = reactive({
            unread: [
                {
                    date: "2018-04-19 20:00:00",
                    title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
                },
                {
                    date: "2018-04-19 21:00:00",
                    title: "今晚12点整发大红包，先到先得",
                },
            ],
            read: [
                {
                    date: "2018-04-19 20:00:00",
                    title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
                },
            ],
            recycle: [
                {
                    date: "2018-04-19 20:00:00",
                    title: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护",
                },
            ],
        });
        const handleRead = (index) => {
            const item = state.unread.splice(index, 1);
            console.log(item);
            state.read = item.concat(state.read);
        };
        const handleDel = (index) => {
            const item = state.read.splice(index, 1);
            state.recycle = item.concat(state.recycle);
        };
        const handleRestore = (index) => {
            const item = state.recycle.splice(index, 1);
            state.read = item.concat(state.read);
        };

        return {
            rules,
            formRef,
            form,
            message,
            state,
            query,
            tableData,
            pageTotal,
            editVisible,
            form2,
            handleRead,
            handleDel,
            handleRestore,
            onSubmit,
            onReset,
            handleSearch,
            handlePageChange,
            handleDelete,
            handleEdit,
            saveEdit,
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

