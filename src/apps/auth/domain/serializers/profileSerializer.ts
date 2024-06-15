import Serializer from "@/common/serializers/serializer";
import Profile from "../models/profile";
import NullableSerializer from "@/common/serializers/nullSerializer";
import TimeStampSerializer from "@/common/serializers/timestampSerializer";

export default class ProfileSerializer extends Serializer<Profile, Array<unknown>> {

    private nullableStringSerializer = new NullableSerializer<string, string>();
    private timestampSerializer = new TimeStampSerializer();

    serialize(instance: Profile): unknown[] {

        return [
            instance.role,
            instance.id, 
            instance.name, 
            instance.userKey, 
            instance.email, 
            this.nullableStringSerializer.serialize(instance.organizationId ?? null),
            this.nullableStringSerializer.serialize(instance.departmentId ?? null)
        ];
    }

    deserialize(data: unknown[]): Profile {
        return new Profile(
            data[2] as string,
            Number(data[0]) as number,
            data[3] as string,
            data[4] as string,
            data[5] as string,
            data[1] as string,
            this.nullableStringSerializer.deserialize(data[6] as string) ?? undefined,
            this.timestampSerializer.deserialize(Number(data[7]))
        );
    }
}
