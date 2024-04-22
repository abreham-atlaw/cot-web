import Request from "@/common/network/Request";



export default class InviteRequest extends Request<void>{

    constructor(email: string, link: string){
        super({
            "url": "/auth/invite/",
            "method": "POST",
            "data": {
                "email": email,
                "link": link
            }
        })
    }

} 