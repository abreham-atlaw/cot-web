import LabeledInputField from "@/common/components/form/LabeledInputField";
import TextFieldComponent from "@/common/components/form/TextFieldComponent";
import AssetCategorySelectionFieldComponent from "../components/AssetCategorySelectionFieldComponent";
import AssetForm from "../../application/forms/assetForm";
import { ReactNode } from "react";
import { EditModelView } from "@/apps/core/presentation/views/CreateModelView";
import Asset from "../../domain/models/asset";
import EditModelState from "@/common/state/editModelState";
import EditModelViewModel from "@/common/viewmodel/editModelViewModel";
import CreateAssetViewModel from "../../application/viewModels/editAssetViewModel";
import EditAssetState from "../../application/states/editAssetState";
import ProfileSelectionFieldComponent from "../components/ProfileSelectionFIeldComponent";
import NumberFieldComponent from "@/common/components/form/NumberFieldComponent";


export default class EditAssetView extends EditModelView<Asset, AssetForm>{
 
    getTitle(): string {
        return "Asset"
    }
    
    onCreateFormComponent(form: AssetForm, state: EditModelState<Asset, AssetForm>): ReactNode{
        return (
            <>
                <LabeledInputField label="Asset Name">

                    <TextFieldComponent field={form.name}/>

                </LabeledInputField>

                <LabeledInputField label="Category">

                    <AssetCategorySelectionFieldComponent field={form.category} categories={(state as EditAssetState).categories!}/>

                </LabeledInputField>

                <LabeledInputField label="Owner">
                    <ProfileSelectionFieldComponent field={form.owner} profiles={(state as EditAssetState).staff!}/>
                </LabeledInputField>
                {
                    (state.id === undefined)?
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
    onCreateViewModel(state: EditModelState<Asset, AssetForm>): EditModelViewModel<Asset, AssetForm>{
        return new CreateAssetViewModel(
            state, 
            this.setState.bind(this)
        );
    }
    
    onCreateForm(): AssetForm{
        return new AssetForm();
    }

}