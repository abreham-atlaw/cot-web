import ModelDetailState from "@/common/state/modelDetailState";
import ModelDetailViewModel from "@/common/viewmodel/modelDetailVIewModel";
import AssetMaintenanceRequest from "../../domain/models/assetMaintenanceRequest";
import AssetMaintenanceRequestRepository from "../../infrastructure/repositories/assetMaintenanceRequestRepository";
import RoutedModelDetailView from "@/apps/core/presentation/views/ModelDetailView";
import { Status } from "../../domain/models/assetRequest";
import { Link } from "react-router-dom";
import React from "react";
import RepositoryProvider from "@/di/repositoryProviders";


export default class AssetMaintenanceRequestDetailView extends React.Component{
    
    onCreateViewModel = (state: ModelDetailState<AssetMaintenanceRequest>) => {
        return new ModelDetailViewModel<AssetMaintenanceRequest>(
            state, 
            RepositoryProvider.provide(AssetMaintenanceRequestRepository),
            this.setState.bind(this)
        );
    } 

    onCreateState = (id: string) => {
        return new ModelDetailState<AssetMaintenanceRequest>(id);
    }

    onCreateMain = (state: ModelDetailState<AssetMaintenanceRequest>) => {
        return (
            <div className="p-16">

                <div className="">
                    <h1 className="font-bold text-2xl flex">
                        <Link className="w-16 h-16 flex mr-5 hover:bg-light rounded-full" to="/base/asset-maintenance-request/list">
                            <i className="fa-solid fa-chevron-left m-auto"></i>
                        </Link>
                        <span className="my-auto">
                            <span className="font-bold">ID:</span> {state.instance!.id!}
                        </span>
                    </h1>
                    <p className="mt-5">
                        <span className="font-bold">Requested By:</span> {state.instance!.user!.name}({state.instance!.user!.email})
                    </p>
                    <div className="my-5">
                        <span className="font-bold">Request Note:</span> <p className="border p-5 mt-5 bg-lightGrey">{state.instance!.note}</p>
                    </div>
                    <p>
                        <span className="font-bold">Inventory Management Status:</span> {Status[state.instance!.status].toUpperCase()}
                    </p>


                    <div className="w-full md:w-2/3 mt-10">
                        <span className="font-bold block">Image:</span>
                        <img src={state.instance!.image} className="w-full mt-5 border border-3"/>
                    </div>
                </div>

            </div>
        )
    }

    render(): React.ReactNode {
        return <RoutedModelDetailView
            onCreateMain={this.onCreateMain}
            onCreateState={this.onCreateState}
            onCreateViewModel={this.onCreateViewModel}
            />
    }

}