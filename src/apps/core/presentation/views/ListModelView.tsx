import BaseButton from "@/common/components/buttons/BaseButton";
import ViewModelView from "@/common/components/views/ViewModelView";
import EtherModel from "@/common/model/model";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import { AsyncStatus } from "@/common/state/asyncState";
import ModelListState from "@/common/state/modelListState";
// import RoutingUtils from "@/common/utils/routing";
import ModelListViewModel from "@/common/viewmodel/modelListViewModel";
import { ReactNode } from "react";
// import { Link } from "react-router-dom";
import Modal from "react-modal";


export default abstract class ListModelView<M extends EtherModel> extends ViewModelView<ModelListViewModel<M>, unknown, ModelListState<M>>{
    
    abstract onCreateRepository(): EthersModelRepository<M>;

    abstract getInstanceValues(instance: M): string[];

    abstract getHeadings(): string[];

    abstract getAddInstanceLink(): string;

    abstract getEditInstanceLink(instance: M): string;

    abstract onDelete(instance: M): void;

    abstract getTitle(): string;

    abstract getModalChild(modalClose: () => void,instance?:M): any;

   

    onCreateViewModel(state: ModelListState<M>): ModelListViewModel<M> {
        return new ModelListViewModel<M>(
            state,
            this.onCreateRepository(),
            this.setState.bind(this),
            
        );
    }
    
    onCreateState(): ModelListState<M> {
        return new ModelListState();
    }
    modalClicked = ()=>{
        this.setState({modalClicked: !this.state.modalClicked})
    }
    editModalClicked = ()=>{
        
        this.setState({editModalClicked: !this.state.editModalClicked})
    }
 


    onCreateMain(): ReactNode {
        
        console.log("HEre");
        const cols = this.getHeadings().length + 1;

        return (
            <>
            <div className="p-10">
                <div className="flex">
                    <h2 className="text-2xl font-bold">{ this.getTitle() }</h2>
                    {!(this.getTitle() == "Employees" )&&
                    <div onClick={this.modalClicked} className="ml-auto block">
                    <BaseButton><i className="fa-solid fa-plus mr-5"></i> Add </BaseButton>
                </div> }
                    
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
                   
                   

                       <tbody>
                        {
                            this.state.values!.map(
                                (instance: M) => (
                                    <tr className="border-b py-5">
                                        {
                                           this.getInstanceValues(instance).map(
                                                (title) => (
                                                    <td className={`px-5 w-[${100/cols}%] text-ellipsis overflow-clip px-4 text-start py-2 truncate overflow-hidden whitespace-nowrap  `}>{title}</td>
                                                )
                                            )
                                        }
                                        <td className="flex ">
                                            {
                                                [
                                                    [(instance: M) => {console.log(instance); 
                                                      
                                                        this.setState({editModalClicked: !this.state.editModalClicked,selectedInstance: instance}); console.log("rr") }, "fa-solid fa-pen",this.modalClicked],
                                                    [(instance: M) => {this.onDelete(instance)}, "fa-solid fa-trash hover:bg-danger hover:text-light"]
                                                ].map(
                                                    (value) => (

                                                        <button onClick={() => {(value[0] as (m: M) => void)(instance);}} className="mr-5">
                                                            <i className={`${value[1]} p-2 border border-grey rounded-full hover:bg-white`}></i>
                                                        </button>
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
            // onRequestClose={this.modalClicked}
            overlayClassName='modal-overlay'>
               {/* <RegisterUserView onCloseModal={this.modalClicked} /> */}
               <div>
             { this.getModalChild(this.modalClicked) }
            
               </div>
              
             
            </Modal>
            <Modal
            isOpen={this.state.editModalClicked}
            className='modal-content custome-property'
            // onRequestClose={this.editModalClicked}
            overlayClassName='modal-overlay'>
               {/* <RegisterUserView onCloseModal={this.modalClicked} /> */}
               <div>
                {console.log(this.state.selectedInstance)}
             {this.getModalChild(this.editModalClicked,this.state.selectedInstance) }
             
               </div>
              
             
            </Modal>
            </>
        )
    }
    
} 