import { Contract } from "ethers";
import CoreProviders from "../../di/coreProviders";
import { InterfaceAbi } from "ethers";



export default class EthersRepository{

    
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
        const wallet = CoreProviders.provideWallet();
        if(this._signerContract === undefined){
            this._signerContract = new Contract(this.address, this.abi, await wallet);
        }
        return this._signerContract!;
    }

    async getReadContract(): Promise<Contract>{
        console.log(this._providerContract)
        if(this._providerContract === undefined){
            this._providerContract = new Contract(this.address, this.abi, this.provider);
        }
        console.log(this._providerContract)
        console.log(this.address,this.abi)
        return this._providerContract!;
    }

}