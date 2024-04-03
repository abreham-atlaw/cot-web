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
        return {
            publicKey: "0x5b499C99a0EE0bC43a40D13ddd70E06215B41683",
            privateKey: "0x7827006323572b03bd18d167e369d88a47def8fd6168f06933261dee4941c448"
        }
        return await AuthProviders.provideKeyPairStorage().get();
    }

}