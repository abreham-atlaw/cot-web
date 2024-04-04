import { MdSearch, MdPeople, MdSettings } from "react-icons/md";
import styles from './Navbar.module.css'
function Navbar() {
    return <div className={styles.frame}>
        <div >

            <MdSearch
                className={styles.search_icon}
            />

            <input placeholder='Search....' /> <span> ⌘/ </span>
        </div>
        <span>
            <MdSettings style={{ fontSize: "2rem", marginRight: "10px" }} />{" "}
            <h2> Organization Name </h2>
        </span>
    </div>
}
export default Navbar