import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import RequestPasswordResetState from "../states/requestPasswordResetState";
import AuthRepository from "../../infrastructure/repositories/authRepository";
import RepositoryProvider from "@/di/repositoryProviders";



export default class RequestPasswordResetViewModel extends AsyncViewModel<RequestPasswordResetState>{

    private repository = RepositoryProvider.provide(AuthRepository);

    async submit(){
        await this.asyncCall(
            async () => {
                this.state.form.validate(true);
                await this.repository.requestPasswordReset(
                    this.state.form.email.getValue()!
                )
            }
        );
    }

}