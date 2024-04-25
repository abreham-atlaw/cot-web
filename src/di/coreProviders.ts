import { Wallet } from "ethers";
import AuthProviders from "./authProviders";
import { Provider } from "ethers";
import { JsonRpcProvider } from "ethers";
import DataConfigs from "../configs/dataConfigs";
import NetworkClient from "../common/network/NetworkClient";
// import KeyPair from "@/apps/auth/domain/models/keyPair";



export default class CoreProviders{

    private static etherProvider?: Provider;
    static networkClient?: NetworkClient;

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


}