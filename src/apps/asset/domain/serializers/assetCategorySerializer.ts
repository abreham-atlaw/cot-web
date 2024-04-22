import Serializer from "@/common/serializers/serializer";
import AssetCategory from "../models/assetCategory";
import NullableSerializer from "@/common/serializers/nullSerializer";

export default class AssetCategorySerializer extends Serializer<AssetCategory, Array<unknown>> {
    
    private parentSerializer = new NullableSerializer<string, string>();
   
    serialize(instance: AssetCategory): unknown[] {
        return [
            instance.name,
            instance.id,
            instance.orgId, 
            this.parentSerializer.serialize(instance.parentId ?? null)
        ];
    }

    deserialize(data: unknown[]): AssetCategory {
        return new AssetCategory(
            data[0] as string,
            data[1] as string,
            data[2] as string,
            this.parentSerializer.deserialize(data[3] as string) ?? undefined
        );
    }
}
