import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import contract from "@/assets/contactBuilds/asset/src_contracts_AssetCategory_sol_AssetCategory.json"
import AssetCategorySerializer from "../../domain/serializers/assetCategorySerializer";
import AssetCategory from "../../domain/models/assetCategory";
import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";


export default class AssetCategoryRepository extends EthersModelRepository<AssetCategory>{

    private authRepository = new AuthRepository();

    constructor(){
        super(
            contract.abi,
            contract.address,
            new AssetCategorySerializer()
        );
    }

    async preSave(instance: AssetCategory): Promise<void> {
       instance.orgId = await this.authRepository.getOrgId(); 
       instance.parentId = instance.parent?.id ?? instance.parentId;
    }

    async filterAll(instance: AssetCategory): Promise<boolean> {
        return (instance.orgId === (await this.authRepository.getOrgId()));
    }

    async attachForeignKeys(instance: AssetCategory): Promise<void> {
        if(instance.parentId != undefined){
            instance.parent = await this.getById(instance.parentId!);
        }
    }

}