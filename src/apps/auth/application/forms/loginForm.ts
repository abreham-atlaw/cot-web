import Field, { EmailField, TextField } from "@/common/forms/fields";
import Form from "@/common/forms/form";



export default class LoginForm extends Form{


    email = new EmailField();
    password = new TextField();

    getFields(): Field<any>[] {
        return [
            this.email,
            this.password
        ]
    }

}