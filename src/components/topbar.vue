<template>
  <header>
    <div v-bind:class="{topBar:show}">
      <div class="calendar-wrapper">
        <div>
          <Calendar v-bind:show="show" v-on:selected:date="date = $event"/>
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
  props: ['show'],
  data: function () {
    return {}
  }
}
</script>

<style lang="scss" scoped>
.topBar {
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