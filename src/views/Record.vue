<template>
  <div class="record">
    <div class="tab">
      <router-link @click.native='selectTab(true)' to="Expense"
                   class="expense"
                   v-bind:class="{select:selected}">支出
      </router-link>
      <router-link @click.native="selectTab(false)" to="Incomes" class="income" v-bind:class="{select:!selected}">收入
      </router-link>
    </div>
    <div class="moneyType">
      <router-view/>
    </div>
    <div class="input">
      <input class="remark" placeholder="点此输入备注..."/>
      <input class="value" placeholder="0.0"/>
    </div>
    <div class="compute">
      <div>1</div>
      <div>2</div>
      <div>3</div>
      <div>删除</div>
      <div>4</div>
      <div>5</div>
      <div>6</div>
      <div>-</div>
      <div>7</div>
      <div>8</div>
      <div>9</div>
      <div>+</div>
      <div>再记</div>
      <div>0</div>
      <div>.</div>
      <div class="save">保存</div>
    </div>
  </div>
</template>

<script>
export default {
  data: function () {
    return {
      selected: true,
    }
  },
  methods: {
    selectTab(bool) {
      this.selected = bool
    }
  }
}

</script>

<style scoped lang="scss">
.select {
  color: white !important;
}

.tab {
  background-color: #5399f8;
  height: 10vh;
  display: flex;
  flex-wrap: nowrap;
  justify-content: center;
  align-items: center;
}

.expense {
  width: 17%;
  font-size: 40px;
  color: #bdd4ff;
}

.income {
  width: 17%;
  font-size: 40px;
  color: #bdd4ff;
}

.input {
  margin-left: 5px;
  display: flex;
  width: 98vw;
  flex-wrap: nowrap;
  box-shadow: 0px -6px #ebebeb;
}

.value {
  height: 10vh;
  width: 50%;
  font-size: 30px;
  margin-right: 20px;
  text-align: right;
}

.remark {
  height: 10vh;
  width: 50%;
  font-size: 30px;
}

.save {
  background-color: #e26a69;
  color: white;
}

.moneyType {
  border: 1px solid red;
  height: 40vh;
  overflow-y: scroll;
}

.compute {
  border: 1px solid red;
  height: 40vh;
  width: 98vw;
  position: absolute;
  display: flex;
  flex-wrap: wrap;
  margin-left: 5px;

  > div {
    font-size: 40px;
    width: 25%;
    height: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
}

.record {
  background-color: white;
  height: 100vh;
  position: relative;
}
</style>