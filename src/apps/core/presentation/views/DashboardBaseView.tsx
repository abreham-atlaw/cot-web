import ViewModelView from "@/common/components/views/ViewModelView";
<<<<<<< HEAD
import { AsyncState } from "@/common/state/asyncState";
import ViewModel from "@/common/viewmodel/viewmodel";
import SideBar from "../components/SideBar";
import Content from "../components/Content";
import { ReactNode } from "react";
interface DashboardBaseViewProps {
    children?: React.ReactNode;
  
}



export default class DashboardBaseView extends ViewModelView<ViewModel<AsyncState>, DashboardBaseViewProps, AsyncState>{
    onCreateViewModel(state: AsyncState): ViewModel<AsyncState> {
        return new ViewModel<AsyncState>(state, this.setState.bind(this));
=======
import { ReactNode } from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router-dom";
import DashboardBaseViewModel from "../../application/viewModels/dashboardBaseViewModel";
import DashboardBaseState from "../../application/states/dashboardBaseState";
import AuthenticatedComponent from "@/common/components/views/AuthenticatedComponent";
import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus";
import DashboardNavBar from "../components/TopBar";




export default class DashboardBaseView extends ViewModelView<DashboardBaseViewModel, unknown, DashboardBaseState>{
    
    onCreateViewModel(state: DashboardBaseState): DashboardBaseViewModel {
        return new DashboardBaseViewModel(state, this.setState.bind(this));
>>>>>>> 9eae48818fc4550ca61f2da16fc22e1c8ed0bc66
    }
    
    onCreateState(): DashboardBaseState {
        return new DashboardBaseState();
    }
    
    onCreateMain(): ReactNode {
        return (
<<<<<<< HEAD
            <div className="flex">
                <SideBar/>
                <Content>
                {this.props.children}
                </Content>
                  
                   
                  
                  
                    
              
            </div>
=======

            <AuthenticatedComponent validStatus={Object.values(AuthenticationStatus).filter(status => status !== AuthenticationStatus.none) as AuthenticationStatus[]}>

                <div className="flex">
                    <SideBar status={this.state.status!}/>
                    <div className="overflow-scroll h-screen w-full">
                        <DashboardNavBar user={this.state.user!}/>
                        <Outlet/>
                    </div>
                </div>

            </AuthenticatedComponent>
            
>>>>>>> 9eae48818fc4550ca61f2da16fc22e1c8ed0bc66
        )
    }


}