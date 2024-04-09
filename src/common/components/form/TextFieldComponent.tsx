import { ReactNode } from "react";
import { FieldComponent, FieldComponentProps } from "./FieldComponent";



interface TextFieldComponentProps extends FieldComponentProps<string>{
	height?: number;
	placeHolder?: string;
	type?: string;
}

export default class TextFieldComponent extends FieldComponent<string, TextFieldComponentProps>{
	
	protected constructInputNode(value: string | null, callback: Function): ReactNode { 
		return (
			<input 
			className={`w-full rounded px-3 py-2 text-black placeholder-[#575757] border-[#D6D6D6] border-[3px] `} 
			type={this.props.type ?? "text"}
			onChange={(event) => {callback(event.target.value)}} value={(value === null)?"":value} 
			placeholder={this.props.placeHolder??""}
			/>
		)
	}

}

export class TextBoxComponent extends FieldComponent<string, FieldComponentProps<string>>{
	
	protected constructInputNode(value: string | null, callback: Function): ReactNode {
		return (
			<textarea className="flex-1 w-full h-32 px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border-[#D6D6D6] border-[3px] rounded-lg appearance-none focus:outline-none focus:ring-2" name="comment" onChange={(e) => {callback(e.target.value)}} value={value??""}>
			</textarea>
		)
	}

}