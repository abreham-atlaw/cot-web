import React from "react";
import { Route, Routes } from "react-router";
import SignupView, { RoutedSignupView } from "./apps/auth/presentation/views/SignupView";
import LoginView from "./apps/auth/presentation/views/LoginView";
import DashboardBaseView from "./apps/core/presentation/views/DashboardBaseView";
import ListUsersView from "./apps/staffManagement/presentation/views/ListUsersView";
import ListAssetCategoriesView from "./apps/asset/presentation/views/ListAssetCategoriesView";
import MainSecond from "./apps/core/presentation/views/MainSecond";
import SplashScreen from "./apps/core/presentation/views/SplashScreen";
import DashboardView from "./apps/core/presentation/views/DashboardView";
import Home from "./apps/core/presentation/views/Home";
import ListAssetsView from "./apps/asset/presentation/views/ListAssetsView";
import ListInvitationsView from "./apps/staffManagement/presentation/views/ListInvitationsView";
import ListAssetRequestsView from "./apps/asset/presentation/views/ListAssetRequestsView";
import LogoutView from "./apps/auth/presentation/views/LogoutView";
import RegisterUserView from "./apps/staffManagement/presentation/views/RegisterUserView";
import TestView from "./apps/test/presentation/views/TestView";
import EditAssetCategoryView from "./apps/asset/presentation/views/EditAssetCategoryView";


export default class CoTRouter extends React.Component{

	render(): React.ReactNode {

		return (
			<Routes>
				<Route path="/" element={<MainSecond child={<Home/>}></MainSecond>}/>
				<Route path="/test" element={<TestView/>} />
                <Route path="/auth/login" element={<LoginView/>}/>
                <Route path="/auth/signup/:invitationId" element={<RoutedSignupView/>}/>
                <Route path="/auth/signup/" element={<SignupView/>}/>
				
				{/* <Route path="/base/staff-management/register" element={<DashboardBaseView><RegisterUserView/></DashboardBaseView>}/> */}
				<Route path="/base/staff-management/list" element={<DashboardBaseView><ListUsersView/></DashboardBaseView>}/>
				<Route path="/base/asset-category/list" element={<DashboardBaseView><ListAssetCategoriesView/></DashboardBaseView>}/>
				{/* <Route path="/base/asset-category/write" element={<DashboardBaseView><CreateAssetCategoryView/></DashboardBaseView>}/> */}
				<Route path="/" element={<SplashScreen/>}/>

				<Route path="/core/home" element={<Home/>}/>
                
				<Route path="/auth/login" element={<LoginView/>}/>
				<Route path="/auth/logout" element={<LogoutView/>}/>
                <Route path="/auth/signup/:invitationId" element={<RoutedSignupView/>}/>
                <Route path="/auth/signup/" element={<SignupView/>}/>
				
				<Route path="/base" element={<DashboardBaseView/>}>

					<Route path="dashboard" element={<DashboardView/>}/>
					
					<Route path="staffs/list" element={<ListUsersView/>}/>

					{/* <Route path="invitation/write" element={<RegisterUserView onCloseModal={function (): void {
						throw new Error("Function not implemented.");
					} }/>}/> */}
					<Route path="invitation/list" element={<ListInvitationsView/>}/>
					
					<Route path="category/list" element={<ListAssetCategoriesView/>}/>
					{/* <Route path="category/write" element={<EditAssetCategoryView/>}/> */}

					<Route path="asset/list" element={<ListAssetsView/>}/>
					{/* <Route path="asset/write" element={<CreateAssetView/>}/> */}

					<Route path="asset-request/list" element={<ListAssetRequestsView/>}/>
					{/* <Route path="asset-request/write" element={<EditAssetRequestView/>}/> */}

					<Route path="asset/list" element={<ListAssetsView/>}/>

					<Route path="asset-request/list" element={<ListAssetRequestsView/>}/>

				</Route>

			</Routes>
		)
	}

}