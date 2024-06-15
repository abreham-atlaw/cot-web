import { AsyncState } from "@/common/state/asyncState";
import LoginForm from "../forms/loginForm";




export default class LoginState extends AsyncState{

    form = new LoginForm();
    showPassword: boolean;

} 