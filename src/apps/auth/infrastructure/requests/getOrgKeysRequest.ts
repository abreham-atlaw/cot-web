import Request from "@/common/network/Request";
import SymmetricKey from "../../domain/models/symmetricKey";
import SymmetricKeySerializer from "../../domain/serializers/symmetricKeySerializer";



export default class GetOrgKeysRequest extends Request<SymmetricKey[]>{

    private serializer = new SymmetricKeySerializer();

    constructor(orgId: string){
        super({
            url: '/auth/get-org-keys/',
            method: 'GET',
            params: {
                "organization_id": orgId
            }
        });
    }


    deserializeResponse(response: any): SymmetricKey[] {
        return this.serializer.deserializeMany(response);
    }


}