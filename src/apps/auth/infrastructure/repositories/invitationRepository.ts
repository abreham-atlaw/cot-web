import EthersModelRepository from "@/common/repositories/ethersModelRepository";
import contract from "@/assets/contactBuilds/auth/src_contracts_invitationContract_sol_Invitation.json"
import Invitation from "../../domain/models/invitation";
import InvitationSerializer from "../../domain/serializers/invitationSerializer";
import CoreProviders from "@/di/coreProviders";
import InviteRequest from "../requests/inviteRequest";
import DataConfigs from "@/configs/dataConfigs";
import AuthRepository from "./authRepository";


export default class InvitationRepository extends EthersModelRepository<Invitation>{

    private networkClient = CoreProviders.provideNetworkClient();
    private authRepository = new AuthRepository();

    constructor(){
        super(
            contract.abi,
            contract.address,
            new InvitationSerializer()
        )
    }

    async sendInvitation(email: string, invitation: Invitation){
        const link = `${DataConfigs.FRONTEND_URL}/auth/signup/${invitation.id}`;
        await this.networkClient.execute(new InviteRequest(email, link));
    }

    async create(instance: Invitation): Promise<void> {
        await super.create(instance);
        await this.sendInvitation(instance.to, instance);
    }

    async filterAll(instance: Invitation): Promise<boolean> {
        return (instance.orgId === (await this.authRepository.getOrgId()));
    }


}