import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import SignupState, { Stage } from "../states/signupState";
import AuthRepository from "../../infrastructure/repositories/authRepository";
import { Role } from "../../domain/models/profile";
import Organization from "@/apps/core/domain/models/organization";
import OrganizationRepository from "@/apps/core/infrastructure/repositories/organizationRepository";
import InvitationRepository from "../../infrastructure/repositories/invitationRepository";
import RepositoryProvider from "@/di/repositoryProviders";


export default class SignupViewModel extends AsyncViewModel<SignupState>{


    private authRepository = RepositoryProvider.provide(AuthRepository);

    private get invitationRepository(): InvitationRepository{
        return RepositoryProvider.provide(InvitationRepository);
    }

    public async onInit(): Promise<void> {
        await super.onInit();
    }

    async signup(){
        await this.asyncCall(
            async () => {
                await this.state.form.validate(true);
                if(this.state.adminMode){
                    await this.authRepository.signup(
                        this.state.email,
                        null,
                        this.state.form.password.getValue()!
                    );
                } else{
                    await this.authRepository.signup(
                        null,
                        this.state.invitationId!,
                        this.state.form.password.getValue()!
                    )
                }
                if(!this.state.adminMode){
                    this.state.invitation = await this.invitationRepository.getById(this.state.invitationId!);
                    this.state.organizationId = this.state.invitation.orgId;
                }
                if(this.state.organizationId === undefined){
                    this.state.stage = Stage.organization;
                }
                else{
                    await this.completeSignup();
                    await this.invitationRepository.delete(this.state.invitation!);
                }
            }
        );

    }

    async createOrganization(){
        await this.asyncCall(
            async () => {
                const orgRepository = new OrganizationRepository();
                await this.state.orgForm.validate(true);
                const org = new Organization(this.state.orgForm.name.getValue()!);
                await orgRepository.create(org);
                this.state.organizationId = org.id;
                await this.completeSignup();
            }
        )
    }

    private async completeSignup(){
        await this.authRepository.completeProfile(
            this.state.email!,
            this.state.name!,
            this.state.invitation?.role ?? Role.admin,
            this.state.organizationId!
        );
        this.state.stage = Stage.done;
    } 

}