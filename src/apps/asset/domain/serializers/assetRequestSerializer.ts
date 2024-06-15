import Serializer from "@/common/serializers/serializer";
import AssetRequest from "../models/assetRequest";
import NullableSerializer from "@/common/serializers/nullSerializer";
import TimeStampSerializer from "@/common/serializers/timestampSerializer";


export default class AssetRequestSerializer extends Serializer<AssetRequest, Array<unknown>> {

    private nullSerializer = new NullableSerializer<string, string>();
    private timeStampSerializer = new TimeStampSerializer();

    serialize(instance: AssetRequest): unknown[] {
        return [
            instance.id, 
            instance.categoryId, 
            instance.note,
            instance.status,
            instance.userId,
            instance.departmentStatus,
            this.nullSerializer.serialize(instance.rejectionNote ?? null)
        ];
    }

    deserialize(data: unknown[]): AssetRequest {
        return new AssetRequest(
            data[0] as string,
            data[1] as string,
            data[2] as string,
            Number(data[3]) as number,
            Number(data[5]) as number,
            this.nullSerializer.deserialize(data[6] as string) ?? undefined,
            data[4] as string,
            this.timeStampSerializer.deserialize(Number(data[7]))
        );
    }
}
