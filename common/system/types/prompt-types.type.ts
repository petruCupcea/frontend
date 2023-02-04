import {
  PROMPT_EMAIL,
  PROMPT_NUMBER,
  PROMPT_PASSWORD,
  PROMPT_RADIO,
  PROMPT_TEXT,
  PROMPT_TEXTAREA,
} from './system-constant-definitions.const';

export type PromptType =
  typeof PROMPT_EMAIL |
  typeof PROMPT_TEXT |
  typeof PROMPT_PASSWORD |
  typeof PROMPT_RADIO |
  typeof PROMPT_NUMBER |
  typeof PROMPT_TEXTAREA;
