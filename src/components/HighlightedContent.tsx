import { useIsViolation } from "../hooks";
import { useReviewStore } from "../stores";
import { ViolatingText } from ".";

export default function HighlightedContent() {
  const { parts } = useReviewStore();
  const { isViolation } = useIsViolation();

  return (
    <p className="text-lg/loose">
      {parts.map((part, index) => {
        const violation = isViolation(part);
        if (violation) {
          return <ViolatingText
            key={index}
            violationId={violation.id}
          />;
        }
        return <span key={index}>{part}</span>;
      })}
    </p>
  );
}
