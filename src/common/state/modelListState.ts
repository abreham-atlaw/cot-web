import EtherModel from "../model/model";
import BaseState from "./baseState";



export default class ModelListState<T extends EtherModel> extends BaseState{

    values?: T[];

}