import Serializer from "@/common/serializers/serializer";
import Department from "../models/department";

export default class DepartmentSerializer extends Serializer<Department, Array<unknown>> {

    serialize(instance: Department): unknown[] {
        return [
            instance.id, 
            instance.name, 
            instance.headId,
            instance.orgId
        ];
    }

    deserialize(data: unknown[]): Department {
        return new Department(
            data[0] as string,
            data[1] as string,
            data[2] as string,
            data[3] as string
        );
    }
}
