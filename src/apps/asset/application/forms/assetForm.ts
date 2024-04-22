import Field, { TextField } from "@/common/forms/fields";
import Form from "@/common/forms/form";
import AssetCategory from "../../domain/models/assetCategory";
import Profile from "@/apps/auth/domain/models/profile";



export default class AssetForm extends Form{

    name = new TextField();
    category = new Field<AssetCategory>();
    owner = new Field<Profile>(false);
    quantity = new Field<number>();
   
    constructor(){
        super();
        this.quantity.value = 1;
    }
    getFields(): Field<unknown>[] {
        return [
            this.name, 
            this.category, 
            this.owner,
            this.quantity
        ] as Field<unknown>[];
    }


}