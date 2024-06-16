import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import DashboardBaseState from "../states/dashboardBaseState";
import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus";
import RepositoryProvider from "@/di/repositoryProviders";
import OrganizationRepository from "../../infrastructure/repositories/organizationRepository";



export default class DashboardBaseViewModel extends AsyncViewModel<DashboardBaseState>{

    private authRepository = RepositoryProvider.provide(AuthRepository);
    private orgRepository = RepositoryProvider.provide(OrganizationRepository);

    public async onInit(): Promise<void> {
        await super.onInit();
        this.state.status = await this.authRepository.getAuthenticationStatus();
        if(this.state.status === AuthenticationStatus.none){
            return;
        }
        this.state.user = await this.authRepository.whoAmI();
        this.state.org = await this.orgRepository.getById(this.state.user.organizationId);
    }

}