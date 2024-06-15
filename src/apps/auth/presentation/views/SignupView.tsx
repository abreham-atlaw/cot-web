import ViewModelView from "@/common/components/views/ViewModelView";
import SignupViewModel from "../../application/viewModels/signupViewModel";
import SignupState, { Stage } from "../../application/states/signupState";
import { ReactNode } from "react";
import image from "@/assets/images/auth/home.jpeg";
import RoutingUtils from "@/common/utils/routing";
import SignupFormComponent from "../components/SignupFormComponent";
import CreateOrganizationFormComponent from "../components/CreateOrganizationFormComponent";
import { useParams } from "react-router-dom";
import LoadingView from "@/common/components/views/LoadingView";
import TranslatedText from "@/common/components/localization/TranslatedText";


interface SignupViewProps{
    invitationId?: string;
}

export default class SignupView extends ViewModelView<SignupViewModel, SignupViewProps, SignupState>{
    
    onCreateViewModel(state: SignupState): SignupViewModel {
        return new SignupViewModel(state, this.setState.bind(this));
    }
    onCreateState(): SignupState {
        return new SignupState(this.props.invitationId);
    }

    handleSignup = () => {
        this.viewModel.signup();
    }

    handleCreateOrg = () => {
        this.viewModel.createOrganization();
    }

    onCreateMain(): ReactNode {
        if(this.state.stage === Stage.done){
            RoutingUtils.redirect("/");
            return <LoadingView />
        }
        return (
            <div className="flex flex-wrap text-light h-screen">

                <div className={`w-full md:w-[60%] bg-cover flex bg-[url('${image}')]`} >

                    <h1 className="text-7xl font-bold m-auto">
                        <TranslatedText text="Next-Gen"/><br/><TranslatedText text="Property"/><br/><TranslatedText text="Management"/>
                    </h1>

                </div>

                <div className="w-full md:w-[40%] bg-dark text-light flex ">
                    <div className="w-4/5 m-auto">
                    {
                        (this.state.stage === Stage.signup)?
                        <SignupFormComponent onSubmit={this.handleSignup} state={this.viewModel.state}/>:
                        <CreateOrganizationFormComponent onSubmit={this.handleCreateOrg} state={this.state}/>

                    }
                    </div>
                
                </div>
                
            </div>
        )
    }
}

const RoutedSignupView = () => {
    const params = useParams();
	return <SignupView invitationId={params.invitationId}/>
}

export {RoutedSignupView};
