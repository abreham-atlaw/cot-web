import Profile from "@/apps/auth/domain/models/profile";
import BaseButton from "@/common/components/buttons/BaseButton";
import ViewModelView from "@/common/components/views/ViewModelView";
import EtherModel from "@/common/model/model";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import ModelListState from "@/common/state/modelListState";
import RoutingUtils from "@/common/utils/routing";
import ModelListViewModel from "@/common/viewmodel/modelListViewModel";
import { ReactNode } from "react";
import Modal from "react-modal";


export default abstract class ListModelView<M extends EtherModel, P=unknown> extends ViewModelView<ModelListViewModel<M>, P, ModelListState<M>>{
    
    abstract onCreateRepository(): EthersModelRepository<M>;

    abstract getInstanceValues(instance: M): string[];

    abstract getHeadings(): string[];

    abstract onDelete(instance: M): void;

    abstract getTitle(): string;

    abstract getModalChild(modalClose: () => void, instance?: M): ReactNode;

    abstract getDetailLink(instance: M): string;

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getInitFilters(props: P): Map<string, unknown>{
        return new Map();
    }

    allowEdit(instance: M, me: Profile): boolean{
        return true;
    }

    allowDetail(instance: M, me: Profile): boolean{
        return true;
    }

    allowDelete(instance: M, me: Profile): boolean{
        return true;
    }

    onCreateViewModel(state: ModelListState<M>): ModelListViewModel<M> {
        return new ModelListViewModel<M>(
            state,
            this.onCreateRepository(),
            this.setState.bind(this),
        );
    }
    
    onCreateState(): ModelListState<M> {
        const state = new ModelListState<M>();
        state.filters = this.getInitFilters(this.props);
        return state;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    modalClicked = (activeItem?: M) =>{
        this.viewModel.toggleEditMode(activeItem);
    }

    onCreateMain(): ReactNode {
        
        const cols = this.getHeadings().length + 1;

        return (
            <>
            <div className="p-10">
                <div className="flex">
                    <h2 className="text-2xl font-bold">{ this.getTitle() }</h2>
                    <div onClick={() => this.modalClicked()} className="ml-auto block">
                        <BaseButton><i className="fa-solid fa-plus mr-5"></i> Add </BaseButton>
                    </div>
                </div>

                <div className="mt-10">
                    <table className="border-collapse w-full">
                        {
                            this.getHeadings().map(
                                (title) => (
                                    <th className={`truncate overflow-hidden whitespace-nowrap px-4 py-2 text-start font-bold px-10 w-[${100/cols}%]`}>{title}</th>
                                )
                            )
                        }

                       <tbody className="mt-10">
                        {
                            this.state.values!.map(
                                (instance: M) => (
                                    <tr className="hover:bg-light">
                                        {
                                           this.getInstanceValues(instance).map(
                                                (value) => (
                                                    <td className={`px-5 w-[${100/cols}%] text-ellipsis overflow-clip px-4 text-start py-2 truncate overflow-hidden whitespace-nowrap`}>{value}</td>
                                                )
                                            )
                                        }
                                        <td className="flex py-2">
                                            {
                                                [
                                                    [
                                                        (instance: M) => {
                                                            RoutingUtils.redirect(this.getDetailLink(instance));
                                                        }, 
                                                        "fa-solid fa-file-lines", 
                                                        this.allowDetail(instance, this.state.me!)
                                                    ],
                                                    [
                                                        (instance: M) => {
                                                            this.modalClicked(instance);
                                                        }, 
                                                        "fa-solid fa-pen",
                                                        this.allowEdit(instance, this.state.me!)
                                                    ],
                                                    [
                                                        (instance: M) => {
                                                            this.onDelete(instance)
                                                        }, 
                                                        "fa-solid fa-trash hover:bg-danger hover:text-light",
                                                        this.allowDelete(instance,this.state.me!)
                                                    ]
                                                ].map(
                                                    (value) => (
                                                        (value[2])?
                                                        <button onClick={() => {(value[0] as (m: M) => void)(instance)}} className="mr-5">
                                                            <i className={`${value[1]} p-5 border border-grey rounded-full hover:bg-white`}></i>
                                                        </button>:
                                                        <></>
                                                    )
                                                )
                                            }
                                           
                                        </td>
                                    </tr>
                                )
                            )
                        }
                        </tbody>

                        
                        </table>
                </div>

       
            </div>

                     <Modal
            isOpen={this.state.modalClicked}
            className='modal-content custome-property'
            onRequestClose={() => this.modalClicked()}
            overlayClassName='modal-overlay'>
               {/* <RegisterUserView onCloseModal={this.modalClicked} /> */}
               <div>
             { this.getModalChild(this.modalClicked, this.state.activeItem) }
            
               </div>
              
             
            </Modal>
            </>
        )
    }
    
} 