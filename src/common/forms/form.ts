import Field  from "./fields";


export default abstract class Form{

	
	abstract getFields(): Array<Field<unknown>>


	public async validate(throw_error: boolean = false): Promise<boolean>{

		let valid = true;

		for(const field of this.getFields()){
			if(!(await field.isValid())){
				valid = false
			}
		}
		if(throw_error && !valid){
			throw new ValidationException("Please check the highlighted fields and correct any errors.");
		}

		return valid;

	}

}

export class ValidationException extends Error{

}