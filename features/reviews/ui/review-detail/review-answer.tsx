type ReviewAnswerProps = {
  children: string;
  label: string;
};

const ReviewAnswer = ({ children, label }: ReviewAnswerProps) => {
  return (
    <p
      className="bg-card ring-foreground/10 min-h-28 rounded-xl px-4 py-3 text-sm leading-relaxed whitespace-pre-wrap ring-1 sm:text-[15px]"
      aria-label={label}
    >
      {children}
    </p>
  );
};

export default ReviewAnswer;
