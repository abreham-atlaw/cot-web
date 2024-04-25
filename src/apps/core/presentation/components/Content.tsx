import { ReactNode } from "react";
import { useMediaQuery } from "react-responsive";
interface MyComponentProps {
  children?: ReactNode; // Optional children prop with ReactNode type
}
const Content: React.FC<MyComponentProps> = ({ children }) => {
  const isTabletSize = useMediaQuery({
    query: "(min-width: 630px) and (max-width: 940px)",
  });
  const isMobileSize = useMediaQuery({ query: "(max-width: 630px)" });
  return (
    <div
      className={`overflow-auto h-screen w-full ${
        !isTabletSize ? "" : "ml-[10%]"
      } ${isMobileSize ? "ml-[0%]" : "ml-[20%]"} `}
    >
      {children}
    </div>
  );
};
export default Content;
