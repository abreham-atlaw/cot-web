import BaseState from "../state/baseState";
import { FunctionalAsyncHandler } from "./asyncViewModel";
import { AsyncStatus } from "../state/asyncState";


export default class ViewModel<S extends BaseState>{

	private stateSetter: (state: S) => void;
	public state: S;


	constructor(state: S, stateSetter: (state: S) => void){
		this.stateSetter = stateSetter
		this.state = state;
	}

	public async onInit(){
	}

	protected isReady(): boolean{
		return true;
	}

	public async initialize(){
		if(this.state.initState.status != AsyncStatus.none){
			return;
		}
		const initHandler = new FunctionalAsyncHandler<BaseState>(
			this as never,
			async () => {
				await this.onInit()
			},
			undefined,
			undefined,
			undefined,
			() => {
				return this.state.initState
			}
		)
		await initHandler.handle({});
	}

	public setState(state: S){
		this.stateSetter(state)
		this.state = state;
	}

	public updateAfter(callback: () => void){
		callback()
		this.setState(this.state);
	}

	public syncState(){
		this.setState(this.state);
	}

}
