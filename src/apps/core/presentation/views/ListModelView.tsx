import BaseButton from "@/common/components/buttons/BaseButton";
import ViewModelView from "@/common/components/views/ViewModelView";
import EtherModel from "@/common/model/model";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import ModelListState from "@/common/state/modelListState";
import ModelListViewModel from "@/common/viewmodel/modelListViewModel";
import { ReactNode } from "react";



export default abstract class ListModelView<M extends EtherModel> extends ViewModelView<ModelListViewModel<M>, unknown, ModelListState<M>>{
    
    abstract onCreateRepository(): EthersModelRepository<M>;

    abstract getInstanceValues(instance: M): string[];

    abstract getHeadings(): string[];

    abstract getAddInstanceLink(): string;

    abstract getEditInstanceLink(instance: M): string;

    abstract onDelete(): void;


    onCreateViewModel(state: ModelListState<M>): ModelListViewModel<M> {
        return new ModelListViewModel<M>(
            state,
            this.onCreateRepository(),
            this.setState.bind(this)
        );
    }
    onCreateState(): ModelListState<M> {
        return new ModelListState();
    }



    onCreateMain(): ReactNode {
        return (
            <div className="p-10">
                <div className="flex">
                    <h2 className="text-xl font-bold">Employees</h2>
                    <a href={this.getAddInstanceLink()} className="ml-auto block">
                        <BaseButton><i className="fa-solid fa-plus mr-5"></i> Add </BaseButton>
                    </a>
                </div>

                <div className="mt-10">
                    <div className="flex px-5">
                        {
                            this.getHeadings().map(
                                (title) => (
                                    <h3 className="font-bold mx-auto px-10">{title}</h3>
                                )
                            )
                        }
                    </div>
                    <div className="mt-10">


                        {
                            this.state.values!.map(
                                (instance: M) => (
                                    <div className="flex px-5 py-5 hover:bg-light">
                                        {
                                           this.getInstanceValues(instance).map(
                                                (title) => (
                                                    <div className="mx-auto w-1/5">{title}</div>
                                                )
                                            )
                                        }
                                    </div>
                                )
                            )
                        }

                        <div className="flex">
                            
                        </div>
                    </div>
                </div>
            </div>
        )
    }
    
} 