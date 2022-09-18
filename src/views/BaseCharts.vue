<template>
  <div>
    <div class="crumbs">
      <el-breadcrumb separator="/">
        <el-breadcrumb-item>
          <i class="el-icon-pie-chart"></i> schart图表
        </el-breadcrumb-item>
      </el-breadcrumb>
    </div>
    <div class="container">
      <div class="schart-box">
        <div class="content-title">柱状图</div>
        <schart class="schart" canvasId="bar" :options="options1"></schart>
      </div>
      <div class="schart-box">
          <div class="content-title">环形图</div>
            <schart class="schart" canvasId="ring" :options="options2"></schart>
      </div>
          <div class="schart-box">
            <div class="content-title">环形图</div>
            <schart class="schart" canvasId="pie" :options="options3"></schart>
          </div>

    </div>
  </div>
</template>

<script>
import Schart from "vue-schart";
import { ref, reactive } from "vue";
import {fetchOptions1Data,fetchOptions2Data,fetchOptions3Data} from "../api";

export default {
  name: "basecharts",
  components: {
    Schart,
  },
  mounted(){
    const query = reactive({
      projectId: this.$route.query.projectId
    });
    const getData = () => {
      fetchOptions1Data(query).then((res) => {
         this.options1 = {
          type: "bar",
          title: {
            text: "原因后果保护措施数据统计",
          },
          bgColor: "#fbfbfb",
          labels: ["节点", "参数", "偏差", "原因", "后果", "保护措施", "建议措施"],
          datasets: [
            {
              data: res.data.data
            },
          ],
        }
      });
      fetchOptions2Data(query).then((res) => {
        this.options2 = {
          type: "ring",
          title: {
            text: "SIL等级统计",
          },
          showValue: false,
          legend: {
            position: "bottom",
            bottom: 40,
          },
          bgColor: "#fbfbfb",
          labels: res.data.labels,
          datasets: [
            {
              data: res.data.data,
            },
          ],
        };
      });
      fetchOptions3Data(query).then((res) => {
        this.options3 = {
          type: "ring",
          title: {
            text: "HAZOP参数数量统计",
          },
          showValue: false,
          legend: {
            position: "bottom",
            bottom: 40,
          },
          bgColor: "#fbfbfb",
          labels: res.data.labels,
          datasets: [
            {
              data: res.data.data,
            },
          ],
        };
      });
    };
    getData();
  },

  data(){
    return{
      options1: {},
      options2: {},
      options3: {}
    }

  },
};
</script>

<style scoped>
.schart-box {
  display: inline-block;
  margin: 20px;
}
.schart {
  width: 600px;
  height: 400px;
}
.content-title {
  clear: both;
  font-weight: 400;
  line-height: 50px;
  margin: 10px 0;
  font-size: 22px;
  color: #1f2f3d;
}
</style>