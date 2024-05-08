import Profile from "@/apps/auth/domain/models/profile";
import EtherModel from "../model/model";
import BaseState from "./baseState";



export default class ModelListState<T extends EtherModel> extends BaseState{


    allValues?: T[];
    values?: T[];
    modalClicked = false;
    activeItem?: T;
    me?: Profile;

    filters: Map<string, unknown> = new Map();

}