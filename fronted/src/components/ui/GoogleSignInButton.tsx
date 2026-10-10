import { useEffect, useRef } from "react";

interface GoogleSignInButtonProps {
  onSuccess: (name: string, email: string) => void;
}

declare global {
  interface Window {
    google?: {
      accounts: {
        id: {
          initialize: (config: object) => void;
          renderButton: (el: HTMLElement, config: object) => void;
        };
      };
    };
  }
}

export default function GoogleSignInButton({ onSuccess }: GoogleSignInButtonProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const CLIENT_ID = import.meta.env.VITE_GOOGLE_CLIENT_ID as string;

  useEffect(() => {
    const init = () => {
      if (!window.google || !containerRef.current) return;

      window.google.accounts.id.initialize({
        client_id: CLIENT_ID,
        callback: (response: { credential: string }) => {
          // Decode JWT payload (no signature verification needed client-side)
          const payload = JSON.parse(atob(response.credential.split(".")[1])) as {
            name: string;
            email: string;
          };
          onSuccess(payload.name, payload.email);
        },
      });

      window.google.accounts.id.renderButton(containerRef.current, {
        type: "standard",
        theme: "outline",
        size: "large",
        text: "continue_with",
        width: "100%",
        logo_alignment: "left",
      });
    };

    // Load Google script if not already loaded
    if (window.google) {
      init();
    } else {
      const script = document.createElement("script");
      script.src = "https://accounts.google.com/gsi/client";
      script.async = true;
      script.defer = true;
      script.onload = init;
      document.head.appendChild(script);
    }
  }, [CLIENT_ID, onSuccess]);

  return (
    <div className="google-btn-wrap">
      <div ref={containerRef} />
    </div>
  );
}
