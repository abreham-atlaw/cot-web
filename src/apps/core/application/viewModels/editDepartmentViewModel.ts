import EditModelViewModel from "@/common/viewmodel/editModelViewModel";
import Department from "../../domain/models/department";
import DepartmentForm from "../forms/departmentForm";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import DepartmentRepository from "../../infrastructure/repositories/departmentRepository";
import EditDepartmentState from "../states/editDepartmentState";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import { Role } from "@/apps/auth/domain/models/profile";
import RepositoryProvider from "@/di/repositoryProviders";



export default class EditDepartmentViewModel extends EditModelViewModel<Department, DepartmentForm>{
    
    private profileRepository = RepositoryProvider.provide(ProfileRepository);

    protected async syncFormToModel(form: DepartmentForm, model: Department): Promise<void> {
        model.head = form.head.getValue()!;
        model.name = form.name.getValue()!;
    }
    
    protected syncModelToForm(model: Department, form: DepartmentForm): void {
        form.head.value = model.head!;
        form.name.value = model.name;
    }
    
    protected initRepository(): EthersModelRepository<Department> {
        return RepositoryProvider.provide(DepartmentRepository);
    }
    
    protected createInstance(): Department {
        return new Department(
            undefined,
            "",
            ""
        )
    }

    public async onInit(): Promise<void> {
        await super.onInit();
        (this.state as EditDepartmentState).users = await this.profileRepository.filterByRole(Role.department);
    }

}