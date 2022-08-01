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
                    <el-form-item label="装置" prop="name">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="单元" prop="name">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="项目编号" prop="name">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="时间">
                      <el-col :span="11">
                        <el-form-item prop="date1">
                          <el-date-picker v-model="form.date" type="daterange" range-separator="To" start-placeholder="开始时间" end-placeholder="结束时间" :size="size"
                          />
                        </el-form-item>
                      </el-col>
                    </el-form-item>
                    <el-form-item label="分析方法" prop="name">
                      <el-input v-model="form.name"></el-input>
                    </el-form-item>
                    <el-form-item label="备注" prop="desc">
                      <el-input type="textarea" rows="5" v-model="form.desc"></el-input>
                    </el-form-item>
                    <el-form-item>
                      <el-button type="primary" @click="onSubmit">保存</el-button>
                      <el-button @click="onReset">重置</el-button>
                    </el-form-item>
                  </el-form>
                </el-tab-pane>
                <el-tab-pane :label="`节点配置`" name="noteInfo">
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
import {ElMessage} from "element-plus";
export default {
    name: "tabs",
    setup() {
        const rules = {
        name: [
          { required: true, message: "请输入项目名称", trigger: "blur" },
        ],
      };
        const formRef = ref(null);
        const form = reactive({
        name: "",
        date:"",
        desc: "",
        image:""
      });
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
            handleRead,
            handleDel,
            handleRestore,
            onSubmit,
            onReset,
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

