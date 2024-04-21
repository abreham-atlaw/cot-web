import ViewModelView from "@/common/components/views/ViewModelView";
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
    }
    onCreateState(): AsyncState {
        return new AsyncState();
    }

    onCreateMain(): ReactNode {
        return (
            <div className="flex">
                <SideBar/>
                <Content>
                {this.props.children}
                </Content>
                  
                   
                  
                  
                    
              
            </div>
        )
    }


}