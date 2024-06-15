import AuthRepository from "@/apps/auth/infrastructure/repositories/authRepository";
import EtherModel from "../model/model";
import EthersModelRepository from "../repositories/ethersModelRepository";
import type ModelDetailState from "../state/modelDetailState";
import AsyncViewModel from "./asyncViewModel";
import RepositoryProvider from "@/di/repositoryProviders";


export default class ModelDetailViewModel<M extends EtherModel> extends AsyncViewModel<ModelDetailState<M>>{

    protected repository: EthersModelRepository<M>;
    private authRepository = RepositoryProvider.provide(AuthRepository);


    constructor(state: ModelDetailState<M>, repository: EthersModelRepository<M>, syncState: (state: ModelDetailState<M>) => void){
        super(state, syncState);
        this.repository = repository;
    }

    public async onInit(): Promise<void> {
        await super.onInit();
        this.state.instance = await this.repository.getById(this.state.id);
        this.state.me = await this.authRepository.whoAmI();
    }


}