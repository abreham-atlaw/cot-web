import React from "react";
import LoadingView from "./LoadingView";
import ErrorView from "./FailedView";
import ViewModel from "../../viewmodel/viewmodel";
import BaseState from "../../state/baseState";
import { AsyncStatus } from "../../state/asyncState";



export default abstract class ViewModelView<V extends ViewModel<S>, P = {}, S extends BaseState = BaseState, SS=any> extends React.Component<P, S, SS>{
	
	private _viewModel?: V

	constructor(props: P){
		super(props);
		this.state = this.onCreateState()
		this._viewModel = this.onCreateViewModel(this.state)
	}

	protected get viewModel(): V{
		return this._viewModel!;
	}

	protected getViewModel(): V{
		return this._viewModel!
	}

	abstract onCreateViewModel(state: S): V

	abstract onCreateState(): S

	componentDidMount(): void {
		this.getViewModel().initialize()
	}

	
	

	onCreateMain(): React.ReactNode{
		return (<></>);
	}

	onCreateLoading(): React.ReactNode{
		return <LoadingView/>
	}

	onCreateError(error: Error | null): React.ReactNode{
		return <ErrorView error={error} />
	}

	render(): React.ReactNode {
		if(this.state.initState.status === AsyncStatus.loading || this.state.initState.status === AsyncStatus.none){
			return this.onCreateLoading();
		}
		if(this.state.initState.status === AsyncStatus.failed){
			return this.onCreateError(this.state.initState.error);
		}
		return this.onCreateMain();

	}


}