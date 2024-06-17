import { FieldComponent, FieldComponentProps } from '@/common/components/form/FieldComponent';
import React from 'react';
import AssetCategory from '../../domain/models/assetCategory';

interface AssetCategorySelectionFieldComponentProps extends FieldComponentProps<AssetCategory> {
    categories: AssetCategory[];
    nullable?: boolean;
}

export default class AssetCategorySelectionFieldComponent extends FieldComponent<AssetCategory, AssetCategorySelectionFieldComponentProps>{
    
    private getById = (value: unknown): (AssetCategory | null) => {
        if(value === ''){
            return null;
        }
        console.log(value, " Selected");
        return this.props.categories.filter(
            (category) => category.id! === value
        )[0] ?? null;
    }

    private getLabel = (category: AssetCategory): string => {
        if(category.parent === undefined){
            return category.name;
        }
        return `${this.getLabel(category.parent)} > ${category.name}`;
    }

    protected constructInputNode(value: AssetCategory | null, callback: (value: AssetCategory | null) => void): React.ReactNode {
        if(value == null && !this.props.nullable){
            callback(this.props.categories[0]);
        }
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
                
                
                {this.props.categories.map((category) => (
                    <option key={category.id} value={category.id!}>
                        {this.getLabel(category)}
                    </option>
                ))}
            </select>
        )
    }
}
