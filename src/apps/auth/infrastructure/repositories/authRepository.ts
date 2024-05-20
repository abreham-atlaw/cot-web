import DepartmentRepository from "@/apps/core/infrastructure/repositories/departmentRepository";
import AuthProviders from "../../../../di/authProviders";
import CoreProviders from "../../../../di/coreProviders";
import AuthenticationStatus from "../../domain/models/authenticationStatus";
import Profile, { Role } from "../../domain/models/profile";
import LoginRequest from "../requests/loginRequest";
import SignupRequest from "../requests/signupRequest";
import ProfileRepository from "./profileRepossitory";
import RequestPasswordResetRequest from "../requests/requestPasswordResetRequest";
import VerifyResetTokenRequest from "../requests/verifyResetTokenRequest";
import ResetPasswordRequest from "../requests/resetPasswordRequest";


export default class AuthRepository{


    private readonly networkClient = CoreProviders.provideNetworkClient();
    private readonly keyPairStorage = AuthProviders.provideKeyPairStorage();
    private orgId?: string;

    get profileRepository(): ProfileRepository{
        return new ProfileRepository();
    }

    get departmentRepository(): DepartmentRepository{
        return new DepartmentRepository();
    }

    async login(username: string, password: string){
        const keyPair = await this.networkClient.execute(new LoginRequest(username, password));
        await this.keyPairStorage.store(keyPair);
    }

    async logout(){
        this.keyPairStorage.clean();
    }

    async signup(
        username: string | null, 
        invitationId: string | null,
        password: string,
    ){
        const keyPair = await this.networkClient.execute(new SignupRequest(username, invitationId, password));
        await this.keyPairStorage.store(keyPair);
    }

    async completeProfile(
        username: string, 
        name: string, 
        role: Role,
        organizationId: string
    ){
        const keyPair = await AuthProviders.provideKeyPair();
        await this.profileRepository.create(new Profile(
            name, 
            role,
            keyPair!.publicKey,
            username,
            organizationId
        ));
    }

    async whoAmI(): Promise<Profile>{
        const keyPair = await AuthProviders.provideKeyPair();
        return await this.profileRepository.getByUserKey(keyPair!.publicKey);
    }

    async requestPasswordReset(email: string): Promise<void>{
        await this.networkClient.execute(new RequestPasswordResetRequest(email));
    }

    async verifyResetToken(token: string): Promise<boolean>{
        try{
            await this.networkClient.execute(new VerifyResetTokenRequest(token));
            return true;
        } catch(ex){
            return false;
        }
    }

    async resetPassword(token: string, password: string): Promise<void>{
        return await this.networkClient.execute(new ResetPasswordRequest(token, password));
    }

    async getAuthenticationStatus(): Promise<AuthenticationStatus>{
        try{
            const profile = await this.whoAmI();
            if(profile.organizationId === undefined){
                return AuthenticationStatus.organization;
            }
            switch(profile.role){
                case Role.admin:
                    return AuthenticationStatus.admin;
                case Role.department:
                    return AuthenticationStatus.department;
                case Role.hr:
                    return AuthenticationStatus.hr;
                case Role.inventory:
                    return AuthenticationStatus.inventory;
                case Role.staff:
                    return AuthenticationStatus.staff;
            }
        }
        catch(ex){
            return AuthenticationStatus.none;
        }
        return AuthenticationStatus.none;

    }

    async getOrgId(): Promise<string>{
        if(this.orgId === undefined){
            this.orgId = (await this.whoAmI()).organizationId!;
        }
        return this.orgId!;
    }

}