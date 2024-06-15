import BaseState from "@/common/state/baseState";
import Translator from "@/common/utils/translator";
import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import React from "react";
import ViewModelView from "../views/ViewModelView";
import { LoadingSpinner } from "../status/LoadingSpinner";


class TranslateState extends BaseState{
    translation?: string;
    text: string;

    constructor(text: string){
        super();
        this.text = text;
    }
}

class TranslateViewModel extends AsyncViewModel<TranslateState>{

    private translator = new Translator();

    public async onInit(): Promise<void> {
        await super.onInit();
        this.state.translation = await this.translator.translate(this.state.text);
    }

}

interface TranslateProps{
    text: string;
}


export default class TranslatedText extends ViewModelView<TranslateViewModel, TranslateProps, TranslateState>{
    onCreateViewModel(state: TranslateState): TranslateViewModel {
        return new TranslateViewModel(state, this.setState.bind(this));
    }
    onCreateState(): TranslateState {
        return new TranslateState(this.props.text);
    }

    onCreateLoading(): React.ReactNode {
        return (
            <span className="text-sm italic">Translating...</span>
        );
    }

    onCreateMain(): React.ReactNode {
        return (<span>{this.state.translation}</span>)
    }
    
}