import { Role } from '@/apps/auth/domain/models/profile';
import { FieldComponent, FieldComponentProps } from '@/common/components/form/FieldComponent';
import React from 'react';


export default class RoleSelectionFieldComponent extends FieldComponent<Role, FieldComponentProps<Role>>{
    
    protected constructInputNode(value: Role | null, callback: Function): React.ReactNode {
        return (
            <select className="bg-light w-full py-3 rounded-xl px-4 border-gray" value={Role[value ?? Role.admin]} onChange={(event) => {callback(Role[event.target.value as keyof typeof Role]);}}>
                {Object.keys(Role)
                    .filter(key => isNaN(Number(key)))
                    .map((key) => (
                        <option key={key} value={key}>
                            {key}
                        </option>
                    ))}
            </select>
        )
    }



}

// export default RoleDropdown;
