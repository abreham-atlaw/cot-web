import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import Organization from "../../domain/models/organization";
import contract from "@/assets/contactBuilds/core/src_contracts_Organization_sol_Organization.json";
import OrganizationSerializer from "../../domain/serializers/organizationSerializer";

export default class OrganizationRepository extends EthersModelRepository<Organization>{

    constructor(){
        super(
            contract.abi,
            contract.address,
            new OrganizationSerializer()
        );
    }

}