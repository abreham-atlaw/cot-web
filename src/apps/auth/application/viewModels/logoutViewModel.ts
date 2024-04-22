import { AsyncState } from "@/common/state/asyncState";
import AsyncViewModel from "@/common/viewmodel/asyncViewModel";
import AuthRepository from "../../infrastructure/repositories/authRepository";



export default class LogoutViewModel extends AsyncViewModel<AsyncState>{

    private authRepository = new AuthRepository();

    public async onInit(): Promise<void> {
        await super.onInit();
        await this.authRepository.logout();
    }

}