import Invitation from "@/apps/auth/domain/models/invitation";
import Profile, { Role } from "@/apps/auth/domain/models/profile";
import InvitationRepository from "@/apps/auth/infrastructure/repositories/invitationRepository";
import ListModelView from "@/apps/core/presentation/views/ListModelView";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import { ReactNode } from "react";
import RegisterUserView from "./RegisterUserView";

export default class ListInvitationsView extends ListModelView<Invitation>{
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getDetailLink(_instance: Invitation): string {
        throw new Error("Method not implemented.");
    }
    
    getModalChild(modalClose: () => void): ReactNode {
        return <RegisterUserView onCloseModal={modalClose}/>
    }
    
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
    

    getTitle(): string {
        return "Invitations"
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    allowDetail(_instance: Invitation, _me: Profile): boolean {
        return false;
    }

}