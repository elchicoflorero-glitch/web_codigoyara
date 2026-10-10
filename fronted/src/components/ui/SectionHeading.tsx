interface SectionHeadingProps {
  eyebrow: string;
  title: string;
  text?: string;
  light?: boolean;
}

export default function SectionHeading({ eyebrow, title, text, light = false }: SectionHeadingProps) {
  return (
    <div className={`section-heading ${light ? "light" : ""}`}>
      <span className="eyebrow"><span />{eyebrow}</span>
      <h2>{title}</h2>
      {text && <p>{text}</p>}
    </div>
  );
}
