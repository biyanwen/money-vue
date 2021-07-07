<template>
  <div class="home">
    <TopBar/>
    <HomeMain />
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
    }
  }
}
</script>
<style lang="scss">
.home {
  position: relative;
}
</style>