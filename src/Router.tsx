import React from "react";
import { Route, Routes } from "react-router";
import SignupView, { RoutedSignupView } from "./apps/auth/presentation/views/SignupView";
import LoginView from "./apps/auth/presentation/views/LoginView";
import DashboardBaseView from "./apps/core/presentation/views/DashboardBaseView";
import ListUsersView from "./apps/staff/presentation/views/ListUsersView";
import ListAssetCategoriesView from "./apps/asset/presentation/views/ListAssetCategoriesView";
import SplashScreen from "./apps/core/presentation/views/SplashScreen";
import DashboardView from "./apps/core/presentation/views/DashboardView";
import Home from "./apps/core/presentation/views/Home";
import ListAssetsView from "./apps/asset/presentation/views/ListAssetsView";
import ListInvitationsView from "./apps/staff/presentation/views/ListInvitationsView";
import ListAssetRequestsView from "./apps/asset/presentation/views/ListAssetRequestsView";
import LogoutView from "./apps/auth/presentation/views/LogoutView";
import RegisterUserView from "./apps/staff/presentation/views/RegisterUserView";
import ListDepartmentsView from "./apps/core/presentation/views/ListDepartmentView";
import AssetDetailView from "./apps/asset/presentation/views/AssetDetailView";
import UserDetailView from "./apps/staff/presentation/views/UserDetailView";
import ListAssetMaintenanceRequestsView from "./apps/asset/presentation/views/ListAssetMaintenanceRequestView";
import AssetCategoryDetailView from "./apps/asset/presentation/views/AssetCategoryDetailView";


export default class CoTRouter extends React.Component{

	render(): React.ReactNode {

		return (
			<Routes>
				<Route path="/" element={<SplashScreen/>}/>

				<Route path="/core/home" element={<Home/>}/>
                
				<Route path="/auth/login" element={<LoginView/>}/>
				<Route path="/auth/logout" element={<LogoutView/>}/>
                <Route path="/auth/signup/:invitationId" element={<RoutedSignupView/>}/>
                <Route path="/auth/signup/" element={<SignupView/>}/>
				
				<Route path="/base" element={<DashboardBaseView/>}>

					<Route path="dashboard" element={<DashboardView/>}/>
					
					<Route path="staff/list" element={<ListUsersView/>}/>
					<Route path="staff/detail" element={<UserDetailView/>}/>

					<Route path="invitation/write" element={<RegisterUserView onCloseModal={function (): void {
						throw new Error("Function not implemented.");
					} }/>}/>
					<Route path="invitation/list" element={<ListInvitationsView/>}/>
					
					<Route path="asset-category/list" element={<ListAssetCategoriesView/>}/>
					<Route path="asset-category/detail" element={<AssetCategoryDetailView/>}/>

					<Route path="asset/list" element={<ListAssetsView/>}/>
					<Route path="asset/detail" element={<AssetDetailView/>}/>

					<Route path="asset-request/list" element={<ListAssetRequestsView/>}/>

					<Route path="asset-maintenance-request/list" element={<ListAssetMaintenanceRequestsView/>}/>

					<Route path="department/list" element={<ListDepartmentsView/>}/>

				</Route>

			</Routes>
		)
	}

}