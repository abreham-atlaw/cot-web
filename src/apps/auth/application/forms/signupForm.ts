import Field, { EmailField, TextField } from "@/common/forms/fields";
import Form from "@/common/forms/form";


export class SignupForm extends Form{

    recaptcha = new TextField();
    password = new TextField(
        true,
        async (value: string | null) => {
            if(value!.length < 8){
                return "Password should be atleast 8 characters";
            }
            return null;
        }
    );
    confirmPassword = new TextField(
        true,
        async (value: string | null) => {
            if (value !== this.password.getValue()) {
                return "Passwords do not match";
            }
            return null;
        }
    )

    getFields(): Field<unknown>[] {
        return [
            this.recaptcha,
            this.password
        ] as Field<unknown>[];
    }
}


export default class OrgSignupForm extends SignupForm{

    name = new TextField();
    email = new EmailField();

    getFields(): Field<unknown>[] {
        return super.getFields().concat(
            [
                this.name,
                this.email,
            ] as Field<unknown>[]
        ); 
    }

}
