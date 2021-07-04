import {MoneyTypeEnum} from "@/bean/MoneyTypeEnum";

class MoneyData {
    constructor(id, date, moneyDataArray) {
        this.id = id
        //日期
        this._date = date;
        //根据 type 区分收入和支出
        this.moneyDataArray = this.moneyDataArray || [].concat(moneyDataArray)
    }

    set addMoneyData(value) {
        return this.moneyDataArray.concat(value)
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
        this.moneyDataArray.concat(value)
    }

    get expenses() {
        return this.moneyDataArray.filter(item => {
            return item.type === MoneyTypeEnum.EXPENSE
        });
    }

    set expenses(value) {
        this.moneyDataArray.concat(value)
    }

    get des() {
        let str = ''
        if (this.incomes !== undefined) {
            let result = moneyAdd(this.incomes)
            str = str + "收:" + result
        }

        if (this.expenses !== undefined) {
            let result = moneyAdd(this.expenses)
            str = str + " 支:" + result * -1
        }

        return str
    }
}

let moneyAdd = function (array) {
    return array.map(expense => {
        return expense.value
    }).reduce((num1, num2) => {
        return num1 + num2
    })
}

export default MoneyData