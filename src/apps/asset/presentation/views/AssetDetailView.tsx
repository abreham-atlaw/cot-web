import React from "react";
import AssetDetailState from "../../application/states/assetDetailState";
import AssetDetailViewModel from "../../application/viewModels/assetDetailViewModel";
import RoutedModelDetailView from "@/apps/core/presentation/views/ModelDetailView";
import { Role } from "@/apps/auth/domain/models/profile";
import OwnerTableComponent from "../components/OwnersTableComponent";
import { Link } from "react-router-dom";


export default class AssetDetailView extends React.Component{
    
    onCreateViewModel = (state: AssetDetailState) => {
        return new AssetDetailViewModel(state, this.setState.bind(this));
    } 

    onCreateState = (id: string) => {
        return new AssetDetailState(id);
    }

    onCreateMain = (state: AssetDetailState) => {
        return (
            <div className="p-16">

                <div className="">
                    <h1 className="font-bold text-2xl flex">
                        <Link className="w-16 h-16 flex mr-5 hover:bg-light rounded-full" to="/base/asset/list"><i className="fa-solid fa-chevron-left m-auto"></i></Link>
                        <span className="my-auto">{state.instance!.name}</span>
                    </h1>
                    <p className="mt-10">ID: {state.instance!.id!}</p>
                    <p>Status: {(state.instance!.isAllocated) ? "In Use" : "Unallocated"}</p>
                </div>
                {
                    (state.instance?.isAllocated)?
                    (
                        <div className="mt-10">
                            <h2 className="font-bold text-xl">Current Owner</h2>
                            <p className="mt-5">Name: {state.instance!.currentOwner!.name}</p>
                            <p>Department: {state.instance!.currentOwner!.department?.name ?? 'No Department'}</p>
                            <p>Role: {Role[state.instance!.currentOwner!.role].toUpperCase()}</p>
                        </div>
                    ):
                    (
                        <></>
                    )
                }

                <div className="mt-10">
                    
                    <OwnerTableComponent owners={state.owners!}/>

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