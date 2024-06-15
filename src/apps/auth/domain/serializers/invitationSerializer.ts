import Serializer from "@/common/serializers/serializer";
import Invitation from "../models/invitation";
import TimeStampSerializer from "@/common/serializers/timestampSerializer";

export default class InvitationSerializer extends Serializer<Invitation, Array<unknown>> {

    private timestampSerializer = new TimeStampSerializer();

    serialize(instance: Invitation): unknown[] {
        return [instance.role, instance.id, instance.to, instance.orgId, instance.name]; // Include createDatetime
    }

    deserialize(data: unknown[]): Invitation {
        console.log(data[5]);
        return new Invitation(
            data[1] as string,
            data[2] as string,
            data[0] as number,
            data[3] as string,
            data[4] as string,
            this.timestampSerializer.deserialize(Number(data[5]))
        );
    }
}