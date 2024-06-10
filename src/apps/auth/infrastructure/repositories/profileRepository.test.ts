import AuthRepository from '@/apps/auth/infrastructure/repositories/authRepository';
import AssetRequestRepository from '@/apps/asset/infrastructure/repositories/assetRequestRepository';
import AssetMaintenanceRequestRepository from '@/apps/asset/infrastructure/repositories/assetMaintenanceRequestRepository';
import AssetRepository from '@/apps/asset/infrastructure/repositories/assetRepository';
import Profile, { Role } from '@/apps/auth/domain/models/profile';
import Department from '@/apps/core/domain/models/department';
import DepartmentRepository from '@/apps/core/infrastructure/repositories/departmentRepository';
import ProfileSerializer from '../../domain/serializers/profileSerializer';
import ProfileRepository from './profileRepossitory';
import AssetRequest, { Status } from '@/apps/asset/domain/models/assetRequest';
import AssetMaintenanceRequest from '@/apps/asset/domain/models/assetMaintenanceRequest';
import Asset from '@/apps/asset/domain/models/asset';

jest.mock('@/apps/auth/infrastructure/repositories/authRepository');
jest.mock('@/apps/core/infrastructure/repositories/departmentRepository');
jest.mock('@/apps/asset/infrastructure/repositories/assetRequestRepository');
jest.mock('@/apps/asset/infrastructure/repositories/assetMaintenanceRequestRepository');
jest.mock('@/apps/asset/infrastructure/repositories/assetRepository');
jest.mock('../../domain/serializers/profileSerializer');

