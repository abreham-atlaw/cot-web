import Serializer from "@/common/serializers/serializer";
import SymmetricKey from "../models/symmetricKey";


export default class SymmetricKeySerializer extends Serializer<SymmetricKey, Record<string, unknown>>{
    serialize(instance: SymmetricKey): Record<string, unknown> {
        throw new Error("Method not implemented.");
    }
    deserialize(data: Record<string, unknown>): SymmetricKey {
        return new SymmetricKey(data["key"] as string, data["contract"] as string);
    }
}