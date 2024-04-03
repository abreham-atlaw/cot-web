import ViewModel from "./viewmodel";

export default abstract class ContextInjector{

	public abstract inject(context: Record<string, any>, viewModel: ViewModel<any>): Promise<void>;

}