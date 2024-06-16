import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import ResetPasswordState from "../states/resetPasswordState";
import AuthRepository from "../../infrastructure/repositories/authRepository";
import RepositoryProvider from "@/di/repositoryProviders";


export default class ResetPasswordViewModel extends AsyncViewModel<ResetPasswordState>{


    private repository = RepositoryProvider.provide(AuthRepository);

    public async onInit(): Promise<void> {
        await super.onInit();
        this.state.isTokenValid = await this.repository.verifyResetToken(this.state.token);
    }

    async reset(){
        await this.asyncCall(
            async () => {
                await this.state.form.validate(true);
                await this.repository.resetPassword(
                    this.state.token,
                    this.state.form.password.getValue()!
                )
            }
        )
    }

}