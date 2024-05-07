import Serializer from "@/common/serializers/serializer";
import AssetRequest from "../models/assetRequest";


export default class AssetRequestSerializer extends Serializer<AssetRequest, Array<unknown>> {


    serialize(instance: AssetRequest): unknown[] {
        return [
            instance.id, 
            instance.categoryId, 
            instance.note,
            instance.status,
            instance.userId,
            instance.departmentStatus
        ];
    }

    deserialize(data: unknown[]): AssetRequest {
        return new AssetRequest(
            data[0] as string,
            data[1] as string,
            data[2] as string,
            Number(data[3]) as number,
            Number(data[5]) as number,
            data[4] as string
        );
    }
}
