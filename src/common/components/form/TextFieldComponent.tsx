import { ReactNode } from "react";
import { FieldComponent, FieldComponentProps } from "./FieldComponent";



interface TextFieldComponentProps extends FieldComponentProps<string>{
	height?: number;
	placeHolder?: string;
	type?: string;
	className?:string;
}

export default class TextFieldComponent extends FieldComponent<string, TextFieldComponentProps>{
	
	protected constructInputNode(value: string | null, callback: (value: string) => void): ReactNode { 
		return (
			<input 
			className={`${this.props.className ?? " w-full rounded px-3 py-2 text-black placeholder-[#575757] border-[#D6D6D6] border-[3px] form-input"}`} 
			type={this.props.type ?? "text"}
			onChange={(event) => {callback(event.target.value)}} value={(value === null)?"":value} 
			placeholder={this.props.placeHolder??""}
			/>
		)
	}

}

export class TextBoxComponent extends FieldComponent<string, FieldComponentProps<string>>{
	
	protected constructInputNode(value: string | null, callback: (value: string) => void): ReactNode {
		return (
			<textarea className="flex-1 w-full h-32 px-4 py-2 text-base text-gray-700 placeholder-gray-400 bg-white border-[#D6D6D6] border-[3px] rounded-lg appearance-none focus:outline-none focus:ring-2 form-textarea" name="comment" onChange={(e) => {callback(e.target.value)}} value={value??""}>
			</textarea>
		)
	}

}

export  class SearchFieldComponent extends TextFieldComponent{
    protected constructInputNode(value: string | null, callback: (value: string) => void): ReactNode { 
		return (
            <div className='w-[60%] mx-auto ml-12'>
            <div className="relative flex items-center w-full h-12 rounded-lg focus-within:shadow-lg shadow-md bg-white overflow-hidden">
                <div className="grid place-items-center h-full w-12 text-gray-300">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                    </svg>
                </div>
        
                <input 
                    className={`${this.props.className ?? "peer h-full w-full outline-none text-sm text-gray-700 pr-2"}`} 
                    type={this.props.type ?? "text"}
                    onChange={(event) => {callback(event.target.value)}} value={(value === null)?"":value} 
                    placeholder={this.props.placeHolder??""}
                    />
            </div>
        </div>
		
		)
	}
}
