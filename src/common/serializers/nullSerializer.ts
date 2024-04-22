import Serializer from "./serializer";



class IdentitySerializer<T> extends Serializer<T, T>{

    serialize(instance: T): T {
        return instance;
    }

    deserialize(data: T): T {
        return data;
    }

}

export default class NullableSerializer<F, T> extends Serializer<(null | F), (string | T)>{
    
    private serializer: Serializer<F, T>;

    constructor(serializer?: Serializer<F, T>){
        super();
        if(serializer === undefined){
            serializer = (new IdentitySerializer<F>()) as unknown as Serializer<F, T>;
        }
        this.serializer = serializer;
    }

    serialize(instance: F | null): string | T {
        if(instance === null){
            return "";
        }
        return this.serializer.serialize(instance);
    }
    deserialize(data: string | T): F | null {
        if(data === ""){
            return null;
        }
        return this.serializer.deserialize(data as T);
    }




}