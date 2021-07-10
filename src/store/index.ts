import Vue from 'vue'
import Vuex from 'vuex'
import MoneyType from '../bean/MoneyType'
import MoneyData from "@/bean/MoneyData";
import MoneyDetail from "@/bean/MoneyDetail";

Vue.use(Vuex)

const MONEY = 'money-vue'
const MoneyDataArray = "MoneyDataArray"
export default new Vuex.Store({
    state: {
        selectType: {name: undefined, type: undefined},
        selectDate: new Date(),
        moneyDataArray: new Array<MoneyData>()
    },
    mutations: {
        saveMoneyData(state, moneyData: MoneyData) {
            const dataList = getMoneyDataArrayAtLocalStorage() || [];
            const filterResult = dataList.filter((item: MoneyData) => {
                // eslint-disable-next-line @typescript-eslint/ban-ts-comment
                // @ts-ignore
                return item.date.toDateString() === moneyData.date.toDateString()
            })
            if (filterResult.length === 0) {
                dataList.push(moneyData)
            } else {
                filterResult[0].addMoneyData(moneyData.moneyDataArray)
            }
            saveMoneyDataArrayAtLocalStorage(dataList)
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
        getMoneyDataArray() {
            return getMoneyDataArrayAtLocalStorage()
        },
        getExpenseType() {
            const moneyTypeDefault = new MoneyType;
            return localStorage.getItem(MONEY + 'expenseType') || moneyTypeDefault.expenseDefault
        },
        getIncomesType() {
            const moneyTypeDefault = new MoneyType;
            return localStorage.getItem(MONEY + 'incomesType') || moneyTypeDefault.incomesDefault
        },

        // eslint-disable-next-line @typescript-eslint/ban-ts-comment
        // @ts-ignore
        getMoneyDataForSameMonth: (state) => (date) => {
            if ('date' in date) {
                date = date.date
            }
            const dataList = getMoneyDataArrayAtLocalStorage()
            return dataList.filter((item: MoneyData) => {
                return item.date.getFullYear() === date.getFullYear()
                    && item.date.getMonth() === date.getMonth()
            }).reverse()
        }
    }
})

function saveMoneyDataArrayAtLocalStorage(dataList: Array<MoneyData>) {
    localStorage.setItem(MoneyDataArray, JSON.stringify(dataList));
}

function getMoneyDataArrayAtLocalStorage() {
    const moneyDataArray = JSON.parse(<string>localStorage.getItem(MoneyDataArray)) || []

    return moneyDataArray.filter((item: MoneyData) => item !== null).map((item: MoneyData) => {
        const moneyDetailArray = item._moneyDataArray.map((detail: MoneyDetail) => {
            return new MoneyDetail(detail._name, detail._value, detail._type, detail._text)
        })
        return new MoneyData(item.id, item._date, moneyDetailArray)
    })
}