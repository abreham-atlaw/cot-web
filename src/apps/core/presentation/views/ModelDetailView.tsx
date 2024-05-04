import ViewModelView from "@/common/components/views/ViewModelView";
import EtherModel from "@/common/model/model";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import ModelDetailState from "@/common/state/modelDetailState";
import ModelDetailViewModel from "@/common/viewmodel/modelDetailVIewModel";
import { ReactNode } from "react";


interface ModelDetailViewProps<M extends EtherModel> {
    repository?: EthersModelRepository<M>;
    id: string;
    onCreateState?: (id: string) => ModelDetailState<M>;
    onCreateViewModel?: (state: ModelDetailState<M>) => ModelDetailViewModel<M>; 
    onCreateMain: (state: ModelDetailState<M>) => ReactNode;

}

export class ModelDetailView<M extends EtherModel> extends ViewModelView<ModelDetailViewModel<M>, ModelDetailViewProps<M>, ModelDetailState<M>>{

    onCreateViewModel(state: ModelDetailState<M>): ModelDetailViewModel<M> {

        if(this.props.onCreateViewModel !== undefined){
            return this.props.onCreateViewModel(state);
            
        }

        return new ModelDetailViewModel<M>(
            state, 
            this.props!.repository!,
            this.setState.bind(this),
        );
    }

    onCreateState(): ModelDetailState<M> {
        if(this.props.onCreateState !== undefined){
            return this.props.onCreateState!(this.props.id);
        }
        return new ModelDetailState<M>(this.props.id);
    }

    onCreateMain = (): ReactNode => {
        return this.props.onCreateMain(this.state);
    }

}



import { useLocation } from "react-router-dom";

function RoutedModelDetailView<M extends EtherModel>(props: Omit<ModelDetailViewProps<M>, 'id'>) {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');

    return <ModelDetailView {...props} id={id!} />;
}


export default RoutedModelDetailView;