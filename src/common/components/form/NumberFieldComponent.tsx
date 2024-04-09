import { ReactNode } from "react";
import { FieldComponent, FieldComponentProps } from "./FieldComponent";



export default class NumberFieldComponent extends FieldComponent<number, FieldComponentProps<number>>{
	
	protected constructInputNode(value: number | null, callback: Function): ReactNode {
		return (
			<input className="w-full rounded h-14 px-3 text-black placeholder-[#575757] text-xl lg:h-16 border-[#D6D6D6] border-[3px] " type="number" onChange={(event) => {callback(event.target.value)}} value={(value === null)?"":value} />
		)
	}

}