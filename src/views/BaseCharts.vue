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
      <!--            <div class="schart-box">-->
      <!--              <div class="content-title">环形图</div>-->
      <!--              <schart class="schart" canvasId="ring" :options="options2"></schart>-->
      <!--            </div>-->
      <!--            <div class="schart-box">-->
      <!--              <div class="content-title">环形图</div>-->
      <!--              <schart class="schart" canvasId="pie" :options="options4"></schart>-->
      <!--            </div>-->

    </div>
  </div>
</template>

<script>
import Schart from "vue-schart";
import {fetchData, fetchOptions1Data} from "../api";
import {reactive, ref} from "vue";
import Vue from "vis";

export default {
  name: "basecharts",
  components: {
    Schart,
  },
  // created() {
  //   fetchOptions1Data().then((res) => {
  //     this.options1.datasets.date = res.data;
  //     console.info(tableData.list.valueOf());
  //   });
  // },
  mounted: function (){
    fetchOptions1Data().then((res) => {
      this.options1.datasets.date = res.data;
    });
  },
  created:function (){
    fetchOptions1Data().then((res) => {
      this.options1.datasets.date = res.data;
    });
  },

  props: {
    info: {//这里是传进来的折线图数据
      type: Array,
      default: () => {
        fetchOptions1Data().then((res) => {
          // this.options1.datasets.date = res.data;
          // console.info(tableData.list.valueOf());
          return res.data;
        });
      }
    }
  },

  data:function (){

    return{
      options1: {
        type: "bar",
        title: {
          text: "原因后果保护措施数据统计",
        },
        bgColor: "#fbfbfb",
        labels: ["节点", "参数", "偏差", "原因", "后果", "保护措施", "建议措施"],
        datasets: [
          {
            data:[1]
          },
        ],
      }
    }

  },
  setup: function () {
    const getData = () => {
      fetchOptions1Data().then((res) => {

      });
    };
    getData();
    // const options1 = {
    //   type: "bar",
    //   title: {
    //     text: "原因后果保护措施数据统计",
    //   },
    //   bgColor: "#fbfbfb",
    //   labels: ["节点", "参数", "偏差", "原因", "后果", "保护措施", "建议措施"],
    //   datasets: [
    //     {
    //       data: [1]
    //     },
    //   ],
    // };
    // const options2 = {
    //   type: "ring",
    //   title: {
    //     text: "SIL等级统计",
    //   },
    //   showValue: false,
    //   legend: {
    //     position: "bottom",
    //     bottom: 40,
    //   },
    //   bgColor: "#fbfbfb",
    //   labels: ["SIL1", "SIL2", "SIL3"],
    //   datasets: [
    //     {
    //       data: [500, 500, 500],
    //     },
    //   ],
    // };
    // const options4 = {
    //   type: "ring",
    //   title: {
    //     text: "HAZOP参数数量统计",
    //   },
    //   showValue: false,
    //   legend: {
    //     position: "bottom",
    //     bottom: 40,
    //   },
    //   bgColor: "#fbfbfb",
    //   labels: ["压力", "高液位"],
    //   datasets: [
    //     {
    //       data: [500, 500],
    //     },
    //   ],
    // };
    return {
      getData,
      // options1,
      // options2,
      // options4,
    };
  },

  watch: {//深度监听传过来的折线图数据
    info: {
      immediate: true,
      deep: true,
      handler() {
        fetchOptions1Data().then((res) => {
          // this.options1.datasets.date = res.data;
          // console.info(tableData.list.valueOf());
          this.options1.datasets.data = res.data;
          console.info( this.options1.datasets.data);
        });
      }
    }
  }
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