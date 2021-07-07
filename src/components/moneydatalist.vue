<script>

export default {
  name: "MoneyDataList",
  props: ['moneyDataArray'],
  render: function (createElement) {
    let moneyDataArrayCopy = this.moneyDataArray
    function createFirstChildElement(createElement) {
      let childList = []
      moneyDataArrayCopy.forEach(moneyData => {
        let element = createElement('div', {
          attrs: {
            class: 'moneyData'
          }
        }, createSecond(createElement, moneyData))
        childList.push(element)
      })
      return childList
    }

    function createSecond(createElement, moneyData) {
      let childList = []
      let element = createElement('div', {
        attrs: {
          class: 'moneyDataDetail'
        },
      }, Array.of(createSpan(createElement, 'date', moneyData.date.toLocaleDateString())
          , createSpan(createElement, 'des', moneyData.des))
          .concat(createDetail(createElement, moneyData)))
      childList.push(element)
      return childList
    }

    function createDetail(createElement, moneyData) {
      let result = []
      moneyData.incomes.forEach(income => {
        let incomeName = createSpan(createElement, 'incomeName', income.name);
        let incomeValue = createSpan(createElement, 'incomeValue', income.value)
        result.push(incomeName)
        result.push(incomeValue)
      })
      moneyData.expenses.forEach(expense => {
        let expenseName = createSpan(createElement, 'expenseName', expense.name)
        let expenseValue = createSpan(createElement, 'expenseValue', expense.value)
        result.push(expenseName)
        result.push(expenseValue)
      })
      return result
    }

    function createSpan(createElement, className, showData) {
      return createElement('span', {
        attrs: {
          class: className
        },
        domProps: {
          innerHTML: showData
        },
      })
    }

    return createElement('div', {
      attrs: {
        class: 'moneyDataListDiv'
      }
    }, createFirstChildElement(createElement));
  },

}
</script>

<style scoped>
.incomeValue {
  color: #61A48D;
}

.expenseValue {
  color: #D0666A;
}

.moneyDataDetail > span {
  font-family: SimHei;
  width: 50%;
  font-size: 35px;
  margin-bottom: 25px;
  margin-left: -70px;
  margin-right: -40px;
}

.moneyDataDetail {
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-top: 10px;
  min-height: 100%;
}

.date {
  font-weight: bolder;
}

.des {
  font-weight: bolder;
}

.moneyDataListDiv {
  display: flex;
  justify-content: center;
  flex-wrap: wrap;
}

.moneyData {
  min-height: 20vw;
  width: 95vw;
  background-color: #FFFFFD;
  border-radius: 20px;
  margin-top: 20px;
}

</style>