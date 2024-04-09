import ViewModelView from "@/common/components/views/ViewModelView";
import RegisterUserViewModel from "../../application/viewModels/registerUserViewModel";
import RegisterUserState from "../../application/states/registerUserState";
import { ReactNode } from "react";
import LabeledInputField from "@/common/components/form/LabeledInputField";
import TextFieldComponent from "@/common/components/form/TextFieldComponent";
import RoleSelectionFieldComponent from "../components/RoleSelectionFieldComponent";
import AsyncButton from "@/common/components/buttons/AsyncButton";
import { Link } from "react-router-dom";
import BaseButton from "@/common/components/buttons/BaseButton";
import RoutingUtils from "@/common/utils/routing";
import { AsyncStatus } from "@/common/state/asyncState";




export default class RegisterUserView extends ViewModelView<RegisterUserViewModel, unknown, RegisterUserState>{
    
    onCreateViewModel(state: RegisterUserState): RegisterUserViewModel {
        return new RegisterUserViewModel(state, this.setState.bind(this));
    }
    
    onCreateState(): RegisterUserState {
        return new RegisterUserState();
    }

    private goBack(){
        RoutingUtils.redirect("/base/staff-management/list/")
    }

    onCreateMain(): ReactNode {
        if(this.state.status === AsyncStatus.done){
            this.goBack();
        }
        return (
            <div className="h-screen w-full flex">
                <div className="m-auto w-1/2">

                    <h1 className="text-4xl mb-16">Register User</h1>

                    <p className="my-5 text-danger">{ this.state.error?.message ?? ""}</p>

                    <LabeledInputField label="Email">
                        <TextFieldComponent field={this.state.form.email} type="email"/>
                    </LabeledInputField>

                    <div className="mt-10">
                        <LabeledInputField label="Role">
                            <RoleSelectionFieldComponent field={this.state.form.role}/>
                        </LabeledInputField>
                    </div>

                    
                    <div className="mt-10 flex">
                        <div className="mx-auto">
                            <Link to="/base/staff-management/list">
                                <BaseButton>
                                    CANCEL
                                </BaseButton>
                            </Link>
                        </div>
                        <div className="mx-auto" onClick={() => {this.viewModel.registerUser()}}>
                            <AsyncButton  state={this.state}>
                                REGISTER
                            </AsyncButton>
                        </div>
                    </div>
                </div>

            </div>
        )
    }
   



}