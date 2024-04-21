import { ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
interface MyComponentProps {
    children?: ReactNode; // Optional children prop with ReactNode type
}
const Content: React.FC<MyComponentProps> = ({ children }) =>{
    const isTabletSize = useMediaQuery({ query: "(max-width: 800px)" });
    return  <div className={`overflow-auto h-screen w-full flex-1 ${isTabletSize ? "ml-32" : "ml-72"}`}>
        {children}
        </div>
}
export default Content