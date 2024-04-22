import EtherModel from "../model/model";
import EthersModelRepository from "../repositories/ethersModelRepository";
import type ModelListState from "../state/modelListState";
import AsyncViewModel from "./asyncViewModel";



export default class ModelListViewModel<M extends EtherModel> extends AsyncViewModel<ModelListState<M>>{


    protected repository: EthersModelRepository<M>;

    constructor(state: ModelListState<M>, repository: EthersModelRepository<M>, syncState: (state: ModelListState<M>) => void){
        super(state, syncState);
        this.repository = repository;
    }

    public async onInit(): Promise<void> {
        await super.onInit();
        this.state.values = await this.repository.getAll();
    }

}