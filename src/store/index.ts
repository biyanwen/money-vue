import Vue from 'vue'
import Vuex from 'vuex'
import MoneyType from '../bean/MoneyType'
import MoneyData from "@/bean/MoneyData";

Vue.use(Vuex)

const MONEY = 'money-vue'
export default new Vuex.Store({
    state: {
        selectType: {name: undefined, type: undefined},
        selectDate: undefined,
        moneyDataArray: new Array<MoneyData>()
    },
    mutations: {
        saveMoneyData(state, moneyData: MoneyData) {
            const filterResult = state.moneyDataArray || [].filter(item => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return item.date.toDateString() === moneyData.date.toDateString()
            })
            if (filterResult.length === 0) {
                state.moneyDataArray.push(moneyData)
            } else {
                filterResult[0].addMoneyData(moneyData.moneyDataArray)
            }
        },
        selectType(state, param) {
            state.selectType = {name: param.name, type: param.type}
        },
        selectDate(state, date) {
            if (date.date) {
                state.selectDate = date.date
            } else {
                state.selectDate = date
            }
        }
    },
    actions: {},
    modules: {},
    getters: {
        getMoneyDataArray(state) {
            return state.moneyDataArray
        },
        getExpenseType() {
            const moneyTypeDefault = new MoneyType;
            return localStorage.getItem(MONEY + 'expenseType') || moneyTypeDefault.expenseDefault
        },
        getIncomesType() {
            const moneyTypeDefault = new MoneyType;
            return localStorage.getItem(MONEY + 'incomesType') || moneyTypeDefault.incomesDefault
        },
        getMoneyDataForSameMonth: (state) => (date: Date) => {
            // todo 要从 localStore 中获取
            const dataList = state.moneyDataArray
            return dataList.filter(item => {
                return item.date.getFullYear() === date.getFullYear()
                    && item.date.getMonth() === date.getMonth()
            })
        }
    }
})
