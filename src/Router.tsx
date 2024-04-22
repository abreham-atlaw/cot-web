import React from "react";
import { Route, Routes } from "react-router";
import SignupView, { RoutedSignupView } from "./apps/auth/presentation/views/SignupView";
import LoginView from "./apps/auth/presentation/views/LoginView";
import RegisterUserView from "./apps/staffManagement/presentation/views/RegisterUserView";
import DashboardBaseView from "./apps/core/presentation/views/DashboardBaseView";
import ListUsersView from "./apps/staffManagement/presentation/views/ListUsersView";
import ListAssetCategoriesView from "./apps/asset/presentation/views/ListAssetCategoriesView";
import CreateAssetCategoryView from "./apps/asset/presentation/views/EditAssetCategoryView";
import SplashScreen from "./apps/core/presentation/views/SplashScreen";
import DashboardView from "./apps/core/presentation/views/DashboardView";
import Home from "./apps/core/presentation/views/Home";
import CreateAssetView from "./apps/asset/presentation/views/EditAssetView";
import ListAssetsView from "./apps/asset/presentation/views/ListAssetsView";
import ListInvitationsView from "./apps/staffManagement/presentation/views/ListInvitationsView";
import EditAssetRequestView from "./apps/asset/presentation/views/EditAssetRequestView";
import ListAssetRequestsView from "./apps/asset/presentation/views/ListAssetRequestsView";
import LogoutView from "./apps/auth/presentation/views/LogoutView";


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
					
					<Route path="staff-management/list" element={<ListUsersView/>}/>

					<Route path="invitation/write" element={<RegisterUserView/>}/>
					<Route path="invitation/list" element={<ListInvitationsView/>}/>
					
					<Route path="asset-category/list" element={<ListAssetCategoriesView/>}/>
					<Route path="asset-category/write" element={<CreateAssetCategoryView/>}/>

					<Route path="asset/list" element={<ListAssetsView/>}/>
					<Route path="asset/write" element={<CreateAssetView/>}/>

					<Route path="asset-request/list" element={<ListAssetRequestsView/>}/>
					<Route path="asset-request/write" element={<EditAssetRequestView/>}/>

				</Route>

			</Routes>
		)
	}

}