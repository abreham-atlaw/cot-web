
export default class Field<T>{

	public value :T | null = null;
	public error : string | null = null;
	public required: boolean;
	public validator: ((value: T | null) => Promise<(string | null)>) | null;
	public liveValidate: boolean;

	constructor(required: boolean = true, validator: ((value: T | null) => Promise<(string | null)>) | null = null, liveValidate: boolean = true){
		this.required = required;
		this.validator = validator;
		this.liveValidate = liveValidate;
	}

	public async isValid(): Promise<boolean>{
		this.error = await this.validate();
		if(this.error === null){
			return true;
		}
		return false
	}

	public async validate(): Promise<string | null>{
		if(this.required && this.getValue() === null){
			return "This field is required";
		}
		if(this.validator != null){
			return this.validator(this.getValue())
		}
		return null;
	}

	public getValue(): T | null{
		return this.value;
	}

	public async setValue(value: T|null){
		this.value = value;
		if(this.liveValidate){
			await this.isValid()
		}
	}

}

export class TextField extends Field<string>{

	private emptyAsNull: boolean;
	constructor(
		required: boolean = true, 
		validator: ((value: string | null) => Promise<(string | null)>) | null = null, 
		liveValidate: boolean = true,
		emptyAsNull: boolean = true
	){
		super(required, validator, liveValidate)
		this.emptyAsNull = emptyAsNull
	}

	public getValue(): string | null {
		const value = super.getValue()
		if(this.emptyAsNull && value === ""){
			return null;
		}
		return value;
	}

}


export class EmailField extends TextField {
    constructor(
        required: boolean = true,
        validator: ((value: string | null) => Promise<(string | null)>) | null = null,
        liveValidate: boolean = true,
        emptyAsNull: boolean = true
    ) {
        super(required, validator, liveValidate, emptyAsNull);
    }

	public async validate(): Promise<string | null> {
		const error = await super.validate();
		if(error != null){
			return error;
		}
		const pattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if(!pattern.test(this.getValue()!)){
			return "Not a valid email"; 
		}
		return null
	}

}
