import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import Profile, { Role } from "../../domain/models/profile";
import contract from "@/assets/contactBuilds/auth/src_contracts_Profile_sol_Profile.json"
import ProfileSerializer from "../../domain/serializers/profileSerializer";
import AuthRepository from "./authRepository";
import DepartmentRepository from "@/apps/core/infrastructure/repositories/departmentRepository";
import AssetRequestRepository from "@/apps/asset/infrastructure/repositories/assetRequestRepository";
import AssetMaintenanceRequestRepository from "@/apps/asset/infrastructure/repositories/assetMaintenanceRequestRepository";
import AssetRepository from "@/apps/asset/infrastructure/repositories/assetRepository";
import Department from "@/apps/core/domain/models/department";
import RepositoryProvider from "@/di/repositoryProviders";


export default class ProfileRepository extends EthersModelRepository<Profile>{

    private authRepository = RepositoryProvider.provide(AuthRepository);

    constructor(){
        super(
            contract.abi,
            contract.address,
            new ProfileSerializer(),
            "profile"
        );
    }

    get departmentRepository(): DepartmentRepository{
        const repository = RepositoryProvider.provide(DepartmentRepository);
        repository.attachMode = false;
        return repository;
    }
    
    get assetRequestRepository(): AssetRequestRepository{
        return RepositoryProvider.provide(AssetRequestRepository);
    }

    get assetMaintenanceRequestRepository(): AssetMaintenanceRequestRepository{
        return RepositoryProvider.provide(AssetMaintenanceRequestRepository);
    }

    get assetRepository(): AssetRepository{
        return RepositoryProvider.provide(AssetRepository);
    }

    async getByUserKey(key: string): Promise<Profile>{
        const response = await (await this.getReadContract()).getByUserKey(key);
        const decrypted = await this.decrypt(response);
        const instance = this.serializer.deserialize(decrypted);
        await this.attachForeignKeys(instance);
        return instance;
    }

    async filterAll(instance: Profile): Promise<boolean> {
        const orgId = await this.authRepository.getOrgId();
        return instance.organizationId === orgId;
    }

    async filterByRole(role: Role): Promise<Profile[]>{
        return (await this.getAll()).filter(
            (profile) => profile.role === role
        );
    }

    async filterByAvailableHead(): Promise<Profile[]>{

        const headsIds = (await this.departmentRepository.getAll()).map(
            (department) => department.headId
        );
        return (await this.filterByRole(Role.department)).filter(
            (profile) => !headsIds.includes(profile.id)
        );
    }

    async filterByDepartment(department: Department): Promise<Profile[]>{
        return (await this.getAll()).filter(
            (profile) => profile.departmentId === department.id
        );
    }

    async preSave(instance: Profile): Promise<void> {
        instance.departmentId = instance.department?.id ?? instance.departmentId;
    }

    async attachForeignKeys(instance: Profile): Promise<void> {
        if(instance.departmentId != undefined){
            instance.department = await this.departmentRepository.getById(instance.departmentId!);
        }
    }

    async preDelete(instance: Profile): Promise<void> {
        for(const asset of (await this.assetRepository.filterByCurrentOwner(instance))){
            asset.setOwner();
            await this.assetRepository.update(asset);
        }
        for(const request of (await this.assetRequestRepository.filterByUser(instance))){
            await this.assetRequestRepository.delete(request);
        }
        for(const request of (await this.assetMaintenanceRequestRepository.filterByUser(instance))){
            await this.assetMaintenanceRequestRepository.delete(request);
        }
    }

    protected getEncryptedFields(): number[] {
        return [2, 4];
    }

}