import EtherModel from "../model/model";
import BaseState from "./baseState";

export default class ModelDetailState<M extends EtherModel> extends BaseState{

    id: string;
    instance?: M

    constructor(id: string){
        super();
        this.id = id;
    }

}