describe('ProfileRepository', () => {
    let profileRepository: ProfileRepository;
    let mockAuthRepository: jest.Mocked<AuthRepository>;
    let mockDepartmentRepository: jest.Mocked<DepartmentRepository>;
    let mockAssetRequestRepository: jest.Mocked<AssetRequestRepository>;
    let mockAssetMaintenanceRequestRepository: jest.Mocked<AssetMaintenanceRequestRepository>;
    let mockAssetRepository: jest.Mocked<AssetRepository>;
    let mockProfileSerializer: jest.Mocked<ProfileSerializer>;

    beforeEach(() => {
        profileRepository = new ProfileRepository();

        mockAuthRepository = AuthRepository.prototype as jest.Mocked<AuthRepository>;
        mockDepartmentRepository = DepartmentRepository.prototype as jest.Mocked<DepartmentRepository>;
        mockAssetRequestRepository = AssetRequestRepository.prototype as jest.Mocked<AssetRequestRepository>;
        mockAssetMaintenanceRequestRepository = AssetMaintenanceRequestRepository.prototype as jest.Mocked<AssetMaintenanceRequestRepository>;
        mockAssetRepository = AssetRepository.prototype as jest.Mocked<AssetRepository>;
        mockProfileSerializer = ProfileSerializer.prototype as jest.Mocked<ProfileSerializer>;
    });

    it('should initialize correctly', () => {
        expect(profileRepository).toBeInstanceOf(ProfileRepository);
        expect(profileRepository).toHaveProperty('authRepository');
    });

    it('should get profile by user key', async () => {
        const profile = new Profile('Test Profile', Role.staff, 'user-key', 'test@example.com', 'org-id', 'profile-id', 'department-id');
        mockProfileSerializer.deserialize.mockReturnValue(profile);
        
        // Mock the contract method getByUserKey
        jest.spyOn(profileRepository, 'getReadContract').mockResolvedValue({
            getByUserKey: jest.fn().mockImplementation(async () => {
                return { id: 'profile-id' };
            })
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        } as any);

        const result = await profileRepository.getByUserKey('user-key');

        expect(result).toBe(profile);
        expect(mockProfileSerializer.deserialize).toHaveBeenCalledWith({ id: 'profile-id' });
    });

    it('should filter profiles by organization', async () => {
        const profile = new Profile('Test Profile', Role.staff, 'user-key', 'test@example.com', 'org-id', 'profile-id', 'department-id');
        mockAuthRepository.getOrgId.mockResolvedValue('org-id');

        const result = await profileRepository.filterAll(profile);

        expect(result).toBe(true);
    });

    it('should filter profiles by role', async () => {
        const profile1 = new Profile('Profile 1', Role.staff, 'user-key-1', 'user1@example.com', 'org-id', 'profile-id-1', 'department-id');
        const profile2 = new Profile('Profile 2', Role.admin, 'user-key-2', 'user2@example.com', 'org-id', 'profile-id-2', 'department-id');
        jest.spyOn(profileRepository, 'getAll').mockResolvedValue([profile1, profile2]);

        const result = await profileRepository.filterByRole(Role.staff);

        expect(result).toEqual([profile1]);
    });

    it('should filter profiles by department', async () => {
        const department = new Department('department-id', 'Department', 'org-id');
        const profile1 = new Profile('Profile 1', Role.staff, 'user-key-1', 'user1@example.com', 'org-id', 'profile-id-1', 'department-id');
        const profile2 = new Profile('Profile 2', Role.admin, 'user-key-2', 'user2@example.com', 'org-id', 'profile-id-2', 'another-department-id');
        jest.spyOn(profileRepository, 'getAll').mockResolvedValue([profile1, profile2]);

        const result = await profileRepository.filterByDepartment(department);

        expect(result).toEqual([profile1]);
    });
    describe('preSave',()=>{
        it('should update departmentId if departmet is set', async ()=>{
            const profile = new Profile('Profile 1', Role.staff, 'user-key-1', 'user1@example.com', 'org-id', 'profile-id-1', 'old-department-1');
            const department = new Department('department-id', 'Department', 'org-id');
            profile.department = department
            await profileRepository.preSave(profile);
            expect(profile.departmentId).toBe('department-id')
        });

        it('should keep departmentId if department is not set', async () =>{
            const profile = new Profile('Profile 1', Role.staff, 'user-key-1', 'user1@example.com', 'org-id', 'profile-id-1', 'department-id');
            await profileRepository.preSave(profile);
            expect(profile.departmentId).toBe('department-id')
        })
    })

    describe('attachForeignKeys',()=>{
        it('should fetch and attach department if departmentId is set', async ()=>{
            const department = new Department('department-id', 'Department', 'org-id');
            const profile = new Profile('Profile 1', Role.staff, 'user-key-1', 'user1@example.com', 'org-id', 'profile-id-1', 'department-1');
            mockDepartmentRepository.getById.mockResolvedValue(department);
            await profileRepository.attachForeignKeys(profile);
            expect(profile.department).toBe(department);
            expect(mockDepartmentRepository.getById).toHaveBeenCalledWith('department-id');
        });

        it('should not fetch or attach department if departmentId is not set', async()=>{
            const profile = new Profile('Profile 1', Role.staff, 'user-key-1', 'user1@example.com', 'org-id', 'profile-id-1');
            await profileRepository.attachForeignKeys(profile);
            expect(profile.department).toBeUndefined();
          
        })
    });

    describe('preDelete',()=>{
        it('should unassign assets and delete asset requests for the profile', async()=>{
            const profile = new Profile('Profile 1', Role.staff, 'user-key-1', 'user1@example.com', 'org-id', 'profile-id-1', 'department-1');
            const asset1 = new Asset('asset-id-1','Asset 1','category-id',['profile-id'],'org-id');
            const asset2 = new Asset('asset-id-2','Asset 2','category-id',['profile-id'],'org-id');
            const request1 = new AssetRequest('request-id-1','category-id','note', Status.pending, Status.pending, undefined,'profile.id');
            const request2 = new AssetRequest('request-id-2','category-id','note', Status.pending, Status.pending, undefined,'profile.id');
            const maintenanceRequest1 = new AssetMaintenanceRequest('maintenance-id-1','asset-id','note',Status.pending,'image-url','profile-id');
            const maintenanceRequest2 = new AssetMaintenanceRequest('maintenance-id-2','asset-id','note',Status.pending,'image-url','profile-id');

            mockAssetRepository.filterByCurrentOwner.mockResolvedValue([asset1,asset2]);
            mockAssetRequestRepository.filterByUser.mockResolvedValue([request1,request2]);
            mockAssetMaintenanceRequestRepository.filterByUser.mockResolvedValue([maintenanceRequest1,maintenanceRequest2]);

            await profileRepository.preDelete(profile);
            expect(asset1.ownersId).toContain(null);
            expect(asset2.ownersId).toContain(null);
            expect(mockAssetRequestRepository.delete).toHaveBeenCalledWith(request1);
            expect(mockAssetRequestRepository.delete).toHaveBeenCalledWith(request2);
            expect(mockAssetMaintenanceRequestRepository.delete).toHaveBeenCalledWith(maintenanceRequest1);
            expect(mockAssetMaintenanceRequestRepository.delete).toHaveBeenCalledWith(maintenanceRequest2);
        });
    });
});


