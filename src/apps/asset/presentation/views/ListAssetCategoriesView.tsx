import ListModelView from "@/apps/core/presentation/views/ListModelView";
import AssetCategory from "../../domain/models/assetCategory";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import AssetCategoryRepository from "../../infrastructure/repositories/assetCategoryRepository";
import ModelListState from "@/common/state/modelListState";
import ListAssetCategoriesState from "../../application/states/listAssetCategoriesState";
import ModelListViewModel from "@/common/viewmodel/modelListViewModel";
import ListAssetCategoriesViewModel from "../../application/viewModels/listAssetCategoriesViewModel";
import EditAssetCategoryView from "./EditAssetCategoryView";



export default class ListAssetCategoriesView extends ListModelView<AssetCategory>{

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getDetailLink(instance: AssetCategory): string {
        throw Error("Unimplemtend");
    }
    
    getModalChild(modalClose: () => void, instance?: AssetCategory) {
        return <EditAssetCategoryView closeModal={modalClose} id={instance?.id}/>
    }
    
    onCreateRepository(): EthersModelRepository<AssetCategory> {
        return new AssetCategoryRepository();
    }

    getInstanceValues(instance: AssetCategory): string[] {
        const count = (this.state as ListAssetCategoriesState).counts!.get(instance)!;
        return [
            instance.id!.split("-")[0], 
            instance.name, 
            instance.parent?.name ?? "", 
            count.allocated.toString(),
            count.unallocated.toString(),
            count.total.toString(),
        ];
    }

    getHeadings(): string[] {
        return [
            "ID", 
            "Category Title",
            "Parent Category", 
            "Allocated", 
            "Unallocated", 
            "Total"
        ];
    }

    getAddInstanceLink(): string {
        return "/base/asset-category/write";
    }

    getEditInstanceLink(instance: AssetCategory): string {
        return `/base/asset-category/write?id=${instance.id!}`;
    }
    
    onDelete(): void {
        throw new Error("Method not implemented.");
    }

    getTitle(): string {
        return "Asset Categories"
    }

    onCreateState(): ModelListState<AssetCategory> {
        return new ListAssetCategoriesState();
    }

    onCreateViewModel(state: ModelListState<AssetCategory>): ModelListViewModel<AssetCategory> {
        return new ListAssetCategoriesViewModel(
            state,
            this.setState.bind(this)
        )
    }

}