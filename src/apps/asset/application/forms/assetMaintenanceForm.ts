import Field, { TextField } from "@/common/forms/fields";
import Form from "@/common/forms/form";
import { Status } from "../../domain/models/assetRequest";
import Asset from "../../domain/models/asset";


export default class AssetMaintenanceRequestForm extends Form{

    asset = new Field<Asset>();
    note = new TextField();
    status = new Field<Status>();
    image = new Field<File>();

    isResoloveMode: boolean;

    constructor(isResolveModel: boolean){
        super();
        this.isResoloveMode = isResolveModel;
    }

    getFields(): Field<unknown>[] {
        if(this.isResoloveMode){
            return [
                this.status
            ] as Field<unknown>[];
        }
        return [
            this.asset,
            this.note,
            this.image
        ] as Field<unknown>[];
    }

}