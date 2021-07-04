import Vue from 'vue'
import Vuex from 'vuex'
import MoneyType from '../bean/MoneyType'

Vue.use(Vuex)

const MONEY = 'money-vue'
export default new Vuex.Store({
    state: {
        expenseType: [],
        incomesType: [],
        selectType: {name: undefined, type: undefined},
        selectDate: undefined
    },
    mutations: {
        selectType(state, param) {
            state.selectType = {name: param.name, type: param.type}
        },
        selectDate(state, date) {
            if (date.date) {
                state.selectDate = date.date
            } else {
                state.selectDate = date
            }
            console.log(state.selectDate);
        }
    },
    actions: {},
    modules: {},
    getters: {
        getExpenseType() {
            const moneyTypeDefault = new MoneyType;
            return localStorage.getItem(MONEY + 'expenseType') || moneyTypeDefault.expenseDefault
        },
        getIncomesType() {
            const moneyTypeDefault = new MoneyType;
            return localStorage.getItem(MONEY + 'incomesType') || moneyTypeDefault.incomesDefault
        }
    }
})
