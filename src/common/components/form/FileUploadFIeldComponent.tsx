import { FormEvent, ReactNode } from "react";
import { FieldComponent, FieldComponentProps, FieldComponentState } from "./FieldComponent";
import FileStorage from "@/lib/filestorage/fileStorage";
import AsyncViewModel from "@/lib/viewmodel/asyncViewModel";
import { AsyncState, AsyncStatus } from "@/lib/state/asyncState";
import Field from "@/lib/forms/fields";

import Upload from "@/assets/Upload.png"



export interface FileUploadFieldComponentProps extends FieldComponentProps<string>{

	fileStorage: FileStorage

}

class FileUploadState extends AsyncState implements FieldComponentState<string>{
	
	field: Field<string>;

	constructor(field: Field<string>, status?: AsyncStatus, error: any = null){
		super(status, error);
		this.field = field;
	}

}

export class FileUploadViewModel extends AsyncViewModel<FileUploadState>{

	private fileStorage: FileStorage

	constructor(state: FileUploadState, stateSetter: Function, fileStorage: FileStorage){
		super(state, stateSetter)
		this.fileStorage = fileStorage;
	}

	async upload(value: File, callback: Function){
		await this.asyncCall(async () => {
			callback(await this.fileStorage.store(value))
		})
		if(this.state.error != null){
			this.state.field.error = this.state.error.message;
		}
		this.syncState()
	}

}

export default class FileUploadFieldComponent extends FieldComponent<string, FileUploadFieldComponentProps>{
	
	private viewModel: FileUploadViewModel

	constructor(props: FileUploadFieldComponentProps){
		super(props);
		this.state = new FileUploadState(this.state.field);
		this.viewModel = new FileUploadViewModel(this.state as FileUploadState, this.setState.bind(this), props.fileStorage);
	}

	private async onFileChanged(value: File | null | undefined, callback: Function){
		if(value === null || value === undefined){
			return
		}
		await this.viewModel.upload(value, callback)
	}

	protected getPreview(url: string | null): React.ReactNode{
		if(url === null){
			return (<>No Input</>)
		}
		return (<div>
			{url}
		</div>)
	}

	protected constructInputNode(value: string | null, callback: Function): ReactNode {

		let id = this.generateID("image-upload")

		if((this.state as FileUploadState).status === AsyncStatus.loading){
			return (<div>uploading...</div>)
		}

		return (
			<div className="flex flex-col p-6 justify-center items-center border-dashed border-2 rounded-lg border-[#D6D6D6]">
				<div className="flex flex-col lg:flex-row justify-between items-center w-full">
					<img className="h-16 bg-contain" src={Upload}  />
					<div className="mb-2 lg:mb-0 text-center lg:text-start">
						<p className="text-xl  font-medium">Upload your files here</p>
						<p className="text-xl  text-[#D6D6D6]">Supported formats: any</p>
					</div>
					<label htmlFor={id} className="flex justify-center items-center px-12  h-11 bg-white text-black rounded-full border-2 border-[#D6D6D6] cursor-pointer">
					<p className="justify-center text-xl">Browse</p>
					</label>
					<input 
						id={id}
						type="file"
						accept=""
						onChange={(event) => {this.onFileChanged(event.target.files?.item(0), callback)}}
						className="hidden"
					/>
				</div>
				<div className="flex flex-wrap px-8 ">
					<div className="w-72 h-min ">
						{
							this.getPreview(this.state.field.getValue())
						}
					</div>
				</div>
			</div>
		)
	}

}



export class ImageUploadFieldComponent extends FileUploadFieldComponent{


	protected getPreview(url: string | null): ReactNode {
		if(url === null){
			return (<></>)
		}
		return (<div>
			<img src={url}/>
		</div>)
	}

}
