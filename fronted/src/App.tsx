import Router from "./router";
import useMagneticCursor from "@/hooks/useMagneticCursor";
import ThreeBackground from "@/components/ui/ThreeBackground";
import WhatsAppButton from "@/components/ui/WhatsAppButton";
import { LangProvider } from "@/lib/LangContext";
import { BgProvider, useBg } from "@/lib/BgContext";

function GlobalBg() {
  const { activeBg } = useBg();
  return (
    <div className={`global-three-bg${activeBg === "white" ? " bg-white" : activeBg === "flowers" ? " bg-flowers" : ""}`}>
      <ThreeBackground />
    </div>
  );
}

export default function App() {
  useMagneticCursor();
  return (
    <BgProvider>
      <LangProvider>
        {/* Global Three.js background — covers entire page */}
        <GlobalBg />
        <Router />
        <WhatsAppButton />
      </LangProvider>
    </BgProvider>
  );
}
