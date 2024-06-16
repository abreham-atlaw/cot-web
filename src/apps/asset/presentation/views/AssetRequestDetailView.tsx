import React from "react";
import RoutedModelDetailView from "@/apps/core/presentation/views/ModelDetailView";
import { Link } from "react-router-dom";
import ModelDetailState from "@/common/state/modelDetailState";
import AssetRequest, { Status } from "../../domain/models/assetRequest";
import ModelDetailViewModel from "@/common/viewmodel/modelDetailVIewModel";
import AssetRequestRepository from "../../infrastructure/repositories/assetRequestRepository";
import RepositoryProvider from "@/di/repositoryProviders";


export default class AssetRequestDetailView extends React.Component{
    
    onCreateViewModel = (state: ModelDetailState<AssetRequest>) => {
        return new ModelDetailViewModel<AssetRequest>(
            state, 
            RepositoryProvider.provide(AssetRequestRepository),
            this.setState.bind(this)
        );
    } 

    onCreateState = (id: string) => {
        return new ModelDetailState<AssetRequest>(id);
    }

    onCreateMain = (state: ModelDetailState<AssetRequest>) => {
        return (
            <div className="p-16">

                <div className="">
                    <h1 className="font-bold text-2xl flex">
                        <Link className="w-16 h-16 flex mr-5 hover:bg-light rounded-full" to="/base/asset-request/list">
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
                    <p className="mt-5">
                        <span className="font-bold">Department Status:</span> {Status[state.instance!.departmentStatus].toUpperCase()}
                    </p>
                    <p>
                        <span className="font-bold">Inventory Management Status:</span> {Status[state.instance!.status].toUpperCase()}
                    </p>
                    {
                        (state.instance!.rejectionNote) ?
                        <div className="my-5">
                            <span className="font-bold">Rejection Note:</span> <p className="border p-5 mt-5 bg-lightGrey">{state.instance!.rejectionNote}</p>
                        </div> :
                        <></>
                    }
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