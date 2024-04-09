import ViewModelView from "@/common/components/views/ViewModelView";
import { ReactNode } from "react";
import image from "@/assets/images/auth/home.jpeg";
import RoutingUtils from "@/common/utils/routing";
import LabeledInputField from "@/common/components/form/LabeledInputField";
import TextFieldComponent from "@/common/components/form/TextFieldComponent";
import AsyncButton from "@/common/components/buttons/AsyncButton";
import { AsyncStatus } from "@/common/state/asyncState";
import LoginState from "../../application/states/loginState";
import LoginViewModel from "../../application/viewModels/loginViewModel";



export default class LoginView extends ViewModelView<LoginViewModel, unknown, LoginState>{
    
    onCreateViewModel(state: LoginState): LoginViewModel {
        return new LoginViewModel(state, this.setState.bind(this));
    }
    onCreateState(): LoginState {
        return new LoginState();
    }

    handleLogin = () => {
        this.viewModel.login();
    }

    onCreateMain(): ReactNode {
        if(this.state.status === AsyncStatus.done){
            RoutingUtils.redirect("/");
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
                    <form onSubmit={(event) => {event.preventDefault(); this.handleLogin();}}>
                        <h1 className="text-5xl">Login</h1>
                        <p className="my-5 text-danger">{ this.state.error?.message ?? "" }</p>

                        {
                            [
                                ["Email", this.state.form.email, "email"],
                                ["Password",this.state.form.password, "password"]
                            ].map(
                                (field) => (
                                    <div className="mt-10" key={field[0] as string}>
                                        <LabeledInputField label={field[0] as string}>
                                            <TextFieldComponent field={field[1]} type={field[2] as string}/>
                                        </LabeledInputField>
                                    </div>
                                )
                            )
                        }

                        <div className="mt-10">
                            <AsyncButton state={this.state}>
                                SIGN UP
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