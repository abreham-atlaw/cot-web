import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import LogsState from "../states/logsState";
import TransactionRepository from "../../infrastructure/repositories/transactionsRepository";


export default class LogsViewModel extends AsyncViewModel<LogsState>{


    private repository = new TransactionRepository();

    public async onInit(): Promise<void> {
        this.state.transactions = await this.repository.getTransactions(10);
    }

}