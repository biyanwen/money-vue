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
      records: this.$store.getters.getMoneyDataArray
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