import Department from '@/apps/core/domain/models/department';
import { FieldComponent, FieldComponentProps } from '@/common/components/form/FieldComponent';
import React from 'react';


interface DepartmentSelectionFieldComponentProps extends FieldComponentProps<Department> {
    departments: Department[];
    nullable?: boolean;
}

export default class DepartmentSelectionFieldComponent extends FieldComponent<Department, DepartmentSelectionFieldComponentProps>{
    
    private getById = (value: unknown): (Department | null) => {
        if(value === ''){
            return null;
        }
        return this.props.departments.filter(
            (department) => department.id! === value
        )[0] ?? null;
    }

    private getLabel = (department: Department): string => {
        return department.name;
    }

    protected constructInputNode(value: Department | null, callback: (value: Department | null) => void): React.ReactNode {
        return (
            <select className="bg-light w-full py-3 rounded-xl px-4 border-gray" value={value?.id ?? ''} onChange={(event) => {callback(this.getById(event.target.value));}}>
                {
                    (this.props.nullable ?? false)?
                    (
                        <option  value="">
                            None
                        </option>
                    ):
                    (<></>)
                }
                {this.props.departments.map((department) => (
                    <option key={department.id} value={department.id!}>
                        {this.getLabel(department)}
                    </option>
                ))}
            </select>
        )
    }
}
