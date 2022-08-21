<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-lx-calendar"></i> 创建项目
        </el-breadcrumb-item>
        <el-breadcrumb-item>项目名称</el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="form-box">
        <el-form ref="formRef" :rules="rules" :model="form" label-width="80px">
          <el-form-item label="项目名称" prop="projectName">
            <el-input v-model="form.projectName"></el-input>
          </el-form-item>
          <el-form-item label="项目简介" prop="projectDesc">
            <el-input type="textarea" rows="5" v-model="form.projectDesc"></el-input>
          </el-form-item>
          <el-form-item label="项目封面" prop="projectImage">
            <el-upload class="upload-demo" drag action="http://jsonplaceholder.typicode.com/api/posts/" multiple>
              <i class="el-icon-upload"></i>
              <div class="el-upload__text">
                将文件拖到此处，或
                <em>点击上传</em>
              </div>
              <template #tip>
                <div class="el-upload__tip">只能上传 jpg/png 文件，且不超过 500kb</div>
              </template>
            </el-upload>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="onSubmit">保存</el-button>
            <el-button @click="onReset">重置</el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref } from "vue";
import { ElMessage } from "element-plus";
import {createProject} from "../api";
export default {
  name: "createProject",
  setup() {
    const rules = {
      projectName: [
        { required: true, message: "请输入项目名称", trigger: "blur" },
      ],
    };
    const formRef = ref(null);
    const form = reactive({
      projectName: "",
      projectDesc: "",
      projectImage:""
    });
    // 提交
    const onSubmit = () => {
      // 表单校验
      formRef.value.validate(async (valid) => {
        if (valid) {
          console.log(form);
          const res = await createProject(form);
          if (res.code === "200") {
            ElMessage.success("提交成功！");
          }
        } else {
          return false;
        }
      });
    };
    // 重置
    const onReset = () => {
      formRef.value.resetFields();
    };

    return {
      rules,
      formRef,
      form,
      onSubmit,
      onReset,
    };
  },
};
</script>