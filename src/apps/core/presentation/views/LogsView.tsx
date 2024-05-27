import ViewModelView from "@/common/components/views/ViewModelView";
import LogsViewModel from "../../application/viewModels/logsViewModel";
import LogsState from "../../application/states/logsState";
import { ReactNode } from "react";
import GenericTableComponent from "../components/GenericTableComponent";
import { TransactionResponse } from "ethers";


export default class LogsView extends ViewModelView<LogsViewModel, unknown, LogsState>{
    onCreateViewModel(state: LogsState): LogsViewModel {
        return new LogsViewModel(state, this.setState.bind(this));
    }
    onCreateState(): LogsState {
        return new LogsState();
    }

    onCreateMain(): ReactNode {
        return (
            <div className="p-10">
                
                <GenericTableComponent 
                    
                    titles={["From", "To", "Hash", "Block Hash", "Block Number"]}
                    instances={this.state.transactions!}
                    generateRow={
                        (value: unknown) => {
                            const transaction = value as TransactionResponse;
                            return [transaction.from, transaction.to ?? "", transaction.hash.toString(), transaction.blockHash ?? "", transaction.blockNumber?.toString() ?? ""]
                        }
                    }
                    addNo={false}
                />
            
            </div>
        )
    }

}