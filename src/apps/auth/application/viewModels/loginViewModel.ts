import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import LoginState from "../states/loginState";
import AuthRepository from "../../infrastructure/repositories/authRepository";
import RepositoryProvider from "@/di/repositoryProviders";



export default class LoginViewModel extends AsyncViewModel<LoginState>{

    private repository = RepositoryProvider.provide(AuthRepository);

    async login(){
        await this.asyncCall(
            async () => {
                await this.state.form.validate(true);
                await this.repository.login(
                    this.state.form.email.getValue()!,
                    this.state.form.password.getValue()!
                );
            }
        );
    }


}