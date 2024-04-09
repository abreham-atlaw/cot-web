import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import ListUsersState from "../states/listUsersState";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import InvitationRepository from "@/apps/auth/infrastructure/repositories/invitationRepository";



export class ListUsersViewModel extends AsyncViewModel<ListUsersState>{

    private profileRepository = new ProfileRepository();
    private invitationRepository = new InvitationRepository();

    public async onInit(): Promise<void> {
        await super.onInit();
        this.state.users = await this.profileRepository.filterByOrg();
        this.state.invitations = await this.invitationRepository.getAll();
    }


}