import LabeledInputField from "@/common/components/form/LabeledInputField";
import { ReactNode } from "react";
import { EditModelView } from "@/apps/core/presentation/views/CreateModelView";
import EditModelState from "@/common/state/editModelState";
import EditModelViewModel from "@/common/viewmodel/editModelViewModel";
import Profile from "@/apps/auth/domain/models/profile";
import UserForm from "../../application/forms/userForm";
import RoleSelectionFieldComponent from "../components/RoleSelectionFieldComponent";
import DepartmentSelectionFieldComponent from "../components/DepartmentSelectionFieldComponent";
import EditUserState from "../../application/states/editUserState";
import EditUserViewModel from "../../application/viewModels/editUserViewModel";


export default class EditUserView extends EditModelView<Profile, UserForm>{
 
    getBackLink(): string {
        return "/base/asset/list"
    }

    getTitle(): string {
        return "Users"
    }
    
    onCreateFormComponent = (form: UserForm, state: EditUserState): ReactNode => {
        return (
            <>
                <LabeledInputField label="Name">

                    <p className="font-bold">{this.state.instance!.name}</p>

                </LabeledInputField>

                <LabeledInputField label="E-Mail">

                    <p className="font-bold">{this.state.instance!.email}</p>

                </LabeledInputField>

                <LabeledInputField label="Role">

                    <RoleSelectionFieldComponent field={form.role}/>

                </LabeledInputField>

                <LabeledInputField label="Department">

                    <DepartmentSelectionFieldComponent field={form.department} departments={state.departments!} nullable={true}/>

                </LabeledInputField>

            </>
        )
    }

    onCreateViewModel(state: EditModelState<Profile, UserForm>): EditModelViewModel<Profile, UserForm>{
        return new EditUserViewModel(
            state,
            this.setState.bind(this)
        );
    }
    
    onCreateForm(): UserForm {
        return new UserForm();
    }

}