import Field, { TextField } from "@/common/forms/fields";
import Form from "@/common/forms/form";



export default class AssetCategoryForm extends Form{

    name = new TextField();

    getFields(): Field<any>[] {
        return [
            this.name
        ];
    }
    
}