import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import Profile from "../../domain/models/profile";
import contract from "@/assets/contactBuilds/auth/src_contracts_profileContract_sol_Profile.json"
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
        const all = await this.getAll();
        return all.filter((profile) => profile.userKey === key)[0];
    }

    async filterByOrg(): Promise<Profile[]>{
        const orgId = (await this.authRepository.whoAmI()).organizationId!;
        return (await this.getAll()).filter((profile) => profile.organizationId === orgId);
    }
}