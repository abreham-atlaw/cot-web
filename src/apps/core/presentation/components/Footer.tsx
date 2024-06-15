import TranslatedText from "@/common/components/localization/TranslatedText";
import { useState, useEffect, useRef } from "react";

function Footer() {
  //   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  //   const [user, setUser] = useState(null);
  const clickedSectionIdRef = useRef<string>();

  useEffect(() => {
    if (clickedSectionIdRef.current) {
      const section = document.getElementById(clickedSectionIdRef.current);
      if (section) {
        section.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [clickedSectionIdRef.current]);

  const handleLinkClick = (sectionId: string) => {
    clickedSectionIdRef.current = sectionId;
    setIsMenuOpen(false); // Close menu on link click
  };

  return (
    <div className="footermenu">
      <div className="menu-box">
        <ul className={`menu ${isMenuOpen ? "open" : ""}`}>
          <li>
            <a href="#home" onClick={() => handleLinkClick("home")}>
              {" "}
              <TranslatedText text="Home" />
            </a>
          </li>
          <li>
            <a href="#services" onClick={() => handleLinkClick("services")}>
              <TranslatedText text="Services" />
            </a>
          </li>
          <li>
            <a href="#about" onClick={() => handleLinkClick("about")}>
              {" "}
              <TranslatedText text="About" />
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Footer;
