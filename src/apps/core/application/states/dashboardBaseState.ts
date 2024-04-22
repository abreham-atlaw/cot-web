import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus";
import Profile from "@/apps/auth/domain/models/profile";
import BaseState from "@/common/state/baseState";



export default class DashboardBaseState extends BaseState{

    status?: AuthenticationStatus;
    user?: Profile;

}