/* eslint-disable @typescript-eslint/no-unused-vars */
import { useState } from "react";
import { Asset } from "../domain/Asset/Asset";
import { Role, User } from "../domain/User/User";
import { initalAssetRequest, initalDepartments } from "../domain/list";
import { AssetRequest } from "../domain/AssetRequest/AssetRequest";
import AvaliableAssetDropdown from "@/common/components/views/AvaliableAssetDropdown";
import ReasonTextArea from "@/common/components/views/ReasonTextArea";
interface Props{
    handleModal:()=>void,
}
function CreateAssetRequest(props:Props){
    const [isAssetDrop,setAssetDrop] = useState(false)
    const [reason,setReason]=useState("");
    const [asset,setAsset]=useState<Asset>();
    const toggleDropdown = ()=>{
        setAssetDrop(!isAssetDrop)
    }
    const handleAssetSelect = (value:Asset)=>{
          setAsset(value)
    }
    const handleReasonchange = (value:string)=>{
        setReason((r)=>r=value) 
    }
    const sendRequest = ()=>{
        const user:User=  {
            id: "user_1",
            email: "user1@example.com",
            firstName: "John",
            lastName: "Doe",
            role: Role.Manager,
            department: initalDepartments[0]
            // organizationId: "org_1",
           
          };
        const request:AssetRequest = {
             id:"req-001",
             createDatetime:new Date(Date.now()),
             user:user,
             questionReason:reason,
             asset:asset!,
        }
        initalAssetRequest.push(request)
        console.log(initalAssetRequest)
    }
    return(<div onClick={()=>setAssetDrop(false)}>
    <div className="inputs">
    <div className="row">

    </div>
    <AvaliableAssetDropdown toggleDropdown={toggleDropdown} isAssetDrop={isAssetDrop} handleInputChange={handleAssetSelect}/>
    <h3>Reason</h3>
    <ReasonTextArea handleinputchange={handleReasonchange}/>
 </div>


 <div className='buttons'>
        <button
            style={{
                color: "white",
                backgroundColor: "black",

            }}
            onClick={()=>props.handleModal()}
        >
            Cancel
        </button>
            <button
                style={{
                    color: "black",
                    backgroundColor: "white",
                }} 
                onClick={()=>{props.handleModal()
                sendRequest()}}   
            >
                Create
            </button>      
    </div>
    </div>
    )
}
export default CreateAssetRequest