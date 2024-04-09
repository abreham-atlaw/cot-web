import Model from "@/lib/models/model";
import { FieldComponent, FieldComponentProps } from "./FieldComponent";
import { ReactNode, useState } from "react";
import ReactSelect, { SingleValue } from 'react-select';

interface PrimaryKeyComponentProps<P, M extends Model<P>> extends FieldComponentProps<P> {
  choices: M[];
}

export class PrimaryKeyFieldComponent<P, M extends Model<P>> extends FieldComponent<P, PrimaryKeyComponentProps<P, M>> {

  protected keyToString(pk: P | null): string{
    return new String(pk??"").toString();
  }

  protected constructOption(item: M | null) : {value: P | null, label: ReactNode}{
    if(item === null){
        return {
            value: null,
            label: "Select an option"
        };
    }
    return {
      value: item.getPK(),
      label: this.keyToString(item.getPK())
    };
  }

  protected getItem(pk: P | null): M | null{
    if(pk === null){
        return null;
    }
    return this.props.choices.filter((instance: M) => instance.getPK() === pk)[0];
  }

  protected constructInputNode(value: (P | null), callback: Function): ReactNode {
    const handleChange = (value: SingleValue<{value: P | null, label: ReactNode}>) => {
        callback(value?.value)
    };

    return (
      <ReactSelect
        options={
            this.props.choices.map((item: M) => this.constructOption(item))
        }
        onChange={handleChange}
        value={this.constructOption(this.getItem(value))}
        placeholder=""
        classNames={{
            control: () => "w-full rounded h-14 px-3 text-black placeholder-[#575757] text-xl lg:h-16 border-[#D6D6D6] border-[3px]",
          }}
      />
    );
  }
}