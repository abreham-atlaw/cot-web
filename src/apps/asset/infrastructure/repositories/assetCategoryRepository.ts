import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import contract from "@/assets/contactBuilds/asset/src_contracts_assetCategoryContract_sol_AssetCategoryContract.json"
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
    }

    async filterAll(instance: AssetCategory): Promise<boolean> {
        return (instance.orgId === (await this.authRepository.getOrgId()));
    }

}