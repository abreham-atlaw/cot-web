import Serializer from "@/common/serializers/serializer";
import AssetCategory from "../models/assetCategory";

export default class AssetCategorySerializer extends Serializer<AssetCategory, Array<unknown>> {
    serialize(instance: AssetCategory): unknown[] {
        return [instance.name, instance.id, instance.orgId];
    }

    deserialize(data: unknown[]): AssetCategory {
        return new AssetCategory(
            data[0] as string,
            data[1] as string,
            data[2] as string
        );
    }
}
