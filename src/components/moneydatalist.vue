<script>

export default {
  name: "MoneyDataList",
  props: ['moneyDataArray'],
  render: function (createElement) {

    let moneyDataArrayCopy = this.moneyDataArray

    return createElement('div', {
      attrs: {
        class: 'moneyDataListDiv'
      }
    }, createFirstChildElement(createElement));

    function createFirstChildElement(createElement) {
      let childList = []
      let popLayer = createElement('div', {
        attrs: {
          class: 'popLayer'
        },
        on: {
          click: deletePop
        }
      })
      let popBox = createElement('div', {
        attrs: {
          class: 'popBox'
        }
      })
      moneyDataArrayCopy.forEach(moneyData => {
        let element = createElement('div', {
          attrs: {
            class: 'moneyData'
          }
        }, createSecond(createElement, moneyData))
        childList.push(element)
      })
      childList.push(popLayer, popBox)
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
            click: showEdit
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
            mouseup: removeDownUpClass,
            click: showEdit
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
  },

}

function deletePop() {
  document.getElementsByClassName('popLayer')[0]
      .classList.remove('popLayerShow')
  let popBoxShow = document.getElementsByClassName('popBox')[0]
  popBoxShow.classList.remove('popBoxShow')
  popBoxShow.innerHTML = ""
}

function showSelectEdit() {
  document.getElementsByClassName('popLayer')[0]
      .classList.add('popLayerShow')
  let popBoxShow = document.getElementsByClassName('popBox')[0]
  popBoxShow.classList.add('popBoxShow')
  return popBoxShow
}

function createEditTitle() {
  let result = []

  let explain = createEditSpan('账单详情')
  explain.style.fontWeight = "bolder"
  let deleteButton = createEditSpan('删除')
  deleteButton.style.fontWeight = "bolder"
  deleteButton.style.color = "#c45053"
  result.push(explain, deleteButton)
  return result
}

function createEditSpan(value) {
  let explain = document.createElement('span')
  explain.innerHTML = value
  explain.style.height = "30%"
  explain.style.width = "50%"
  explain.style.lineHeight = "259%"
  return explain
}

function showEdit(e) {

  let popBoxShow = showSelectEdit()

  let [explain, deleteButton] = createEditTitle()

  let childrenNodes = getDetailSpanParent(e).childNodes

  //分类span
  let typeSpan = createEditSpan("分类")
  let typeValue = childrenNodes[0].innerHTML
  let typeValueSpan = createEditSpan(typeValue)

  //金额span
  let moneySpan = createEditSpan("金额")
  let moneyValue = childrenNodes[1].innerHTML
  let moneyValueSpan = createEditSpan(moneyValue)

  popBoxShow.append(explain, deleteButton, typeSpan, typeValueSpan, moneySpan, moneyValueSpan)

}

function addDownUpClass(e) {
  let element = getDetailSpanParent(e)
  element.classList.add("downUpColor")
}

function removeDownUpClass(e) {
  let element = getDetailSpanParent(e)
  setTimeout(() => element.classList.remove("downUpColor"), 200)
}

function getDetailSpanParent(e) {
  let element = e.target
  if (e.target.localName === 'span') {
    element = e.target.parentElement
  }
  return element;
}
</script>

<style lang="scss" scoped>
.popBoxShow {
  position: fixed;
  top: 30%;
  width: 90%;
  height: 20%;
  background-color: white;
  border-radius: 5%;
  font-size: 35px;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.popLayerShow {
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  position: absolute;
  background-color: #B3B3B3;
  opacity: 0.3;
}

.downUpColor {
  background-color: rgba(213, 210, 210, 0.95)
}

.spanDiv {
  width: 100%;
  font-size: 35px;
  display: flex;
  justify-content: space-between;
  flex-wrap: wrap;
  margin-bottom: 10px;
}

.spanDiv > span {
  width: 35%;
  margin-bottom: 35px;
}

.remark {
  font-size: 25px !important;
  color: #a9a9a9;
  overflow: hidden;
  height: 30px;
  margin-top: -39px;
  margin-bottom: 10px !important;
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
  margin-right: -22px;
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