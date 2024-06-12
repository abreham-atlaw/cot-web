import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import DashboardState from "../states/dashboardState";
import AssetRepository from "@/apps/asset/infrastructure/repositories/assetRepository";
import AssetRequestRepository from "@/apps/asset/infrastructure/repositories/assetRequestRepository";
import AssetCategoryRepository from "@/apps/asset/infrastructure/repositories/assetCategoryRepository";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import Asset from "@/apps/asset/domain/models/asset";
import AssetRequest, { Status } from "@/apps/asset/domain/models/assetRequest";
import ReportRepository from "../../infrastructure/repositories/reportRepository";



export default class DashboardViewModel extends AsyncViewModel<DashboardState>{

    private assetRepository = new AssetRepository();
    private requestRepository = new AssetRequestRepository();
    private categoryRepository = new AssetCategoryRepository();
    private profileRepository = new ProfileRepository();
    private reportRepository = new ReportRepository();
    
    public async onInit(): Promise<void> {
        const startTime = performance.now();
    
        await super.onInit();
    
        const [assets, requests, users, categoryAssetCounts] = await Promise.all([
            this.assetRepository.getAll(),
            this.requestRepository.getAll(),
            this.profileRepository.getAll(),
            this.categoryRepository.getCategoryCount()
        ]);
  
        this.state.assets = assets;
        this.state.requests = requests;
        this.state.users = users;
        this.state.categoryAssetCounts = categoryAssetCounts;
    
        this.state.totalAssets = this.state.assets.length;
        this.state.availableAssets = this.getAssetCounts(this.state.assets, false);
        this.state.assignedAssets = this.getAssetCounts(this.state.assets, true);
    
        this.state.totalRequests = this.state.requests.length;
        this.state.pendingRequests = this.getRequestCounts(this.state.requests, Status.pending);
        this.state.approvedRequests = this.getRequestCounts(this.state.requests, Status.approved);
        this.state.rejectedRequests = this.getRequestCounts(this.state.requests, Status.rejected);
    
        const endTime = performance.now();
        const executionTime = endTime - startTime;
        console.log(`Execution time: ${executionTime} milliseconds`);
    }

    private getAssetCounts(assets: Asset[], isAssigned: boolean): number{
        return assets.filter(
            (asset) => asset.isAllocated === isAssigned
        ).length;
    }

    private getRequestCounts(requests: AssetRequest[], status: Status): number{
        return requests.filter(
            (request) => request.status === status
        ).length;
    }

    async generateReport(){
        await this.asyncCall(
            async () => {
                const link = await this.reportRepository.generateReport();
                window.open(link, "blank");
            }
        )
    }

}