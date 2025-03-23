import { Content, Violations, Suggestions } from "../mocks";
import { useReviewStore } from "../stores";

export const useGetData = () => ({
  content: Content,
  violations: Violations,
  suggestions: Suggestions,
});

export const useIsViolation = () => {
  const { violations } = useReviewStore();
  const isViolation = (part: string) =>
    Object.values(violations).find(
      (violation) =>
        violation.text.toLocaleLowerCase() === part.toLocaleLowerCase()
    );
  return { isViolation };
};
