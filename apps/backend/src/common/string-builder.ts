export class StringBuilder {
	private _value: string

	constructor(value: string) {
		this._value = value
	}

	public concat(value: string): StringBuilder {
		this._value += value
		return this
	}

	public concatIfExists(value: string, condition: boolean): StringBuilder {
		if (condition) {
			this._value += value
		}
		return this
	}

	public toString(): string {
		return this._value
	}
}
