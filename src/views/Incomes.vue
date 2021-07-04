<template>
  <div>
    <div class="incomesClass">
      <div class="incomesType" v-for=" item in incomesTypes" :key="item.id">
        <div class="img" :class="{selectColor: item.id===isActive.id}" @click="switchExpenseType(item)">
          <img :src='item.img' :alt='item.name'/>
        </div>
        <span>{{ item.name }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import {MoneyTypeEnum} from "@/bean/MoneyTypeEnum";

export default {
  name: "Incomes",
  data: function () {
    return {
      incomesTypes: this.$store.getters.getIncomesType,
      isActive: {id: this.$store.getters.getIncomesType[0].id, name: this.$store.getters.getIncomesType[0].name}
    }
  },
  methods: {
    switchExpenseType(item) {
      this.isActive = {id: item.id, name: item.name}
    }
  },
  isActive: {
    handler: function (newValue, oldValue) {
      let name
      if (newValue === undefined) {
        name = oldValue.name
      } else {
        name = newValue.name
      }
      this.$store.commit('selectType', {
        name: name,
        type: MoneyTypeEnum.INCOME
      })
    },
    immediate: true
  },
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