import TranslateRepostory from "@/apps/core/infrastructure/repositories/translateRepository";
import strings from "@/assets/localization/strings.json";
import CoreProviders from "@/di/coreProviders";
import DataConfigs from "@/configs/dataConfigs";


export default class Translator{

    private static readonly LANG_KEY = "language";

    private repository = new TranslateRepostory();
    private cache: Map<string, string> = new Map();
    private local: Record<string, string> = strings;
    private localStorage = CoreProviders.provideLocalStorage();

    async init(){
        if(await this.localStorage.get(Translator.LANG_KEY) == null){
            await this.setLangauge(DataConfigs.DEFAULT_LANG);
        }
    }

    async getCurrentLanguage(): Promise<string>{
        await this.init();
        return await this.localStorage.get("language")
    }

    public async fromCache(text: string): Promise<string | undefined>{
        return this.cache.get(text);
    }

    public async storeCache(text: string, translated: string){
        this.cache.set(text, translated);
    }

    public async fromLocal(text: string): Promise<string | undefined>{
        return this.local[text];
    }

    public async translate(text: string): Promise<string>{
        if(await this.getCurrentLanguage() === DataConfigs.DEFAULT_LANG){
            return text;
        }
        const local = await this.fromLocal(text);
        if(local !== undefined){
            return local;
        }

        const cached = await this.fromCache(text);
        if(cached !== undefined){
            return cached;
        }

        try{
            const translated = await this.repository.translate(text);
            await this.storeCache(text, translated);
            return translated;
        }
        catch{
            return text;
        }

    }

    public async setLangauge(lang: string){
        console.log("Setting lang to",lang);
        this.localStorage.store(Translator.LANG_KEY, lang);
    }

}