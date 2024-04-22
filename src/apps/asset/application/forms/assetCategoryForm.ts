import Field, { TextField } from "@/common/forms/fields";
import Form from "@/common/forms/form";
import AssetCategory from "../../domain/models/assetCategory";



export default class AssetCategoryForm extends Form{

    name = new TextField();
    parent = new Field<AssetCategory>(false);
    
   

    getFields(): Field<unknown>[] {
        return [
            this.name,
            this.parent,
        ] as Field<unknown>[];
    }
    
}