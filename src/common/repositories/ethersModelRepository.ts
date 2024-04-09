import EtherModel from "../model/model";
import Serializer from "../serializers/serializer";
import EthersRepository from "./ethersRepository";



export default class EthersModelRepository<M extends EtherModel> extends EthersRepository{

    private readonly serializer: Serializer<M, Array<unknown>>;

    constructor(abi: object[], address: string, serializer: Serializer<M, Array<unknown>>){
        super(abi, address);
        this.serializer = serializer;
    }

    async generateId(): Promise<string> {
        return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            const r = Math.random() * 16 | 0,
                v = c === 'x' ? r : (r & 0x3 | 0x8);
            return v.toString(16);
        });
    }

    async create(instance: M){
        if(instance.id === undefined){
            instance.id = await this.generateId();
        }
        await this.preSave(instance);
        const contract = await this.getWriteContract();
        await contract.create(
            ...this.serializer.serialize(instance), 
            {
                gasPrice: 0
        
            }
        );
    } 

    async update(instance: M){
        await this.preSave(instance);
        await (await this.getWriteContract()).update(
            ...this.serializer.serialize(instance),
            {
                gasPrice: 0
        
            }
        );
    }

    async getById(id: string): Promise<M>{
        const response = await (await this.getReadContract()).getById(id);
        const instance = this.serializer.deserialize(response);
        await this.attachForeignKeys(instance);
        return instance;
    }

    async getAll(): Promise<M[]>{
        const contract = await this.getReadContract()
        const response = await contract.getAll();
        const instances = this.serializer.deserializeMany(response);
        for(const instance of instances){
            await this.attachForeignKeys(instance);
        }
        return instances.filter((instance) => this.filterAll(instance));
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async attachForeignKeys(instance: M){

    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async preSave(instance: M){

    }

    async filterAll(instance: M): Promise<boolean>{
        return true;
    }

}