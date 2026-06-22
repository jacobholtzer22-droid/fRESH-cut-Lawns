type Tone = "stone" | "paper" | "evergreen" | "ink";

type Props = {
  id?: string;
  /** Background band. stone/paper = warm readable light; evergreen/ink = deep spine. */
  tone?: Tone;
  className?: string;
  children: React.ReactNode;
};

const toneClasses: Record<Tone, string> = {
  stone: "bg-limestone text-ink",
  paper: "bg-limestone-deep text-ink",
  evergreen: "bg-evergreen text-bone",
  ink: "bg-ink text-bone",
};

/** Consistent vertical rhythm + tone band. Keeps section padding in one place. */
export default function Section({
  id,
  tone = "stone",
  className = "",
  children,
}: Props) {
  return (
    <section id={id} className={`${toneClasses[tone]} py-20 sm:py-28 ${className}`}>
      <div className="container-page">{children}</div>
    </section>
  );
}
