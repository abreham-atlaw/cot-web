import { AsyncState } from "@/common/state/asyncState";
import UserForm from "../forms/userForm";



export default class RegisterUserState extends AsyncState{

    form = new UserForm();

}