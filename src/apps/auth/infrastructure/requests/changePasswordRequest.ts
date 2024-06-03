import Request from "@/common/network/Request";



export default class ChangePasswordReqeust extends Request<void>{

    constructor(email: string, old_password: string, new_password: string){
        super({
            url: "/auth/change-password/",
            method: "POST",
            data: {
                email,
                old_password,
                new_password
            }
        })

    }


}