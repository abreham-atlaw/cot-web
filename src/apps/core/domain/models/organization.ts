import EtherModel from "@/common/model/model";



export default class Organization implements EtherModel{

    id?: string;
    name: string;

    constructor(
        name: string
    ){
        this.name = name;
    }

}