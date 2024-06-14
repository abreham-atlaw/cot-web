import React, { ReactNode } from 'react';
import TranslatedText from '../localization/TranslatedText';

interface LabeledInputFieldProps {
  label: string;
  children: ReactNode;
}

const LabeledInputField: React.FC<LabeledInputFieldProps> = ({ label, children }) => (
  <label className="block my-10">
    <span className="block"><TranslatedText text={label} /></span>
    <div className="mt-3">
      {children}
    </div>
  </label>
);

export default LabeledInputField;
