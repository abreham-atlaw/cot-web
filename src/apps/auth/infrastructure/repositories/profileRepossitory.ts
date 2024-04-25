import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import Profile from "../../domain/models/profile";
import contract from "@/assets/contactBuilds/auth/src_contracts_Profile_sol_Profile.json"
import ProfileSerializer from "../../domain/serializers/profileSerializer";
import AuthRepository from "./authRepository";


export default class ProfileRepository extends EthersModelRepository<Profile>{

    private authRepository = new AuthRepository();

    constructor(){
        super(
            contract.abi,
            contract.address,
            new ProfileSerializer()
        )
    }

    async getByUserKey(key: string): Promise<Profile>{
        const response = await (await this.getReadContract()).getByUserKey(key);
        const instance = this.serializer.deserialize(response);
        await this.attachForeignKeys(instance);
        return instance;
    }

    async filterAll(instance: Profile): Promise<boolean> {
        const orgId = await this.authRepository.getOrgId();
        console.log(orgId);
        return instance.organizationId === orgId;
    }
}