import {MoneyTypeEnum} from "@/bean/MoneyTypeEnum";

class MoneyData {
    constructor(id, date, moneyDataArray) {
        this.id = id
        //日期
        this._date = date;
        //根据 type 区分收入和支出
        this._moneyDataArray = this._moneyDataArray || [].concat(moneyDataArray)
    }

    get moneyDataArray() {
        return this._moneyDataArray;
    }

    addMoneyData(value) {
        this._moneyDataArray = this.moneyDataArray.concat(value)
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get incomes() {
        let result = this.moneyDataArray.filter(item => {
            return item.type === MoneyTypeEnum.INCOME
        });
        return result
    }

    set incomes(value) {
        this._moneyDataArray = this.moneyDataArray.concat(value)
    }

    get expenses() {
        return this.moneyDataArray.filter(item => {
            return item.type === MoneyTypeEnum.EXPENSE
        });
    }

    set expenses(value) {
        this._moneyDataArray = this.moneyDataArray.concat(value)
    }

    get incomesValue() {
        if (this.incomes !== undefined && this.incomes.length > 0) {
            return moneyAdd(this.incomes)
        }
        return 0
    }

    get expenseValue() {
        if (this.expenses !== undefined && this.expenses.length > 0) {
            return moneyAdd(this.expenses)
        }
        return 0
    }

    get des() {
        let str = ''
        let income = this.incomesValue
        str = str + "收:" + income
        // if (this.incomes !== undefined && this.incomes.length > 0) {
        //     let result = moneyAdd(this.incomes)
        //     str = str + "收:" + result
        // }

        let expense = this.expenseValue
        str = str + " 支:" + expense * -1
        // if (this.expenses !== undefined && this.expenses.length > 0) {
        //     let result = moneyAdd(this.expenses)
        //     str = str + " 支:" + result * -1
        // }

        return str
    }
}

let moneyAdd = function (array) {
    return array.map(expense => {
        return expense.value
    }).reduce((num1, num2) => {
        return Number(num1) + Number(num2)
    })
}

export default MoneyData