import ViewModelView from "@/common/components/views/ViewModelView";
import RegisterUserViewModel from "../../application/viewModels/registerUserViewModel";
import RegisterUserState from "../../application/states/registerUserState";
import { ReactNode } from "react";
import LabeledInputField from "@/common/components/form/LabeledInputField";
import TextFieldComponent from "@/common/components/form/TextFieldComponent";
import RoleSelectionFieldComponent from "../components/RoleSelectionFieldComponent";
import AsyncButton from "@/common/components/buttons/AsyncButton";
import BaseButton from "@/common/components/buttons/BaseButton";
import RoutingUtils from "@/common/utils/routing";
import { AsyncStatus } from "@/common/state/asyncState";
import { MdClose } from "react-icons/md";
import TranslatedText from "@/common/components/localization/TranslatedText";

interface RegisterUserViewProps{
    onCloseModal: ()=>void,
    close:()=>void
}


export default class RegisterUserView extends ViewModelView<RegisterUserViewModel, RegisterUserViewProps, RegisterUserState>{

  
    
    onCreateViewModel(state: RegisterUserState): RegisterUserViewModel {
        return new RegisterUserViewModel(state, this.setState.bind(this));
    }
    
    onCreateState(): RegisterUserState {
        return new RegisterUserState();
    }

    private goBack(){
        RoutingUtils.redirect("/base/invitation/list/")
    }


    onCreateMain(): ReactNode {
        if(this.state.status === AsyncStatus.done){
            this.goBack();
        }
        return (
            <div className="p-8">
                <div className="flex justify-end">
                <MdClose onClick={this.props.close} className="cursor-pointer m-8" size={30}/>

                </div>

                <div className="md:px-24 p-8 w-full flex">
                <div className="m-auto w-full">

                    <h1 className="text-4xl mb-16 text-center"><TranslatedText text="Register User"/></h1>

                    <p className="my-5 text-danger">{ this.state.error?.message ?? ""}</p>

                    <LabeledInputField label="Full Name">
                        <TextFieldComponent field={this.state.form.name} type="text"/>
                    </LabeledInputField>

                    <LabeledInputField label="Email">
                        <TextFieldComponent field={this.state.form.email} type="email"/>
                    </LabeledInputField>

                    <div className="mt-10">
                        <LabeledInputField label="Role">
                            <RoleSelectionFieldComponent field={this.state.form.role}/>
                        </LabeledInputField>
                    </div>

                    
                    <div className="mt-10 flex gap-4">
                        <div className="mx-auto">
                            
                                <BaseButton onClick={this.props.close} >
                                <TranslatedText text="CANCEL"/>                                </BaseButton>
                           
                        </div>
                        <div className="mx-auto" onClick={() => {this.viewModel.registerUser()}}>
                            
                            <AsyncButton  state={this.state}>
                            <TranslatedText text="REGISTER"/>
                            </AsyncButton>
                        </div>
                    </div>
                </div>
          
            

            </div>
            </div>
            
        )
    }
   



}