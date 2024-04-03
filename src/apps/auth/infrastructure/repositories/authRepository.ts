import AuthProviders from "../../../../di/authProviders";
import CoreProviders from "../../../../di/coreProviders";
import LoginRequest from "../requests/loginRequest";


export default class AuthRepository{


    private readonly networkClient = CoreProviders.provideNetworkClient();
    private readonly keyPairStorage = AuthProviders.provideKeyPairStorage();

    async login(username: string, password: string){
        const keyPair = await this.networkClient.execute(new LoginRequest(username, password));
        await this.keyPairStorage.store(keyPair);
    }

}