import { FieldComponent, FieldComponentProps } from '@/common/components/form/FieldComponent';
import React from 'react';
import { Status } from '../../domain/models/assetRequest';

export default class RequestStatusSelectionFieldComponent extends FieldComponent<Status, FieldComponentProps<Status>> {
  protected constructInputNode(value: Status | null, callback: (value: Status | null) => void): React.ReactNode {
    return (
      <select className="bg-light w-full py-3 rounded-xl px-4 border-gray" value={Status[value ?? Status.pending]} onChange={(event) => {
        callback(Status[event.target.value as keyof typeof Status]);
      }}>
        {Object.keys(Status)
          .filter(key => isNaN(Number(key)))
          .map((key) => (
            <option key={key} value={key}>
              {key}
            </option>
          ))}
      </select>
    );
  }
}
