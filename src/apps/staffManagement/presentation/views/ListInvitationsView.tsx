import Invitation from "@/apps/auth/domain/models/invitation";
import { Role } from "@/apps/auth/domain/models/profile";
import InvitationRepository from "@/apps/auth/infrastructure/repositories/invitationRepository";
import ListModelView from "@/apps/core/presentation/views/ListModelView";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";

export default class ListInvitationsView extends ListModelView<Invitation>{
    
    onCreateRepository(): EthersModelRepository<Invitation> {
        return new InvitationRepository();
    }

    getInstanceValues(instance: Invitation): string[] {
        return [instance.id!.split("-")[0], Role[instance.role].toUpperCase(), instance.to];
    }

    getHeadings(): string[] {
        return ["ID", "Role", "E-Mail"];
    }

    getAddInstanceLink(): string {
        return "/base/invitation/write";
    }

    getEditInstanceLink(instance: Invitation): string {
        return `/base/invitation/edit/${instance.id!}`;
    }
    
    onDelete(): void {
        throw new Error("Method not implemented.");
    }

    getTitle(): string {
        return "Invitations"
    }

}