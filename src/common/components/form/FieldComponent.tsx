import Field from "@/lib/forms/fields";
import React from "react";


export interface FieldComponentProps<T>{

	field: Field<T>
	syncer?: Function
	onChanged?: Function
}

export interface FieldComponentState<T>{

	field: Field<T>

}

export abstract class FieldComponent<T, P extends FieldComponentProps<T>> extends React.Component<P, FieldComponentState<T>>{

	private sync?: Function
	private externalOnChanged?: Function

	constructor(props: P){
		super(props);
		this.state = {
			field: props.field
		}
		this.sync = props.syncer
		this.externalOnChanged = props.onChanged
	}

	protected getField(): Field<T>{
		return this.props.field;
	}

	private onChange = async (value: T) => {
		this.setState({
			field: this.getField()
		})
		await this.getField().setValue(value);
		this.setState({
			field: this.getField()
		})
		if(this.sync != undefined){
			this.sync();
		}
		if(this.externalOnChanged != undefined){
			this.externalOnChanged(value)
		}
	}

	protected abstract constructInputNode(value: T|null, callback: Function): React.ReactNode

	protected constructErrorTextNode(value: T | null, error: string | null): React.ReactNode{
		return (
			<p className="text-red-500 ">{String(value)} is not a valid value. Error: {error}</p>
		)
	}

	protected generateID(prefix: string = "ID"): string{
		return `${prefix}-${Math.random()}`
	}

	render(): React.ReactNode {
		return(
			<div>
			{this.constructInputNode(this.getField().getValue(), this.onChange)}
			{
				(this.getField().error != null)?this.constructErrorTextNode(this.getField().getValue(), this.getField().error):<></>
			}
			</div>
		)
	}

}