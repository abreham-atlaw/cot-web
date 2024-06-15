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
import Field from "@/common/forms/fields";
import TranslatedText from "@/common/components/localization/TranslatedText";

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
    togglePasswordVisibility = () => {
        this.setState({ showPassword: !this.state.showPassword });
    }

    onCreateMain(): ReactNode {
        if(this.state.status === AsyncStatus.done){
            RoutingUtils.redirect("/");
        }
       
        return (
            <div className="flex flex-wrap text-light h-screen">

                <div className={`w-full md:w-[60%] bg-cover flex bg-[url('${image}')]`} >

                    <h1 className="text-7xl font-bold m-auto">
                        <TranslatedText text="Next-Gen"></TranslatedText><br/>
                        <TranslatedText text="Property"></TranslatedText><br/>
                        <TranslatedText text="Management"></TranslatedText>
                    </h1>

                </div>

                <div className="w-full md:w-[40%] bg-dark text-light flex ">
                    <div className="w-4/5 m-auto">
                    <form onSubmit={(event) => {event.preventDefault(); this.handleLogin();}}>
                        <h1 className="text-5xl"><TranslatedText text="Login"></TranslatedText></h1>
                        <p className="my-5 text-danger">{ 
                        this.state.error?
                        <TranslatedText text="Incorrect username or password"></TranslatedText>:
                        ""
                        }</p>

                        {
                            [
                                ["Email", this.state.form.email, "email"],
                                ["Password",this.state.form.password, "password"]
                            ].map(
                                (field) => (
                                    <div className="mt-10" key={field[0] as string}>
                                        <LabeledInputField label={field[0] as string}>
                                            <div className="relative">
                                            <TextFieldComponent field={field[1] as Field<string>}  type={field[0] === "Password" && this.state.showPassword ? "text" : field[2] as string}/>
                                            {field[0] === "Password" && (
                                                    <button 
                                                        type="button" 
                                                        className="absolute inset-y-0 right-0 pr-8 flex items-center text-md leading-5" 
                                                        onClick={this.togglePasswordVisibility}
                                                    >
                                                        {this.state.showPassword ? '🙈' : '👁️'}
                                                    </button>
                                                )}

                                            </div>
                                            
                                        </LabeledInputField>
                                    </div>
                                )
                            )
                        }
                        

                        <div className="mt-10">
                            <AsyncButton state={this.state} bg="primary">
                                <TranslatedText text="LOGIN"></TranslatedText>
                            </AsyncButton>
                        </div>
                        <p className="mt-5"><TranslatedText text="Dont have an account yet?"></TranslatedText> <a href="/auth/signup" className="text-primaryLight font-bold"><TranslatedText text="Sign up"></TranslatedText></a></p>
                    </form>
                    </div>
                
                </div>
                
            </div>
        )
    }


}
