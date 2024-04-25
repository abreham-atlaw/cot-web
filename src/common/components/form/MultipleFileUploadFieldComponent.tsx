// import { FormEvent, ReactNode } from "react";
// import { FieldComponent, FieldComponentProps, FieldComponentState } from "./FieldComponent";


// import Upload from "@/assets/Upload.png"



// export interface MutliFileUploadFieldComponentProps extends FieldComponentProps<string[]>{

// 	fileStorage: FileStorage

// }

// class MultiFileUploadState extends AsyncState implements FieldComponentState<string[]>{
	
// 	field: Field<string[]>;

// 	constructor(field: Field<string[]>, status?: AsyncStatus, error: any = null){
// 		super(status, error);
// 		this.field = field;
// 	}

// }

// export class MultiFileUploadViewModel extends AsyncViewModel<MultiFileUploadState>{

// 	private fileStorage: FileStorage

// 	constructor(state: MultiFileUploadState, stateSetter: Function, fileStorage: FileStorage){
// 		super(state, stateSetter)
// 		this.fileStorage = fileStorage;
// 	}

// 	async upload(value: File[], callback: Function) {
// 		await this.asyncCall(async () => {
//             let urls = [];
//             for(let file of value){
//                 urls.push(await this.fileStorage.store(file));
//             }
//             callback(urls);
// 		})
// 		if(this.state.error != null){
// 			this.state.field.error = this.state.error.message;
// 		}
// 		this.syncState()
// 	}

//     async remove(idx: number){
//         this.state.field.getValue()?.splice(idx, 1);
//         this.syncState()
//     }

// }

// export default class MultiFileUploadFieldComponent extends FieldComponent<string[], MutliFileUploadFieldComponentProps>{
	
// 	private viewModel: MultiFileUploadViewModel

// 	constructor(props: MutliFileUploadFieldComponentProps){
// 		super(props);
// 		this.state = new MultiFileUploadState(this.state.field);
// 		this.viewModel = new MultiFileUploadViewModel(this.state as MultiFileUploadState, this.setState.bind(this), props.fileStorage);
// 	}

// 	private async onFileChanged(value: FileList | null | undefined, callback: Function){
// 		if(value === null || value === undefined){
// 			return
// 		}
//         let files = [];
//         for(let i=0; i<value.length; i++){
//             files.push(value.item(i)!);
//         }
// 		await this.viewModel.upload(files, (urls: string) => {
//             if(this.getField().getValue() === null || this.getField().getValue() === undefined){
//                 this.getField().setValue([]);
//             }
//             callback(this.getField().getValue()?.concat(urls));
//         })
//         this.viewModel.syncState();
// 	}

// 	protected getPreview(url: string | null): React.ReactNode{
// 		if(url === null){
// 			return (<>No Input</>)
// 		}
// 		return (<div>
// 			{url}
// 		</div>)
// 	}


//     removeImage = (idx: number) => {
//         this.viewModel.remove(idx);
//     }


// 	protected constructInputNode(value: string[] | null, callback: Function): ReactNode {

// 		let id = this.generateID("image-upload")

// 		if((this.state as MultiFileUploadState).status === AsyncStatus.loading){
// 			return (<div>uploading...</div>)
// 		}

//         return <div className="flex flex-col p-6 justify-center items-center border-dashed border-2 rounded-lg border-[#D6D6D6]">
// 			<div className="flex flex-col lg:flex-row justify-between items-center w-full">
// 				<img className="h-16 bg-contain" src={Upload}  />
// 				<div className="mb-2 lg:mb-0 text-center lg:text-start">
// 					<p className="text-xl  font-medium">Upload your images here</p>
// 					<p className="text-xl  text-[#D6D6D6]">Supported formates: JPEG, JPG</p>
// 					<p className="text-md  text-black">Upload 3-5 photos</p>
// 				</div>
// 				<label htmlFor="image-upload" className="flex justify-center items-center px-12  h-11 bg-white text-black rounded-full border-2 border-[#D6D6D6] cursor-pointer">
// 				<p className="justify-center text-xl">Browse</p>
// 				</label>
// 				<input 
// 					id="image-upload"
// 					type="file"
// 					accept="image/*"
// 					multiple
// 					onChange={(event) => {this.onFileChanged(event.target.files, callback)}}
// 					className="hidden"
// 				/>
// 			</div>
//             <div className="flex flex-wrap px-8">
//                 {value?.map((image, idx) => (
//                     <div key={idx} className="w-32 h-48 mr-3 relative">
//                         <img src={image} className="object-cover w-full h-full mt-4" alt=""/>
// 						<button className="absolute top-2 right-2 bg-red-500 text-white font-bold px-2 rounded-full" onClick={() => this.removeImage(idx)}>X</button>
//                     </div>
//                 ))}
//             </div>
//         </div>

// 	}

// }


