import { useLocation, useNavigate } from "react-router-dom";
import logoDark from "@/assets/logo-dark.svg";
import logoLight from "@/assets/logo.svg";

interface LogoProps {
  variant?: "light" | "dark";
  height?: number;
}

export default function Logo({ variant = "light", height = 34 }: LogoProps) {
  const src = variant === "dark" ? logoDark : logoLight;
  const location = useLocation();
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    if (location.pathname !== "/") {
      navigate("/");
    } else {
      const el = document.getElementById("inicio");
      if (el) el.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <a href="/" onClick={handleClick} aria-label="CodigoYara, inicio" style={{ display: "inline-flex", alignItems: "center" }}>
      <img
        src={src}
        alt="CodigoYara"
        height={height}
        width="auto"
        style={{ height, width: "auto" }}
        draggable={false}
      />
    </a>
  );
}
