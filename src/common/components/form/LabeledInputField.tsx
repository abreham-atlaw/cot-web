import React, { ReactNode } from 'react';

interface LabeledInputFieldProps {
  label: string;
  children: ReactNode;
}

const LabeledInputField: React.FC<LabeledInputFieldProps> = ({ label, children }) => (
  <label className="block">
    <span className="block">{label}</span>
    <div className="mt-3">
      {children}
    </div>
  </label>
);

export default LabeledInputField;
