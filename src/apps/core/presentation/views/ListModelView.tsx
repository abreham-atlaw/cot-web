import AuthenticationStatus from "@/apps/auth/domain/models/authenticationStatus";
import Profile from "@/apps/auth/domain/models/profile";
import AsyncButton from "@/common/components/buttons/AsyncButton";
import BaseButton from "@/common/components/buttons/BaseButton";
import TextFieldComponent from "@/common/components/form/TextFieldComponent";
import AuthenticatedComponent from "@/common/components/views/AuthenticatedComponent";
import ViewModelView from "@/common/components/views/ViewModelView";
import EtherModel from "@/common/model/model";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import ModelListState from "@/common/state/modelListState";
import ModelListViewModel from "@/common/viewmodel/modelListViewModel";
import { ReactNode } from "react";
import Modal from "react-modal";
import ListModelRowComponent from "../components/ListModelRowComponent";


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

    handleSearchChange = () => {
        this.viewModel.search(
            (instance: M) => this.getInstanceValues(instance)
        );
    }

    handleSort = (colIdx: number, colName: string) => {
        this.viewModel.sort(
            colIdx,
            colName,
            (instance: M) => this.getInstanceValues(instance),
            (colIdx === this.state.sortIdx)?!this.state.sortReverse:false
        );
    }

    handleRefresh = () => {
        this.viewModel.refresh();
    }

    getNameColumnIdx = () => {
        return 1;
    }

    onCreateMain(): ReactNode {
        const cols = this.getHeadings().length + 1;
        return (
            <AuthenticatedComponent
                validStatus={this.getAllowedAuthenticationStatus()}
                >
                    <>
            <div className="p-10">
                <div className="flex">
                    <h2 className="text-2xl font-bold mt-auto">
                        { this.getTitle() }
                        <button className="ml-5" onClick={this.handleRefresh}><i className="fa-solid fa-arrows-rotate text-2xl text-grey"></i></button>
                    </h2>
                    {
                        this.allowAdd(this.state.me!)?
                        <div onClick={() => this.modalClicked()} className="ml-auto block">
                            <BaseButton><i className="fa-solid fa-plus mr-5"></i> Add </BaseButton>
                        </div>:
                        <></>
                    }
                    
                </div>

<<<<<<< HEAD
                <div className="w-1/2 mt-5 flex">
                    <TextFieldComponent field={this.state.searchField} onChanged={this.handleSearchChange} placeHolder="Search ..."/>
                </div>

                <div className="mt-10">
=======
                <div className="mt-10 hover:overflow-auto">
>>>>>>> 1212642b964c4c341a604026589ac45935a31302
                    <table className="border-collapse w-full">
                        <tr className="hidden lg:table-row">
                        {
                            this.getHeadings().map(
                                (title, idx) => (
                                    <th
                                       
                                     className={` truncate overflow-hidden whitespace-nowrap px-4 py-2 text-start font-bold px-10 w-[${100/cols}%]`}
                                     >  
                                        <button onClick={() => this.handleSort(idx, title)}>
                                            {title}{
                                                (this.state.sortIdx === idx)?
                                                <i className={`fa-solid text-grey ml-2 fa-arrow-${(this.state.sortReverse === true)?'down':'up'}`}></i>:
                                                <></>
                                            }
                                        </button>
                                        
                                    </th>
                                )
                            )
                        }
                        </tr>
                        
                        <tr className="table-row lg:hidden">
                            <th className=" text-left">
                                {/* {this.getHeadings()[0]} */}
                            </th>
                        </tr>

                       <tbody className="mt-10">
                        {
                            (this.state.values!.length === 0)?
                            <p className="text-grey mt-10">
                                {
                                    (this.state.searchField.getValue())?
                                    <>No items matching the query</>:
                                    <>No items available</>
                                }
                            </p>:
                            <></>
                        }
                        {
                            this.state.values!.map(
                                (instance: M) => (
                                    <ListModelRowComponent
                                        instanceValues={this.getInstanceValues(instance)}
                                        detailLink={this.getDetailLink(instance)}
                                        allowDetail={this.allowDetail(instance, this.state.me!)}
                                        allowEdit={this.allowEdit(instance, this.state.me!)}
                                        allowDelete={this.allowDelete(instance, this.state.me!)}
                                        columns={this.getHeadings()}
                                        onModalClicked={() => this.modalClicked(instance)}
                                        onToggleDeleteMode={() => this.onToggleDeleteMode(instance)}
                                        nameColumnIdx={this.getNameColumnIdx()}
                                        />

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