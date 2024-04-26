import { useState } from "react"
// import AvaliableAssetDropdown from "../components/AvaliableAssetDropdown"
// import ReasonTextArea from "../components/ReasonTextArea"
// import { Asset } from "../../Domain/Asset/Asset"
// import { AssetRequest } from "../../Domain/AssetRequest/AssetRequest"
// import { Role, User } from "../../Domain/User/User"
// import { initalDepartments } from "../../Domain/list"
import CreateAssetRequest from "./CreateAssetRequest"

interface Props{
    handleModal:()=>void
}
function CreateRequest(props:Props){
    const [isAssetDrop,setAssetDrop] = useState(false)
    const [index,selectedIndex]  = useState(0)

    return<div>
         <h4><span style={{cursor:"pointer"}} onClick={()=>selectedIndex((i)=>i=0)}>Asset Request</span>     <span onClick={()=>selectedIndex((i)=>i=1)}>Maintenace Request</span></h4>
        {index === 0 ?<CreateAssetRequest handleModal={props.handleModal}/> :<></>}
    </div>
}
export default CreateRequest