import { ValidationException } from "../forms/form";
import { AsyncState, AsyncStatus } from "../state/asyncState";
import BaseState from "../state/baseState";
import ViewModel from "./viewmodel";



export default abstract class AsyncHandler<E, S extends BaseState>{


	private viewModel: ViewModel<S>;

	public constructor(viewModel: ViewModel<S>){
		this.viewModel = viewModel;
	}

	protected extractError(value: unknown): Error{

		if(value instanceof ValidationException){
			return value;
		}
		if(value instanceof TypeError && value.message === "NetworkError when attempting to fetch resource."){
			return new Error("Unable to Connect to the Network. Please Check Your Connection and Try Again.");
		}

		return new Error("An Unexpected Error Occurred. Unfortunately, we encountered an unexpected issue. Please contact our support team for assistance.");

	}

	protected getAsyncState(state: S): AsyncState{
		return state as unknown as AsyncState;
	}


	protected async onError(state: S, error: unknown){
		this.getAsyncState(state).status = AsyncStatus.failed;
		this.getAsyncState(state).error = this.extractError(error);
		await this.viewModel.syncState()
	}

	protected async onDone(state: S){
		this.getAsyncState(state).status = AsyncStatus.done;
		await this.viewModel.syncState()
	}

	protected async onLoading(state: S){
		this.getAsyncState(state).status = AsyncStatus.loading;
		this.getAsyncState(state).error = null;
		await this.viewModel.syncState()
	}

	protected abstract onEvent(viewModel: ViewModel<S>, event: E, state: S): Promise<void>;

	public async handle(event: E){
		await this.onLoading(this.viewModel.state);
		try{
			await this.onEvent(this.viewModel, event, this.viewModel.state);
			await this.onDone(this.viewModel.state);
		}
		catch(ex){
			await this.onError(this.viewModel.state, ex);
		}
	}

}