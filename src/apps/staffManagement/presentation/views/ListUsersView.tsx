import Profile, { Role } from "@/apps/auth/domain/models/profile";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import ListModelView from "@/apps/core/presentation/views/ListModelView";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";



export default class ListProfilesView extends ListModelView<Profile>{
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getModalChild(modalClose: () => void) {
        return null
    }
  
    onCreateRepository(): EthersModelRepository<Profile> {
        return new ProfileRepository();
    }

    getInstanceValues(instance: Profile): string[] {
        return [instance.id!.split("-")[0], instance.name, instance.email, Role[instance.role].toUpperCase()];
    }

    getHeadings(): string[] {
        return ["ID", "Name", "E-Mail", "Role"];
    }

    getAddInstanceLink(): string {
        return "/base/invitation/write";
    }

    getEditInstanceLink(instance: Profile): string {
        return `/base/Profile/edit/${instance.id!}`;
    }
    
    onDelete(): void {
        throw new Error("Method not implemented.");
    }

    getTitle(): string {
        return "Employees"
    }


}