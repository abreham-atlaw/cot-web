import ViewModelView from "@/common/components/views/ViewModelView";
import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import { AsyncState } from "@/common/state/asyncState";
import { ReactNode } from "react";




export default class DashboardView extends ViewModelView<AsyncViewModel<AsyncState>, unknown, AsyncState>{
    
    onCreateViewModel(state: AsyncState): AsyncViewModel<AsyncState> {
        return new AsyncViewModel(state, this.setState.bind(this));
    }
    onCreateState(): AsyncState {
        return new AsyncState();
    }

    onCreateMain(): ReactNode {
        return (
            <div className="flex">
                <div className="m-auto">
                    Dashboard
                </div>
            </div>
        )
    }

}