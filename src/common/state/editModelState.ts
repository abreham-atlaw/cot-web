import type Form from "../forms/form";
import EtherModel from "../model/model";
import { AsyncState } from "./asyncState";



export default class EditModelState<M extends EtherModel, F extends Form> extends AsyncState{

    public form: F;
    public id?: string;
    public instance?: M;


    constructor(form: F, id?: string){
        super();
        this.form = form;
        this.id = id;
    }

    get isCreateMode(): boolean{
        return this.id === undefined;
    }

}