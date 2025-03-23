import { VIOLATION_SEVERITIES, VIOLATION_TYPES } from '../constants';

export type TViolationType = (typeof VIOLATION_TYPES)[number];

export type TViolationSeverity = (typeof VIOLATION_SEVERITIES)[number];

export type TViolation = {
  id: string;
  text: string;
  start: number;
  end: number;
  length: number;
  type: TViolationType;
  message: string;
  severity: TViolationSeverity;
};

export type TViolationUI = TViolation & {
  dismissed: boolean;
  reason: string;
};

export type TSuggestion = string[];

export type TSuggestions = {
  [key: TViolation['id']]: TSuggestion;
};
