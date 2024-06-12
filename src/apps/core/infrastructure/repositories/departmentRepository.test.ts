import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import DepartmentRepository from "./departmentRepository";
import Department from "../../domain/models/department";
import Profile, { Role } from "@/apps/auth/domain/models/profile";
import { InstanceNotFoundException } from "@/common/repositories/ethersModelRepository";


jest.mock('@/apps/auth/infrastructure/repositories/authRepository');
jest.mock("@/apps/auth/infrastructure/repositories/profileRepossitory");

describe('Department Repository',()=>{
    let departmentRepository: DepartmentRepository;
    let mockAuthRepository: jest.Mocked<AuthRepository>;
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    let mockProfileRepository : jest.Mocked<ProfileRepository>;

    beforeEach(()=>{
        departmentRepository = new DepartmentRepository();
        mockAuthRepository = AuthRepository.prototype as jest.Mocked<AuthRepository>;
        mockProfileRepository = ProfileRepository.prototype as jest.Mocked<ProfileRepository>; 
    });

    it('should initialize correctly',()=>{
        expect(departmentRepository).toBeDefined();
        expect(departmentRepository['authRepository']).toBeInstanceOf(AuthRepository);
        expect(departmentRepository['profileRepository']).toBeInstanceOf(ProfileRepository);
    });

    it('should call presave and set the headId and department', async()=>{
        const department = new Department('dep-1','department','headId');
        const profile = new Profile('Profile 1', Role.staff, 'user-key-1', 'user1@example.com', 'org-id', 'profile-id-1', 'department-id');
        profile.id = 'headId';
        department.head = profile
        mockAuthRepository.getOrgId.mockResolvedValue('org-id');
        await departmentRepository.preSave(department);
        expect(department.orgId).toBe('org-id');
        expect(department.headId).toBe('headId');
        expect(department.head!.department).toBe(department);
        expect(mockProfileRepository.update).toHaveBeenCalledWith(profile);
    });

    it('should attachForeinkeys and set head from headId', async ()=>{
        const department = new Department('dep-1','department','headId');
        const profile = new Profile('Profile 1', Role.staff, 'user-key-1', 'user1@example.com', 'org-id', 'profile-id-1', 'department-id');
        department.headId ='headId';
        mockProfileRepository.getById.mockResolvedValue(profile);
        await departmentRepository.attachForeignKeys(department);
  
        expect(department.head).toBe(profile);
    })
    it('should preDelete', async ()=>{
        const department = new Department('department-id','department','headId');
        const profile1 = new Profile('Profile 1', Role.staff, 'user-key-1', 'user1@example.com', 'org-id', 'profile-id-1', 'department-id');
        const profile2 = new Profile('Profile 2', Role.admin, 'user-key-2', 'user2@example.com', 'org-id', 'profile-id-2', 'department-id');
        profile1.department = department;
        profile2.department = department;
        mockProfileRepository.filterByDepartment.mockResolvedValue([profile1, profile2]);
        await departmentRepository.preDelete(department);
  
        expect(profile1.department).toBeUndefined();
        expect(profile1.departmentId).toBeUndefined();
        expect(profile2.department).toBeUndefined();
        expect(profile2.departmentId).toBeUndefined();
        expect(mockProfileRepository.update).toHaveBeenCalledWith(profile1);
        expect(mockProfileRepository.update).toHaveBeenCalledWith(profile2);


    });


      describe('filterAll', () => {
        it('should return true if orgId matches', async () => {
            const department = new Department('department-id','department','headId');
            department.orgId = 'orgId';
      
            mockAuthRepository.getOrgId.mockResolvedValue('orgId');
            const result = await departmentRepository.filterAll(department);
      
            expect(result).toBe(true);
          });
    
          it('should return false if orgId does not match', async () => {
            const department = new Department('department-id','department','headId');
            department.orgId = 'orgId1';
      
            mockAuthRepository.getOrgId.mockResolvedValue('orgId2');
            const result = await departmentRepository.filterAll(department);
      
            expect(result).toBe(false);
          });
      });

      describe('getByHead', () => {
        it('should return department if headId matches', async () => {
          const profile = new Profile('Profile 1', Role.staff, 'user-key-1', 'user1@example.com', 'org-id', 'profile-id-1', 'department-id');          profile.id = 'headId';
          const department = new Department('department-id','department','headId');
          department.headId = 'headId';
    
          jest.spyOn(departmentRepository, 'getAll').mockResolvedValue([department]);
          const result = await departmentRepository.getByHead(profile);
    
          expect(result).toBe(department);
        });
    
        it('should throw InstanceNotFoundException if no department matches', async () => {
            const profile = new Profile('Profile 1', Role.staff, 'user-key-1', 'user1@example.com', 'org-id', 'profile-id-1', 'department-id');
            profile.id = 'headId';
    
          jest.spyOn(departmentRepository, 'getAll').mockResolvedValue([]);
          await expect(departmentRepository.getByHead(profile)).rejects.toThrow(InstanceNotFoundException);
        });
      });

})