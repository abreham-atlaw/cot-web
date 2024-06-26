import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import ListUsersState from "../states/listUsersState";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import InvitationRepository from "@/apps/auth/infrastructure/repositories/invitationRepository";
import RepositoryProvider from "@/di/repositoryProviders";



export class ListUsersViewModel extends AsyncViewModel<ListUsersState>{

    private profileRepository = RepositoryProvider.provide(ProfileRepository);
    private invitationRepository = RepositoryProvider.provide(InvitationRepository);

    public async onInit(): Promise<void> {
        await super.onInit();
        this.state.users = await this.profileRepository.getAll();
        this.state.invitations = await this.invitationRepository.getAll();
    }


}