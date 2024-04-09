import { User } from "@/FakeTypes/User";
import { Link } from "react-router-dom";

interface Props{
    onCloseModal:()=>void,
    staff:User
}
function DeleteStaff(props:Props) {
    return <div>
        <p style={{ fontSize: "20px", margin: "0" }}>
            Are you sure you want to delete
        </p>
        <h2> {props.staff.id}</h2>
        <div className='buttons'>
            <button
                  onClick={() => props.onCloseModal()}
                style={{
                    color: "white",
                    backgroundColor: "black",

                }}
            >
                Cancel
            </button>
            <Link to='/property'>
                <button
                    style={{
                        color: "black",
                        backgroundColor: "white",

                    }}
                >
                    Save
                </button>
            </Link>
        </div>
    </div>
}
export default DeleteStaff