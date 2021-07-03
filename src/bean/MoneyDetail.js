class MoneyDetail {
    constructor(name, value, text) {
        this._name = name;
        this._value = value;
        //备注
        this._text = text;
    }

    get name() {
        return this._name;
    }

    set name(value) {
        this._name = value;
    }

    get value() {
        return this._value;
    }

    set value(value) {
        this._value = value;
    }

    get text() {
        return this._text;
    }

    set text(value) {
        this._text = value;
    }
}

export default MoneyDetail