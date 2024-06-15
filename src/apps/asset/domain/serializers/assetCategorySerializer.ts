import Serializer from "@/common/serializers/serializer";
import AssetCategory from "../models/assetCategory";
import NullableSerializer from "@/common/serializers/nullSerializer";
import TimeStampSerializer from "@/common/serializers/timestampSerializer";

export default class AssetCategorySerializer extends Serializer<AssetCategory, Array<unknown>> {
    
    private parentSerializer = new NullableSerializer<string, string>();
    private timeStampSerializer = new TimeStampSerializer();
   
    serialize(instance: AssetCategory): unknown[] {
        return [
            instance.id,
            instance.name,
            instance.orgId, 
            this.parentSerializer.serialize(instance.parentId ?? null)
        ];
    }

    deserialize(data: unknown[]): AssetCategory {
        return new AssetCategory(
            data[0] as string,
            data[1] as string,
            data[2] as string,
            this.parentSerializer.deserialize(data[3] as string) ?? undefined,
            this.timeStampSerializer.deserialize(Number(data[4]))
        );
    }
}
