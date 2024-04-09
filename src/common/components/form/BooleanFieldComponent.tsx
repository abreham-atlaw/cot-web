import { ReactNode } from "react";
import { FieldComponent, FieldComponentProps } from "./FieldComponent";



interface BooleanFieldComponentProps extends FieldComponentProps<boolean>{

	onText?: string;
	offText?: string;

}

export default class BooleanFieldComponent extends FieldComponent<boolean, BooleanFieldComponentProps>{
	
	protected constructInputNode(value: boolean | null, callback: Function): ReactNode {
		value = value === true;
		return (
			<label className='flex cursor-pointer select-none items-center'>
				<div className='relative'>
				<input
					type='checkbox'
					checked={value}
					onChange={() => callback(!(value))}
					className="sr-only"
				/>
				<div className={`box ${!value ? 'bg-black' : 'bg-[#00A3FF]'} block h-14 w-32 rounded-full`}>
					<p className={`box ${!value ? 'hidden': 'absolute'} top-4 left-5 text-white`}>{this.props.onText ?? "ON"}</p>
					<p className={`box ${!value ? 'absolute' : 'hidden'} top-4 right-5 text-white`}>{this.props.offText ?? "OFF"}</p>
				</div>
				<div
					className={`dot absolute top-1 bg-white flex h-12 w-12 items-center justify-center rounded-full transition  ${
					!value ? 'left-1' : 'right-1'
					}`}
				></div>
				</div>
			</label>
		)

	}

} 
