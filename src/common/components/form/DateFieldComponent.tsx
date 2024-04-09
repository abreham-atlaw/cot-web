import { ReactNode } from "react";
import { FieldComponent, FieldComponentProps } from "./FieldComponent";

export default class DateFieldComponent extends FieldComponent<Date, FieldComponentProps<Date>> {
  protected constructInputNode(value: Date | null, callback: Function): ReactNode {
    const dateString = value ? value.toISOString().substr(0, 10) : "";

    return (
      <input
        className="w-full rounded h-14 px-3 text-black placeholder-[#575757] text-xl lg:h-16 border-[#D6D6D6] border-[3px]"
        type="date"
        value={dateString}
        onChange={(event) => {
          const dateValue = event.target.value;
          const date = new Date(dateValue);
          callback(date);
        }}
      />
    );
  }
}