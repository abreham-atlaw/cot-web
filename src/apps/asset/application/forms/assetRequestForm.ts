import Field, { TextField } from "@/common/forms/fields";
import Form from "@/common/forms/form";
import AssetCategory from "../../domain/models/assetCategory";


export default class AssetRequestForm extends Form{

    category = new Field<AssetCategory>();
    note = new TextField();

    getFields(): Field<unknown>[] {
        return [
            this.category,
            this.note
        ] as Field<unknown>[];
    }

}