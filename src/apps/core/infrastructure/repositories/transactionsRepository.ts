import CoreProviders from "@/di/coreProviders";
import { TransactionResponse } from "ethers";


export default class TransactionRepository{

    private readonly provider = CoreProviders.providerEtherProvider();

    async getTransactions(count: number): Promise<TransactionResponse[]> {
        const latestBlock = await this.provider.getBlockNumber();
    
        const transactions: TransactionResponse[] = [];
        let blockNumber = latestBlock;
    
        while (transactions.length < count && blockNumber >= 0) {
            const blocks = await Promise.all(
                Array.from({ length: 100 }, (_, i) => blockNumber - i).map(i => this.provider.getBlock(i))
            );
    
            for (const block of blocks) {
                if (block) {
                    const txs = await Promise.all(block.transactions.map(txHash => this.provider.getTransaction(txHash)));
    
                    for (const tx of txs) {
                        if (tx) {
                            transactions.push(tx);
                            if (transactions.length === count) {
                                return transactions;
                            }
                        }
                    }
                }
            }
    
            blockNumber -= 10;
        }
    
        return transactions;
    }
    

}