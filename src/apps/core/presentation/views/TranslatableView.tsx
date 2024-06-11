import ViewModelView from "@/common/components/views/ViewModelView";
import TranslatableViewModel from "../../application/viewModels/translatableViewModel";
import TranslatableState from "../../application/states/traslatableState";
import { ReactNode } from "react";
import SelectLanguageButton from "../components/SelectLanguageButton";




interface TranslatableProps{
    children: ReactNode
}


export default class TranslatableView extends ViewModelView<TranslatableViewModel, TranslatableProps, TranslatableState>{
    
    onCreateViewModel(state: TranslatableState): TranslatableViewModel {
        return new TranslatableViewModel(state, this.setState.bind(this));
    }
    onCreateState(): TranslatableState {
        return new TranslatableState();
    }

    handleLangSelected = (lang: string) => {
        this.viewModel.changeLang(lang);
    }

    onCreateMain(): ReactNode {
        return (
            <div className="">

                {this.props.children}

                <SelectLanguageButton onLanguageSelected={this.handleLangSelected} state={this.state}/>
            </div>
        )
    }

}