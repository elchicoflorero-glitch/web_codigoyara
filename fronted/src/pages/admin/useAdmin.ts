import { useNavigate } from "react-router-dom";
import { useEffect }   from "react";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

export function useAdmin() {
  const navigate = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem("admin_token")) navigate("/admin");
  }, [navigate]);

  const authFetch = async (url: string, options: RequestInit = {}) => {
    const token = localStorage.getItem("admin_token") ?? "";
    return fetch(`${API}${url}`, {
      ...options,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
        ...((options.headers as Record<string, string>) ?? {}),
      },
    });
  };

  const logout = () => {
    localStorage.removeItem("admin_token");
    navigate("/admin");
  };

  return { authFetch, logout };
}
