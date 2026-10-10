import Router from "./router";
import useMagneticCursor from "@/hooks/useMagneticCursor";
import ThreeBackground from "@/components/ui/ThreeBackground";
import { LangProvider } from "@/lib/LangContext";
import { BgProvider } from "@/lib/BgContext";

export default function App() {
  useMagneticCursor();
  return (
    <BgProvider>
      <LangProvider>
        {/* Global Three.js background — covers entire page */}
        <div className="global-three-bg">
          <ThreeBackground />
        </div>
        <Router />
      </LangProvider>
    </BgProvider>
  );
}
