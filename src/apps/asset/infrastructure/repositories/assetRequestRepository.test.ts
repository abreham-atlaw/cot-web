import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import AssetCategoryRepository from "./assetCategoryRepository";
import AssetRequestRepository from "./assetRequestRepository";
import AssetRequest, { Status } from "../../domain/models/assetRequest";
import AssetCategory from "../../domain/models/assetCategory";
import Profile, { Role } from "@/apps/auth/domain/models/profile";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import RepositoryProvider from "@/di/repositoryProviders";

// Mock dependencies
jest.mock("@/apps/auth/infrastructure/repositories/authRepository");
jest.mock("./assetCategoryRepository");
jest.mock("@/apps/auth/infrastructure/repositories/profileRepossitory");

describe("AssetRequestRepository", () => {
    let assetRequestRepository: AssetRequestRepository;
    let authRepositoryMock: jest.Mocked<AuthRepository>;
    let categoryRepositoryMock: jest.Mocked<AssetCategoryRepository>;
    let profileRepositoryMock: jest.Mocked<ProfileRepository>;

    beforeEach(() => {
        authRepositoryMock = AuthRepository.prototype as jest.Mocked<AuthRepository>;
        categoryRepositoryMock = AssetCategoryRepository.prototype as jest.Mocked<AssetCategoryRepository>;
        profileRepositoryMock = ProfileRepository.prototype as jest.Mocked<ProfileRepository>;

        assetRequestRepository = RepositoryProvider.provide(AssetRequestRepository);

    });

    it("should initialize correctly", () => {
        expect(assetRequestRepository).toBeDefined();
        expect(assetRequestRepository["authRepository"]).toBeInstanceOf(AuthRepository);
    });

    it("should call preSave and set the categoryId and userId", async () => {
        const instance = new AssetRequest("requestId", "categoryId", "note",Status.pending,Status.pending,"rejectionNote", "userId");
        instance.category = { id: "categoryId" } as AssetCategory;
        authRepositoryMock.whoAmI.mockResolvedValue(new Profile("user", Role.staff, "userKey", "email", "orgId", "userId"));

        await assetRequestRepository.preSave(instance);

        expect(instance.categoryId).toBe("categoryId");
        expect(instance.userId).toBe("userId");

    });

    it("should filter maintenance requests by user", async () => {
        const user = new Profile("user", Role.staff, "userKey", "email", "orgId", "userId");
        const request1 = new AssetRequest("requestId", "categoryId", "note",Status.pending,Status.pending,"rejectionNote", "userId");
        const request2 = new AssetRequest("requestId", "categoryId", "note",Status.pending,Status.pending,"rejectionNote", "userId");

        jest.spyOn(assetRequestRepository, 'getAll').mockResolvedValue([request1, request2]);

        const result = await assetRequestRepository.filterByUser(user);

        expect(result).toEqual([request1,request2]);
    });

    it("should return true for admin roles and the current user in filterAll", async () => {
        const category = new AssetCategory("categoryId", "Category Name", "orgId");
        const request = new AssetRequest("requestId", "categoryId", "note",Status.pending,Status.pending,"rejectionNote", "userId");
        request.category = category;
        const me = new Profile("user", Role.admin, "userKey", "email", "orgId", "userId");

        authRepositoryMock.whoAmI.mockResolvedValue(me);
        authRepositoryMock.getOrgId.mockResolvedValue("orgId");

        const result = await assetRequestRepository.filterAll(request);

        expect(result).toBe(true);
    });

    it("should attach foreign keys correctly", async () => {
        const request = new AssetRequest("requestId", "categoryId", "note",Status.pending,Status.pending,"rejectionNote", "userId");
        const category = new AssetCategory("categoryId", "Category Name", "orgId");
        const user = new Profile("user", Role.staff, "userKey", "email", "orgId", "userId");

        categoryRepositoryMock.getById.mockResolvedValue(category);
        profileRepositoryMock.getById.mockResolvedValue(user);

        await assetRequestRepository.attachForeignKeys(request);

        expect(categoryRepositoryMock.getById).toHaveBeenCalledWith("categoryId");
        expect(profileRepositoryMock.getById).toHaveBeenCalledWith("userId");
        expect(request.category).toBe(category);
        expect(request.user).toBe(user);
    });
});