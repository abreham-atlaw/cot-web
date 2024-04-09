import Serializer from "@/common/serializers/serializer";
import Profile from "../models/profile";

export default class ProfileSerializer extends Serializer<Profile, Array<unknown>> {
    serialize(instance: Profile): unknown[] {

        return [instance.role, instance.id, instance.name, instance.userKey, instance.email, instance.organizationId ?? ""];
    }

    deserialize(data: unknown[]): Profile {
        return new Profile(
            data[2] as string,
            data[0] as number,
            data[3] as string,
            data[4] as string,
            data[5] as string,
            data[1] as string
        );
    }
}
