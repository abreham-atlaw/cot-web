import ViewModelView from "@/common/components/views/ViewModelView";
import { ReactNode } from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import DashboardBaseViewModel from "../../application/viewModels/dashboardBaseViewModel";
import DashboardBaseState from "../../application/states/dashboardBaseState";
import AuthenticatedComponent from "@/common/components/views/AuthenticatedComponent";
import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus";
import DashboardNavBar from "../components/TopBar";
import Content from "../components/Content";
import ListAssetCategoriesView from "@/apps/asset/presentation/views/ListAssetCategoriesView";
// import Content from "../components/Content";




export default class DashboardBaseView extends ViewModelView<DashboardBaseViewModel, unknown, DashboardBaseState>{
    
    onCreateViewModel(state: DashboardBaseState): DashboardBaseViewModel {
        return new DashboardBaseViewModel(state, this.setState.bind(this));
    }
    
    onCreateState(): DashboardBaseState {
        return new DashboardBaseState();
    }
    
    onCreateMain(): ReactNode {
        return (
          

            <AuthenticatedComponent validStatus={Object.values(AuthenticationStatus).filter(status => status !== AuthenticationStatus.none) as AuthenticationStatus[]}>

                <div className="flex">
                    <SideBar status={this.state.status!}/>
                    <Content>
                        <DashboardNavBar user={this.state.user!}/>
                        <div className="mt-24">
                        <Outlet/>
                        {/* <ListAssetCategoriesView/> */}
                        </div>  
                    </Content>
                </div>

            </AuthenticatedComponent>
            
        )
    }


}