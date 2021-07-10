<template>
  <div>
    <div class="overview">
      <span class="eiOverview">本月收支总览</span>
      <div class="expenseOverview">
        <span>支出</span>
        <span>{{ monthlyExpenditure }}</span>
      </div>
      <div class="incomeOverview">
        <span>收入</span>
        <span>{{ monthlyIncome }}</span>
      </div>
      <div class="balanceOverview">
        <span>结余</span>
        <span>{{ monthlyBalance }}</span>
      </div>
    </div>
    <div class="charts">
      <div style="width: auto;height: 400px" id="main">
      </div>
    </div>
  </div>

</template>

<script>
export default {
  name: "Chart",
  data: function () {
    return {
      monthlyIncome: 0,
      monthlyExpenditure: 0,
      monthlyBalance: 0
    }
  },
  watch: {
    "$store.state.selectDate": {
      handler: function (newVal, oldVal) {
        const moneyDataArray = this.$store.getters.getMoneyDataForSameMonth(newVal)
        if (moneyDataArray.length > 0) {
          this.monthlyIncome = moneyDataArray.map(item => item.incomesValue).reduce((t1, t2) => Number(t1) + Number(t2))
          this.monthlyExpenditure = moneyDataArray.map(item => item.expenseValue).reduce((t1, t2) => Number(t1) + Number(t2))
          this.monthlyBalance = this.monthlyIncome - this.monthlyExpenditure
        }
      },
      immediate: true
    }
  },
  mounted() {
    // 在通过mounted调用即可
    this.echartsInit()
  },
  methods: {
    //初始化echarts
    echartsInit() {
      //柱形图
      //因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById('main'))
          .setOption({
            series: [
              {
                name: '访问来源',
                type: 'pie',
                radius: '80%',
                data: [
                  {value: 235, name: '视频广告'},
                  {value: 274, name: '联盟广告'},
                  {value: 310, name: '邮件营销'},
                  {value: 335, name: '直接访问'},
                  {value: 400, name: '搜索引擎'},
                ],
                "label": {
                  "normal": {
                    "show": true,
                    "textStyle": {
                      "fontSize": 28 }
                  },
                  "emphasis": {
                    "show": true
                  }
                },
              }
            ],
            roseType: 'angle',
            itemStyle: {
              // 阴影的大小
              shadowBlur: 200,
              // 阴影水平方向上的偏移
              shadowOffsetX: 0,
              // 阴影垂直方向上的偏移
              shadowOffsetY: 0,
              // 阴影颜色
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            },
            labelLine: {
              lineStyle: {
                color: 'rgba(255, 255, 255, 0.3)'
              }
            },
          })
    }
  }
}
</script>

<style lang="scss" scoped>
.eiOverview {
  font-size: 45px;
}

.balanceOverview {
  display: flex;
  justify-content: space-between;
  font-size: 35px;

  > span {
    width: 90%;
  }
}

.incomeOverview {
  display: flex;
  justify-content: space-between;
  font-size: 35px;

  > span {
    width: 90%;
  }
}

.expenseOverview {
  display: flex;
  justify-content: space-between;
  font-size: 35px;

  > span {
    width: 90%;
  }
}

.overview {
  background-color: white;
  margin-bottom: 20px;

  > * {
    margin-bottom: 20px;
    margin-top: 10px;

  }
}

.charts {
  background-color: white;
}

</style>