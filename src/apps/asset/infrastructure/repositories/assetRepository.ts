import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import contract from "@/assets/contactBuilds/asset/src_contracts_Asset_sol_Asset.json"
import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import Asset from "../../domain/models/asset";
import AssetSerializer from "../../domain/serializers/assetSerializer";
import AssetCategoryRepository from "./assetCategoryRepository";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import AssetCategory from "../../domain/models/assetCategory";
import Profile, { Role } from "@/apps/auth/domain/models/profile";
import AssetMaintenanceRequestRepository from "./assetMaintenanceRequestRepository";
import RepositoryProvider from "@/di/repositoryProviders";


export default class AssetRepository extends EthersModelRepository<Asset>{

    private authRepository = RepositoryProvider.provide(AuthRepository);
    private categoryRepository = RepositoryProvider.provide(AssetCategoryRepository)
    private profileRepository = RepositoryProvider.provide(ProfileRepository);

    public static readonly ADMIN_ROLES = [
        Role.admin, Role.inventory
    ];

    constructor(){
        super(
            contract.abi,
            contract.address,
            new AssetSerializer(),
            "asset"
        );
    }

    get assetMaintenanceRequestRepository(): AssetMaintenanceRequestRepository{
        return RepositoryProvider.provide(AssetMaintenanceRequestRepository);
    }

    async preSave(instance: Asset): Promise<void> {
       instance.orgId = await this.authRepository.getOrgId(); 
       instance.categoryId = instance.category?.id ?? instance.categoryId;
    }

    async filterAll(instance: Asset): Promise<boolean> {
        const me = (await this.authRepository.whoAmI());
        return (
            (instance.orgId === (await this.authRepository.getOrgId())) && 
            (AssetRepository.ADMIN_ROLES.includes(me.role) || instance.currentOwnerId === me.id)
        );
    }

    async attachForeignKeys(instance: Asset): Promise<void> {
        instance.category = await this.categoryRepository.getById(instance.categoryId);
        if(instance.currentOwnerId !== null){
            instance.currentOwner = await this.profileRepository.getById(instance.currentOwnerId!);
        }
    }

    async preDelete(instance: Asset): Promise<void> {
        for(const request of (await this.assetMaintenanceRequestRepository.filterByAsset(instance))){
            await this.assetMaintenanceRequestRepository.delete(request);
        }
    }

    async filterByCategory(category: AssetCategory): Promise<Asset[]>{
        return (await this.getAll()).filter(
            (asset: Asset) => asset.categoryId === category.id!
        );
    }

    async filterByCurrentOwner(owner: Profile): Promise<Asset[]>{
        return (await this.getAll()).filter(
            (asset: Asset) => asset.currentOwnerId === owner.id
        );
    }

    protected getEncryptedFields(): number[] {
        return [1]
    }



}