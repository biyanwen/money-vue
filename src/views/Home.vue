<template>
  <div class="home">
    <TopBar v-bind:hasData="haveData"/>
    <HomeMain :money-data-array="records" v-bind:hasData="haveData"/>
    <HomeFooter/>
  </div>
</template>

<script>
import TopBar from "@/components/hometopbar";
import HomeMain from "@/components/homemain";
import HomeFooter from "@/components/homefooter";
import MoneyData from "@/bean/MoneyData";
import MoneyDetail from "@/bean/MoneyDetail";

let incomesArray = new MoneyDetail("工资", 10)
let expensesArray = new MoneyDetail("三餐", -10)
let expensesArray2 = new MoneyDetail("洗脚", -10)
let moneyData = new MoneyData("1", new Date(), Array.of(incomesArray), Array.of(expensesArray, expensesArray2))

let moneyData2 = new MoneyData("2", new Date(), Array.of(incomesArray), Array.of(expensesArray))
export default {
  components: {
    TopBar: TopBar,
    HomeMain: HomeMain,
    HomeFooter: HomeFooter
  },
  name: 'Home',
  data: function () {
    return {
      date: undefined,
      records: [moneyData, moneyData2]
    }
  },
  computed: {
    haveData() {
      return this.records.length !== 0;
    }
  }
}
</script>
<style lang="scss">
.home {
  position: relative;
}
</style>