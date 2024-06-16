import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus";
import Profile from "@/apps/auth/domain/models/profile";
import BaseState from "@/common/state/baseState";
import Organization from "../../domain/models/organization";



export default class DashboardBaseState extends BaseState{

    status?: AuthenticationStatus;
    user?: Profile;
    org?: Organization;

}