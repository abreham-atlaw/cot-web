import EthersModelRepository, { InstanceNotFoundException } from "@/common/repositories/ethersModelRepository";
import contract from "@/assets/contactBuilds/core/src_contracts_Department_sol_Department.json";
import Department from "../../domain/models/department";
import DepartmentSerializer from "../../domain/serializers/departmentSerializer";
import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import Profile from "@/apps/auth/domain/models/profile";

export default class DepartmentRepository extends EthersModelRepository<Department>{

    private authRepository = new AuthRepository();
    private profileRepository = new ProfileRepository();

    constructor(){
        super(
            contract.abi,
            contract.address,
            new DepartmentSerializer()
        );
    }

    async preSave(instance: Department): Promise<void> {
        
        instance.orgId = await this.authRepository.getOrgId(); 
        instance.headId = instance.head?.id ?? instance.headId;
        instance.head!.department = instance;
        await this.profileRepository.update(instance.head!);
    }

    async attachForeignKeys(instance: Department): Promise<void> {
        instance.head = await this.profileRepository.getById(instance.headId);
    }

    async filterAll(instance: Department): Promise<boolean> {
        return (instance.orgId === (await this.authRepository.getOrgId()));
    }

    async getByHead(head: Profile): Promise<Department>{
        const departments = (await this.getAll()).filter(
            (department) => department.headId === head.id
        );
        if(departments.length === 0){
            throw new InstanceNotFoundException();
        }
        return departments[0];
    }

}