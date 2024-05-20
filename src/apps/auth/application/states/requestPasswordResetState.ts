import { AsyncState } from "@/common/state/asyncState";
import RequestPasswordResetForm from "../forms/requestPasswordResetForm";



export default class RequestPasswordResetState extends AsyncState{

    form = new RequestPasswordResetForm();

}