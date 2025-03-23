import { TViolation } from "../types";

export const Violations: TViolation[] = [
  {
    id: "v1",
    text: "guarantees consistent returns of up to 20% annually",
    start: 102,
    end: 153,
    length: 51,
    type: "Guaranteed Returns",
    message: "Avoid implying guaranteed or predictable returns.",
    severity: "high",
  },
  {
    id: "v2",
    text: "beat the market and build generational wealth",
    start: 180,
    end: 226,
    length: 46,
    type: "Promissory Language",
    message: "Avoid promising outperformance or guaranteed success.",
    severity: "medium",
  },
  {
    id: "v3",
    text: "make you our next success story",
    start: 260,
    end: 292,
    length: 32,
    type: "Testimonials",
    message: "Avoid vague success testimonials without disclosures.",
    severity: "low",
  },
];
