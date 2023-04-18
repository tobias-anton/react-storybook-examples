import { Control } from 'react-hook-form';

export interface UseCheckboxGroupControlProps {
  /**
   * Name of the form element
   */
  name: string;

  control: Control | undefined;

  defaultValues?: (string | number)[];
}

/**
 * Logic for the checkbox group control
 *
 * @param props
 */

export function useCheckboxGroupControl({ name, control, defaultValues }: UseCheckboxGroupControlProps) {
  const checkboxGroupName = name;

  return {
    checkboxGroupName,
    control,
    defaultValues,
  };
}

export type UseCheckboxGroupControlReturn = ReturnType<typeof useCheckboxGroupControl>;
