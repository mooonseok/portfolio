import type { ComponentPropsWithRef } from 'react';
import { BUTTON_TYPE, type TAG } from '@/constants/tag';

export type ButtonProps = ComponentPropsWithRef<typeof TAG.BUTTON>;

export function Button({ type = BUTTON_TYPE.BUTTON, ...rest }: ButtonProps) {
  return <button type={type} {...rest} />;
}
