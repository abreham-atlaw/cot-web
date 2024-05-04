import { ReactNode } from "react"
import AssetRequestForm from "../../application/forms/assetRequestForm"
import LabeledInputField from "@/common/components/form/LabeledInputField"
import { TextBoxComponent } from "@/common/components/form/TextFieldComponent"
import { EditAssetRequestState } from "../../application/states/editAssetRequestState"
import EditModelState from "@/common/state/editModelState"
import AssetRequest from "../../domain/models/assetRequest"
import EditModelViewModel from "@/common/viewmodel/editModelViewModel"
import EditAssetRequestViewModel from "../../application/viewModels/editAssetRequestViewModel"
import AssetCategorySelectionFieldComponent from "../components/AssetCategorySelectionFieldComponent"
import { EditModelView } from "@/apps/core/presentation/views/CreateModelView"
import RequestStatusSelectionFieldComponent from "../components/RequestStatusSelectionFieldComponent"


export default class EditAssetRequestView extends EditModelView<AssetRequest, AssetRequestForm>{

    getTitle(): string {
        return "AssetRequest"
    }
    
    onCreateFormComponent(form: AssetRequestForm, state: EditAssetRequestState): ReactNode {

        if(state.resolveMode!){
            return (
                <>  
                    <LabeledInputField label="Requested By">
                        <p>{state.instance!.user!.name}</p>
                    </LabeledInputField>

                    <LabeledInputField label="Asset Type">
                        <p>{state.instance!.category!.name}</p>
                    </LabeledInputField>

                    <LabeledInputField label="Note">
                        <p>{state.instance!.note}</p>
                    </LabeledInputField>

                    <LabeledInputField label="Status">
                        <RequestStatusSelectionFieldComponent field={form.status}/>

                    </LabeledInputField>
                </>
            )
        }
        return (
            <>

                <LabeledInputField label="Asset Type">

                    <AssetCategorySelectionFieldComponent field={form.category} categories={(this.state as EditAssetRequestState).categories!}/>

                </LabeledInputField>

                
                <LabeledInputField label="Note">

                    <TextBoxComponent field={form.note}/>

                </LabeledInputField>
            </>
        )
    }
    onCreateViewModel(state: EditModelState<AssetRequest, AssetRequestForm>): EditModelViewModel<AssetRequest, AssetRequestForm>{
        return new EditAssetRequestViewModel(
            state, 
            this.setState.bind(this)
        );
    }
    
    onCreateForm(): AssetRequestForm{
        return new AssetRequestForm();
    }

}