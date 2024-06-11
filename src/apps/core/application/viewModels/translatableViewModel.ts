import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import TranslatableState from "../states/traslatableState";
import CoreProviders from "@/di/coreProviders";



export default class TranslatableViewModel extends AsyncViewModel<TranslatableState>{

    private translator = CoreProviders.provideTranslator();



    public async onInit(): Promise<void> {
        this.state.currentLang = await this.translator.getCurrentLanguage();
    }

    async changeLang(lang: string){
        await this.asyncCall(
            async () => {
                await this.translator.setLangauge(lang);
                location.reload();
            }
        )
    }


}