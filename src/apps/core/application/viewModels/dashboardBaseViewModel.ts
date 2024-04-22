import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import DashboardBaseState from "../states/dashboardBaseState";
import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";



export default class DashboardBaseViewModel extends AsyncViewModel<DashboardBaseState>{

    private authRepository = new AuthRepository();

    public async onInit(): Promise<void> {
        await super.onInit();
        this.state.status = await this.authRepository.getAuthenticationStatus();
        this.state.user = await this.authRepository.whoAmI();
    }

}