import LabeledInputField from "@/common/components/form/LabeledInputField";
import TextFieldComponent from "@/common/components/form/TextFieldComponent";
import AssetCategoryForm from "../../application/forms/assetCategoryForm";
import React, { ReactNode } from "react";
import EditModelView from "@/apps/core/presentation/views/CreateModelView";
import AssetCategory from "../../domain/models/assetCategory";
import EditModelState from "@/common/state/editModelState";
import EditModelViewModel from "@/common/viewmodel/editModelViewModel";
import EditAssetCategoryViewModel from "../../application/viewModels/editAssetCategoryViewModel";
import AssetCategorySelectionFieldComponent from "../components/AssetCategorySelectionFieldComponent";
import EditAssetCategoryState from "../../application/states/editAssetCategoryState";
interface EditAssetCategoryViewProps {
     closeModal:()=>void,
     instance?: AssetCategory
}

export default class EditAssetCategoryView extends React.Component<EditAssetCategoryViewProps> {
    
    getBackLink = (): string => {
        return "/base/asset-category/list"
    }

    getTitle = (): string => {
        return "Asset Category"
    }
    
    onCreateFormComponent = (form: AssetCategoryForm): ReactNode => {
        return (
            <>
                <LabeledInputField label="Category Title">
                    <TextFieldComponent field={form.name} value={this.props.instance?.name}/>
                </LabeledInputField>
                
                <LabeledInputField label="Parent Category">

                    <AssetCategorySelectionFieldComponent field={form.parent} nullable={true} categories={(this.state as EditAssetCategoryState).categories!} value={this.props.instance?.parent}/>

                </LabeledInputField>

            </>
        )
    }

    onCreateViewModel = (state: EditModelState<AssetCategory, AssetCategoryForm>): EditModelViewModel<AssetCategory, AssetCategoryForm> => {
        return new EditAssetCategoryViewModel(
            state, 
            this.setState.bind(this)
        );
    }
    
    onCreateForm = (): AssetCategoryForm => {
        return new AssetCategoryForm();
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
            />
        )
    }
}
