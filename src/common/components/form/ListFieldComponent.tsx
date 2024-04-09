import React, { ReactNode } from "react";
import { FieldComponent, FieldComponentProps } from "./FieldComponent";
import Field, { ListField } from "@/lib/forms/fields";
import Upload from "@/assets/Upload.png"


interface ListFieldComponentProps<T> extends FieldComponentProps<(T|null)[]>{

	generator: (field: Field<T>, removeCallback: () => void) => React.ReactNode

}


export default class ListFieldComponent<T> extends FieldComponent<(T|null)[], ListFieldComponentProps<T>>{

	private remove(index: number){
		(this.getField() as ListField<T>).pop(index);
	}
	
	protected add(): Field<T> {
		return (this.getField() as ListField<T>).add();
	}

	componentDidMount(): void {
		let field = (this.getField() as ListField<T>);
		if(field.getFields().length === 0){
			field.add();
		}
		this.setState(this.state)
	}

	protected generateContainer(child: React.ReactNode, addCallback: () => Field<T>): React.ReactNode{
		return (
			<div>
				<ul>
					{
						child
					}
				</ul>
				<button className="flex justify-center items-center px-12 mt-4 h-11 bg-white text-black rounded-full border-2 border-[#D6D6D6] cursor-pointer" onClick={() => {this.add()}}>
					<p className="justify-center text-xl">Add</p>
				</button>

			</div>
		)
	}

	protected constructInputNode(_values: (T|null)[] | null, _callback: Function): ReactNode {

		return this.generateContainer(
				<>
				{
					(this.getField() as ListField<T>).getFields().map(
						(field: Field<T>, index: number) => {
							return (
								this.props.generator(field, () => {this.remove(index)})
							);
						})
					}
				</>,
				this.add
			)
	}
}


