import Serializer from "../../../../common/serializers/serializer"
import KeyPair from "../models/keyPair";



export default class KeyPairSerializer extends Serializer<KeyPair, Record<string, string>>{
    
    serialize(): Record<string, string> {
        throw new Error("Method not implemented.");
    }

    deserialize(data: Record<string, string>): KeyPair {
        return {
            publicKey: data["public"],
            privateKey: data["private"]
        }
    }

}