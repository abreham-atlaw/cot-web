import { Contract } from "ethers";
import CoreProviders from "../../di/coreProviders";
import { InterfaceAbi } from "ethers";



export default class EthersRepository{

    private wallet = CoreProviders.provideWallet();
    private provider = CoreProviders.providerEtherProvider();
    private abi: InterfaceAbi;
    private address: string;
    public _signerContract?: Contract;
    public _providerContract?: Contract;

    constructor(
        abi: object[],
        address: string,
    ){
        this.abi = abi;
        this.address = address;
    }

    async getWriteContract(): Promise<Contract>{
        if(this._signerContract === undefined){
            this._signerContract = new Contract(this.address, this.abi, await this.wallet);
        }
        return this._signerContract!;
    }

    async getReadContract(): Promise<Contract>{
        if(this._providerContract === undefined){
            this._providerContract = new Contract(this.address, this.abi, this.provider);
        }
        return this._providerContract!;
    }

    async getNonce(): Promise<number> {
        const transactionCount = await this.provider.getTransactionCount(this.address);
        return transactionCount + 2;
    }

}