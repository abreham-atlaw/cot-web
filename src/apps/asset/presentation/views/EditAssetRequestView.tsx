import React, { ReactNode } from "react"
import AssetRequestForm from "../../application/forms/assetRequestForm"
import LabeledInputField from "@/common/components/form/LabeledInputField"
import { TextBoxComponent } from "@/common/components/form/TextFieldComponent"
import { EditAssetRequestState } from "../../application/states/editAssetRequestState"
import EditModelState from "@/common/state/editModelState"
import AssetRequest from "../../domain/models/assetRequest"
import EditModelViewModel from "@/common/viewmodel/editModelViewModel"
import EditAssetRequestViewModel from "../../application/viewModels/editAssetRequestViewModel"
import AssetCategorySelectionFieldComponent from "../components/AssetCategorySelectionFieldComponent"
import EditModelView from "@/apps/core/presentation/views/CreateModelView"


export default class EditAssetRequestView extends React.Component{
    
    getBackLink(): string {
        return "/base/asset-request/list"
    }

    getTitle(): string {
        return "AssetRequest"
    }
    
    onCreateFormComponent = (form: AssetRequestForm): ReactNode => {
        return (
            <>

                <LabeledInputField label="Category">

                    <AssetCategorySelectionFieldComponent field={form.category} categories={(this.state as EditAssetRequestState).categories!}/>

                </LabeledInputField>

                
                <LabeledInputField label="Note">

                    <TextBoxComponent field={form.note}/>

                </LabeledInputField>
            </>
        )
    }
    onCreateViewModel = (state: EditModelState<AssetRequest, AssetRequestForm>): EditModelViewModel<AssetRequest, AssetRequestForm> => {
        return new EditAssetRequestViewModel(
            state, 
            this.setState.bind(this)
        );
    }
    
    onCreateForm = (): AssetRequestForm => {
        return new AssetRequestForm();
    }

    render(): React.ReactNode {
        return (
            <EditModelView
            onCreateForm={this.onCreateForm}
            onCreateFormComponent={this.onCreateFormComponent}
            onCreateViewModel={this.onCreateViewModel}
            getBackLink={this.getBackLink}
            getTitle={this.getTitle}
                />
        )
    }


}