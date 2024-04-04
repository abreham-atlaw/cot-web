import { useState } from "react"

interface Props{
 handleinputchange:(reason:string)=>void
}
function ReasonTextArea(props:Props) {
    const [reason,setReason]=useState("");
   const handlereason = (event:React.ChangeEvent<HTMLTextAreaElement>)=>{
      setReason((r)=>r=event.target.value)
      props.handleinputchange(reason)
   }
    return <div
        className='area'
        style={{

            textAlign: "start",
            fontSize: "18px",
            fontWeight: "100",
        }}
    >
        
        <textarea
            typeof="text"
            placeholder='Enter the reason'
            style={{
                width: "25em",
                height: "7em",
                outline: "none",


            }}
            onChange={handlereason}
        />
    </div>
}
export default ReasonTextArea