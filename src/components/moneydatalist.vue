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
          , createSpan(createElement, 'des', moneyData.des)))
      childList.push(element)
      return childList
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
.moneyDataDetail {
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
}

.date {
  font-size: 35px;
  margin-left: 10px;
}

.des {
  font-size: 35px;
  margin-right: 10px;
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