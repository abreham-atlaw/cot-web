import Request from "../../../../common/network/Request";
import KeyPair from "../../domain/models/keyPair";
import KeyPairSerializer from "../../domain/serializers/keyPairSerializer";


export default class LoginRequest extends Request<KeyPair>{

    private readonly serializer = new KeyPairSerializer();

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


    deserializeResponse(response: any): KeyPair {
        return this.serializer.deserialize(response);
    }

}