import BaseButton from "@/common/components/buttons/BaseButton";
import ViewModelView from "@/common/components/views/ViewModelView";
import EtherModel from "@/common/model/model";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import ModelListState from "@/common/state/modelListState";
import RoutingUtils from "@/common/utils/routing";
import ModelListViewModel from "@/common/viewmodel/modelListViewModel";
import { ReactNode } from "react";



export default abstract class ListModelView<M extends EtherModel> extends ViewModelView<ModelListViewModel<M>, unknown, ModelListState<M>>{
    
    abstract onCreateRepository(): EthersModelRepository<M>;

    abstract getInstanceValues(instance: M): string[];

    abstract getHeadings(): string[];

    abstract getAddInstanceLink(): string;

    abstract getEditInstanceLink(instance: M): string;

    abstract onDelete(instance: M): void;

    abstract getTitle(): string;

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

        const cols = this.getHeadings().length + 1;

        return (
            <div className="p-10">
                <div className="flex">
                    <h2 className="text-2xl font-bold">{ this.getTitle() }</h2>
                    <a href={this.getAddInstanceLink()} className="ml-auto block">
                        <BaseButton><i className="fa-solid fa-plus mr-5"></i> Add </BaseButton>
                    </a>
                </div>

                <div className="mt-10">
                    <div className="flex px-5">
                        {
                            this.getHeadings().map(
                                (title) => (
                                    <h3 className={`font-bold px-10 w-[${100/cols}%]`}>{title}</h3>
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
                                                    <div className={`px-5 w-[${100/cols}%] text-ellipsis overflow-clip`}>{title}</div>
                                                )
                                            )
                                        }
                                        <div className="flex">
                                            {
                                                [
                                                    [(instance: M) => {RoutingUtils.redirect(this.getEditInstanceLink(instance))}, "fa-solid fa-pen"],
                                                    [(instance: M) => {this.onDelete(instance)}, "fa-solid fa-trash hover:bg-danger hover:text-light"]
                                                ].map(
                                                    (value) => (
                                                        <button onClick={() => {(value[0] as (m: M) => void)(instance)}} className="mr-5">
                                                            <i className={`${value[1]} p-5 border border-grey rounded-full hover:bg-white`}></i>
                                                        </button>
                                                    )
                                                )
                                            }
                                           
                                        </div>
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