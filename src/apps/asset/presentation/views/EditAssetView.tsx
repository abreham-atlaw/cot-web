import LabeledInputField from "@/common/components/form/LabeledInputField";
import TextFieldComponent from "@/common/components/form/TextFieldComponent";
import AssetCategorySelectionFieldComponent from "../components/AssetCategorySelectionFieldComponent";
import AssetForm from "../../application/forms/assetForm";
import React, { ReactNode } from "react";
import EditModelView from "@/apps/core/presentation/views/CreateModelView";
import Asset from "../../domain/models/asset";
import EditModelState from "@/common/state/editModelState";
import EditModelViewModel from "@/common/viewmodel/editModelViewModel";
import CreateAssetViewModel from "../../application/viewModels/editAssetViewModel";
import EditAssetState from "../../application/states/editAssetState";
import ProfileSelectionFieldComponent from "../components/ProfileSelectionFIeldComponent";
import NumberFieldComponent from "@/common/components/form/NumberFieldComponent";

interface EditAssetViewProps {
    closeModal:()=>void,
    instance?: Asset

}
export default class EditAssetView extends React.Component<EditAssetViewProps>{
 
    getBackLink(): string {
        return "/base/asset/list"
    }

    getTitle(): string {
        return "Asset"
    }
    
    onCreateFormComponent = (form: AssetForm, state: EditModelState<Asset, AssetForm>): ReactNode => {
       
        return (
            
            <>
                <LabeledInputField label="Asset Name">

                    <TextFieldComponent field={form.name} value={this.props.instance?.name}  />

                </LabeledInputField>

                <LabeledInputField label="Category">

                    <AssetCategorySelectionFieldComponent field={form.category} categories={(state as EditAssetState).categories!} value={this.props.instance?.category}/>

                </LabeledInputField>

                <LabeledInputField label="Owner">
                    <ProfileSelectionFieldComponent field={form.owner} profiles={(state as EditAssetState).staff!} value={this.props.instance?.currentOwner}/>
                </LabeledInputField>
                {
                    (state.isCreateMode)?
                    (
                        <LabeledInputField label="Quantity">
                            <NumberFieldComponent field={form.quantity}/>
                        </LabeledInputField>  
                    ):
                    (<></>)
                }
                
            </>
        )
    }
    onCreateViewModel = (state: EditModelState<Asset, AssetForm>): EditModelViewModel<Asset, AssetForm> => {
        return new CreateAssetViewModel(
            state, 
            this.setState.bind(this)
        );
    }
    
    onCreateForm = (): AssetForm => {
        return new AssetForm();
    }

    render(): React.ReactNode {
        return (
            <EditModelView
            onCreateForm={this.onCreateForm}
            onCreateFormComponent={this.onCreateFormComponent}
            onCreateViewModel={this.onCreateViewModel}
            getBackLink={this.getBackLink}
            getTitle={this.getTitle}
            closeModal={this.props.closeModal}
            instance={this.props.instance?.id}
            
                />
        )
    }


}