<<<<<<< HEAD
import ViewModelView from "@/common/components/views/ViewModelView";
import { ListUsersViewModel } from "../../application/viewModels/listUsersViewModel";
import ListUsersState from "../../application/states/listUsersState";
import { ReactNode } from "react";
import Invitation from "@/apps/auth/domain/models/invitation";
import Profile from "@/apps/auth/domain/models/profile";
import UserListComponent from "../components/UserListComponent";
import BaseButton from "@/common/components/buttons/BaseButton";
import { MdSearch, MdSettings } from "react-icons/md";
import TextFieldComponent from "@/common/components/form/TextFieldComponent";
import Modal from "react-modal";
import RegisterUserView from "./RegisterUserView";


export default class ListUsersView extends ViewModelView<ListUsersViewModel, unknown,  ListUsersState>{
    onCreateViewModel(state: ListUsersState): ListUsersViewModel {
        return new ListUsersViewModel(state, this.setState.bind(this));
    }
    onCreateState(): ListUsersState {
        return new ListUsersState();
=======
import Profile, { Role } from "@/apps/auth/domain/models/profile";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import ListModelView from "@/apps/core/presentation/views/ListModelView";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";

export default class ListProfilesView extends ListModelView<Profile>{
    
    onCreateRepository(): EthersModelRepository<Profile> {
        return new ProfileRepository();
>>>>>>> 9eae48818fc4550ca61f2da16fc22e1c8ed0bc66
    }

    getInstanceValues(instance: Profile): string[] {
        return [instance.id!.split("-")[0], instance.name, instance.email, Role[instance.role].toUpperCase()];
    }

<<<<<<< HEAD

    onCreateMain(): ReactNode {

     
        
        const modalClicked = ()=>{
            this.setState({modalClicked: !this.state.modalClicked})
        }
        const invitedClicked = ()=>{
            this.setState({isInvited: 0})
        }
        const employeeClicked = ()=>{
            this.setState({isInvited:1})
        }

        return (
            <>
                <div className="p-4 flex justify-between  mt-4 w-full  z-20 ">
      <div className="relative flex w-3/5  ">
        <MdSearch className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-600 text-2xl" />
        
        <TextFieldComponent field={this.state.searchForm.search}
          className="w-full bg-gray-200 border-none rounded-md pl-8 py-4 text-lg"
          type="text"
          placeHolder="Search...."
          
        />
        
      </div>
      <span className="flex items-center">
        <MdSettings className="text-2xl mr-4" />
        <h2>Organization Name</h2>
      </span>
    </div>

    <div className="p-10">
                <div className="flex">
                    <h2 className={`text-xl font-bold mr-8 border p-4 ${this.state.isInvited==1?"bg-black text-white":"" } rounded-md hover:border-black hover:transform hover:translate-x-1  cursor-pointer`} onClick={employeeClicked}>Employees</h2>
                    <h2 className={`text-xl font-bold mr-8 border p-4 ${this.state.isInvited==0?"bg-black text-white":"" } rounded-md hover:border-black hover:transform hover:translate-x-1  cursor-pointer`} onClick={invitedClicked}>Invited Employees</h2>
                     <div className="ml-auto block">          
                     <BaseButton onClick={modalClicked}><i className="fa-solid fa-plus mr-5"></i> Add </BaseButton>
                     </div>
            
                    
           
                </div>

                <div className="mt-10">
                    <table className="border-collapse w-full">
                        {
                            [
                                "ID",
                                "E-Mail",
                                "Department",
                                "Role",
                                "Action"
                            ].map(
                                (title) => (
                                    <th className="truncate overflow-hidden whitespace-nowrap px-4 py-2 text-start">{title}</th>
                                )
                            )
                        }
                        <tbody >
                        {this.state.isInvited == 0? 
                        
                            this.state.invitations!.map(
                                (invitation) => <UserListComponent user={this.invitationToProfile(invitation)}/>
                            )
                        :
                        
                            this.state.users!.map(
                                (user) => <UserListComponent user={user}/>
                            )
                        
                        }
                        
                      
                      

                    </tbody>
                    </table>
                    

                </div>
            </div>
         

            <Modal
            isOpen={this.state.modalClicked}
            className='modal-content custome-property'
            onRequestClose={modalClicked}
            overlayClassName='modal-overlay'>
               <RegisterUserView onCloseModal={modalClicked} />
            </Modal>
            </>
            
        )
=======
    getHeadings(): string[] {
        return ["ID", "Name", "E-Mail", "Role"];
    }

    getAddInstanceLink(): string {
        return "/base/invitation/write";
    }

    getEditInstanceLink(instance: Profile): string {
        return `/base/Profile/edit/${instance.id!}`;
    }
    
    onDelete(): void {
        throw new Error("Method not implemented.");
    }

    getTitle(): string {
        return "Employees"
>>>>>>> 9eae48818fc4550ca61f2da16fc22e1c8ed0bc66
    }

}