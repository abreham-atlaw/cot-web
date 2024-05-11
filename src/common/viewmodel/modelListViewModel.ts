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

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    async filterItems(allValues: M[], filters: Map<string, unknown>): Promise<M[]>{
        return allValues;
    }

    async filter(filters: Map<string, unknown>){
        this.state.filters = filters;
        this.state.values = await this.filterItems(this.state.allValues!, filters);
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