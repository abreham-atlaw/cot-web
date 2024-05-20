import Request from "../../../../common/network/Request";
import KeyPair from "../../domain/models/keyPair";
import KeyPairSerializer from "../../domain/serializers/keyPairSerializer";


export default class SignupRequest extends Request<KeyPair>{

    private readonly serializer = new KeyPairSerializer();

    constructor(username: string | null, invitation: string | null, password: string){
        super({
            url: "/auth/signup/",
            method: "POST",
            data: {
                "email": username ?? null,
                "invitation": invitation ?? null,
                "password": password
            }
        });
    }


    deserializeResponse(response: any): KeyPair {
        return this.serializer.deserialize(response);
    }

}