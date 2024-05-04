import React from "react";
import RoutedModelDetailView from "@/apps/core/presentation/views/ModelDetailView";
import { Role } from "@/apps/auth/domain/models/profile";
import { Link } from "react-router-dom";
import UserDetailState from "../../application/states/userDetailState";
import UserDetailViewModel from "../../application/viewModels/userDetailViewModel";
import ListAssetsView from "@/apps/asset/presentation/views/ListAssetsView";
import ListAssetRequestsView from "@/apps/asset/presentation/views/ListAssetRequestsView";


export default class UserDetailView extends React.Component{
    
    onCreateViewModel = (state: UserDetailState) => {
        return new UserDetailViewModel(state, this.setState.bind(this));
    } 

    onCreateState = (id: string) => {
        return new UserDetailState(id);
    }

    onCreateMain = (state: UserDetailState) => {
        return (
            <div className="p-16">

                <div className="">
                    <h1 className="font-bold text-2xl flex">
                        <Link className="w-16 h-16 flex mr-5 hover:bg-light rounded-full" to="/base/staff/list"><i className="fa-solid fa-chevron-left m-auto"></i></Link>
                        <span className="my-auto">{state.instance!.name}</span>
                    </h1>
                    <p className="mt-10">ID: {state.instance!.id!}</p>
                    <p>Role: {Role[state.instance!.role].toUpperCase()}</p>
                    <p>Properties: {state.assets!.length}</p>
                </div>
                <div className="mt-10">
                    
                    <ListAssetsView user={state.instance!} />

                </div>

                <div className="mt-10">
                    
                    <ListAssetRequestsView user={state.instance!} />

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