<template>
  <div id="view_content"></div>
</template>

<script>
import { DataSet, Network } from 'vis'
import {
  fetchSDGData
} from "../api";

import { ref, reactive } from "vue";
export default {
  name: 'variable2',
  data() {
    return {
    }
  },
  created() {
  },
  mounted() {
    const query = reactive({
      projectId: this.$route.query.projectId
    });
    const getSDG = () => {
      console.info(query);
      fetchSDGData(query).then((res) => {
        this.nodes = res.data.nodes;
        this.edges = res.data.edges;
        this.init(res.data.nodes,res.data.edges)
      });
    };
    getSDG();
  },
  methods: {
    init(nodes,edges) {
      // // create an array with nodes
      // const nodes = new DataSet([
      //   {id: 6, label: 'box 1', borderWidth: 2, shape: 'box'},
      //   {id: 7, label: 'box 1', borderWidth: 2, shape: 'box'},
      //   {id: 1, label: 'Node 1'},
      //   {id: 2, label: 'Node 2'},
      //   {id: 3, label: 'Node 3'},
      //   {id: 4, label: 'Node 4'},
      //   {id: 5, label: 'Node 5'},
      // ]);
      // // // create an array with edges
      // const edges = new DataSet([
      //   {from: 1, to: 3, dashes: false},
      //   {from: 2, to: 4, dashes: [5, 5] },
      //   {from: 2, to: 5},
      //   {from: 2, to: 3},
      //   {from: 6, to: 5},
      //   {from: 7, to: 5},
      // ]);
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
}
</script>

<style lang="scss" scoped>
.view_content {
  width: 1800px;
  height: 1600px;
  .vis-network {
    height: 1500px;
  }
}
</style>

