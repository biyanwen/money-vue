<template>
  <header>
    <div v-bind:class="{noDataTopBar:!hasData,haveDataToBar:hasData}">
      <div class="scape" v-show="hasData">
        <img src="../assets/img/scape.png" alt="风景">
        <span class="me">月支出
        <br>
          <span class="meValue">
          {{ monthlyExpenditure }}
          </span>
        </span>
        <span class="mi">
          月收入
          <span class="miValue">{{ monthlyIncome }}</span>
        </span>
        <span class="balance">
          本月结余
          <span class="balanceValue">{{ monthlyBalance }}</span>
        </span>
      </div>
      <div class="calendar-wrapper">
        <div>
          <Calendar v-on:selected:date="selectDate = $event"/>
        </div>
        <div class="triangle">
          <Icons class="icon" iconName="triangle"></Icons>
        </div>
      </div>
    </div>
  </header>
</template>

<script>
import Calendar from "@/components/calendar";
import Icons from "@/components/Icons";

export default {
  name: "topbar",
  components: {
    Calendar,
    Icons
  },
  props: ['hasData'],
  data: function () {
    return {
      monthlyExpenditure: 0,
      monthlyIncome: 0,
      monthlyBalance: 0,
      selectDate: new Date()
    }
  },
  watch: {
    selectDate: {
      handler: function (newValue, oldValue) {
        this.$emit('update:date', this.selectDate)
        this.$store.commit('selectDate', newValue)
        this.statisticalData(newValue)
      },
      immediate: true
    },
  },
  methods: {
    //根据时间获取当月统计数据
    statisticalData(date) {
      const sameDataArray = this.$store.getters.getMoneyDataForSameMonth(date)
      if (sameDataArray.length > 0) {
        this.monthlyIncome = sameDataArray.map(item => item.incomesValue).reduce((t1, t2) => Number(t1) + Number(t2))
        this.monthlyExpenditure = sameDataArray.map(item => item.expenseValue).reduce((t1, t2) => Number(t1) + Number(t2))
        this.monthlyBalance = this.monthlyIncome - this.monthlyExpenditure
      }
    }
  }

}
</script>

<style lang="scss" scoped>
.scape {
  position: relative;
}

.me {
  position: absolute;
  top: 45%;
  color: white;
  font-size: 35px;
  left: 7%;
}

.meValue {
  position: absolute;
  top: 60px;
  left: 0;
  font-size: 70px;
}

.mi {
  position: absolute;
  top: 80%;
  color: white;
  font-size: 35px;
  left: 7%;
}

.balance {
  position: absolute;
  top: 80%;
  color: white;
  font-size: 35px;
  right: 25%;
}

.noDataTopBar {
  background-color: #519af8;
  min-height: 20vw;
  position: relative;
}

.calendar-wrapper {
  height: 100%;
  position: absolute;
  top: 71px;
  left: 315px;
}

.triangle {
  position: absolute;
  left: 144px;
  max-width: 20vw;
  top: -4px;
}

.icon {
  width: 35px;
  height: 35px;
}
</style>