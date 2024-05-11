import React from "react";
import RoutedModelDetailView from "@/apps/core/presentation/views/ModelDetailView";
import ModelDetailState from "@/common/state/modelDetailState";
import AssetCategory from "../../domain/models/assetCategory";
import AssetCategoryRepository from "../../infrastructure/repositories/assetCategoryRepository";
import ModelDetailViewModel from "@/common/viewmodel/modelDetailVIewModel";
import ListAssetsView from "./ListAssetsView";


export default class AssetCategoryDetailView extends React.Component{
    
    onCreateViewModel = (state: ModelDetailState<AssetCategory>) => {
        return new ModelDetailViewModel<AssetCategory>(state, new AssetCategoryRepository(), this.setState.bind(this));
    } 

    onCreateState = (id: string) => {
        return new ModelDetailState(id);
    }

    onCreateMain = (state: ModelDetailState<AssetCategory>) => {
        return (
            <ListAssetsView category={state.instance!}/>
        )
    }

    render(): React.ReactNode {
        return <RoutedModelDetailView
            onCreateMain={this.onCreateMain}
            onCreateViewModel={this.onCreateViewModel}
            />
    }

}