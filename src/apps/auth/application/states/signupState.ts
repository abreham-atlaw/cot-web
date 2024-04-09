import { AsyncState } from "@/common/state/asyncState";
import SignupForm from "../forms/signupForm";
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

    form = new SignupForm();
    orgForm = new OrgForm();

    stage = Stage.signup;
    organizationId?: string;


    invitationId?: string;


    constructor(invitationId?: string){
        super();
        this.invitationId = invitationId;
    }

    get adminMode(){
        return this.invitationId === undefined;
    }

}