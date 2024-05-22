import Field, { TextField } from "@/common/forms/fields";
import Form from "@/common/forms/form";
import AssetCategory from "../../domain/models/assetCategory";
import { Status } from "../../domain/models/assetRequest";


export default class AssetRequestForm extends Form{

    category = new Field<AssetCategory>();
    note = new TextField();
    status = new Field<Status>();
    rejectionNote = new TextField(
        false,
        async (value: string | null): Promise<(string|null)> => {
            if(this.status.getValue()! === Status.rejected && value === null){
                return "This value is required"
            }
            return null;
        }
    );

    getFields(): Field<unknown>[] {
        return [
            this.category,
            this.note,
            this.status,
            this.rejectionNote
        ] as Field<unknown>[];
    }

}