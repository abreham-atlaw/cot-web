import Cookies from "js-cookie";
import KeyPair from "../../apps/auth/domain/models/keyPair";


export default abstract class KeyPairStorage{

	abstract store(keyPair: KeyPair): Promise<void>;

	abstract get(): Promise<KeyPair | null>

}


export class CookieKeyPairStorage extends KeyPairStorage{

    private static readonly PUBLIC_KEY = "AUTH_KEYPAIR_PUBLIC";
    private static readonly PRIVATE_KEY =  "AUTH_KEYPAIR_PRIVATE"

	async store(keyPair: KeyPair): Promise<void> { // TODO: I KNOW THIS IS NOT SECURE. WILL FIX IT LATER
		await Cookies.set(CookieKeyPairStorage.PUBLIC_KEY, keyPair.publicKey);
		await Cookies.set(CookieKeyPairStorage.PRIVATE_KEY, keyPair.privateKey);
	}
	async get(): Promise<KeyPair | null> {

        const keys = [CookieKeyPairStorage.PUBLIC_KEY, CookieKeyPairStorage.PRIVATE_KEY].map(
            (key) => Cookies.get(key) ?? null
        )
        if(keys.includes(null)){
            return null;
        }
        return {
            publicKey: keys[0],
            privateKey: keys[1]
        }
	}

}