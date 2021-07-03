import Vue from 'vue'
import Vuex from 'vuex'
import MoneyType from '../bean/MoneyType'

Vue.use(Vuex)

const MONEY = 'money-vue'
export default new Vuex.Store({
    state: {
        expenseType: [],
        incomesType: []
    },
    mutations: {},
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
