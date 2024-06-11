import Request from "@/common/network/Request";


export default class TranslateRequest extends Request<string>{

    constructor(message: string, from: string, to: string){
        super({
            url: "core/translate/",
            method: "POST",
            data: {
                "source_lang": from, 
                "target_lang": to,
                "text": message
            }
        });

    }


    deserializeResponse(response: unknown): string {
        return response["text"];
    }

}