<template>
  <div>
    <div class="overview">
      <div class="on"></div>
      <div class="backDiv" @click="toHome">
        <Icons class="back" icon-name="back"></Icons>
      </div>
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
      <div style="width: auto;height: 400px" id="expense">
      </div>
      <div style="width: auto;height: 400px" id="income">
      </div>
    </div>
  </div>

</template>

<script>
import {MoneyTypeEnum} from "@/bean/MoneyTypeEnum";
import Icons from "@/components/Icons";

export default {
  name: "Chart",
  components: {Icons},
  data: function () {
    return {
      monthlyIncome: 0,
      monthlyExpenditure: 0,
      monthlyBalance: 0,
      moneyDataArray: [],
      expenseMap: new Map(),
      incomeMap: new Map(),
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
    },
    expenseMap: function () {
      let hasData = Object.keys(this.expenseMap).length > 0
      let expense = document.getElementById('expense')
      if (hasData) {
        expense.classList.remove('none')
      } else {
        expense.classList.add('none')
      }
    },
    incomeMap: function () {
      let hasData = Object.keys(this.incomeMap).length > 0
      let income = document.getElementById('income')
      if (hasData) {
        income.classList.remove('none')
      } else {
        income.classList.add('none')
      }
    }
  },
  mounted() {
    // 在通过mounted调用即可
    this.echartsInit()
  },
  methods: {
    toHome() {
      this.$router.push('/')
    },
    getExpense() {
      this.expenseMap = this.getTypeData(MoneyTypeEnum.EXPENSE.name)
      return this.expenseMap
    },
    getIncome() {
      this.incomeMap = this.getTypeData(MoneyTypeEnum.INCOME.name)
      return this.incomeMap
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
                formatter: '{b}:{c}',
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
.none {
  display: none
}

.on {
  background-color: white;
  height: 20px;
}

.backDiv {
  top: -10px;
  width: 6%;
  margin-left: 20px;
  position: absolute;
}

.back {
  width: 100%;
}

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
  position: relative;
  background-color: white;
  margin-bottom: 20px;
}

.balanceOverview {
  margin-bottom: 20px;
  margin-top: 34px;
}

.incomeOverview {
  margin-bottom: 20px;
  margin-top: 34px;
}

.expenseOverview {
  margin-bottom: 20px;
  margin-top: 34px;
}


#expense {
  background-color: white;
  margin-bottom: 20px;
}

#income {
  background-color: white;
}
</style>