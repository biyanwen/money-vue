class MoneyTypeEnum {
    constructor(name) {
        this.name = name;
    }

    getName() {
        return this.name;
    }
}

MoneyTypeEnum.INCOME = new MoneyTypeEnum('收入');
MoneyTypeEnum.EXPENSE = new MoneyTypeEnum('支出');

Object.freeze(MoneyTypeEnum);               // 冻结对象，防止修改

export {MoneyTypeEnum}