import KeyPair from "./keyPair";
import SymmetricKey from "./symmetricKey";



export default interface LoginResponse{

    keyPair: KeyPair,
    contractKeys: SymmetricKey[]

}