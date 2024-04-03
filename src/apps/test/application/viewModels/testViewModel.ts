import AsyncViewModel from "../../../../common/viewmodel/asyncViewModel"
import ItemRepository from "../../infrastructure/repositories/itemRepository";
import TestState from "../states/testState"



export default class TestViewModel extends AsyncViewModel<TestState>{

    private itemRepository = new ItemRepository();

    public async onInit(): Promise<void> {
        await this.refresh();
    }

    private async refresh(){
        this.state.items = await this.itemRepository.getAll();
    }

    async create(){
        await this.asyncCall(
            async () => {
                await this.itemRepository.create({
                    name: `Item ${this.state.items!.length}`,
                    quantity: 6
                });
                await this.refresh();
            }
        )
    }
}