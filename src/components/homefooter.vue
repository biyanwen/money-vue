<template>
  <footer class="homeFooter">
    <div v-if="show">
      <div class="addButton">
        <div class="addIcon">+</div>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  props: ['show'],
  name: "homefooter"
}
</script>

<style scoped>
.homeFooter {
  position: absolute;
  min-width: 100vw;
  top: 85vh;
  display: flex;
  justify-content: center;
  align-content: center;
}

.addButton {
  background-color: #519af8;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  position: relative;
}

.addIcon {
  font-size: 50px;
  color: #ffffff;
  max-height: 50px;
  max-width: 50px;
  position: absolute;
  left: 34px;
  top: 16px;
}
</style>