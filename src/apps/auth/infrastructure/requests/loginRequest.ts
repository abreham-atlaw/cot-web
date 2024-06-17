import Request from "../../../../common/network/Request";
import KeyPair from "../../domain/models/keyPair";
import LoginResponse from "../../domain/models/loginResponse";
import KeyPairSerializer from "../../domain/serializers/keyPairSerializer";
import SymmetricKeySerializer from "../../domain/serializers/symmetricKeySerializer";


export default class LoginRequest extends Request<LoginResponse>{

    private readonly serializer = new KeyPairSerializer();
    private readonly symmetricKeySerializer = new SymmetricKeySerializer();

    constructor(username: string, password: string){
        super({
            url: "/auth/login/",
            method: "POST",
            data: {
                "email": username,
                "password": password
            }
        });
    }


    deserializeResponse(response: any): LoginResponse {
        return {
            keyPair: this.serializer.deserialize(response["key_pair"]),
            contractKeys: this.symmetricKeySerializer.deserializeMany(response["contract_keys"])
        }
    }

}