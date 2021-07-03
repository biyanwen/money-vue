<template>
  <div>
    <div class="incomesClass">
      <div class="incomesType" v-for=" item in incomesTypes" :key="item.id">
        <div class="img" :class="{selectColor: item.id===isActive}" @click="switchExpenseType(item.id)">
          <img :src='item.img' :alt='item.name'/>
        </div>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "Incomes",
  data: function () {
    return {
      incomesTypes: this.$store.getters.getIncomesType,
      isActive: undefined
    }
  },
  methods: {
    switchExpenseType(index) {
      this.isActive = index
    }
  }
}
</script>

<style scoped>
.incomesClass {
  display: flex;
  flex-wrap: wrap;
}

.incomesType {
  margin-top: 20px;
  margin-left: 50px;
}

.selectColor {
  background-color: #519af8 !important;
}

.img {
  width: 90px;
  height: 90px;
  border-radius: 100%;
  background-color: #f3eff0;
}

img {
  width: 70%;
  background-size: cover;
  margin-top: 15%;
  border: none
}

span {
  font-size: 30px;
}
</style>