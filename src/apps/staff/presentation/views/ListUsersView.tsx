import Profile, { Role } from "@/apps/auth/domain/models/profile";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import ListModelView from "@/apps/core/presentation/views/ListModelView";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import RegisterUserView from "./RegisterUserView";
import EditUserView from "./EditUserView";



export default class ListProfilesView extends ListModelView<Profile>{
    
    getDetailLink(instance: Profile): string {
        return `/base/staff/detail?id=${instance.id}`;
    }

    getModalChild(modalClose: () => void, instance?: Profile,close?:()=>void) {
        if(instance === undefined){
            return <RegisterUserView onCloseModal={modalClose} close={close}/>
        }
        return <EditUserView closeModal={modalClose} id={instance!.id!} close={close}/>
    }
  
    onCreateRepository(): EthersModelRepository<Profile> {
        return new ProfileRepository();
    }

    getInstanceValues(instance: Profile): string[] {
        return [instance.id!.split("-")[0], instance.name, Role[instance.role].toUpperCase(), instance.department?.name ?? "Not Assigned", instance.createDateTime.toLocaleDateString()];
    }

    getHeadings(): string[] {
        return ["ID", "Name", "Role", "Department", "Date"];
    }

    getAddInstanceLink(): string {
        return "/base/invitation/write";
    }

    getEditInstanceLink(instance: Profile): string {
        return `/base/Profile/edit/${instance.id!}`;
    }
    

    getTitle(): string {
        return "Employees"
    }


}