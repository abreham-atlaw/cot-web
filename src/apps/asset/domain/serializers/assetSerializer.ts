import Serializer from "@/common/serializers/serializer";
import Asset from "../models/asset";
import NullableSerializer from "@/common/serializers/nullSerializer";

export default class AssetSerializer extends Serializer<Asset, Array<unknown>> {

    private nullableStringSerializer = new NullableSerializer<string, string>();

    serialize(instance: Asset): unknown[] {
        return [
            instance.id, 
            instance.name, 
            instance.categoryId,
            this.nullableStringSerializer.serializeMany(instance.ownersId),
            instance.orgId
        ];
    }

    deserialize(data: unknown[]): Asset {
        return new Asset(
            data[0] as string,
            data[1] as string,
            data[2] as string,
            this.nullableStringSerializer.deserializeMany(data[3] as string[]),
            data[4] as string
        );
    }
}
