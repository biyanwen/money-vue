<template>
  <div class="record">
    <div class="tab">
      <div class="indexRout">
        <router-link to="/">
          <Icons class="indexIcons" icon-name="index"/>
        </router-link>
      </div>
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
      <input @change="inputTest($event)" class="remark" placeholder="点此输入备注..."/>
      <div class="value">0.0</div>
    </div>
    <div @click="keySelect($event);inputNum($event);jump($event)" class="compute">
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
      <div @click="recode($event); deleteRemark($event)">再记</div>
      <div>0</div>
      <div>.</div>
      <div class="save" @click="recode">
        保存
      </div>
    </div>
  </div>
</template>

<script>
import Icons from "@/components/Icons";
import MoneyData from "@/bean/MoneyData";
import UuidUtils from "@/utils/UuidUtils";
import MoneyDetail from "@/bean/MoneyDetail";

export default {
  components: {Icons},
  data: function () {
    return {
      selected: true,
      remark: undefined,
      moneyNum: undefined
    }
  },
  methods: {
    deleteRemark() {
      document.getElementsByClassName("remark")[0].value = ''
    },
    jump(even) {
      let innerText = even.target.innerText
      if (innerText === '保存') {
        window.location.href = "/"
      }
    },
    recode() {
      this.moneyNum = lastCompute(this.moneyNum)

      let typeName = this.$store.state.selectType.name
      let type = this.$store.state.selectType.type
      let selectDate = this.$store.state.selectDate

      let moneyDetail = new MoneyDetail(typeName, this.moneyNum, type, this.remark)

      let moneyData = new MoneyData(UuidUtils.get_uuid(), selectDate, [moneyDetail])
      this.$store.commit('saveMoneyData', moneyData)

      function lastCompute(moneyNum) {
        let lastStr = moneyNum.substr(moneyNum.length - 1, 1)
        let firstStr = moneyNum.substr(0, 1)

        if (firstStr === '-' || firstStr === '+' || firstStr === '.') {
          moneyNum = moneyNum.substr(1, moneyNum.length)
        }

        if (lastStr === '-' || lastStr === '+' || lastStr === '.') {
          moneyNum = moneyNum.substr(0, moneyNum.length - 1)
        }
        return eval(moneyNum)
      }

    },
    selectTab(bool) {
      this.selected = bool
    }
    ,
    keySelect(even) {
      let innerText = even.target.innerText
      setSelectClass(innerText, even.target.parentElement.childNodes)
    }
    ,
    inputTest(even) {
      this.remark = even.target.value
    }
    ,
    inputNum(even) {

      let innerText = even.target.innerText
      let valueDom = document.getElementsByClassName('value').item(0);
      if (valueDom !== null) {
        let initText = getNum(valueDom, innerText)
        if (initText !== undefined) {
          valueDom.innerHTML = initText
          this.moneyNum = initText
        }
      }
    }
  },
  created() {
    let height = document.body.clientHeight
    document.body.style.height = height.toString()
  }
}
let getNum = function (valueDom, innerText) {
  let initText = valueDom.innerHTML
  if (initText.indexOf('.') !== -1 && innerText === '.') {
    return;
  }
  if (innerText === '删除' && initText !== '0.0') {
    let newText = initText.substr(0, initText.length - 1)
    if (newText === '') {
      newText = '0.0'
    }
    return newText
  }
  if (initText.length > 11) {
    window.alert('数字太大啦~')
    return;
  }
  if (initText.indexOf('.') !== -1 && (initText.length - initText.indexOf('.') > 6)) {
    window.alert('小数太多啦~')
    return;
  }
  if (innerText === '.' && initText === '0.0') {
    innerText = 0
  }

  if (isCanShow(innerText)) {
    return setNumIfZero(initText, innerText)
  }

  return '0.0'
}

function setNumIfZero(initTest, innerText) {
  initTest = computeNum(initTest, innerText)
  if (initTest === '0.0' || initTest === '0' && innerText !== '.') {
    initTest = innerText
  } else {
    initTest += innerText
  }
  return initTest
}

function computeNum(initTest, innerText) {
  if (innerText === '-' || innerText === '+') {
    if (initTest.indexOf('-') !== -1 || initTest.indexOf('+') !== -1) {
      try {
        initTest = eval(initTest)
      } catch (e) {
        initTest = initTest.substr(0, initTest.length - 1)
      }
    }
  }
  return initTest
}

let setSelectClass = function (innerText, nodeList) {
  nodeList.forEach(node => {
    if (node.innerText === innerText) {
      node.classList.add('keySelect')
    } else {
      if (node.classList.contains('keySelect')) {
        node.classList.remove('keySelect')
      }
    }
  })
}
let isCanShow = function (text) {
  const numList = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '0', '.', '-', '+']
  return numList.includes(text)
}
</script>

<style scoped lang="scss">
.indexRout {
  width: 45px;
  position: absolute;
  left: 7vw;
}

.indexIcons {
  width: 100%;
}

.select {
  color: white !important;
}

.keySelect {
  background-color: rgba(241, 241, 241, 0.6);
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
  font-size: 40px;
  margin-right: 20px;
  display: flex;
  align-items: center;
  justify-content: flex-end;
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
  height: 40vh;
  overflow-y: scroll;
}

.compute {
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