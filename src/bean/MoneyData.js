class MoneyData {
    constructor(id, date, incomesArray, expensesArray) {
        this.id = id
        //日期
        this._date = date;
        //收入 数组类型
        this._incomesArray = incomesArray;
        //支出 数组类型
        this._expensesArray = expensesArray;
    }

    get date() {
        return this._date;
    }

    set date(value) {
        this._date = value;
    }

    get incomes() {
        return this._incomesArray;
    }

    set incomes(value) {
        this._incomesArray = value;
    }

    get expenses() {
        return this._expensesArray;
    }

    set expenses(value) {
        this._expensesArray = value;
    }

    get des() {
        let str = ''
        if (this.incomes !== undefined) {
            let result = moneyAdd(this.incomes)
            str = str + "收:" + result
        }

        if (this.expenses !== undefined) {
            let result = moneyAdd(this.expenses)
            str = str + " 支:" + result
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