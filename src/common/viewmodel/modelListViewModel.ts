import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import EtherModel from "../model/model";
import EthersModelRepository from "../repositories/ethersModelRepository";
import { AsyncStatus } from "../state/asyncState";
import type ModelListState from "../state/modelListState";
import AsyncViewModel from "./asyncViewModel";



export default class ModelListViewModel<M extends EtherModel> extends AsyncViewModel<ModelListState<M>>{


    protected repository: EthersModelRepository<M>;

    private authRepository = new AuthRepository();

    constructor(state: ModelListState<M>, repository: EthersModelRepository<M>, syncState: (state: ModelListState<M>) => void){
        super(state, syncState);
        this.repository = repository;
    }

    public async onInit(): Promise<void> {
        await super.onInit();
        this.state.me = await this.authRepository.whoAmI();
        this.state.allValues = await this.repository.getAll();
        this.state.values = await this.filterItems(this.state.allValues!, this.state.filters);
    }

    async refresh(){
        this.state.initState.status = AsyncStatus.none;
        this.initialize();
    }

    async toggleEditMode(activeItem?: M){
        this.state.modalClicked = !this.state.modalClicked;
        this.state.activeItem = activeItem;
        this.syncState();
        if(!this.state.modalClicked){
            this.refresh();
        }
    }

    async searchFilter(instances: M[], query: string, keyWordGenerator: (instance: M) => string[]): Promise<M[]>{
        query = query.toLowerCase();
        const filteredInstances: M[] = [];
    
        for (const instance of instances) {
            const keywords = keyWordGenerator(instance);
            for (const keyword of keywords){
                if(keyword.toLowerCase().includes(query)){
                    filteredInstances.push(instance);
                    break;
                }
            }
        }
    
        return filteredInstances;
    }

    async search(keyWordGenerator: (instance: M) => string[]) {
        if(this.state.searchField.getValue() === null){
            await this.resetFilter();
            return;
        }
        this.state.values = await this.searchFilter(this.state.allValues!, this.state.searchField.getValue()!, keyWordGenerator);
        this.syncState();
    }

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async filterItems(allValues: M[], filters: Map<string, unknown>): Promise<M[]>{
        return allValues;
    }

    async filter(filters: Map<string, unknown>){
        this.state.filters = filters;
        this.state.values = await this.filterItems(this.state.allValues!, filters);
        this.syncState();
    }

    async sortItems<M>(
        instance: M[],
        colIdx: number, // Changed to number for column index
        colName: string,
        keyWordGenerator: (instance: M) => string[]
    ): Promise<M[]> {
        // First, generate keywords for each instance using the provided keyWordGenerator function
        const keywordsMap = new Map<M, string[]>();
        for (const item of instance) {
            const keywords = keyWordGenerator(item);
            keywordsMap.set(item, keywords);
        }
    
        // Sort the items based on the specified column index
        instance.sort((a, b) => {
            const aKeywords = keywordsMap.get(a) || [];
            const bKeywords = keywordsMap.get(b) || [];
    
            // Ensure that both instances have enough keywords
            if (aKeywords.length <= colIdx || bKeywords.length <= colIdx) {
                // Handle the case where there are not enough keywords
                // You can choose to handle this differently (e.g., move to the end of the list)
                return 0; // No change in order
            }
    
            // Compare the keywords at the specified column index
            return aKeywords[colIdx].localeCompare(bKeywords[colIdx]);
        });
    
        return instance;
    }
    
    async sort(colIdx: number, colName: string, keyWordGenerator: (instance: M) => string[], reverse: boolean){
        this.state.values = await this.sortItems(
            this.state.values!,
            colIdx,
            colName,
            keyWordGenerator
        );
        if(reverse){
            this.state.values = this.state.values.reverse();
        }
        this.state.sortIdx = colIdx;
        this.state.sortReverse = reverse;
        this.syncState();
    }

    async resetFilter(){
        this.state.values = this.state.allValues;
        this.syncState();
    }

    async toggleDeleteMode(item?: M){
        this.state.deleteState.mode = !this.state.deleteState.mode;
        this.state.deleteState.item = item;
        this.syncState();
    }

    async delete(instance: M){
        await this.asyncCall(
            async () =>{
                await this.repository.delete(instance);
                await this.refresh();
            },
            this.state.deleteState
        );
        await this.toggleDeleteMode();
    }


}