import ViewModelView from "@/common/components/views/ViewModelView";
import LogoutViewModel from "../../application/viewModels/logoutViewModel";
import { AsyncState } from "@/common/state/asyncState";
import { ReactNode } from "react";
import { Navigate } from "react-router-dom";



export default class LogoutView extends ViewModelView<LogoutViewModel, unknown, AsyncState>{
    
    onCreateViewModel(state: AsyncState): LogoutViewModel {
        return new LogoutViewModel(state, this.setState.bind(this));
    }
    
    onCreateState(): AsyncState {
        return new AsyncState();
    }

    onCreateMain(): ReactNode {
        return (
            <Navigate to="/auth/login"/>
        )
    }



}