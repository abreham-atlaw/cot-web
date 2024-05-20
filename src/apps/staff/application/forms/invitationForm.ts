import { Role } from "@/apps/auth/domain/models/profile";
import Field, { EmailField, TextField } from "@/common/forms/fields";
import Form from "@/common/forms/form";



export default class InvitationForm extends Form{

    name = new TextField();
    email = new EmailField();
    role = new Field<Role>();

    getFields(): Field<unknown>[] {
        return [
            this.name,
            this.email,
            this.role
        ] as Field<unknown>[];
    }
}