import { EditModelView } from "@/apps/core/presentation/views/CreateModelView";
import AssetMaintenanceRequestForm from "../../application/forms/assetMaintenanceForm";
import { EditAssetMaintenanceRequestState } from "../../application/states/editAssetMaintenanceRequestState";
import AssetMaintenanceRequest from "../../domain/models/assetMaintenanceRequest";
import { ReactNode } from "react";
import LabeledInputField from "@/common/components/form/LabeledInputField";
import RequestStatusSelectionFieldComponent from "../components/RequestStatusSelectionFieldComponent";
import AssetSelectionFieldComponent from "../components/AssetSelectionFieldComponent";
import { TextBoxComponent } from "@/common/components/form/TextFieldComponent";
import EditAssetMaintenanceRequestViewModel from "../../application/viewModels/editAssetMaintenanceRequestViewModel";
import EditModelState from "@/common/state/editModelState";
import EditModelViewModel from "@/common/viewmodel/editModelViewModel";
import FileFieldComponent from "@/common/components/form/FileFieldComponent";


export default class EditAssetMaintenanceRequestView extends EditModelView<AssetMaintenanceRequest, AssetMaintenanceRequestForm>{

    getTitle(): string {
        return "AssetMaintenanceRequest"
    }
    
    onCreateFormComponent(form: AssetMaintenanceRequestForm, state: EditAssetMaintenanceRequestState): ReactNode {

        if(state.resolveMode!){
            return (
                <>  
                    <LabeledInputField label="Requested By">
                        <p>{state.instance!.user!.name}</p>
                    </LabeledInputField>

                    <LabeledInputField label="Asset Type">
                        <p>{state.instance!.asset!.name}</p>
                    </LabeledInputField>

                    <LabeledInputField label="Image">
                        <img className="w-full h-36 object-cover border border-gray" src={state.instance!.image}/>
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

        if(state.assets!.length === 0){
            return (
                <>
                    <h4 className="font-bold text-2xl">There are no assets to request maintenance for.</h4>
                </>
            )
        }
        return (
            <>

                <LabeledInputField label="Asset Type">

                    <AssetSelectionFieldComponent field={form.asset} assets={(this.state as EditAssetMaintenanceRequestState).assets!}/>

                </LabeledInputField>

                <LabeledInputField label="Image">
                    <FileFieldComponent field={form.image} />
                </LabeledInputField>

                <LabeledInputField label="Note">

                    <TextBoxComponent field={form.note}/>

                </LabeledInputField>
            </>
        )
    }

    onCreateViewModel(state: EditModelState<AssetMaintenanceRequest, AssetMaintenanceRequestForm>): EditModelViewModel<AssetMaintenanceRequest, AssetMaintenanceRequestForm>{
        return new EditAssetMaintenanceRequestViewModel(
            state, 
            this.setState.bind(this)
        );
    }
    
    onCreateForm(): AssetMaintenanceRequestForm{
        return new AssetMaintenanceRequestForm(false);
    }

}