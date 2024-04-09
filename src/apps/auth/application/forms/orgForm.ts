import Field, { TextField } from "@/common/forms/fields";
import Form from "@/common/forms/form";



export default class OrgForm extends Form{

    name = new TextField();
    
    getFields(): Field<any>[] {
        return [
            this.name
        ];
    }
}