import { Role } from "@/apps/auth/domain/models/profile";
import Department from "@/apps/core/domain/models/department";
import Field from "@/common/forms/fields";
import Form from "@/common/forms/form";


export default class UserForm extends Form{

    role = new Field<Role>();
    department = new Field<Department>(false);

    getFields(): Field<unknown>[] {
        return [
            this.role,
            this.department
        ] as Field<unknown>[];
    }

}