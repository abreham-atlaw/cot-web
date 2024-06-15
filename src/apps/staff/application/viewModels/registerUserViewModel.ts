import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import RegisterUserState from "../states/registerUserState";
import InvitationRepository from "@/apps/auth/infrastructure/repositories/invitationRepository";
import Invitation from "@/apps/auth/domain/models/invitation";
import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import RepositoryProvider from "@/di/repositoryProviders";



export default class RegisterUserViewModel extends AsyncViewModel<RegisterUserState>{

    private invitationRepository = RepositoryProvider.provide(InvitationRepository);
    private authRepository = RepositoryProvider.provide(AuthRepository);

    async registerUser(){
        await this.asyncCall(
            async () => {
                await this.state.form.validate(true);
                const orgId = (await this.authRepository.whoAmI()).organizationId!;
                const invitation = new Invitation(
                    undefined,
                    this.state.form.email.getValue()!,
                    this.state.form.role.getValue()!,
                    orgId,
                    this.state.form.name.getValue()!
                );
                await this.invitationRepository.create(invitation);
            }
        )
    }
}