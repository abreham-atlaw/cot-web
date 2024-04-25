import AsyncButton from "@/common/components/buttons/AsyncButton";
import BaseButton from "@/common/components/buttons/BaseButton";
import ViewModelView from "@/common/components/views/ViewModelView";
import Form from "@/common/forms/form";
import EtherModel from "@/common/model/model";
import { AsyncStatus } from "@/common/state/asyncState";
import EditModelState from "@/common/state/editModelState";
import RoutingUtils from "@/common/utils/routing";
import EditModelViewModel from "@/common/viewmodel/editModelViewModel";
import { ReactNode } from "react";


interface EditModelViewProps<M extends EtherModel, F extends Form> {
    getBackLink: () => string;
    getTitle: () => string;
    onCreateFormComponent: (form: F, state: EditModelState<M, F>) => ReactNode;
    onCreateForm: () => F;
    onCreateViewModel: (state: EditModelState<M, F>) =>  EditModelViewModel<M, F>;
    id?: string;
    closeModal: ()=> void;
}

export class EditModelInnerView<M extends EtherModel, F extends Form> extends ViewModelView<EditModelViewModel<M, F>, EditModelViewProps<M, F>, EditModelState<M, F>>{
    
    onCreateViewModel(state: EditModelState<M, F>): EditModelViewModel<M, F> {
        return this.props.onCreateViewModel(state);
    }

    onCreateState(): EditModelState<M, F> {
        return new EditModelState<M, F>(this.props.onCreateForm(), this.props.id ?? undefined);
    }

    onCreateMain(): ReactNode {
        if(this.state.status === AsyncStatus.done){
            RoutingUtils.redirect(this.props.getBackLink());
        }
        return (
            <div className=" w-full flex">
                <div className="m-auto w-full">

                    <h1 className="text-4xl mb-16 text-center">{this.props.getTitle()}</h1>

                    <p className="my-5 text-danger">{ this.state.error?.message ?? ""}</p>

                    {
                        this.props.onCreateFormComponent(this.state.form, this.state)
                    }

                    <div className="mt-10 flex gap-4">
                        <div className="mx-auto">
                          
                                <BaseButton onClick={this.props.closeModal}>
                                    CANCEL
                                </BaseButton>
                           
                        </div>
                        <div className="mx-auto" onClick={() => {this.viewModel.save()}}>
                            <AsyncButton  state={this.state}>
                                {(this.state.isCreateMode) ? 'CREATE' : 'SAVE'}
                            </AsyncButton>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}



import { useLocation } from "react-router-dom";

function EditModelView<M extends EtherModel, F extends Form>(props: Omit<EditModelViewProps<M, F>, 'id'>) {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');

    return <EditModelInnerView {...props} id={id??undefined} />;
}


export default EditModelView;