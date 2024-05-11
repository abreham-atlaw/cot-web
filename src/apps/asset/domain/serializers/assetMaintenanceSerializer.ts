import Serializer from "@/common/serializers/serializer";
import AssetMaintenanceRequest from "../models/assetMaintenanceRequest";

export default class AssetMaintenanceRequestSerializer extends Serializer<AssetMaintenanceRequest, Array<unknown>> {

    serialize(instance: AssetMaintenanceRequest): unknown[] {
        return [
            instance.id, 
            instance.assetId, 
            instance.note,
            instance.status,
            instance.userId
        ];
    }

    deserialize(data: unknown[]): AssetMaintenanceRequest {
        return new AssetMaintenanceRequest(
            data[0] as string,
            data[1] as string,
            data[2] as string,
            Number(data[3]) as number,
            data[4] as string
        );
    }
}
