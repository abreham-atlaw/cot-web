import Request from "@/common/network/Request";



export default class InviteRequest extends Request<void>{

    constructor(id: string, email: string, link: string, organization: string){
        super({
            "url": "/auth/invite/",
            "method": "POST",
            "data": {
                "id": id,
                "email": email,
                "link": link,
                "organization": organization
            }
        })
    }

} 