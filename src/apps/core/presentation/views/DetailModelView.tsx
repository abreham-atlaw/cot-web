import ViewModelView from "@/common/components/views/ViewModelView";
import EtherModel from "@/common/model/model";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import ModelDetailState from "@/common/state/modelDetailState";
import RoutingUtils from "@/common/utils/routing";
import ModelDetailViewModel from "@/common/viewmodel/modelDetailVIewModel";
import React, { MouseEventHandler, ReactNode } from "react";
import Modal from "react-modal";
interface DetailModelViewProps {
  id: string;
}
export default abstract class DetailModelView<
  M extends EtherModel
> extends ViewModelView<
  ModelDetailViewModel<M>,
  DetailModelViewProps,
  ModelDetailState<M>
> {
   abstract onCreateRepository(): EthersModelRepository<M>;

  // abstract getInstanceValues(instance: M): string[];

  abstract getDisplayComponent(): ReactNode;

  abstract onDelete(instance: M): void;

  // abstract getEditInstanceLink(instance: M): string;

  abstract getModalChild(modalClose:()=>void,instance:M):ReactNode;

  onCreateViewModel(state: ModelDetailState<M>): ModelDetailViewModel<M> {

    return new ModelDetailViewModel<M>(
      state,
      this.onCreateRepository(),
      this.setState.bind(this)
    );
  }
  onCreateState(): ModelDetailState<M> {
    return new ModelDetailState(this.props.id);
  }
  editModalClicked = () => {
    this.setState({ editModalClicked: !this.state.editModalClicked });
  };

  onCreateMain(): ReactNode {
    return (
      <>
      <div className="flex p-8">
        <div className=" flex-grow">{this.getDisplayComponent()}</div>
        <div className=" right-0 w-1/4 h-1/4 flex-grow-0 flex-shrink-0">

        <td className="flex ">
          {[
            [()=>{this.editModalClicked()}, "fa-solid fa-pen"],
   
            [
              (instance: M) => {
                this.onDelete(instance);
              },
              "fa-solid fa-trash hover:bg-danger hover:text-light",
            ],
          ].map((value) => (
            <button
              onClick={value[0] as unknown as MouseEventHandler<HTMLButtonElement>}
              className="mr-5"
            >
              <i
                className={`${value[1]} p-2 border border-grey rounded-full hover:bg-white`}
              ></i>
            </button>
          ))}
        </td>
        </div>
     
      </div>
      <Modal
      isOpen={this.state.editModalClicked}
      className="modal-content custome-property"
      overlayClassName="modal-overlay"
      >
        <div>
          {this.getModalChild(this.editModalClicked,this.state.instance)}
        </div>
      </Modal>

      </>
    );
  }
}
