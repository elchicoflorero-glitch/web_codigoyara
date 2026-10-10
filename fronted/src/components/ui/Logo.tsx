import logoDark from "@/assets/logo-dark.svg";
import logoLight from "@/assets/logo.svg";

interface LogoProps {
  variant?: "light" | "dark";
  height?: number;
}

export default function Logo({ variant = "light", height = 34 }: LogoProps) {
  const src = variant === "dark" ? logoDark : logoLight;

  return (
    <a href="#inicio" aria-label="Nuvora, inicio" style={{ display: "inline-flex", alignItems: "center" }}>
      <img
        src={src}
        alt="Nuvora"
        height={height}
        width="auto"
        style={{ height, width: "auto" }}
        draggable={false}
      />
    </a>
  );
}
