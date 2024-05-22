import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import AssetMaintenanceRequest from "../../domain/models/assetMaintenanceRequest";
import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import contract from "@/assets/contactBuilds/asset/src_contracts_AssetMaintenanceRequest_sol_AssetMaintenanceRequest.json"
import AssetMaintenanceRequestSerializer from "../../domain/serializers/assetMaintenanceSerializer";
import Profile, { Role } from "@/apps/auth/domain/models/profile";
import AssetRepository from "./assetRepository";
import Asset from "../../domain/models/asset";


export default class AssetMaintenanceRequestRepository extends EthersModelRepository<AssetMaintenanceRequest>{

    private authRepository = new AuthRepository();
    private assetRepository = new AssetRepository();
    private profileRepository = new ProfileRepository();

    public static readonly ADMIN_ROLES = [
        Role.admin,
        Role.maintainer
    ]

    constructor(){
        super(
            contract.abi,
            contract.address,
            new AssetMaintenanceRequestSerializer()
        );
    }

    async preSave(instance: AssetMaintenanceRequest): Promise<void> {
       instance.assetId = instance.asset?.id ?? instance.assetId;
       if(instance.userId === undefined){
        instance.user = await this.authRepository.whoAmI();
        instance.userId = instance.user.id!;
       }
    }

    async filterByAsset(asset: Asset): Promise<AssetMaintenanceRequest[]>{
        return (await this.getAll()).filter(
            (request) => request.assetId === asset.id
        )
    }
    
    async filterByUser(user: Profile): Promise<AssetMaintenanceRequest[]>{
        return (await this.getAll()).filter(
            (request) => request.userId === user.id!
        );
    }

    async filterAll(instance: AssetMaintenanceRequest): Promise<boolean> {
        const me = await this.authRepository.whoAmI();
        return (
            (instance.asset!.orgId === (await this.authRepository.getOrgId())) &&
            (
                (AssetMaintenanceRequestRepository.ADMIN_ROLES.includes(me.role)) || (instance.userId === me.id)
            )
        );
    }

    async attachForeignKeys(instance: AssetMaintenanceRequest): Promise<void> {
        instance.asset = await this.assetRepository.getById(instance.assetId);
        instance.user = await this.profileRepository.getById(instance.userId!)
    }



}