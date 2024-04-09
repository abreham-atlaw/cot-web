import ViewModelView from "@/common/components/views/ViewModelView";
import { ListUsersViewModel } from "../../application/viewModels/listUsersViewModel";
import ListUsersState from "../../application/states/listUsersState";
import { ReactNode } from "react";
import Invitation from "@/apps/auth/domain/models/invitation";
import Profile from "@/apps/auth/domain/models/profile";
import UserListComponent from "../components/UserListComponent";
import BaseButton from "@/common/components/buttons/BaseButton";




export default class ListUsersView extends ViewModelView<ListUsersViewModel, unknown,  ListUsersState>{
    onCreateViewModel(state: ListUsersState): ListUsersViewModel {
        return new ListUsersViewModel(state, this.setState.bind(this));
    }
    onCreateState(): ListUsersState {
        return new ListUsersState();
    }

    private invitationToProfile(invitation: Invitation): Profile{
        return new Profile(
            "Not Set",
            invitation.role,
            "",
            invitation.to,
            invitation.orgId,
            invitation.id
        )
    }

    onCreateMain(): ReactNode {
        return (
            <div className="p-10">
                <div className="flex">
                    <h2 className="text-xl font-bold">Employees</h2>
                    <a href="/base/staff-management/register/" className="ml-auto block">
                        <BaseButton><i className="fa-solid fa-plus mr-5"></i> Add </BaseButton>
                    </a>
                </div>

                <div className="mt-10">
                    <div className="flex px-5">
                        {
                            [
                                "ID",
                                "E-Mail",
                                "Department",
                                "Role",
                                "Action"
                            ].map(
                                (title) => (
                                    <h3 className="font-bold mx-auto px-10 w-1/5">{title}</h3>
                                )
                            )
                        }
                    </div>
                    <div className="mt-10">
                        
                        {
                            this.state.invitations!.map(
                                (invitation) => <UserListComponent user={this.invitationToProfile(invitation)}/>
                            )
                        }
                        {
                            this.state.users!.map(
                                (user) => <UserListComponent user={user}/>
                            )
                        }

                    </div>
                </div>
            </div>
        )
    }

}