import EthersModelRepository from "../../../../common/repositories/ethersModelRepository";
import Item from "../../domain/models/item";
import ItemContract from "@/assets/contactBuilds/test/src_contracts_itemContract_sol_Item.json";
import ItemSerializer from "../../domain/serializers/itemSerializer";


export default class ItemRepository extends EthersModelRepository<Item>{

    constructor(){
        super(
            ItemContract.abi,
            ItemContract.address,
            new ItemSerializer()
        )
    }

}