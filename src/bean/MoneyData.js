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
}


export default MoneyData