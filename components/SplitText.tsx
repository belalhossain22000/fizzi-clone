import clsx from "clsx";

type SplitTextProps = {
  text: string;
  className?: string;
  wordDisplayStyle?: "block" | "inline-block";
};

export function SplitText({ text, className, wordDisplayStyle = "inline-block" }: SplitTextProps) {
  if (!text) return null;

  const words = text.split(" ");

  return words.map((word, wordIndex) => {
    const chars = word.split("");

    return (
      <span
        key={`${wordIndex}-${word}`}
        className={clsx("split-word", className)}
        style={{ display: wordDisplayStyle, whiteSpace: "pre" }}
      >
        {chars.map((char, charIndex) => (
          <span key={charIndex} className={`split-char inline-block split-char--${wordIndex}-${charIndex}`}>
            {char}
          </span>
        ))}
        {wordIndex < words.length - 1 ? <span className="split-char"> </span> : ""}
      </span>
    );
  });
}
