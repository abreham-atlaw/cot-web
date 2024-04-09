import KeyPair from "../apps/auth/domain/models/keyPair";
import KeyPairStorage, { CookieKeyPairStorage } from "../common/utils/keyPairStorage";


export default class AuthProviders{

    private static keyPairStorage?: KeyPairStorage;

    static provideKeyPairStorage(): KeyPairStorage{
        if(AuthProviders.keyPairStorage === undefined){
            AuthProviders.keyPairStorage = new CookieKeyPairStorage();
        }
        return AuthProviders.keyPairStorage!;
    }

    static async provideKeyPair(): Promise<KeyPair | null>{
        return await AuthProviders.provideKeyPairStorage().get();
    }

}