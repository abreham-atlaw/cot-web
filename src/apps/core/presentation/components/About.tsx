import TranslatedText from "@/common/components/localization/TranslatedText";
import { useState, useEffect, useRef } from "react";

function About() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
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
    <div className="">
      <div className="">
        <ul className={` ${isMenuOpen ? "open" : ""}`}>
          <a href="#about" onClick={() => handleLinkClick("about")}>
            {" "}
            <TranslatedText text="More About Us" />
          </a>
        </ul>
      </div>
    </div>
  );
}

export default About;
