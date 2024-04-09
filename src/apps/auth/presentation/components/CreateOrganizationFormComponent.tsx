import LabeledInputField from "@/common/components/form/LabeledInputField";
import SignupState from "../../application/states/signupState"
import TextFieldComponent from "@/common/components/form/TextFieldComponent";
import AsyncButton from "@/common/components/buttons/AsyncButton";

interface CreateOrganizationFormComponentProps{
    state: SignupState;
    onSubmit: () => void;
}


const CreateOrganizationFormComponent: React.FC<CreateOrganizationFormComponentProps> = (props: CreateOrganizationFormComponentProps) => {
    return (
        <form onSubmit={(event) => {event.preventDefault(); props.onSubmit()}}>
            <h1 className="text-4xl">Create Your Organization</h1>
            <p className="text-danger my-10">{ props.state.error?.message ?? "" }</p>
            <LabeledInputField label="Company Name">
                <TextFieldComponent field={props.state.orgForm.name}/>
            </LabeledInputField>

            <div className="mt-10">
                <AsyncButton state={props.state}>FINISH</AsyncButton>
            </div>

        </form>
    )
}


export default CreateOrganizationFormComponent;