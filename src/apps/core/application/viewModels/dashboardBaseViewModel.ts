import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import DashboardBaseState from "../states/dashboardBaseState";
import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import AssetRepository from "@/apps/asset/infrastructure/repositories/assetRepository";
import AssetRequestRepository from "@/apps/asset/infrastructure/repositories/assetRequestRepository";



export default class DashboardBaseViewModel extends AsyncViewModel<DashboardBaseState>{

    private authRepository = new AuthRepository();
    private assetRepository = new AssetRepository();
    private assetRequestRepository = new AssetRequestRepository();

    public async onInit(): Promise<void> {
        await super.onInit();
        this.state.status = await this.authRepository.getAuthenticationStatus();
        this.state.user = await this.authRepository.whoAmI();
        this.state.totalasset = (await this.assetRepository.getAll()).length;
        this.state.totalrequest =  (await this.assetRequestRepository.getAll()).length;
        
    }

}