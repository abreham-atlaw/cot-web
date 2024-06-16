import Invitation from "@/apps/auth/domain/models/invitation";
import Profile, { Role } from "@/apps/auth/domain/models/profile";
import InvitationRepository from "@/apps/auth/infrastructure/repositories/invitationRepository";
import ListModelView from "@/apps/core/presentation/views/ListModelView";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import { ReactNode } from "react";
import RegisterUserView from "./RegisterUserView";
import RepositoryProvider from "@/di/repositoryProviders";
import PermissionConfigs, { Pages } from "@/configs/permissionConfigs";
import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus";

export default class ListInvitationsView extends ListModelView<Invitation>{
    getModalChild(modalClose: () => void, instance?: Invitation, close?: () => void): ReactNode {
        return <RegisterUserView onCloseModal={modalClose} close={close} />
    }
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getDetailLink(_instance: Invitation): string {
        return "";
    }
    
    // getModalChild(modalClose: () => void): ReactNode {
    //     return <RegisterUserView onCloseModal={modalClose} />
    // }

    
    onCreateRepository(): EthersModelRepository<Invitation> {
        return RepositoryProvider.provide(InvitationRepository);
    }

    getInstanceValues(instance: Invitation): string[] {
        return [instance.id!.split("-")[0], instance.name, Role[instance.role].toUpperCase(), instance.to, instance.createDatetime.toLocaleDateString()];
    }

    getHeadings(): string[] {
        return ["ID", "Name", "Role", "E-Mail", "Date"];
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

    getAllowedAuthenticationStatus(): AuthenticationStatus[] {
        return PermissionConfigs.VISIT_PERMISSIONS[Pages.staff]!;
    }

}