import EtherModel from "../model/model";
import EthersModelRepository from "../repositories/ethersModelRepository";
import type ModelDetailState from "../state/modelDetailState";
import AsyncViewModel from "./asyncViewModel";


export default class ModelDetailViewModel<M extends EtherModel> extends AsyncViewModel<ModelDetailState<M>>{

    protected repository: EthersModelRepository<M>;

    constructor(state: ModelDetailState<M>, repository: EthersModelRepository<M>, syncState: (state: ModelDetailState<M>) => void){
        super(state, syncState);
        this.repository = repository;
    }

    public async onInit(): Promise<void> {
        await super.onInit();
        this.state.instance = await this.repository.getById(this.state.id);
    }


}