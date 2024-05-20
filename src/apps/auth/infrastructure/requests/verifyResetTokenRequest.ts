import Request from "@/common/network/Request";


export default class VerifyResetTokenRequest extends Request<void>{

    constructor(token: string){
        super({
            url: "/auth/reset-password/verify/",
            method: "GET",
            params: {
                "token": token
            }
        })
    }

    deserializeResponse(): void {
        return;
    }

}