import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import AssetRequest, { Status } from "../../domain/models/assetRequest";
import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import AssetCategoryRepository from "./assetCategoryRepository";
import contract from "@/assets/contactBuilds/asset/src_contracts_AssetRequest_sol_AssetRequest.json"
import AssetRequestSerializer from "../../domain/serializers/assetRequestSerializer";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import Profile, { Role } from "@/apps/auth/domain/models/profile";


export default class AssetRequestRepository extends EthersModelRepository<AssetRequest>{

    private authRepository = new AuthRepository();
    private categoryRepository = new AssetCategoryRepository();
    private profileRepository = new ProfileRepository();

    constructor(){
        super(
            contract.abi,
            contract.address,
            new AssetRequestSerializer()
        );
    }

    async preSave(instance: AssetRequest): Promise<void> {
       instance.categoryId = instance.category?.id ?? instance.categoryId;
       if(instance.userId === undefined){
        instance.user = await this.authRepository.whoAmI();
        instance.userId = instance.user.id!;
       }
    }

    async filterAll(instance: AssetRequest): Promise<boolean> {
        const me = await this.authRepository.whoAmI();
        return (
            (instance.category!.orgId === (await this.authRepository.getOrgId())) &&
            (
                (me.role === Role.department && instance.user!.departmentId === me.departmentId) ||
                ([Role.admin, Role.inventory].includes(me.role) && instance.departmentStatus === Status.approved) ||
                (instance.userId === me.id)
            )
        );
    }

    async attachForeignKeys(instance: AssetRequest): Promise<void> {
        instance.category = await this.categoryRepository.getById(instance.categoryId);
        instance.user = await this.profileRepository.getById(instance.userId!)
    }

    async filterByUser(user: Profile): Promise<AssetRequest[]>{
        return (await this.getAll()).filter(
            (request) => request.userId === user.id!
        );
    }

}