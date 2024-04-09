import Invitation from "@/apps/auth/domain/models/invitation";
import Profile from "@/apps/auth/domain/models/profile";
import { AsyncState } from "@/common/state/asyncState";





export default class ListUsersState extends AsyncState{

    users?: Profile[];
    invitations?: Invitation[];

}