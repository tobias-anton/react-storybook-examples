import React from 'react';

export type SelectOption = { label: string; value: string; disabled?: boolean };

export type SelectOptionListProps = {
  options: SelectOption[];
};

export const SelectOptionList: React.FC<SelectOptionListProps> = ({ options }) => {
  const preparedOptions = options.map(({ value, label: optionLabel, disabled = false }) => (
    <option key={value} value={value} disabled={disabled}>
      {optionLabel}
    </option>
  ));
  return <>{preparedOptions}</>;
};
