import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export type BgId = "hero" | "aurora" | "neon" | "ocean" | "nebula" | "matrix" | "white" | "flowers";

const STORAGE_KEY = "active_bg";
const DEFAULT: BgId = "hero";
const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

interface BgContextValue {
  activeBg: BgId;
  setActiveBg: (id: BgId) => void;
}

const BgContext = createContext<BgContextValue>({
  activeBg: DEFAULT,
  setActiveBg: () => {},
});

export function BgProvider({ children }: { children: ReactNode }) {
  // Inicializa desde localStorage como caché optimista mientras carga la DB
  const [activeBg, setActiveBgState] = useState<BgId>(() => {
    return (localStorage.getItem(STORAGE_KEY) as BgId | null) ?? DEFAULT;
  });

  // Al montar, lee el valor real desde el servidor (fuente de verdad)
  useEffect(() => {
    fetch(`${API}/api/config`)
      .then(r => r.json())
      .then((data: { success: boolean; activeBg?: string }) => {
        if (data.success && data.activeBg) {
          const serverBg = data.activeBg as BgId;
          setActiveBgState(serverBg);
          localStorage.setItem(STORAGE_KEY, serverBg);
        }
      })
      .catch(() => {
        // Si el servidor no responde, el localStorage ya tiene el valor inicial
      });
  }, []);

  const setActiveBg = useCallback((id: BgId) => {
    // Actualización optimista: se aplica inmediatamente en UI
    setActiveBgState(id);
    localStorage.setItem(STORAGE_KEY, id);

    // Persiste en el servidor para que todos los navegadores lo vean
    const token = localStorage.getItem("admin_token");
    fetch(`${API}/api/config`, {
      method:  "PUT",
      headers: {
        "Content-Type":  "application/json",
        "Authorization": `Bearer ${token ?? ""}`,
      },
      body: JSON.stringify({ activeBg: id }),
    }).catch(err => {
      console.error("[BgContext] Error guardando fondo en servidor:", err);
    });
  }, []);

  return (
    <BgContext.Provider value={{ activeBg, setActiveBg }}>
      {children}
    </BgContext.Provider>
  );
}

export function useBg() {
  return useContext(BgContext);
}
