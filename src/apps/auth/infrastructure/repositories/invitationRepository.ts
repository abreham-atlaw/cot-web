import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import contract from "@/assets/contactBuilds/auth/src_contracts_invitationContract_sol_Invitation.json"
import Invitation from "../../domain/models/invitation";
import InvitationSerializer from "../../domain/serializers/invitationSerializer";


export default class InvitationRepository extends EthersModelRepository<Invitation>{


    constructor(){
        super(
            contract.abi,
            contract.address,
            new InvitationSerializer()
        )
    }

}