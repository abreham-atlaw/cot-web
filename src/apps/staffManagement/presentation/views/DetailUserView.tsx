import { useParams } from "react-router-dom";
import StaffDetail from "@/apps/staff/presentation/views/StaffDetail";
import DetailModelView from "@/apps/core/presentation/views/DetailModelView";
import Profile from "@/apps/auth/domain/models/profile";
import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import ProfileRepository from "@/apps/auth/infrastructure/repositories/profileRepossitory";
import { ReactNode } from "react";
import { Role } from "@/FakeTypes/User";
import ModelDetailState from "@/common/state/modelDetailState";
import DetailUserState from "../../application/states/detailUserState";
import ModelDetailViewModel from "@/common/viewmodel/modelDetailVIewModel";
import { DetailUserViewModel } from "../../application/viewModels/detailUserViewModel";

export default class UserDetailView extends DetailModelView<Profile>{
    getModalChild(modalClose: () => void, instance?: Profile | undefined): ReactNode {
        return <></>
    }
    getInstanceValues(instance: Profile): string[] {
        return [instance.id!,instance.name,instance.email,Role[instance.role]]
    }
    
    onCreateRepository(): EthersModelRepository<Profile> {
        return new ProfileRepository()
    }
    getEditInstanceLink(instance: Profile): string {
        return `/base/staffs/list/${instance.id!}`;
    }
    getDisplayComponent(): ReactNode {
        return <StaffDetail state={this.state}/>
    }
    onDelete(instance: Profile): void {
        throw new Error("Method not implemented.");
    }
    onCreateState(): ModelDetailState<Profile> {
        return new DetailUserState(this.props.id);
    }
    onCreateViewModel(state: ModelDetailState<Profile>): ModelDetailViewModel<Profile> {
        return new DetailUserViewModel(
            state,
            this.setState.bind(this)
        )
    }
    
}

export function UserDetail(){
    const {id} = useParams()
    return <UserDetailView id={id!}/>
}