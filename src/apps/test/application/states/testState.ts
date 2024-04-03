import { AsyncState } from "../../../../common/state/asyncState";
import Item from "../../domain/models/item";


export default class TestState extends AsyncState{

    items?: Item[];

}