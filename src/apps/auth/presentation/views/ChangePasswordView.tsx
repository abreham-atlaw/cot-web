import ViewModelView from "@/common/components/views/ViewModelView";
import ChangePasswordViewModel from "../../application/viewModels/changePasswordViewModel";
import ChangePasswordState from "../../application/states/changePasswordState";
import { ReactNode } from "react";
import LabeledInputField from "@/common/components/form/LabeledInputField";
import TextFieldComponent from "@/common/components/form/TextFieldComponent";
import AsyncButton from "@/common/components/buttons/AsyncButton";
import { AsyncStatus } from "@/common/state/asyncState";
import RoutingUtils from "@/common/utils/routing";



export default class ChangePasswordView extends ViewModelView<ChangePasswordViewModel, unknown, ChangePasswordState>{
    onCreateViewModel(state: ChangePasswordState): ChangePasswordViewModel {
        return new ChangePasswordViewModel(state, this.setState.bind(this));
    }
    onCreateState(): ChangePasswordState {
        return new ChangePasswordState();
    }

    handleSubmit = () => {
        this.viewModel.changePassword();
    }

    onCreateMain(): ReactNode {
        if(this.state.status === AsyncStatus.done){
            RoutingUtils.redirect("/");
        }
        return (
            <div className="flex p-10">
                <form onSubmit={(event) => {event.preventDefault(); this.handleSubmit()}} className="w-full md:w-1/3">

                    <h1 className="text-2xl font-bold mt-10">Change Password</h1>

                    <p className="text-danger my-10">
                        {this.state.error?.message ?? ""}
                    </p>

                    <LabeledInputField label="Old Password">
                        <TextFieldComponent field={this.state.form.oldPassword} type="password"/>
                    </LabeledInputField>


                    <LabeledInputField label="New Password">
                        <TextFieldComponent field={this.state.form.newPassword} type="password"/>
                    </LabeledInputField>

                    <AsyncButton state={this.state}>
                        SUBMIT
                    </AsyncButton>

                </form>
            </div>
        )
    }

}