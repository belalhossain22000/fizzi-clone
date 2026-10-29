import clsx from "clsx";

type ButtonProps = {
  buttonLink: string;
  buttonText: string;
  className?: string;
};

export function Button({ buttonLink, buttonText, className }: ButtonProps) {
  return (
    <a
      href={buttonLink}
      className={clsx(
        "rounded-xl bg-orange-600 px-5 py-4 text-center text-xl font-bold uppercase tracking-wide text-white transition-colors duration-150 hover:bg-orange-700 md:text-2xl",
        className,
      )}
    >
      {buttonText}
    </a>
  );
}
