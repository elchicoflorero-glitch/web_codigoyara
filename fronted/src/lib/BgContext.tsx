import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";

export type BgId = "hero" | "aurora" | "neon" | "ocean" | "nebula" | "matrix" | "white" | "flowers" | "cyberpunk" | "galaxy" | "storm" | "beach" | "lofi" | "custom";

const STORAGE_KEY     = "active_bg";
const STORAGE_VID_KEY = "custom_video_id";
const DEFAULT: BgId   = "hero";
const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

interface BgContextValue {
  activeBg:       BgId;
  customVideoId:  string | null;
  setActiveBg:    (id: BgId, videoId?: string) => void;
}

const BgContext = createContext<BgContextValue>({
  activeBg:      DEFAULT,
  customVideoId: null,
  setActiveBg:   () => {},
});

export function BgProvider({ children }: { children: ReactNode }) {
  const [activeBg, setActiveBgState] = useState<BgId>(() =>
    (localStorage.getItem(STORAGE_KEY) as BgId | null) ?? DEFAULT
  );
  const [customVideoId, setCustomVideoIdState] = useState<string | null>(() =>
    localStorage.getItem(STORAGE_VID_KEY)
  );

  useEffect(() => {
    fetch(`${API}/api/config`)
      .then(r => r.json())
      .then((data: { success: boolean; activeBg?: string; customVideoId?: string | null }) => {
        if (data.success && data.activeBg) {
          const serverBg = data.activeBg as BgId;
          setActiveBgState(serverBg);
          localStorage.setItem(STORAGE_KEY, serverBg);
        }
        if (data.customVideoId) {
          setCustomVideoIdState(data.customVideoId);
          localStorage.setItem(STORAGE_VID_KEY, data.customVideoId);
        }
      })
      .catch(() => {});
  }, []);

  const setActiveBg = useCallback((id: BgId, videoId?: string) => {
    setActiveBgState(id);
    localStorage.setItem(STORAGE_KEY, id);
    if (videoId) {
      setCustomVideoIdState(videoId);
      localStorage.setItem(STORAGE_VID_KEY, videoId);
    }

    const token = localStorage.getItem("admin_token");
    const body: Record<string, string> = { activeBg: id };
    if (videoId) body.customVideoId = videoId;

    fetch(`${API}/api/config`, {
      method:  "PUT",
      headers: { "Content-Type": "application/json", "Authorization": `Bearer ${token ?? ""}` },
      body:    JSON.stringify(body),
    }).catch(err => console.error("[BgContext] Error guardando fondo:", err));
  }, []);

  return (
    <BgContext.Provider value={{ activeBg, customVideoId, setActiveBg }}>
      {children}
    </BgContext.Provider>
  );
}

export function useBg() {
  return useContext(BgContext);
}
