import Request from "@/common/network/Request";


export default class RequestPasswordResetRequest extends Request<void>{

    constructor(email: string){
        super({
            url: "/auth/reset-password/request/",
            method: "POST",
            data: {
                "email": email
            }
        });
    }

    deserializeResponse(): void {
        return;
    }

}