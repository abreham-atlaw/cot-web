import CoreProviders from "@/di/coreProviders";
import GenerateReportRequest from "../requests/generateReportRequest";
import AssetRepository from "@/apps/asset/infrastructure/repositories/assetRepository";
import AssetCategoryRepository from "@/apps/asset/infrastructure/repositories/assetCategoryRepository";
import AssetRequestRepository from "@/apps/asset/infrastructure/repositories/assetRequestRepository";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import AssetMaintenanceRequestRepository from "@/apps/asset/infrastructure/repositories/assetMaintenanceRequestRepository";
import { Status } from "@/apps/asset/domain/models/assetRequest";



export default class ReportRepository {

    private networkClient = CoreProviders.provideNetworkClient();
    private assetRepository = new AssetRepository();
    private categoryRepository = new AssetCategoryRepository();
    private assetRequestRepository = new AssetRequestRepository();
    private profileRepository = new ProfileRepository();
    private assetMaintenanceRepository = new AssetMaintenanceRequestRepository();
    
    private async getAssetSummary(){
        const assets = await this.assetRepository.getAll();
        const allocated_assets = assets.filter((asset) => asset.isAllocated).length;
        const unallocated_assets = assets.filter((asset) => !asset.isAllocated).length;
        return {
            "total_assets": assets.length,
            "allocated_assets": allocated_assets,
            "unallocated_assets": unallocated_assets
        }
    }


    private async getAssetCategorySummary(){
        const categories = await this.categoryRepository.getAll();
        return {
            "total_categories": categories.length,
        };
    }

    private async getMaintenanceRequestSummary(){
        const requests = await this.assetMaintenanceRepository.getAll();
        const pendingRequests = requests.filter((request) => request.status === Status.pending).length;
        const approvedRequests = requests.filter((request) => request.status === Status.approved).length;
        const rejectedRequests = requests.filter((request) => request.status === Status.rejected).length;
        return {
            "total_requests": requests.length,
            "pending_requests": pendingRequests,
            "approved_requests": approvedRequests,
            "rejected_requests": rejectedRequests
        }
    }

    private async getAssetRequestSummary(){
        const requests = await this.assetRequestRepository.getAll();
        const pendingRequests = requests.filter((request) => request.status === Status.pending).length;
        const approvedRequests = requests.filter((request) => request.status === Status.approved).length;
        const rejectedRequests = requests.filter((request) => request.status === Status.rejected).length;
        return {
            "total_requests": requests.length,
            "pending_requests": pendingRequests,
            "approved_requests": approvedRequests,
            "rejected_requests": rejectedRequests
        }
    }

    private async getProfileSummary(){
        const profiles = await this.profileRepository.getAll();
        return {
            "total_profiles": profiles.length,
        }
    }

    async generateReport(): Promise<string>{
        const data = {
            "asset_summary": await this.getAssetSummary(),
            "asset_category_summary": await this.getAssetCategorySummary(),
            "maintenance_request_summary": await this.getMaintenanceRequestSummary(),
            "asset_request_summary": await this.getAssetRequestSummary(),
            "profile_summary": await this.getProfileSummary()
        }

        return await this.networkClient.execute(new GenerateReportRequest(data));
    }

}
