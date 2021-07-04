class MoneyDetail {
    constructor(name, value, type, text) {
        this._name = name;
        this._value = value;
        this._type = type;
        //备注
        this._text = text;
    }

    get type() {
        return this._type;
    }

    set type(value) {
        this._type = value;
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