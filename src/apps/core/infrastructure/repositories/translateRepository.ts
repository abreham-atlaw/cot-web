import CoreProviders from "@/di/coreProviders";
import TranslateRequest from "../requests/translateRequest";



export default class TranslateRepostory{

    private networkClient = CoreProviders.provideNetworkClient();

    async translate(message: string){
        return await this.networkClient.execute(new TranslateRequest(message, "English", "Amharic"));
    }

}