import { create, StateCreator } from "zustand";
import { TSuggestions, TViolation, TViolationUI } from "../types";
import { sanitizeSuggestions } from "../utils";

type ReviewSlice = {
  content: string;
  parts: string[];
  violations: { [key: TViolation["id"]]: TViolationUI };
  suggestions: TSuggestions;
  dismissedViolations: TViolation["id"][];
  activeViolation: TViolation["id"] | null;
  initReview: ({
    content,
    violations,
    suggestions,
  }: {
    content: string;
    violations: TViolation[];
    suggestions: TSuggestions;
  }) => void;
  setHighlighted: () => void;
  replaceText: (from: string, to: string) => void;
  setActiveViolation: (violationId: TViolation["id"] | null) => void;
  dismissViolation: (violationId: TViolation["id"], reason: string) => void;
};

const createReviewSlice: StateCreator<ReviewSlice, [], [], ReviewSlice> = (
  set,
  get
) => ({
  content: "",
  parts: [],
  violations: {},
  suggestions: {},
  dismissedViolations: [],
  activeViolation: null,
  initReview: ({ content, violations, suggestions }) => {
    set({
      content,
      violations: violations.reduce(
        (acc: { [key: TViolation["id"]]: TViolationUI }, violation) => {
          acc[violation.id] = { ...violation, dismissed: false, reason: "" };
          return acc;
        },
        {}
      ),
      suggestions,
    });
    get().setHighlighted();
  },

  setHighlighted: () => {
    const violations = Object.values(get().violations).filter(
      (violation) => get().dismissedViolations.includes(violation.id) === false
    );
    const violationTexts = violations.map((violation) => violation.text);

    const regex = new RegExp(`(${violationTexts.join("|")})`, "gi");
    set((state) => ({
      parts: state.content.split(regex),
    }));
  },

  setActiveViolation: (violationId: TViolation["id"] | null) => {
    set({ activeViolation: violationId });
  },

  replaceText: (from: string, to: string) => {
    set({
      content: `${get().content.replace(from, sanitizeSuggestions(to, from))}`,
    });
    get().setHighlighted();
  },

  dismissViolation: (violationId: TViolation["id"], reason: string) => {
    set((state) => ({
      violations: {
        ...state.violations,
        [violationId]: {
          ...state.violations[violationId],
          dismissed: true,
          reason,
        },
      },
      dismissedViolations: [...state.dismissedViolations, violationId],
    }));
    get().setHighlighted();
  },
});

export const useReviewStore = create<ReviewSlice>((...a) =>
  createReviewSlice(...a)
);
