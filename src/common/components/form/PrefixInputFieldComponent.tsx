import { ReactNode } from "react";
import Field from "@/lib/forms/fields";
import { FieldComponent } from "./FieldComponent";


type PrefixInputFieldComponentProps = {
    options: string[]
	field: Field<string>
	syncer: Function
}

export default class PrefixInputField extends FieldComponent<string, PrefixInputFieldComponentProps>{
	


	protected constructInputNode(value: string | null, callback: Function): ReactNode {
		let id = this.generateID("phone-select")
		return (
			<div className="flex rounded-md h-14 text-black pl-3 border-[#D6D6D6] border-[3px]  lg:h-16 overflow-hidden">
            <select 
				id={id}
                className="bg-white pr-2">
                {this.props.options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
			<input
                type="text"
                value={value??""}
                onChange={(e) => {callback(e.target.value)}}
                className="w-full pl-4 "
            />


        </div>
		)
	}

}



type UnitFieldComponentProps = {
    options: string[]
	field: Field<number>
	syncer: Function
}

export class UnitFieldComponent extends FieldComponent<number, UnitFieldComponentProps>{
	
	protected constructInputNode(value: number | null, callback: Function): ReactNode {
		let id = this.generateID("phone-select")
		return (
			<div className="flex rounded-md h-14 text-black pl-3 pr-2 border-[#D6D6D6] border-[3px]  lg:h-16 overflow-hidden">
            <select 
				id={id}
                className="bg-white pr-2">
                {this.props.options.map((option, index) => (
                    <option key={index} value={option}>
                        {option}
                    </option>
                ))}
            </select>
			<input
                type="number"
                value={value??""}
                onChange={(e) => {callback(e.target.value)}}
                className="w-full pl-4 "
            />


        </div>
		)
	}

}

// const PhoneNumberFieldComponent: React.FC<PhoneNumberFieldComponentProps> = ({ options, field }) => {
	
// 	const [selectedOption, setSelectedOption] = useState<string>('');

//     return (
//         <div className="flex rounded-md h-14 text-black pl-3 border-[#D6D6D6] border-[3px]  lg:h-16 overflow-hidden">
//             <select 
//                 value={selectedOption}
//                 onChange={(e) => setSelectedOption(e.target.value)}
//                 className="bg-white pr-2">
//                 {options.map((option, index) => (
//                     <option key={index} value={option}>
//                         {option}
//                     </option>
//                 ))}
//             </select>

//             <TextFieldComponent field={field}/>
//         </div>
//     );
// }


// export default PhoneNumberFieldComponent