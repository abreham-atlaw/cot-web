import Field, { EmailField } from "@/common/forms/fields";
import Form from "@/common/forms/form";



export default class RequestPasswordResetForm extends Form{

    email = new EmailField();

    getFields(): Field<unknown>[] {
        return [
            this.email
        ] as Field<unknown>[];
    }

}