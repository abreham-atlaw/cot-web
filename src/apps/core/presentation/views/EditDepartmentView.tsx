import LabeledInputField from "@/common/components/form/LabeledInputField";
import TextFieldComponent from "@/common/components/form/TextFieldComponent";
import { ReactNode } from "react";
import { EditModelView } from "@/apps/core/presentation/views/CreateModelView";
import EditModelState from "@/common/state/editModelState";
import EditModelViewModel from "@/common/viewmodel/editModelViewModel";
import ProfileSelectionFieldComponent from "@/apps/asset/presentation/components/ProfileSelectionFIeldComponent";
import DepartmentForm from "../../application/forms/departmentForm";
import EditDepartmentState from "../../application/states/editDepartmentState";
import Department from "../../domain/models/department";
import EditDepartmentViewModel from "../../application/viewModels/editDepartmentViewModel";


export default class EditDepartmentView extends EditModelView<Department, DepartmentForm>{
 
    getBackLink(): string {
        return "/base/department/list"
    }

    getTitle(): string {
        return "Department"
    }
    
    onCreateFormComponent = (form: DepartmentForm, state: EditModelState<Department, DepartmentForm>): ReactNode => {
        return (
            <>
                <LabeledInputField label="Department Name">

                    <TextFieldComponent field={form.name}/>

                </LabeledInputField>

                <LabeledInputField label="Department Head">

                    <ProfileSelectionFieldComponent field={form.head} profiles={(state as EditDepartmentState).users!}/>

                </LabeledInputField>

            </>
        )
    }
    onCreateViewModel(state: EditModelState<Department, DepartmentForm>): EditModelViewModel<Department, DepartmentForm>{
        return new EditDepartmentViewModel(
            state, 
            this.setState.bind(this)
        );
    }
    
    onCreateForm(): DepartmentForm{
        return new DepartmentForm();
    }

}