import EtherModel from "../model/model";
import BaseState from "./baseState";



export default class ModelListState<T extends EtherModel> extends BaseState{

    values?: T[];
    modalClicked = false;
    editModalClicked =false;
    deleteModalClicked = false;
    selectedInstance?:T;

}