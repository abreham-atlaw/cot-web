import { IoAnalytics } from "react-icons/io5";
import styles from './ReportBar.module.css';
function ReportBar(){
    return     <div
    className={`each ${styles.report}`}  >
    Generate report <IoAnalytics style={{ fontSize: "2em" }} />
</div>
}
export default ReportBar