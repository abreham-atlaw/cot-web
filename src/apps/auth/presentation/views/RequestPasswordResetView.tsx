import ViewModelView from "@/common/components/views/ViewModelView";
import { ReactNode } from "react";
import image from "@/assets/images/auth/home.jpeg";
import LabeledInputField from "@/common/components/form/LabeledInputField";
import TextFieldComponent from "@/common/components/form/TextFieldComponent";
import AsyncButton from "@/common/components/buttons/AsyncButton";
import { AsyncStatus } from "@/common/state/asyncState";
import Field from "@/common/forms/fields";
import RequestPasswordResetViewModel from "../../application/viewModels/requestPasswordResetViewModel";
import RequestPasswordResetState from "../../application/states/requestPasswordResetState";



export default class RequestPasswordResetView extends ViewModelView<RequestPasswordResetViewModel, unknown, RequestPasswordResetState>{
    
    onCreateViewModel(state: RequestPasswordResetState): RequestPasswordResetViewModel {
        return new RequestPasswordResetViewModel(state, this.setState.bind(this));
    }
    onCreateState(): RequestPasswordResetState {
        return new RequestPasswordResetState();
    }

    handleRequestPasswordReset = () => {
        this.viewModel.submit();
    }

    onCreateMain(): ReactNode {
        return (
            <div className="flex text-light h-screen">

                <div className={`w-[60%] bg-cover flex bg-[url('${image}')]`} >

                    <h1 className="text-7xl font-bold m-auto">
                        Next-Gen<br/>Property<br/>Management
                    </h1>

                </div>

                <div className="w-[40%] bg-dark text-light flex ">
                    <div className="w-4/5 m-auto">

                    {
                        (this.state.status === AsyncStatus.done)?
                        <div className="">
                            <h1 className="text-5xl mb-5">Email Sent</h1>
                            An email containing a link to reset your password has been sent to your email.
                        </div>:
                        <form onSubmit={(event) => {event.preventDefault(); this.handleRequestPasswordReset();}}>
                            <h1 className="text-5xl">Reset Password</h1>
                            <p className="my-5 text-danger">{ 
                            this.state.error?
                            "Incorrect username or password":
                            ""
                            }</p>

                            {
                                [
                                    ["Email", this.state.form.email, "email"],
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
                    }

                    
                    </div>
                
                </div>
                
            </div>
        )
    }


}