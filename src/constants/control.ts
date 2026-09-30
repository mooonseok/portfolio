export const CONTROL_ZONE = {
  RECEIVE: 'receive',
  ACTUATE: 'actuate',
  CONTROLLER: 'controller',
} as const;

export type ControlZone = (typeof CONTROL_ZONE)[keyof typeof CONTROL_ZONE];
