import Invitation from "@/apps/auth/domain/models/invitation";
import Profile from "@/apps/auth/domain/models/profile";
import { AsyncState } from "@/common/state/asyncState";
import SearchForm from "../forms/searchForm";





export default class ListUsersState extends AsyncState{

    users?: Profile[];
    invitations?: Invitation[];
    searchForm = new SearchForm();
    modalClicked = false;
    isInvited = 1;


}