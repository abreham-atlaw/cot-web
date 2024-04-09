import { ReactNode } from "react";
import { FieldComponent, FieldComponentProps } from "./FieldComponent";

interface EnumFieldComponentProps extends FieldComponentProps<any> {
  enumClass?: any;
}

export default class EnumFieldComponent<T> extends FieldComponent<any, EnumFieldComponentProps> {
	private enumClass: any;

  constructor(props: EnumFieldComponentProps) {
    super(props);
    this.enumClass = props.enumClass
  }

  protected constructInputNode(value: T | null, callback: Function): ReactNode {
	const radioButtons: ReactNode[] = []
	const keys = Object.keys(this.enumClass).filter((v) => isNaN(Number(v)))
	const values =  Object.values(this.enumClass).filter((v) => !isNaN(Number(v)));

	for(let i=0; i< keys.length; i++){
		radioButtons.push(<div className="flex items-center space-x-2 mr-4">
			<input
			  type="radio"
			  id={keys[i].toString()}
			  name="enum"
			  value={i}
			  checked={i === value}
			  onChange={() => callback(values[i])}
			  className="form-radio text-blue-500 h-5 w-5"
			/>
			<label htmlFor={keys[i]}>{keys[i]}</label>
		  </div>)
	}

    return <div className="flex flex-col lg:flex-row lg:items-end mt-2 lg:mt-5 text-xl lg:pb-3.5">{radioButtons}</div>;
  }
}