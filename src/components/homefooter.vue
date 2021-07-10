<template>
  <footer class="homeFooter">
    <div>
      <div class="addButton">
        <router-link to="/Expense" class="addIcon">+</router-link>
      </div>
    </div>
  </footer>
</template>

<script>
export default {
  name: "homefooter"
}
</script>

<style scoped>
.homeFooter {
  position: absolute;
  min-width: 100vw;
  top: 88vh;
  display: flex;
  justify-content: center;
  align-content: center;
}

.addButton {
  background-color: #519af8;
  width: 100px;
  height: 100px;
  border-radius: 50%;
  top: 90%;
  left:41%;
  right:50%;
  position: fixed;
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