<template>
  <div class="home">
    <TopBar v-bind:show="haveData"/>
    <HomeMain v-bind:show="haveData"/>
    <HomeFooter />
  </div>
</template>

<script>
import TopBar from "@/components/topbar";
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
      records: [{"hhh": 777}]
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