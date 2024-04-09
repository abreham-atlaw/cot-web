import Serializer from "@/common/serializers/serializer";
import Organization from "../models/organization";



export default class OrganizationSerializer extends Serializer<Organization, Array<unknown>>{
    
    serialize(instance: Organization): unknown[] {
        return [instance.id, instance.name];
    }
    
    deserialize(data: unknown[]): Organization {
        return {
            id: data[0] as string,
            name: data[1] as string
        };
    }

}