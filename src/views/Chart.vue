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
      <div  style="width: auto;height: 400px" id="expense">
      </div>
      <div style="width: auto;height: 400px" id="income">
      </div>
    </div>
  </div>

</template>

<script>
import MoneyType from "@/bean/MoneyType";
import {MoneyTypeEnum} from "@/bean/MoneyTypeEnum";

export default {
  name: "Chart",
  data: function () {
    return {
      monthlyIncome: 0,
      monthlyExpenditure: 0,
      monthlyBalance: 0,
      moneyDataArray: []
    }
  },
  watch: {
    "$store.state.selectDate": {
      handler: function (newVal, oldVal) {
        const moneyDataArray = this.$store.getters.getMoneyDataForSameMonth(newVal)
        if (moneyDataArray.length > 0) {
          this.moneyDataArray = moneyDataArray
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
    getExpense() {
      return this.getTypeData(MoneyTypeEnum.EXPENSE.name)
    },
    getIncome() {
      return this.getTypeData(MoneyTypeEnum.INCOME.name)
    },
    getTypeData(typeName) {
      let expenseList = []
      this.moneyDataArray.forEach(data => {
        let expenseListList = data.moneyDataArray.filter(item => {
          return item.type.name === typeName
        })
        expenseList = expenseList.concat(expenseListList)
      })
      let map = new Map()
      expenseList.forEach(item => {
        let value = map.get(item.name)
        if (value !== undefined && value !== null) {
          value = Number(value) + Number(item.value)
          map.set(item.name, value)
        } else {
          map.set(item.name, item.value)
        }
      })
      let result = []
      map.forEach((k, v) => {
        let obj = {name: v, value: k}
        result.push(obj)
      })
      return result
    },
    createOption(fun, title) {
      let dataArray = fun()
      return {
        title: {
          text: title,
          left: 'center',
          textStyle: {
            fontSize: 45,
          },
        },
        tooltip: {
          trigger: 'item',
          formatter: "{a} <br/>{b} : {c} ({d}%)",
          textStyle: {
            fontSize: 20
          }
        },
        series: [
          {
            name: '明细',
            type: 'pie',
            radius: '60%',
            data: dataArray,
            label: {
              normal: {
                formatter: '{b}:{c}: ({d}%)',
                show: true,
                textStyle: {
                  fontSize: 28
                }
              },
              emphasis: {
                show: true
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
      }
    },
    createExpenseOption() {
      return this.createOption(this.getExpense, '支出详情')
    },
    createIncomeOption() {
      return this.createOption(this.getIncome, '收入详情')
    },
    //初始化echarts
    echartsInit() {
      let expenseOption = this.createExpenseOption()
      //因为初始化echarts 的时候，需要指定的容器 id='main'
      this.$echarts.init(document.getElementById('expense'))
          .setOption(expenseOption)

      let incomeOption = this.createIncomeOption()
      this.$echarts.init(document.getElementById('income'))
          .setOption(incomeOption)

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

#expense {
  background-color: white;
  margin-bottom: 20px;
}

#income {
  background-color: white;
}
</style>