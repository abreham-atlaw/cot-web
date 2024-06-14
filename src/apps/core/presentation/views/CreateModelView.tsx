import AsyncButton from "@/common/components/buttons/AsyncButton";
import BaseButton from "@/common/components/buttons/BaseButton";
import ViewModelView from "@/common/components/views/ViewModelView";
import Form from "@/common/forms/form";
import EtherModel from "@/common/model/model";
import { AsyncStatus } from "@/common/state/asyncState";
import EditModelState from "@/common/state/editModelState";
import EditModelViewModel from "@/common/viewmodel/editModelViewModel";
import { ReactNode } from "react";
import { MdClose } from "react-icons/md";



interface EditModelViewProps<M extends EtherModel, F extends Form> {
    getTitle?: () => string;
    onCreateFormComponent?: (form: F, state: EditModelState<M, F>) => ReactNode;
    onCreateForm?: () => F;
    onCreateViewModel?: (state: EditModelState<M, F>) =>  EditModelViewModel<M, F>;
    id?: string;
    closeModal?: ()=> void;
    close?:()=>void;
}

export class EditModelView<M extends EtherModel, F extends Form> extends ViewModelView<EditModelViewModel<M, F>, EditModelViewProps<M, F>, EditModelState<M, F>>{
    
    onCreateViewModel(state: EditModelState<M, F>): EditModelViewModel<M, F> {
        return this.props.onCreateViewModel!(state);
    }

    onCreateState(): EditModelState<M, F> {
        return new EditModelState<M, F>(this.onCreateForm!(), this.props.id ?? undefined);
    }

    onCreateForm(): F{
        return this.props.onCreateForm!();
    }

    getTitle(): string{
        return this.props.getTitle!();
    }

    onCreateFormComponent(form: F, state: EditModelState<M, F>): ReactNode{
        return this.props.onCreateFormComponent!(form, state);
    }

    handleSave = async () => {
        await this.viewModel.save();
        setTimeout(
            () => {
                if(this.state.status === AsyncStatus.done){
                    this.onDestroy();
                }
            },
            2
        )
        
    }

    onCreateMain = (): ReactNode => {
        return (
            <div className="p-8">
            <div className="flex justify-end">
                <MdClose onClick={()=>{
                
                    this.onClose()

                    }} className="cursor-pointer" size={30}/>
                </div>
            <div className="mt-8 p-8 w-full  flex">
                
               
                <div className="m-auto w-full">
                
                    <h1 className="text-4xl mb-16 text-center">{this.getTitle()}</h1>
                    
                    <p className="my-5 text-danger">{ this.state.error?.message ?? ""}</p>

                    {
                        this.onCreateFormComponent!(this.state.form, this.state)
                    }

                    <div className="mt-10 flex gap-4">
                        <div className="mx-auto">
                          
                                <BaseButton onClick={
                                    this.onClose}>
                                    CANCEL
                                </BaseButton>
                           
                        </div>
                        <div className="mx-auto" onClick={this.handleSave}>
                            <AsyncButton  state={this.state}>
                                {(this.state.id == undefined) ? 'CREATE' : 'SAVE'}
                            </AsyncButton>
                        </div>
                    </div>
                </div>

            </div>
            </div>
        )
    }

    onDestroy = () => {
        if (this.state.status !== AsyncStatus.loading) {
            return this.props.closeModal!();
        }
        
    }
    onClose = ()=>{
        return this.props.close();
    }

}



import { useLocation } from "react-router-dom";

function RoutedEditModelView<M extends EtherModel, F extends Form>(props: Omit<EditModelViewProps<M, F>, 'id'>) {
    const location = useLocation();
    const id = new URLSearchParams(location.search).get('id');

    return <EditModelView {...props} id={id??undefined} />;
}


export default RoutedEditModelView;