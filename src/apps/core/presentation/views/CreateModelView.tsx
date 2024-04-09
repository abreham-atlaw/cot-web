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
import { Link } from "react-router-dom";


interface EditModelViewProps{
    id?: string;
}


export default abstract class EditModelView<M extends EtherModel, F extends Form> extends ViewModelView<EditModelViewModel<M, F>, EditModelViewProps, EditModelState<M, F>>{
    
    abstract getBackLink(): string;

    abstract onCreateFormComponent(form: F): ReactNode;

    abstract onCreateForm(): F;

    onCreateState(): EditModelState<M, F> {
        return new EditModelState<M, F>(this.onCreateForm(), this.props.id);
    }

    onCreateMain(): ReactNode {
        if(this.state.status === AsyncStatus.done){
            RoutingUtils.redirect(this.getBackLink());
        }
        return (
            <div className="h-screen w-full flex">
                <div className="m-auto w-1/2">

                    <h1 className="text-4xl mb-16">Register User</h1>

                    <p className="my-5 text-danger">{ this.state.error?.message ?? ""}</p>

                    {
                        this.onCreateFormComponent(this.state.form)
                    }

                    <div className="mt-10 flex">
                        <div className="mx-auto">
                            <Link to={this.getBackLink()}>
                                <BaseButton>
                                    CANCEL
                                </BaseButton>
                            </Link>
                        </div>
                        <div className="mx-auto" onClick={() => {this.viewModel.save()}}>
                            <AsyncButton  state={this.state}>
                                CREATE
                            </AsyncButton>
                        </div>
                    </div>
                </div>

            </div>
        )
    }

}