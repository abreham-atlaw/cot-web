import Serializer from "@/common/serializers/serializer";
import Invitation from "../models/invitation";


export default class InvitationSerializer extends Serializer<Invitation, Array<unknown>> {
    serialize(instance: Invitation): unknown[] {
        return [instance.role, instance.id, instance.to, instance.orgId, instance.name];
    }

    deserialize(data: unknown[]): Invitation {
        return new Invitation(
            data[1] as string,
            data[2] as string,
            data[0] as number,
            data[3] as string,
            data[4] as string
        );
    }
}
