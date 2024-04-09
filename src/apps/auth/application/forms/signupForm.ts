import Field, { EmailField, TextField } from "@/common/forms/fields";
import Form from "@/common/forms/form";



export default class SignupForm extends Form{


    name = new TextField();
    email = new EmailField();
    password = new TextField(
        true,
        async (value: string | null) => {
            if(value!.length < 8){
                return "Password should be atleast 8 characters";
            }
            return null;
        }
    )

    getFields(): Field<any>[] {
        return [
            this.email,
            this.password
        ];
    }

}