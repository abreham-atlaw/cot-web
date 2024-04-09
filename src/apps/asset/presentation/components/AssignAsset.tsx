import { Link } from "react-router-dom";
import { ReactHTMLElement, useRef, useState } from "react";
import { Asset } from "@/FakeTypes/Asset";
import { User } from "@/FakeTypes/User";
import StaffsDropDown from "./StaffsDropDown";
import ReasonTextArea from "./ReasonTextArea";

interface Props{
    asset:Asset
    handleModal:()=>void
}
function AssignAsset(props:Props) {
    const [isDropdownOpen, setDropdownOpen] = useState(false);
    const [reason,setReason]=useState("");
    const [user,setUser]=useState<User>();
    const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFile = event.target.files?.[0] as File;
    };
    const handleSetUser = (staff:User)=>{
          setUser(staff)
          
   
    }
    const handleReason = (reason:string)=>{
        setReason(reason)
        
    }
    const Assign =()=>{
        props.asset.owner = user
        props.asset.assignReason= reason
        props.asset.active=false
        props.asset.assignDateTime= new Date(Date.now())
        console.log("ddd")
        console.log(props.asset)
    }

    const handleDropDown = ()=>{
        setDropdownOpen((s)=>s=!isDropdownOpen)
    }
    console.log(props.asset)

    return (<div onClick={()=>setDropdownOpen(false)}>
        <h2> Assign Property </h2>
        <div className='inputs'>
            <div className='row'>
                <StaffsDropDown isDropdownOpen={isDropdownOpen} handleDropdown={handleDropDown}  handleInputChange={handleSetUser}/>
            </div>
            <ReasonTextArea handleinputchange={handleReason}/>
            <div className='buttons'>
                <button
                     onClick={props.handleModal}
                    style={{
                        color: "white",
                        backgroundColor: "black",

                    }}
                >
                    Cancel
                </button>
                <Link to='/assets'>
                    <button
                        style={{
                            color: "black",
                            backgroundColor: "white",

                        }}
                        onClick={Assign}
                    >
                        Allocate
                    </button>
                </Link>

      
            </div>
        </div>
    </div>)
}
export default AssignAsset


{/* <div className='input-container'>
													<p> Attach File: </p>
													<div className='cont'>
														<input
															type='file'
															 onChange={handleFileChange}
															style={{ display: "none" }}
															 ref={fileInputRef}
														/>
														<div
															style={{
																display: "flex",
																alignItems: "center",
															}}
														>
															<FaUpload style={{ marginRight: "5px" }} />
															<input
																type='text'
																placeholder='Choose File'
																// onClick={() => fileInputRef.current.click()}
																readOnly
															/>
														</div>
													</div>
												</div> */}