import { AsyncState } from "@/common/state/asyncState";
import ResetPasswordForm from "../forms/resetPasswordForm";


export default class ResetPasswordState extends AsyncState{

    token: string;

    form = new ResetPasswordForm();

    isTokenValid?: boolean;    

    constructor(token: string){
        super();
        this.token = token;
    }

}