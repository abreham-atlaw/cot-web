import Serializer from "../../../../common/serializers/serializer";
import Item from "../models/item";


export default class ItemSerializer extends Serializer<Item, Array<unknown>>{
    
    serialize(instance: Item): unknown[] {
        return [instance.id, instance.name, instance.quantity];
    }
    deserialize(data: unknown[]): Item {
        return {
            id: data[0] as string,
            name: data[1] as string,
            quantity: Number(data[2])
        };
    }



}