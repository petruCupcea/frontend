import {
  SYSTEM_ALERT,
  SYSTEM_CONFIRM,
  SYSTEM_NOTIFY,
  SYSTEM_PROMPT,
} from './system-constant-definitions.const';

export type SystemType =
  typeof SYSTEM_ALERT |
  typeof SYSTEM_CONFIRM |
  typeof SYSTEM_PROMPT |
  typeof SYSTEM_NOTIFY;
