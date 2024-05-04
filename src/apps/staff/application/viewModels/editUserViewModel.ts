import Profile from "@/apps/auth/domain/models/profile";
import EditModelViewModel from "@/common/viewmodel/editModelViewModel";
import UserForm from "../forms/userForm";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import EditUserState from "../states/editUserState";
import DepartmentRepository from "@/apps/core/infrastructure/repositories/departmentRepository";


export default class EditUserViewModel extends EditModelViewModel<Profile, UserForm>{
    
    private departmentRepository = new DepartmentRepository();

    protected syncFormToModel(form: UserForm, model: Profile): void {
        model.department = form.department.getValue() ?? undefined;
        model.role = form.role.getValue()!;
    }
    
    protected syncModelToForm(model: Profile, form: UserForm): void {
        form.department.value = model.department ?? null;
        form.role.value = model.role;
    }
    
    protected initRepository(): EthersModelRepository<Profile> {
        return new ProfileRepository();
    }
    
    protected createInstance(): Profile {
        throw Error("Can't create a profile");
    }

    public async onInit(): Promise<void> {
        await super.onInit();
        (this.state as EditUserState).departments = await this.departmentRepository.getAll();
    }

}