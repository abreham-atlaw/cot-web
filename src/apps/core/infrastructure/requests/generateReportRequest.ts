import Request from "@/common/network/Request";


export default class GenerateReportRequest extends Request<string>{

    constructor(data: Record<string, unknown>){
        super({
            url: "core/generate-report/",
            method: "POST",
            data
        });
    }


    deserializeResponse(response: unknown): string {
        return response["link"];
    }
}