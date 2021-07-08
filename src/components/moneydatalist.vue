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
        let spanArray = []
        let incomeName = createSpan(createElement, 'incomeName', income.name);
        let incomeValue = createSpan(createElement, 'incomeValue', "+" + income.value)
        let remark = createSpan(createElement, "remark", income.text)
        spanArray.push(incomeName)
        spanArray.push(incomeValue)
        spanArray.push(remark)
        let spanDiv = createElement('div', {
          attrs: {
            class: 'spanDiv'
          },
          on: {
            mousedown: addDownUpClass,
            mouseup: removeDownUpClass,
          }
        }, spanArray);
        result.push(spanDiv)
      })
      moneyData.expenses.forEach(expense => {
        let spanArray = []
        let expenseName = createSpan(createElement, 'expenseName', expense.name)
        let expenseValue = createSpan(createElement, 'expenseValue', "-" + expense.value)
        let remark = createSpan(createElement, "remark", expense.text)
        spanArray.push(expenseName)
        spanArray.push(expenseValue)
        spanArray.push(remark)
        let spanDiv = createElement('div', {
          attrs: {
            class: 'spanDiv'
          },
          on: {
            mousedown: addDownUpClass,
            mouseup: removeDownUpClass
          }
        }, spanArray);
        result.push(spanDiv)
      })
      return result
    }

    function createSpan(createElement, className, showData) {
      if (showData === undefined) {
        return undefined
      }
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

function addDownUpClass(e) {
  console.log("---")
  let element = e.target
  if (e.target.localName === 'span') {
    element = e.target.parentNode
  }
  element.classList.add("downUpColor")
}

function removeDownUpClass(e) {
  let element = e.target
  if (e.target.localName === 'span') {
    element = e.target.parentElement
  }
  setTimeout(() => element.classList.remove("downUpColor"), 200)
}
</script>

<style scoped>
.downUpColor {
  background-color: rgba(213, 210, 210, 0.95)
}

.spanDiv {
  width: 100%;
  font-size: 35px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  position: relative;
  margin-bottom: 10px;
}

.spanDiv > span {
  width: 30%;
  margin-bottom: 35px;
}

.remark {
  font-size: 25px !important;
  top: 43px;
  color: #a9a9a9;
  overflow: hidden;
  height: 30px;
  position: absolute;
}

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
  margin-bottom: 35px;
  margin-left: -70px;
  margin-right: -40px;
  position: relative;
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