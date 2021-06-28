<template>
  <div class="home">
    <header class="topBar">
      <div class="calendar-wrapper">
        <div>
          <Calendar class="calendar" v-on:selected:date="total = $event"/>
        </div>
        <div class="triangle">
          <Icons class="icon" iconName="triangle"></Icons>
        </div>
      </div>
    </header>
    <main class="main">
      <img class="noFaceMan" src="../assets/img/noFaceMan.jpg" alt="图片">
      <span class="description"><strong>本月还没有账单哦</strong>
      </span>
      <span class="description2">
      此页面只显示当月的账单，点击顶部
        <br/>
        可以切换到其他月份查查看
      </span>
    </main>
    <footer class="footer">
      <div class="addButton">
        <div class="addIcon">+</div>
      </div>
    </footer>
  </div>
</template>

<script>

import Calendar from "@/components/calendar";
import Icons from "@/components/Icons";

export default {
  components: {
    Calendar,
    Icons
  },
  name: 'Home',
  data: function () {
    return {
      total: undefined
    }
  },
}
</script>

<style lang="scss">
.home {
  position: relative;
}

.topBar {
  background-color: #519af8;
  min-height: 20vw;
  position: relative;
}

.calendar-wrapper {
  height: 100%;
  position: absolute;
  top: 93px;
  left: 315px;
}

.triangle {
  position: absolute;
  left: 132px;
  max-width: 20vw;
  top: -4px;
}

.icon {
  width: 35px;
  height: 35px;
}

.main {
  display: flex;
  justify-content: center;
}

.noFaceMan {
  min-width: 60vw;
  position: absolute;
  margin-top: 200px;
  left: 150px;
  z-index: -1;
}

.description {
  font-size: 40px;
  position: absolute;
  top: 762px;
  z-index: -1;
}

.description2 {
  font-size: 30px;
  position: absolute;
  top: 829px;
  z-index: -1;
}

.footer {
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