import Request from "@/common/network/Request";


export default class ResetPasswordRequest extends Request<void>{

    constructor(token: string, password: string){
        super({
            url: "/auth/reset-password/reset/",
            method: "POST",
            data: {
                "token": token,
                "password": password
            }
        });
    }

}