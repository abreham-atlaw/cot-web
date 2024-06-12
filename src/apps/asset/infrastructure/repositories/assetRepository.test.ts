import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import AssetCategory from "../../domain/models/assetCategory";
import AssetCategoryRepository from "./assetCategoryRepository";
import Profile, { Role } from "@/apps/auth/domain/models/profile";
import Asset from "../../domain/models/asset";
import AssetRepository from "./assetRepository";
import AssetMaintenanceRequestRepository from "./assetMaintenanceRequestRepository";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import AssetMaintenanceRequest from "../../domain/models/assetMaintenanceRequest";

// Mock dependencies
jest.mock("@/apps/auth/infrastructure/repositories/authRepository");
jest.mock("./assetCategoryRepository");
jest.mock("@/apps/auth/infrastructure/repositories/profileRepossitory");
jest.mock("./assetMaintenanceRequestRepository");

describe("AssetRepository", () => {
    let assetRepository: AssetRepository;
    let authRepositoryMock: jest.Mocked<AuthRepository>;
    let categoryRepositoryMock: jest.Mocked<AssetCategoryRepository>;
    let profileRepositoryMock: jest.Mocked<ProfileRepository>;
    let maintenanceRequestRepositoryMock: jest.Mocked<AssetMaintenanceRequestRepository>;

    beforeEach(() => {
        authRepositoryMock = AuthRepository.prototype as jest.Mocked<AuthRepository>;
        categoryRepositoryMock = AssetCategoryRepository.prototype as jest.Mocked<AssetCategoryRepository>;
        profileRepositoryMock = ProfileRepository.prototype as jest.Mocked<ProfileRepository>;
        maintenanceRequestRepositoryMock = AssetMaintenanceRequestRepository.prototype as jest.Mocked<AssetMaintenanceRequestRepository>;

        assetRepository = new AssetRepository();
    });

    it("should initialize correctly", () => {
        expect(assetRepository).toBeDefined();
        expect(assetRepository["authRepository"]).toBeInstanceOf(AuthRepository);
    });

    it("should call preSave and set the orgId and categoryId", async () => {
        const asset = new Asset(undefined, "Test Asset", "categoryId", [null], undefined);
        authRepositoryMock.getOrgId.mockResolvedValue("orgId");

        await assetRepository.preSave(asset);

        expect(authRepositoryMock.getOrgId).toHaveBeenCalled();
        expect(asset.orgId).toBe("orgId");
        expect(asset.categoryId).toBe("categoryId");
    });

    it("should return true for admin roles and current owner in filterAll", async () => {
        const asset = new Asset(undefined, "Test Asset", "categoryId", ["ownerId"], "orgId");
        const me = new Profile("user", Role.admin, "userKey", "email", "orgId", "ownerId");

        authRepositoryMock.whoAmI.mockResolvedValue(me);
        authRepositoryMock.getOrgId.mockResolvedValue("orgId");

        const result = await assetRepository.filterAll(asset);

        expect(result).toBe(true);
    });

    it("should attach foreign keys correctly", async () => {
        const asset = new Asset(undefined, "Test Asset", "categoryId", ["ownerId"], "orgId");
        const category = new AssetCategory("categoryId", "CategoryName");
        const owner = new Profile("user", Role.staff, "userKey", "email", "orgId", "ownerId");

        categoryRepositoryMock.getById.mockResolvedValue(category);
        profileRepositoryMock.getById.mockResolvedValue(owner);

        await assetRepository.attachForeignKeys(asset);

        expect(categoryRepositoryMock.getById).toHaveBeenCalledWith("categoryId");
        expect(profileRepositoryMock.getById).toHaveBeenCalledWith("ownerId");
        expect(asset.category).toBe(category);
        expect(asset.currentOwner).toBe(owner);
    });

    it("should delete all maintenance requests for the asset in preDelete", async () => {
        const asset = new Asset(undefined, "Test Asset", "categoryId", ["ownerId"], "orgId");
        const maintenanceRequest = new AssetMaintenanceRequest("requestId", "assetId", "note", 0, "image", "userId");

        maintenanceRequestRepositoryMock.filterByAsset.mockResolvedValue([maintenanceRequest]);

        await assetRepository.preDelete(asset);

        expect(maintenanceRequestRepositoryMock.delete).toHaveBeenCalledWith(maintenanceRequest);
    });

    it("should return assets with the given category in filterByCategory", async () => {
        const category = new AssetCategory("categoryId", "CategoryName");
        const asset1 = new Asset(undefined, "Asset1", "categoryId", ["ownerId"], "orgId");
        const asset2 = new Asset(undefined, "Asset2", "categoryId", ["ownerId"], "orgId");

        // Mock the getAll method to return assets
        assetRepository.getAll = jest.fn().mockResolvedValue([asset1, asset2]);

        const result = await assetRepository.filterByCategory(category);

        expect(result).toEqual([asset1, asset2]);
        expect(assetRepository.getAll).toHaveBeenCalled();
    });
});