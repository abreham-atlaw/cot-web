import AuthProviders from "../../../../di/authProviders";
import CoreProviders from "../../../../di/coreProviders";
import AuthenticationStatus from "../../domain/models/authenticationStatus";
import Profile, { Role } from "../../domain/models/profile";
import LoginRequest from "../requests/loginRequest";
import SignupRequest from "../requests/signupRequest";
import ProfileRepository from "./profileRepossitory";


export default class AuthRepository{


    private readonly networkClient = CoreProviders.provideNetworkClient();
    private readonly keyPairStorage = AuthProviders.provideKeyPairStorage();
    private orgId?: string;

    get profileRepository(): ProfileRepository{
        return new ProfileRepository();
    }

    async login(username: string, password: string){
        const keyPair = await this.networkClient.execute(new LoginRequest(username, password));
        await this.keyPairStorage.store(keyPair);
    }

    async signup(
        username: string, 
        password: string,
    ){
        const keyPair = await this.networkClient.execute(new SignupRequest(username, password));
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
            console.log(this.orgId)
        }
        return this.orgId!;
    }



}