import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus";
import Profile from "@/apps/auth/domain/models/profile";
import BaseState from "@/common/state/baseState";



export default class DashboardBaseState extends BaseState{

    status?: AuthenticationStatus;
    user?: Profile;
    totalasset?: number;
    totalrequest?:number
    avaliableasset?: number;
    assignedasset?:number;
    resolvedrequest?:number;
    pendingrequest?:number;
    pendingmaintenace?:number;
    resolvedmaintenance?:number;
    notifications?:[];
    

}