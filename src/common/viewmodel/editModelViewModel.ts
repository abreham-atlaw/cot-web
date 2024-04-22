import type Form from "../forms/form";
import EtherModel from "../model/model";
import EthersModelRepository from "../repositories/ethersModelRepository";
import type EditModelState from "../state/editModelState";
import AsyncViewModel from "./asyncViewModel";



export default abstract class EditModelViewModel<M extends EtherModel, F extends Form> extends AsyncViewModel<EditModelState<M, F>>{

    private repository: EthersModelRepository<M>;

    constructor(state: EditModelState<M, F>, syncState: (state: EditModelState<M, F>) => void){
        super(state, syncState);
        this.repository = this.initRepository();
    }

    protected abstract syncFormToModel(form: F, model: M): void;

    protected abstract syncModelToForm(model: M, form: F): void;

    protected abstract initRepository(): EthersModelRepository<M>;

    protected abstract createInstance(): M;

    protected async getInstance(id?: string): Promise<M>{
        if(id === undefined){
            return this.createInstance();
        }
        return await this.repository.getById(id);
    }

    public async onInit(): Promise<void> {
        await super.onInit();
        this.state.instance = await this.getInstance(this.state.id);
        this.syncModelToForm(this.state.instance!, this.state.form);
    }

    public async commitChanges(){
        if(this.state.isCreateMode){
            await this.repository.create(this.state.instance!);
        }
        else{
            await this.repository.update(this.state.instance!);
        }
    }

    public async save(){
        await this.asyncCall(
            async () => {
                await this.state.form.validate(true);
                this.syncFormToModel(this.state.form, this.state.instance!);
                await this.commitChanges();
            }
        )


    }

}