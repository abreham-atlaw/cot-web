import AsyncButton from "@/common/components/buttons/AsyncButton"
import SignupState from "../../application/states/signupState"
import LabeledInputField from "@/common/components/form/LabeledInputField"
import TextFieldComponent from "@/common/components/form/TextFieldComponent"
import Field from "@/common/forms/fields";
import OrgSignupForm from "../../application/forms/signupForm";
import RecaptcaFieldComponent from "@/common/components/form/RecaptchaFieldComponent";
import TranslatedText from "@/common/components/localization/TranslatedText";


export interface SignupFormComponentProps{
    onSubmit: () => void;
    state: SignupState;
}

const SignupFormComponent: React.FC<SignupFormComponentProps> = (props: SignupFormComponentProps) => {
    return (
        <form onSubmit={
            (event) => {
                event.preventDefault(); 
                props.onSubmit();
            }}>
            <h1 className="text-5xl"><TranslatedText text="Sign up" /></h1>
            <p className="mt-5"><TranslatedText text="Enter your account details below" /></p>
            <p className="my-5 text-danger">{ props.state.error?.message ?? "" }</p>
            {
                ((props.state.adminMode)?
                [
                    ["Full Name", (props.state.form as OrgSignupForm).name, "text"],
                    ["Email", (props.state.form as OrgSignupForm).email, "email"],
                    ["Password",props.state.form.password, "password"]
                ]:
                [
                    ["Password",props.state.form.password, "password"]
                ] 
                ).map(
                    (field) => (
                        <div className="mt-10" key={field[0] as string}>
                            <LabeledInputField label={field[0] as string}>
                                <TextFieldComponent field={field[1]as Field<string>} type={field[2] as string}/>
                            </LabeledInputField>
                        </div>
                    )
                )
            }

            
            <RecaptcaFieldComponent field={props.state.form.recaptcha}/>
            <div className="mt-10">
                <AsyncButton state={props.state} bg="primary">
                    <TranslatedText text="SIGN UP" />
                </AsyncButton>
            </div>
            <p className="mt-5"><TranslatedText text="Already have an account?" /> <a href="/auth/login" className="text-primaryLight font-bold"><TranslatedText text="Login" /></a></p>

        </form>
        

    )
    
}

export default SignupFormComponent;
