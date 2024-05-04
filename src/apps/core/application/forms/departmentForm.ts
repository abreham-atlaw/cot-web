import Field, { TextField } from "@/common/forms/fields";
import Form from "@/common/forms/form";
import Profile from "@/apps/auth/domain/models/profile";


export default class DepartmentForm extends Form{

    name = new TextField();
    head = new Field<Profile>();

    getFields(): Field<unknown>[] {
        return [
            this.name,
            this.head
        ] as Field<unknown>[];
    }

}