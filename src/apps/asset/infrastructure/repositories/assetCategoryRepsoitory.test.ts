import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import AssetCategory from "../../domain/models/assetCategory";
import AssetCategoryRepository from "./assetCategoryRepository";
import AssetRepository from "./assetRepository";
// Mock dependencies
jest.mock("@/apps/auth/infrastructure/repositories/authRepository");
jest.mock("./assetRepository");

describe("AssetCategoryRepository", () => {
    let assetCategoryRepository: AssetCategoryRepository;
    let authRepositoryMock: jest.Mocked<AuthRepository>;
    let assetRepositoryMock: jest.Mocked<AssetRepository>;

    beforeEach(() => {

        authRepositoryMock = AuthRepository.prototype as jest.Mocked<AuthRepository>;
        assetRepositoryMock = AssetRepository.prototype as jest.Mocked<AssetRepository>;        
        assetCategoryRepository = new AssetCategoryRepository();
    });
    it("should initialize correctly", () => {
        expect(assetCategoryRepository).toBeDefined();
        expect(assetCategoryRepository["authRepository"]).toBeInstanceOf(AuthRepository);
    });
    it("should call preSave and set the orgId and parentId",async ()=>{
        const instance = new AssetCategory("cat-1","category");
        instance.parent = {id:"parent1"} as AssetCategory;
        authRepositoryMock.getOrgId.mockResolvedValue("org1");

        await assetCategoryRepository.preSave(instance);

        expect(authRepositoryMock.getOrgId).toHaveBeenCalled();
        expect(instance.orgId).toBe("org1");
        expect(instance.parentId).toBe("parent1");
    })

    it("should attach foreign keys correctly",async ()=>{
        const instance = new AssetCategory("cat-1","category");
        instance.parentId = "parent1";
        const parentCategory = new AssetCategory("cat-2","parentCategory");
        assetCategoryRepository.getById = jest.fn().mockResolvedValue(parentCategory);

        await assetCategoryRepository.attachForeignKeys(instance);

        expect(assetCategoryRepository.getById).toHaveBeenCalledWith("parent1")
        expect(instance.parent).toBe(parentCategory);
    })

    it("should delete related assets before deleting a category", async ()=>{
        const instance = new AssetCategory("cat-1","category");
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const assets = [{id:"asset1"}, {id:"asset-2"}] as any;
        assetRepositoryMock.filterByCategory.mockResolvedValue(assets);
        await assetCategoryRepository.preDelete(instance);
        expect(assetRepositoryMock.filterByCategory).toHaveBeenCalledWith(instance);
    })
}
);