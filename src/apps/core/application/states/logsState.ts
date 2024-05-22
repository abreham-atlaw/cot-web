import BaseState from "@/common/state/baseState";
import { TransactionResponse } from "ethers";



export default class LogsState extends BaseState{

    transactions?: TransactionResponse[];

}