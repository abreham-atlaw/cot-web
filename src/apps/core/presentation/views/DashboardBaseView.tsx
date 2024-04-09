import ViewModelView from "@/common/components/views/ViewModelView";
import { AsyncState } from "@/common/state/asyncState";
import ViewModel from "@/common/viewmodel/viewmodel";
import { ReactNode } from "react";
import SideBar from "../components/SideBar";




export default class DashboardBaseView extends ViewModelView<ViewModel<AsyncState>, unknown, AsyncState>{
    onCreateViewModel(state: AsyncState): ViewModel<AsyncState> {
        return new ViewModel<AsyncState>(state, this.setState.bind(this));
    }
    onCreateState(): AsyncState {
        return new AsyncState();
    }

    onCreateMain(): ReactNode {
        return (
            <div className="flex">
                <SideBar/>
                <div className="overflow-scroll h-screen w-full">
                    {this.props.children}
                </div>
            </div>
        )
    }


}