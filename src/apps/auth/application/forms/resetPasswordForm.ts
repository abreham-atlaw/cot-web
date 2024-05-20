import Field, { TextField } from "@/common/forms/fields";
import Form from "@/common/forms/form";


export default class ResetPasswordForm extends Form{

    password = new TextField(true, async (value: string | null) => {
        if(value!.length < 8){
            return "Password should be at least 8 characters long";
        } 
        return null;
    })

    getFields(): Field<unknown>[] {
        return [
            this.password
        ] as Field<unknown>[];
    }

}