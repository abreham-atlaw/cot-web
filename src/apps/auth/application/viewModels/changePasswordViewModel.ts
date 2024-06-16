import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import ChangePasswordState from "../states/changePasswordState";
import AuthRepository from "../../infrastructure/repositories/authRepository";
import RepositoryProvider from "@/di/repositoryProviders";


export default class ChangePasswordViewModel extends AsyncViewModel<ChangePasswordState>{


    private repository = RepositoryProvider.provide(AuthRepository);

    async changePassword(){
        await this.asyncCall(
            async () => {
                await this.state.form.validate(true);
                await this.repository.changePassword(
                    this.state.form.oldPassword.getValue()!,
                    this.state.form.newPassword.getValue()!
                )
            }
        );
    }

}