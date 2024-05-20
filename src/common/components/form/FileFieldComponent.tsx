import { ReactNode } from "react";
import { FieldComponent, FieldComponentProps } from "./FieldComponent";

interface FileFieldComponentProps extends FieldComponentProps<File> {
  className?: string;
}

export default class FileFieldComponent extends FieldComponent<File, FileFieldComponentProps> {
  protected constructInputNode(value: File | null, callback: (value: File) => void): ReactNode {
    return (
      <input
        className={`${this.props.className ?? " w-full rounded px-3 py-2 text-black placeholder-[#575757] border-[#D6D6D6] border-[3px]  "}`}
        type="file"
        onChange={(event) => {
          const file = event.target.files[0];
          if (file) {
            callback(file);
          }
        }}
      />
    );
  }
}
