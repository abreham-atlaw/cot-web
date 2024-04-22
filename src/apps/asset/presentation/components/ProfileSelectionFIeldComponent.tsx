import Profile, { Role } from '@/apps/auth/domain/models/profile';
import { FieldComponent, FieldComponentProps } from '@/common/components/form/FieldComponent';
import React from 'react';

interface ProfileSelectionFieldComponentProps extends FieldComponentProps<Profile> {
    profiles: Profile[];
}

export default class ProfileSelectionFieldComponent extends FieldComponent<Profile, ProfileSelectionFieldComponentProps>{
    
    private getById = (value: unknown): (Profile | null) => {
        if(value === ""){
            return null;
        }
        return this.props.profiles.filter(
            (profile) => profile.id! === value
        )[0] ?? null;
    }

    protected constructInputNode(value: Profile | null, callback: (value: Profile | null) => void): React.ReactNode {
        return (
            <select className="bg-light w-full py-3 rounded-xl px-4 border-gray" value={value?.id ?? ''} onChange={(event) => {callback(this.getById(event.target.value));}}>
                
                <option key="none" value="">
                    None
                </option>
                
                {this.props.profiles.map((profile) => (
                    <option key={profile.id} value={profile.id!}>
                        {profile.name} ({Role[profile.role].toUpperCase()})
                    </option>
                ))}
            </select>
        )
    }
}
