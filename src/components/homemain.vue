<template>
  <main class="homeMain">
    <div v-if="show">
      <img class="noFaceMan" src="../assets/img/noFaceMan.jpg" alt="图片">
      <div class="description-wrapper">
      <span class="description"><strong>本月还没有账单哦</strong>
      </span>
        <span class="description2">
      此页面只显示当月的账单，点击顶部
        <br/>
        可以切换到其他月份查查看
      </span>
      </div>
    </div>
  </main>
</template>

<script>
export default {
  props: ['show'],
  name: "homemain"
}
</script>

<style lang="scss" scoped>

.homeMain {
  position: relative;
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
/*
  position: absolute;
  top: 762px;
  left: 229px;
*/
  z-index: -1;
}

.description2 {
  font-size: 30px;
/*
  position: absolute;
  top: 829px;
  left: 150px;
*/
  z-index: -1;
}
.description-wrapper{
  min-height: 15vh;
  position: absolute;
  top: 43vh;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}
</style>