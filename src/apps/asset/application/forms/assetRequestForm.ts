import Field, { TextField } from "@/common/forms/fields";
import Form from "@/common/forms/form";
import AssetCategory from "../../domain/models/assetCategory";
import { Status } from "../../domain/models/assetRequest";


export default class AssetRequestForm extends Form{

    category = new Field<AssetCategory>();
    note = new TextField();
    status = new Field<Status>();

    getFields(): Field<unknown>[] {
        return [
            this.category,
            this.note,
            this.status
        ] as Field<unknown>[];
    }

}