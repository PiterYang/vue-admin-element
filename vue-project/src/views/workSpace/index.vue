<template>
  <div>
    <line-chart :chart-data="lineChartData"></line-chart>
    <BarChart width="50%" class="barChart fl"></BarChart>
    <PieChart width="50%" class="pieChart fl"></PieChart>
  </div>

</template>
<script>
  import LineChart from './component/lineChart.vue'
  import BarChart from './component/barChart.vue'
  import PieChart from './component/pieChart.vue'
  export default {
    data() {
      return {
        lineChartData: {

            expectedData: [100, 120, 161, 134, 105, 160, 165],
            actualData: [120, 82, 91, 154, 162, 140, 145]

        }
      }
    },
    components: {
      LineChart,
      BarChart,
      PieChart
    }
  }
</script>
<style rel="stylesheet/scss" lang="scss" scoped>
  .fl {
    float: left;
  }
</style>
