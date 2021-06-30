<script>

export default {
  name: "MoneyDataList",
  props: ['moneyDataArray'],
  render: function (createElement) {
    let moneyDataArrayCopy = this.moneyDataArray

    function createChildElement(createElement) {
      let childList = []
      moneyDataArrayCopy.forEach(moneyData => {
        let element = createElement('div', {
          attrs: {
            class: 'moneyData'
          }
        })
        childList.push(element)
      })
      return childList
    }

    return createElement('div', {
      attrs: {
        class: 'moneyDataListDiv'
      }
    }, createChildElement(createElement));
  },

}
</script>

<style scoped>
.moneyData{
  border: 1px solid black;
  height: 100vw;
}
</style>