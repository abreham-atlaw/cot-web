import Profile from "@/apps/auth/domain/models/profile";
import EditModelState from "@/common/state/editModelState";
import UserForm from "../forms/userForm";
import Department from "@/apps/core/domain/models/department";

export default class EditUserState extends EditModelState<Profile, UserForm>{

    departments?: Department[]

}