import EditModelView from "@/apps/core/presentation/views/CreateModelView";
import AssetCategory from "../../domain/models/assetCategory";
import AssetCategoryForm from "../../application/forms/assetCategoryForm";
import EditModelState from "@/common/state/editModelState";
import EditModelViewModel from "@/common/viewmodel/editModelViewModel";
import { ReactNode } from "react";
import LabeledInputField from "@/common/components/form/LabeledInputField";
import TextFieldComponent from "@/common/components/form/TextFieldComponent";
import EditAssetCategoryViewModel from "../../application/viewModels/editAssetCategoryViewModel";


export default class EditAssetCategoryView extends EditModelView<AssetCategory, AssetCategoryForm>{
    
    getBackLink(): string {
        return "/base/asset-category/list"
    }
    
    onCreateFormComponent(form: AssetCategoryForm): ReactNode {
        return (
            <>
                <LabeledInputField label="Category Title">

                    <TextFieldComponent field={form.name}/>

                </LabeledInputField>
            
            </>
        )
    }
    onCreateViewModel(state: EditModelState<AssetCategory, AssetCategoryForm>): EditModelViewModel<AssetCategory, AssetCategoryForm> {
        return new EditAssetCategoryViewModel(
            state, 
            this.setState.bind(this)
        );
    }
    
    onCreateForm(): AssetCategoryForm {
        return new AssetCategoryForm();
    }


}