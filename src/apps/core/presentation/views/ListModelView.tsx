import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus";
import Profile from "@/apps/auth/domain/models/profile";
import AsyncButton from "@/common/components/buttons/AsyncButton";
import BaseButton from "@/common/components/buttons/BaseButton";
import AuthenticatedComponent from "@/common/components/views/AuthenticatedComponent";
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

    abstract getTitle(): string;

    abstract getModalChild(modalClose: () => void, instance?: M): ReactNode;

    abstract getDetailLink(instance: M): string;

    getDeleteItemDescription(instance: M): Map<string, string>{
      const map = new Map<string, string>();
      const headers = this.getHeadings();
      const values = this.getInstanceValues(instance);
      for(let i=0; i<headers.length; i++){
        map.set(headers[i], values[i]);
      }
      return map;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    getInitFilters(props: P): Map<string, unknown>{
        return new Map();
    }

    getAllowedAuthenticationStatus(): AuthenticationStatus[]{
        return Object.values(AuthenticationStatus)
        .filter(status => status !== AuthenticationStatus.none) as AuthenticationStatus[]
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    allowAdd(me: Profile): boolean{
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    allowEdit(instance: M, me: Profile): boolean{
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    allowDetail(instance: M, me: Profile): boolean{
        return true;
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
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

    onDelete(instance: M): void{
        this.viewModel.delete(instance);
    }

    onToggleDeleteMode = (item?: M) => {
      this.viewModel.toggleDeleteMode(item);
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    modalClicked = (activeItem?: M) =>{
        this.viewModel.toggleEditMode(activeItem);
    }

    onCreateMain(): ReactNode {

        console.log("Authenticated Status", this.getAllowedAuthenticationStatus());

        const cols = this.getHeadings().length + 1;

        return (
            <AuthenticatedComponent
                validStatus={this.getAllowedAuthenticationStatus()}
                >
                    <>
            <div className="p-10">
                <div className="flex">
                    <h2 className="text-2xl font-bold">{ this.getTitle() }</h2>
                    {
                        this.allowAdd(this.state.me!)?
                        <div onClick={() => this.modalClicked()} className="ml-auto block">
                            <BaseButton><i className="fa-solid fa-plus mr-5"></i> Add </BaseButton>
                        </div>:
                        <></>
                    }
                    
                </div>

                <div className="mt-10 hover:overflow-auto">
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
                                                            this.onToggleDeleteMode(instance)
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
              
            {
              (this.state.deleteState.mode)?
              <Modal
              isOpen={this.state.deleteState.mode}
              className='modal-content custome-property'
              onRequestClose={() => this.onToggleDeleteMode()}
              overlayClassName='modal-overlay'>
                <div>
                  <h3 className="font-bold text-2xl">Confirm Delete</h3>
                  <p className="mt-5">Are you sure you want to delete the following:</p>
                  <ul className="mt-3">
                    {
                    
                    Array.from(this.getDeleteItemDescription(this.state.deleteState.item!)).map(
                      (value) => <li>
                        <span className="font-bold mr-5">{value[0]}:</span>{value[1]}
                      </li>
                    )
                    }
                  </ul>
                  

                  <div className="mt-10 flex gap-4">
                        <div className="mx-auto">
                                <BaseButton onClick={() => this.onToggleDeleteMode()}>
                                    CANCEL
                                </BaseButton>
                        </div>
                        <div className="mx-auto" onClick={() => this.onDelete(this.state.deleteState.item!)}>
                            <AsyncButton state={this.state.deleteState} bg="danger">
                                DELETE
                            </AsyncButton>
                        </div>
                    </div>
                </div>
              
             
            </Modal>:
            <></>


            }
            
            </>

            </AuthenticatedComponent>
            
        )
    }
    
} 