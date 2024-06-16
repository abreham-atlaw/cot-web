import EtherModel from "../model/model";
import Serializer from "../serializers/serializer";
import EthersRepository from "./ethersRepository";



export default class EthersModelRepository<M extends EtherModel> extends EthersRepository{

    protected readonly serializer: Serializer<M, Array<unknown>>;

    public attachMode: boolean = true;

    private cache: Map<string, M> = new Map();
    private allCache?: string[]; 

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

    private async getInstanceFromCache(id: string): Promise<M | undefined>{
        return this.cache.get(id);
    }

    private async storeInstanceInCache(instance: M){
        this.cache.set(instance.id!, instance);
    }

    private async getAllFromCache(): Promise<M[]>{

        const all: M[] = [];
        for(const id of this.allCache!){
            all.push(await this.getById(id));
        }
        return all;
    }


    private async storeAllToCache(all: M[]){
        this.allCache = all.map(instance => instance.id!);
        for(const instance of all){
            this.cache.set(instance.id!, instance);
        }
    }

    private async clearCache(){
        this.cache.clear();
        this.allCache = undefined;
    }

    async create(instance: M){
        if(instance.id === undefined){
            instance.id = await this.generateId();
        }
        await this.preSave(instance);
        const contract = await this.getWriteContract();
        const transaction = await contract.create(
            ...this.serializer.serialize(instance), 
            {
                gasPrice: 0
            }
        );
        await transaction.wait()
        await this.attachForeignKeys(instance);
        await this.storeInstanceInCache(await this.getById(instance.id));
    } 

    async update(instance: M){
        await this.preSave(instance);
        const serialized = this.serializer.serialize(instance);
        const transaction = await (await this.getWriteContract()).update(
            ...serialized,
            {
                gasPrice: 0
            }
        );
        await transaction.wait();
        await this.storeInstanceInCache(await this.getById(instance.id));
    }

    async delete(instance: M){
        await this.preDelete(instance);
        const transaction = await (await this.getWriteContract()).deleteInstance(
            instance.id!,
            {
                gasPrice: 0
            }
        );
        await transaction.wait();
        await this.clearCache();
    }

    async getById(id: string): Promise<M>{
        const cached = await this.getInstanceFromCache(id);
        if(cached !== undefined){
            console.log("returning from cache...");
            return cached;
        }
        const contract = await this.getReadContract();
        const response = await contract.getById(id);
        const instance = this.serializer.deserialize(response);
        await this.prepareInstance(instance);
        await this.storeInstanceInCache(instance);
        return instance;
    }

    async getAll(): Promise<M[]>{
        if(this.allCache !== undefined){
            console.log("Returning complete from cache...");
            return await this.getAllFromCache();
        }
        const contract = await this.getReadContract()
        console.log("Fetching all...");
        const response = await contract.getAll();
        const instances = this.serializer.deserializeMany(response);
        const filtered = [];

        await Promise.all(instances.map(async instance => {
            await this.prepareInstance(instance);
            if(await this.filterAll(instance)){
                filtered.push(instance);
                await this.storeInstanceInCache(instance);
            }
        }));
        // for(const instance of instances){
        //     await this.prepareInstance(instance);
        //     await this.storeInstanceInCache(instance);
        //     if(await this.filterAll(instance)){
        //         filtered.push(instance);
        //     }
        // }
        await this.storeAllToCache(filtered);
        return filtered;
    }

   
    async prepareInstance(instance: M){
        if(this.attachMode){
            await this.attachForeignKeys(instance);
        }
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async attachForeignKeys(instance: M){

    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async preSave(instance: M){

    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async filterAll(instance: M): Promise<boolean>{
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async preDelete(instance: M){

    }

}


export class InstanceNotFoundException extends Error{
    
}