import ListModelView from "@/apps/core/presentation/views/ListModelView";
import AssetCategory from "../../domain/models/assetCategory";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import AssetCategoryRepository from "../../infrastructure/repositories/assetCategoryRepository";



export default class ListAssetCategoriesView extends ListModelView<AssetCategory>{
    
    onCreateRepository(): EthersModelRepository<AssetCategory> {
        return new AssetCategoryRepository();
    }

    getInstanceValues(instance: AssetCategory): string[] {
        return [instance.id!, instance.name];
    }

    getHeadings(): string[] {
        return ["ID", "Category Title"];
    }

    getAddInstanceLink(): string {
        return "/base/asset-category/create";
    }

    getEditInstanceLink(instance: AssetCategory): string {
        return `/base/asset-category/edit/${instance.id!}`;
    }
    
    onDelete(): void {
        throw new Error("Method not implemented.");
    }

}