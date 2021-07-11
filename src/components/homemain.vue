<template>
  <main>
    <div v-show="!hasData" class="noDataHomeMain">
      <img class="noFaceMan" src="../assets/img/noFaceMan.jpg" alt="图片">
      <div class="description-wrapper">
      <span class="description"><strong>本月还没有账单哦</strong>
      </span>
        <span class="description2">
      此页面只显示当月的账单，点击顶部
        <br/>
        可以切换到其他月份查查看
      </span>
      </div>
    </div>
    <div v-show="hasData" class="hasDataHomeMain">
      <MoneyDataList :money-data-array="moneyDataArray"/>
    </div>
  </main>
</template>

<script>
import MoneyDataList from "@/components/moneydatalist";

export default {
  components: {MoneyDataList},
  name: "homemain",
  data: function () {
    return {
      hasData: false,
      moneyDataArray: []
    }
  },
  watch: {
    "$store.state.selectDate": {
      handler: function (newVal, oldVal) {
        this.moneyDataArray = this.$store.getters.getMoneyDataForSameMonth(newVal)
        this.hasData = this.moneyDataArray.length !== 0
      },
      immediate: true
    }
  }
}
</script>

<style lang="scss" scoped>
.noDataHomeMain {
  position: relative;
}

.noFaceMan {
  min-width: 60%;
  position: absolute;
  margin-top: 200px;
  left: 150px;
  z-index: -1;
}

@media screen and (min-width: 900px){
  .noFaceMan {
    min-width: 60%;
    position: absolute;
    margin-top: -38px;
    left: 150px;
    z-index: -1;
  }
}
.description {
  width: 100%;
  font-size: 40px;
  z-index: -1;
}

.description2 {
  font-size: 30px;
  z-index: -1;
}

.description-wrapper {
  min-height: 15vh;
  position: absolute;
  top: 43vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>