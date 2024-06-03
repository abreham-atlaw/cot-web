import { AsyncState } from "@/common/state/asyncState";
import ChangePasswordForm from "../forms/changePasswordForm";


export default class ChangePasswordState extends AsyncState{

    form = new ChangePasswordForm();

}