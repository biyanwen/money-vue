<template>
  <div class="home">
    <TopBar v-bind:hasData="haveData" v-on:update:date="date = $event"/>
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
import {MoneyTypeEnum} from "@/bean/MoneyTypeEnum";

let incomesArray = new MoneyDetail("工资", 10, MoneyTypeEnum.INCOME)
let expensesArray = new MoneyDetail("三餐", -10, MoneyTypeEnum.EXPENSE)
let expensesArray2 = new MoneyDetail("洗脚", -10, MoneyTypeEnum.EXPENSE)
let moneyData = new MoneyData("1", new Date(), Array.of(incomesArray,expensesArray, expensesArray2))

let moneyData2 = new MoneyData("2", new Date(), Array.of(incomesArray,expensesArray))
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