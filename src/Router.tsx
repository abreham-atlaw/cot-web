import React from "react";
import { Route, Routes } from "react-router";
import SignupView, { RoutedSignupView } from "./apps/auth/presentation/views/SignupView";
import LoginView from "./apps/auth/presentation/views/LoginView";
import DashboardBaseView from "./apps/core/presentation/views/DashboardBaseView";
import ListUsersView from "./apps/staffManagement/presentation/views/ListUsersView";
import TestView from "./apps/test/presentation/views/TestView";
import ListAssetCategoriesView from "./apps/asset/presentation/views/ListAssetCategoriesView";
import CreateAssetCategoryView from "./apps/asset/presentation/views/CreateAssetCategoryView";
import Home from "./apps/core/presentation/views/Home";
import MainSecond from "./apps/core/presentation/views/MainSecond";


export default class CoTRouter extends React.Component{

	render(): React.ReactNode {

		return (
			<Routes>
				<Route path="/" element={<MainSecond child={<Home/>}></MainSecond>}/>
                <Route path="/auth/login" element={<LoginView/>}/>
                <Route path="/auth/signup/:invitationId" element={<RoutedSignupView/>}/>
                <Route path="/auth/signup/" element={<SignupView/>}/>
				
				{/* <Route path="/base/staff-management/register" element={<DashboardBaseView><RegisterUserView/></DashboardBaseView>}/> */}
				<Route path="/base/staff-management/list" element={<DashboardBaseView><ListUsersView/></DashboardBaseView>}/>
				<Route path="/base/asset-category/list" element={<DashboardBaseView><ListAssetCategoriesView/></DashboardBaseView>}/>
				<Route path="/base/asset-category/write" element={<DashboardBaseView><CreateAssetCategoryView/></DashboardBaseView>}/>
			</Routes>
		)
	}

}