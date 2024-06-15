import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import AssetRepository from "./assetRepository";
import AssetMaintenanceRequestRepository from "./assetMaintenanceRequestRepository";
import Asset from "../../domain/models/asset";
import Profile, { Role } from "@/apps/auth/domain/models/profile";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import AssetMaintenanceRequest from "../../domain/models/assetMaintenanceRequest";
import RepositoryProvider from "@/di/repositoryProviders";

// Mock dependencies
jest.mock("@/apps/auth/infrastructure/repositories/authRepository");
jest.mock("./assetRepository");
jest.mock("@/apps/auth/infrastructure/repositories/profileRepossitory");

describe("AssetMaintenanceRequestRepository", () => {
    let assetMaintenanceRequestRepository: AssetMaintenanceRequestRepository;
    let authRepositoryMock: jest.Mocked<AuthRepository>;
    let assetRepositoryMock: jest.Mocked<AssetRepository>;
    let profileRepositoryMock: jest.Mocked<ProfileRepository>;

    beforeEach(() => {
        authRepositoryMock = AuthRepository.prototype as jest.Mocked<AuthRepository>;
        assetRepositoryMock = AssetRepository.prototype as jest.Mocked<AssetRepository>;
        profileRepositoryMock = ProfileRepository.prototype as jest.Mocked<ProfileRepository>;

        assetMaintenanceRequestRepository = RepositoryProvider.provide(AssetMaintenanceRequestRepository);

    });

    it("should initialize correctly", () => {
        expect(assetMaintenanceRequestRepository).toBeDefined();
        expect(assetMaintenanceRequestRepository["authRepository"]).toBeInstanceOf(AuthRepository);
    });

    it("should call preSave and set the assetId and userId", async () => {
        const instance = new AssetMaintenanceRequest("requestId", "assetId", "note", 0, "image", "userId");
        instance.asset = { id: "assetId" } as Asset;
        authRepositoryMock.whoAmI.mockResolvedValue(new Profile("user", Role.staff, "userKey", "email", "orgId", "userId"));

        await assetMaintenanceRequestRepository.preSave(instance);

        expect(instance.assetId).toBe("assetId");
        expect(instance.userId).toBe("userId");
       
    });

    it("should filter maintenance requests by asset", async () => {
        const asset = new Asset("assetId", "Test Asset", "categoryId", ["ownerId"], "orgId");
        const request1 = new AssetMaintenanceRequest("requestId1", "assetId", "note", 0, "image", "userId");
        const request2 = new AssetMaintenanceRequest("requestId2", "assetId", "note", 0, "image", "userId");
        const request3 = new AssetMaintenanceRequest("requestId3", "otherAssetId", "note", 0, "image", "userId");

        jest.spyOn(assetMaintenanceRequestRepository, 'getAll').mockResolvedValue([request1, request2, request3]);

        const result = await assetMaintenanceRequestRepository.filterByAsset(asset);

        expect(result).toEqual([request1, request2]);
    });

    it("should filter maintenance requests by user", async () => {
        const user = new Profile("user", Role.staff, "userKey", "email", "orgId", "userId");
        const request1 = new AssetMaintenanceRequest("requestId1", "assetId", "note", 0, "image", "userId");
        const request2 = new AssetMaintenanceRequest("requestId2", "assetId", "note", 0, "image", "otherUserId");

        jest.spyOn(assetMaintenanceRequestRepository, 'getAll').mockResolvedValue([request1, request2]);

        const result = await assetMaintenanceRequestRepository.filterByUser(user);

        expect(result).toEqual([request1]);
    });

    it("should return true for admin roles and the current user in filterAll", async () => {
        const asset = new Asset("assetId", "Test Asset", "categoryId", ["ownerId"], "orgId");
        const request = new AssetMaintenanceRequest("requestId", asset.id, "note", 0, "image", "userId");
        request.asset = asset
        const me = new Profile("user", Role.admin, "userKey", "email", "orgId", "userId");

        authRepositoryMock.whoAmI.mockResolvedValue(me);
        authRepositoryMock.getOrgId.mockResolvedValue("orgId");

        const result = await assetMaintenanceRequestRepository.filterAll(request);

        expect(result).toBe(true);
    });
    it("should attach foreign keys correctly", async () => {
        const request = new AssetMaintenanceRequest("requestId", "assetId", "note", 0, "image", "userId");
        const asset = new Asset("assetId", "Test Asset", "categoryId", ["ownerId"], "orgId");
        const user = new Profile("user", Role.staff, "userKey", "email", "orgId", "userId");

        assetRepositoryMock.getById.mockResolvedValue(asset);
        profileRepositoryMock.getById.mockResolvedValue(user);

        await assetMaintenanceRequestRepository.attachForeignKeys(request);

        expect(assetRepositoryMock.getById).toHaveBeenCalledWith("assetId");
        expect(profileRepositoryMock.getById).toHaveBeenCalledWith("userId");
        expect(request.asset).toBe(asset);
        expect(request.user).toBe(user);
    });
});