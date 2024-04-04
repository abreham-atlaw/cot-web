import { useRef, useState } from "react";
import { FaUpload } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import { Link } from "react-router-dom";
interface Props{
    handleModal:()=>void
}
function RegisterProperty(props:Props){
    
    const fileInputRef = useRef<HTMLInputElement>(null);

const options = ["Option 1", "Option 2", "Option 3"];
const [selectedOption, setSelectedOption] = useState("");
const [isDropdownOpen, setDropdownOpen] = useState(false);

const handleFileChange = (event:React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] as File;
};

const handleOptionClick = (option:string) => {
    setSelectedOption(option);
    setDropdownOpen(false);
};

return (
    <div className='reg-property'>
        <h2> Register Property </h2>
        <div className='inputs'>
            <h4>Property ID</h4>
            <input placeholder='Enter ID' />
            <h4>Property Name</h4>
            <input placeholder='Enter Property Name' />
            <h4>Property Type</h4>
            <input placeholder='Enter Property Type' />
            <div className='row'>
                <div className='col'>
                    <div className='input-container'>
                        <p> Attack File: </p>
                        <div className='cont'>
                            <input
                                type='file'
                                onChange={handleFileChange}
                                style={{ display: "none" }}
                                ref={fileInputRef}
                            />
                            <div style={{ display: "flex", alignItems: "center" }}>
                                <FaUpload style={{ marginRight: "5px" }} />
                                <input
                                    type='text'
                                    placeholder='Choose File'
                                    onClick={() => fileInputRef.current?.click()}
                                    readOnly
                                />
                            </div>
                        </div>
                    </div>
        
                    {/* <div className='input-container'>
                        <p> Attack Image: </p>
                        <div className='cont'>
                            <input
                                type='file'
                                // onChange={handleFileChange}
                                style={{ display: "none" }}
                                ref={fileInputRef}
                            />
                            <div style={{ display: "flex", alignItems: "center" }}>
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
                </div>
                {/* <SelectCategoryDropDown/> */}
            </div>
            
            <div className='buttons'>
                <button
                    style={{
                        color: "white",
                        backgroundColor: "black",
                        
                    }}
                    onClick={props.handleModal}
                >
                    Cancel
                </button>
                <Link to='/property'>
                    <button
                        style={{
                            color: "black",
                            backgroundColor: "white",
                            // marginRight: "16em",
                        }}
                    >
                        Save
                    </button>
                </Link>
            </div>
        </div>
    </div>

);
    
}
function SelectCategoryDropDown(){
const options = ["Option 1", "Option 2", "Option 3"];
const [selectedOption, setSelectedOption] = useState("");
const [isDropdownOpen, setDropdownOpen] = useState(false);

// const handleFileChange = (event) => {
//     const selectedFile = event.target.files[0];
// };

const handleOptionClick = (option:string) => {
    setSelectedOption(option);
    setDropdownOpen(false);
};
   return    <div className="adjust-option"> <div
   className='input-container option-select'
   style={{
   cursor:"pointer"
   }}
>
   <input
       type='text'
       placeholder='Select category'
    //    value={selectedOption}
       readOnly
    onClick={() => setDropdownOpen(!isDropdownOpen)}
   />
   <div
       className='dropdown-arrow'
   onClick={() => setDropdownOpen(!isDropdownOpen)}
   >
       <IoIosArrowDown />
   </div>
   </div>
  
   {isDropdownOpen && (
       <ul className='options-list'>
           {options.map((option) => (
               <li key={option} onClick={() => handleOptionClick(option)}>
                   {option}
               </li>
           ))}
       </ul>
   )}

</div>
}
export default RegisterProperty