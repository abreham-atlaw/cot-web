import React, { useState } from 'react';
import TranslatableState from '../../application/states/traslatableState';
import { Lang } from '@/configs/dataConfigs';
import AsyncButton from '@/common/components/buttons/AsyncButton';



interface SelectLanguageButtonProps{
    onLanguageSelected: (language: string) => void;
    state: TranslatableState;
}


const FloatingActionButton: React.FC<SelectLanguageButtonProps> = (props: SelectLanguageButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleButtonClick = () => {
    setIsOpen(!isOpen);
  };

  const handleLanguageClick = (language: string) => {
    props.onLanguageSelected(language);
    setIsOpen(false);
  };

  return (
    <div className="fixed right-4 bottom-4">
      <div onClick={handleButtonClick} >
        <AsyncButton state={props.state}>
            {props.state.currentLang.substring(0, 2)}
        </AsyncButton>
      </div>
      {isOpen && (
        <div className="mt-4 bg-white shadow rounded">
          {Lang.all.map((language) => (
            <button
              key={language}
              onClick={() => handleLanguageClick(language)}
              className="block w-full text-left px-4 py-2 hover:bg-primary hover:text-white"
            >
              {language}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

export default FloatingActionButton;
