import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import contract from "@/assets/contactBuilds/asset/src_contracts_AssetCategory_sol_AssetCategory.json"
import AssetCategorySerializer from "../../domain/serializers/assetCategorySerializer";
import AssetCategory from "../../domain/models/assetCategory";
import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import AssetRepository from "./assetRepository";
import RepositoryProvider from "@/di/repositoryProviders";


export interface CategoryCount{
    allocated: number;
    unallocated: number;
    total: number;
}

export default class AssetCategoryRepository extends EthersModelRepository<AssetCategory>{

    private authRepository = RepositoryProvider.provide(AuthRepository);

    constructor(){
        super(
            contract.abi,
            contract.address,
            new AssetCategorySerializer()
        );
    }

    get assetRepository(): AssetRepository{
        return RepositoryProvider.provide(AssetRepository);
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

    async preDelete(instance: AssetCategory): Promise<void> {
        for(const asset of (await this.assetRepository.filterByCategory(instance))){
            console.log("Deleting", asset.name);
            await this.assetRepository.delete(asset);
        }
    }

    async getCategoryCount(givenCategories?: AssetCategory[]): Promise<Map<AssetCategory, CategoryCount>> {
        let categories: AssetCategory[];
        if (givenCategories === undefined) {
            categories = await this.getAll();
        } else {
            categories = givenCategories;
        }
    
        const countsPromises = categories.map(async (category) => {
            const assets = await this.assetRepository.filterByCategory(category);
            return [
                category,
                {
                    allocated: assets.filter((asset) => asset.currentOwnerId != null).length,
                    unallocated: assets.filter((asset) => asset.currentOwnerId == null).length,
                    total: assets.length
                }
            ];
        });
    
        const countsEntries = await Promise.all(countsPromises);
        const counts = new Map<AssetCategory, CategoryCount>(countsEntries as unknown as [AssetCategory, CategoryCount][]);
    
        return counts;
    }



}