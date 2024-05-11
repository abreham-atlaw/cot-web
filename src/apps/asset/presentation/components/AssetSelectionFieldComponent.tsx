import { FieldComponent, FieldComponentProps } from '@/common/components/form/FieldComponent';
import React from 'react';
import Asset from '../../domain/models/asset';

interface AssetSelectionFieldComponentProps extends FieldComponentProps<Asset> {
    assets: Asset[];
    nullable?: boolean;
}

export default class AssetSelectionFieldComponent extends FieldComponent<Asset, AssetSelectionFieldComponentProps>{
    
    private getById = (value: unknown): (Asset | null) => {
        if(value === ''){
            return null;
        }
        return this.props.assets.filter(
            (asset) => asset.id! === value
        )[0] ?? null;
    }

    private getLabel = (asset: Asset): string => {
        return asset.name;
    }

    protected constructInputNode(value: Asset | null, callback: (value: Asset | null) => void): React.ReactNode {
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
                {this.props.assets.map((asset) => (
                    <option key={asset.id} value={asset.id!}>
                        {this.getLabel(asset)}
                    </option>
                ))}
            </select>
        )
    }
}
