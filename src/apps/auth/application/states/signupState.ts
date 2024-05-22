import { AsyncState } from "@/common/state/asyncState";
import OrgSignupForm, { SignupForm } from "../forms/signupForm";
import OrgForm from "../forms/orgForm";
import Organization from "@/apps/core/domain/models/organization";
import Invitation from "../../domain/models/invitation";


export enum Stage{
    signup,
    organization,
    done
}


export default class SignupState extends AsyncState{

    organizations?: Organization[];
    invitation?: Invitation;

    form: SignupForm;
    orgForm = new OrgForm();

    stage = Stage.signup;
    organizationId?: string;


    invitationId?: string;


    constructor(invitationId?: string){
        super();
        this.invitationId = invitationId;
        if(this.adminMode){
            this.form = new OrgSignupForm();
        }
        else{
            this.form = new SignupForm();
        }
    }

    get adminMode(){
        return this.invitationId === undefined;
    }

    get email(){
        return (this.adminMode) ? (this.form as OrgSignupForm).email.getValue()! : this.invitation!.to;
    }

    get name(){
        return (this.adminMode) ? (this.form as OrgSignupForm).name.getValue()! : this.invitation!.name;
    }

}