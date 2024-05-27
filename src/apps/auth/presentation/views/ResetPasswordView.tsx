import ViewModelView from "@/common/components/views/ViewModelView";
import { ReactNode } from "react";
import image from "@/assets/images/auth/home.jpeg";
import RoutingUtils from "@/common/utils/routing";
import LabeledInputField from "@/common/components/form/LabeledInputField";
import TextFieldComponent from "@/common/components/form/TextFieldComponent";
import AsyncButton from "@/common/components/buttons/AsyncButton";
import { AsyncStatus } from "@/common/state/asyncState";
import Field from "@/common/forms/fields";
import ResetPasswordViewModel from "../../application/viewModels/resetPasswordViewModel";
import ResetPasswordState from "../../application/states/resetPasswordState";
import LoadingView from "@/common/components/views/LoadingView";
import { useLocation } from "react-router-dom";



interface ResetPasswordProps{
    token: string;
}

class ResetPasswordView extends ViewModelView<ResetPasswordViewModel, ResetPasswordProps, ResetPasswordState>{
    

    onCreateViewModel(state: ResetPasswordState): ResetPasswordViewModel {
        return new ResetPasswordViewModel(state, this.setState.bind(this));
    }
    onCreateState(): ResetPasswordState {
        return new ResetPasswordState(this.props.token);
    }

    handleResetPassword = () => {
        this.viewModel.reset();
    }

    onCreateMain(): ReactNode {
        if(this.state.status === AsyncStatus.done){
            RoutingUtils.redirect("/auth/login");
            return <LoadingView/>
        }
        return (
            <div className="flex text-light h-screen">

                <div className={`w-[60%] bg-cover flex bg-[url('${image}')]`} >

                    <h1 className="text-7xl font-bold m-auto">
                        Next-Gen<br/>Property<br/>Management
                    </h1>

                </div>

                <div className="w-[40%] bg-dark text-light flex ">
                    <div className="w-4/5 m-auto">
                    <form onSubmit={(event) => {event.preventDefault(); this.handleResetPassword();}}>
                        <h1 className="text-5xl">Reset Password</h1>
                        <p className="my-5 text-danger">{ 
                        this.state.error?
                        "Incorrect username or password":
                        ""
                        }</p>

                        {
                            [
                                ["New Password", this.state.form.password, "password"],
                            ].map(
                                (field) => (
                                    <div className="mt-10" key={field[0] as string}>
                                        <LabeledInputField label={field[0] as string}>
                                            <TextFieldComponent field={field[1] as Field<string>} type={field[2] as string}/>
                                        </LabeledInputField>
                                    </div>
                                )
                            )
                        }

                        <div className="mt-10">
                            <AsyncButton state={this.state} bg="primary">
                                RESET
                            </AsyncButton>
                        </div>
                        <p className="mt-5">Dont have an account yet? <a href="/auth/signup" className="text-primaryLight font-bold">Sign up</a></p>
                    </form>
                    </div>
                
                </div>
                
            </div>
        )
    }


}


const RoutedResetPasswordView: React.FC = () => {
    const location = useLocation();
    const token = new URLSearchParams(location.search).get('token');
    return (<ResetPasswordView token={token!}/>)
} 

export default RoutedResetPasswordView;