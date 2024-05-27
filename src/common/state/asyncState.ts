import BaseState from "./baseState";


export enum AsyncStatus{
	none = 0, 
	loading = 1,
	done = 2,
	failed = 3
}

export class AsyncState extends BaseState{

	public status: AsyncStatus;
	public error: Error | null;

	constructor(status: AsyncStatus = AsyncStatus.none, error: (Error | null) = null, context?: object){
		super(context);
		this.status = status;
		this.error = error;
	}

}
