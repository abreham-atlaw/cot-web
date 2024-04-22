import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus";
import { Role } from "@/apps/auth/domain/models/profile";
import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import { AsyncState } from "@/common/state/asyncState";
import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import React from "react";
import ViewModelView from "./ViewModelView";
import RoutingUtils from "@/common/utils/routing";
import LoadingView from "./LoadingView";


class AuthenticatedComponentState extends AsyncState{

	authenticationStatus?: AuthenticationStatus;

}

class AuthenticatedComponentViewModel extends AsyncViewModel<AuthenticatedComponentState>{


	private repository: AuthRepository = new AuthRepository();


	public async onInit(){
		this.state.authenticationStatus = await this.repository.getAuthenticationStatus()
	}


}


interface AuthenticatedComponentProps{

	validStatus?: AuthenticationStatus[];
	allowedRoles?: Role[];
	redirectionMap?: Map<AuthenticationStatus, string>;
	redirectTo?: string;
	children: React.ReactNode[] | React.ReactNode

}


export default class AuthenticatedComponent extends ViewModelView<AuthenticatedComponentViewModel, AuthenticatedComponentProps, AuthenticatedComponentState>{
	
	private validStatus: AuthenticationStatus[];
	private redirectionMap: Map<AuthenticationStatus, string>;
	private redirectTo?: string;

	constructor(
		props: AuthenticatedComponentProps
	){
		super(props);
		this.validStatus = props.validStatus??[AuthenticationStatus.admin]
		this.redirectionMap = props.redirectionMap??(new Map());
		this.redirectTo = props.redirectTo;
		if(this.redirectTo === undefined){
			this.redirectTo = "/auth/login"
		}
	}

	
	onCreateViewModel(state: AuthenticatedComponentState): AuthenticatedComponentViewModel {
		return new AuthenticatedComponentViewModel(state, this.setState.bind(this));
	}
	onCreateState(): AuthenticatedComponentState {
		return new AuthenticatedComponentState();
	}

	private getRedirectLocation(status: AuthenticationStatus): string{
		let targetLocation = this.redirectionMap.get(status);
		if(targetLocation === undefined){
			if(this.redirectTo === undefined){
				throw new TargetPathNotFoundException();
			}
			targetLocation = this.redirectTo
		}
		return targetLocation;
	}


	onCreateMain(): React.ReactNode {
		const currentLocation = window.location;

		if(this.validStatus.includes(this.state.authenticationStatus!)){
			return this.props.children;
		}

		const futureRedirect = new URLSearchParams(currentLocation.search).get("redirect") ?? currentLocation.pathname
		const targetLocation = `${this.getRedirectLocation(this.state.authenticationStatus!)}?redirect=${futureRedirect}`;
		
		RoutingUtils.redirect(targetLocation);
		return <LoadingView/>
		
	}
	
}


class TargetPathNotFoundException extends Error{

}