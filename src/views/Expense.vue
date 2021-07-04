<template>
  <div>
    <div class="incomesClass">
      <div class="incomesType" v-for=" item in expenseTypes" :key="item.id">
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
  name: "expense",
  data: function () {
    return {
      expenseTypes: this.$store.getters.getExpenseType,
      isActive: {id: this.$store.getters.getExpenseType[0].id, name: this.$store.getters.getExpenseType[0].name}
    }
  },
  methods: {
    switchExpenseType(item) {
      this.isActive = {id: item.id, name: item.name}
    }
  },
  watch: {
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
          type: MoneyTypeEnum.EXPENSE
        })
      },
      immediate: true
    },
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