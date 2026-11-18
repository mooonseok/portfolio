import type { ComponentProps } from 'react';

interface SelectFieldProps extends ComponentProps<'select'> {
  label: string;
  choices: { value: string; label: string }[];
}

export function SelectField({ label, choices, ...props }: SelectFieldProps) {
  return (
    <label>
      {label}
      <select {...props}>
        {choices.map((choice) => (
          <option key={choice.value} value={choice.value}>
            {choice.label}
          </option>
        ))}
      </select>
    </label>
  );
}
