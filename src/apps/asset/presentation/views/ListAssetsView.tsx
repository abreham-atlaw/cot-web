import ListModelView from "@/apps/core/presentation/views/ListModelView";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import AssetRepository from "../../infrastructure/repositories/assetRepository";
import Asset from "../../domain/models/asset";
import { ReactNode } from "react";
import EditAssetView from "./EditAssetView";
import Profile from "@/apps/auth/domain/models/profile";
import ModelListState from "@/common/state/modelListState";
import ModelListViewModel from "@/common/viewmodel/modelListViewModel";
import ListAssetsViewModel from "../../application/viewModels/listAssetViewModel";
import PermissionConfigs, { Pages } from "@/configs/permissionConfigs";
import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus";
import AssetCategory from "../../domain/models/assetCategory";


interface ListAssetViewProps{
    user?: Profile,
    category?: AssetCategory
}


export default class ListAssetsView extends ListModelView<Asset, ListAssetViewProps>{

    getModalChild(modalClose: () => void, instance?: Asset, close?:()=>void):ReactNode {
        return <EditAssetView closeModal={modalClose} id={instance?.id} close={close}/>
    }
    
    onCreateRepository(): EthersModelRepository<Asset> {
        return new AssetRepository();
    }

    onCreateViewModel(state: ModelListState<Asset>): ModelListViewModel<Asset> {
        return new ListAssetsViewModel(state, this.setState.bind(this));
    }

    getInstanceValues(instance: Asset): string[] {
        return [instance.id!.split("-")[0], instance.name, instance.category!.name, instance.currentOwner?.name ?? "No Owner", instance.createDateTime.toLocaleDateString()];
    }

    getDetailLink(instance: Asset): string {
        return `/base/asset/detail?id=${instance.id}`;
    }

    getHeadings(): string[] {
        return ["ID", "Name", "Category", "Owner", "Registered On"];
    }

    getAddInstanceLink(): string {
        return "/base/asset/write";
    }

    getEditInstanceLink(instance: Asset): string {
        return `/base/asset/write?id=${instance.id!}`;
    }
    

    getTitle(): string {
        if(this.props.category === undefined){
            return "Assets"
        }
        return `Assets(${this.props.category.name})`;
    }

    getInitFilters(props: ListAssetViewProps): Map<string, unknown> {
        return new Map<string, unknown>([
            ["user", props.user],
            ["category", props.category]
        ])
    }

    allowDelete(_instance: Asset, me: Profile): boolean {
        return AssetRepository.ADMIN_ROLES.includes(me.role);
    }

    allowEdit(_instance: Asset, me: Profile): boolean {
        return AssetRepository.ADMIN_ROLES.includes(me.role);
    }

    allowAdd(me: Profile): boolean {
        return (
            (AssetRepository.ADMIN_ROLES.includes(me.role))
        )
    }

    getAllowedAuthenticationStatus(): AuthenticationStatus[] {
        return PermissionConfigs.VISIT_PERMISSIONS.get(Pages.asset)!;
    }

}