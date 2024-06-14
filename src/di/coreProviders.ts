import { Wallet } from "ethers";
import AuthProviders from "./authProviders";
import { Provider } from "ethers";
import { JsonRpcProvider } from "ethers";
import DataConfigs from "../configs/dataConfigs";
import NetworkClient from "../common/network/NetworkClient";
import FileStorage from "@/common/utils/filestorage";
import { CookieLocalStorage, LocalStorage } from "@/common/utils/localStorage";
import Translator from "@/common/utils/translator";


export default class CoreProviders{

    private static etherProvider?: Provider;
    static networkClient?: NetworkClient;
    static fileStorage?: FileStorage;

    static providerEtherProvider(): Provider{
        if(CoreProviders.etherProvider === undefined){
            CoreProviders.etherProvider = new JsonRpcProvider(DataConfigs.RPC_URL);
        }
        return CoreProviders.etherProvider;
    }

    static async provideWallet(): Promise<Wallet>{
        const keyPair = await AuthProviders.provideKeyPair();
        if(keyPair === null){
            throw Error("Keypair not found");
        }
        return new Wallet(keyPair!.privateKey, CoreProviders.etherProvider);
    }

    static provideNetworkClient(): NetworkClient{
		if(this.networkClient === undefined){
			this.networkClient = new NetworkClient(DataConfigs.API_URL);
		}
		return this.networkClient;
	}

    static provideFileStorage(): FileStorage{
        if(this.fileStorage === undefined){
            this.fileStorage = new FileStorage(DataConfigs.FILE_HOST_ADDRESS);
        }
        return this.fileStorage;
    }

    static provideLocalStorage(): LocalStorage{
        return new CookieLocalStorage();
    }


    static provideTranslator(): Translator{
        return new Translator();
    }

}