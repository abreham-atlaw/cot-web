import ViewModelView from "@/common/components/views/ViewModelView";
import { ReactNode } from "react";
import DashBoard from "@/apps/admin/presentation/views/Dashboard";
import DashboardBaseState from "../../application/states/dashboardBaseState";
// import BaseState from "@/common/state/baseState";
import DashboardBaseViewModel from "../../application/viewModels/dashboardBaseViewModel";




export default class DashboardView extends ViewModelView<DashboardBaseViewModel, unknown, DashboardBaseState>{
    
    onCreateViewModel(state: DashboardBaseState): DashboardBaseViewModel {
        return new DashboardBaseViewModel(state, this.setState.bind(this));
    }
    onCreateState(): DashboardBaseState {
        return new DashboardBaseState();
    }

    onCreateMain(): ReactNode {
        return (
            <div className="flex">
                <div className="mr-[20%]">
                    <DashBoard state={this.state}/>
                </div>
            </div>
        )
    }

}
