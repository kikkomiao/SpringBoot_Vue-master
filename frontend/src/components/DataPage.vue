<template>
  <div>
    <el-breadcrumb separator="/" class="crumbs">
      <el-breadcrumb-item>关于我们</el-breadcrumb-item>
      <el-breadcrumb-item>数据分析</el-breadcrumb-item>
    </el-breadcrumb>
    <el-card>
      <div id="data1"></div>
      <div id="data2"></div>
    </el-card>
  </div>
</template>

<script>
export default {
  name: "DataPage",
  data() {
    return {
      num1: "",
      num2: "",
      num3: "",
      num4: "",
      data: [
        { name: "中共党员", value: 0 },
        { name: "中共预备党员", value: 0 },
        { name: "共青团员", value: 0 },
        { name: "群众", value: 0 }
      ]
    };
  },
  // mounted: function() {
  // this.getData();
  //  this.initEcharts();
  // },
  // create() {
  //   this.getData();
  // },
  activated: function() {
    this.getData();
  },
  methods: {
    async getData() {
      const ret = await this.$http.get("/data/");
      if (ret.status === 200) {
        this.data[0].value = ret.data[0];
        this.data[1].value = ret.data[1];
        this.data[2].value = ret.data[2];
        this.data[3].value = ret.data[3];
        console.log(this.data);
        //  console.log(data[1]);
        //  console.log(data[2]);
        //  console.log(data[3]);
        this.getPie();
      } else {
        console.log("error");
      }
    },

    getPie() {
      console.log("pie");
      // this.getData;
      // 绘制图表
      var myChart = this.$echarts.init(document.getElementById("data1"));
      // 指定图表的配置项和数据
      var option = {
        //标题
        title: {
          text: "智慧志愿-志愿者政治身份",
          x: "center" //标题位置
        },
        tooltip: {
          trigger: "item",
          formatter: "{a}<br/>{b}:{c} ({d}%)"
        },
        //图例
        legend: {
          bottom: 0, //控制图例出现的距离  默认左上角
          left: "center", //控制图例的位置
          textStyle: {
            //图例中文字的样式
            color: "#000",
            fontSize: 16
          },
          data: ["中共党员", "中共预备党员", "共青团员", "群众"] //图例上显示的饼图各模块上的名字
        },
        //饼图中各模块的颜色
        color: ["#5470c6", "#91cc75", "#fac858", "#ee6666"],
        // 饼图数据
        series: [
          {
            type: "pie", //echarts图的类型   pie代表饼图
            radius: "70%", //饼图中饼状部分的大小所占整个父元素的百分比
            center: ["50%", "50%"], //整个饼图在整个父元素中的位置
            data: this.data,
            itemStyle: {
              normal: {
                label: {
                  show: true //饼图上是否出现标注文字 标注各模块代表什么  默认是true
                },
                labelLine: {
                  show: true //官网demo里外部标注上的小细线的显示隐藏    默认显示
                }
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.setOption(option);
    }
  }
};
</script>

<style scoped>
#data1 {
  width: 600px;
  height: 450px;
  z-index: 10px;
  margin-left: 300px;
  margin-top: 50px;
  margin-bottom: 30px;
}
</style>
