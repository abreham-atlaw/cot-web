import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import DashboardBaseState from "../states/dashboardBaseState";
import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus";
import RepositoryProvider from "@/di/repositoryProviders";



export default class DashboardBaseViewModel extends AsyncViewModel<DashboardBaseState>{

    private authRepository = RepositoryProvider.provide(AuthRepository);

    public async onInit(): Promise<void> {
        await super.onInit();
        this.state.status = await this.authRepository.getAuthenticationStatus();
        if(this.state.status === AuthenticationStatus.none){
            return;
        }
        this.state.user = await this.authRepository.whoAmI();
    }

}