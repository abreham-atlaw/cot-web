import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import Profile, { Role } from "../../domain/models/profile";
import contract from "@/assets/contactBuilds/auth/src_contracts_Profile_sol_Profile.json"
import ProfileSerializer from "../../domain/serializers/profileSerializer";
import AuthRepository from "./authRepository";
import DepartmentRepository from "@/apps/core/infrastructure/repositories/departmentRepository";


export default class ProfileRepository extends EthersModelRepository<Profile>{

    private authRepository = new AuthRepository();

    constructor(){
        super(
            contract.abi,
            contract.address,
            new ProfileSerializer()
        );
    }

    get departmentRepository(): DepartmentRepository{
        const repository = new DepartmentRepository();
        repository.attachMode = false;
        return repository;
    }

    async getByUserKey(key: string): Promise<Profile>{
        const response = await (await this.getReadContract()).getByUserKey(key);
        const instance = this.serializer.deserialize(response);
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

    async preSave(instance: Profile): Promise<void> {
        instance.departmentId = instance.department?.id ?? instance.departmentId;
    }

    async attachForeignKeys(instance: Profile): Promise<void> {
        if(instance.departmentId != undefined){
            instance.department = await this.departmentRepository.getById(instance.departmentId!);
        }
    }

}