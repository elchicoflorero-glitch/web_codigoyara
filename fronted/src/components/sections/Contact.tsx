import { type FormEvent, useState, useEffect, useRef, useCallback } from "react";
import { Icon, SectionHeading } from "@/components/ui";
import GoogleSignInButton from "@/components/ui/GoogleSignInButton";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

const API_URL = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

interface FormState {
  name: string; company: string; email: string; phone: string;
  projectType: string; budget: string; message: string;
}
const EMPTY_FORM: FormState = {
  name: "", company: "", email: "", phone: "",
  projectType: "", budget: "", message: "",
};
type Status = "idle" | "loading" | "success" | "error";

export default function Contact() {
  const { lang } = useLang();
  const tr = t(lang).contact;

  const [form, setForm] = useState<FormState>(EMPTY_FORM);
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");
  const [toastVisible, setToastVisible] = useState(false);
  const toastTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const update = (field: keyof FormState) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm(prev => ({ ...prev, [field]: e.target.value }));

  const handleGoogleSuccess = useCallback((name: string, email: string) => {
    setForm(prev => ({ ...prev, name, email }));
  }, []);

  const showToast = () => {
    setToastVisible(true);
    if (toastTimer.current) clearTimeout(toastTimer.current);
    toastTimer.current = setTimeout(() => setToastVisible(false), 5000);
  };

  useEffect(() => () => { if (toastTimer.current) clearTimeout(toastTimer.current); }, []);

  // Reset projectType/budget when lang changes if they were set (options change)
  useEffect(() => {
    setForm(prev => ({ ...prev, projectType: "", budget: "" }));
  }, [lang]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus("loading"); setErrorMsg("");
    try {
      const res = await fetch(`${API_URL}/api/quotes`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json() as { success: boolean; message: string; errors?: Record<string, string[]> };
      if (!res.ok || !data.success) {
        const firstError = data.errors ? Object.values(data.errors).flat()[0] : data.message;
        throw new Error(firstError ?? "Error al enviar la solicitud");
      }
      setStatus("success");
      setForm(EMPTY_FORM);
      showToast();
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Error inesperado. Intentá de nuevo.");
    }
  };

  const isLoading = status === "loading";
  const isSuccess = status === "success";

  return (
    <section className="section contact-section" id="contacto">
      <div className="container contact-grid">
        <div className="contact-copy">
          <SectionHeading
            eyebrow={tr.eyebrow}
            title={tr.title}
            text={tr.text}
          />
          <div className="contact-details">
            <div>
              <span><Icon name="link" /></span>
              <p><small>{tr.writeUs}</small><a href="mailto:hola@nuvora.dev">hola@nuvora.dev</a></p>
            </div>
            <div>
              <span><Icon name="support" /></span>
              <p><small>{tr.callUs}</small><a href="tel:+51994841296">🇵🇪 +51 994 841 296</a></p>
            </div>
            <div>
              <span><Icon name="cloud" /></span>
              <p><small>{tr.offices}</small><b>🇵🇪 Lima, Perú · 🇸🇪 Estocolmo, Suecia</b></p>
            </div>
          </div>
        </div>

        <form className="contact-form" onSubmit={handleSubmit} noValidate>
          <div className="google-signin-row">
            <GoogleSignInButton onSuccess={handleGoogleSuccess} />
            <div className="google-divider">
              <span /><small>{tr.orManually}</small><span />
            </div>
          </div>
          <div className="form-row">
            <label>{tr.fieldName}<input required placeholder={tr.fieldName} value={form.name} onChange={update("name")} disabled={isLoading} /></label>
            <label>{tr.fieldCompany}<input required placeholder={tr.fieldCompany} value={form.company} onChange={update("company")} disabled={isLoading} /></label>
          </div>
          <div className="form-row">
            <label>{tr.fieldEmail}<input required type="email" placeholder="nombre@empresa.com" value={form.email} onChange={update("email")} disabled={isLoading} /></label>
            <label>{tr.fieldPhone}<input type="tel" placeholder="+54 9..." value={form.phone} onChange={update("phone")} disabled={isLoading} /></label>
          </div>
          <div className="form-row">
            <label>
              {tr.fieldProjectType}
              <select required value={form.projectType} onChange={update("projectType")} disabled={isLoading}>
                <option value="" disabled>—</option>
                {tr.projectOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </label>
            <label>
              {tr.fieldBudget}
              <select required value={form.budget} onChange={update("budget")} disabled={isLoading}>
                <option value="" disabled>—</option>
                {tr.budgetOptions.map(o => <option key={o}>{o}</option>)}
              </select>
            </label>
          </div>
          <label>
            {tr.fieldMessage}
            <textarea required rows={5} placeholder={tr.messagePlaceholder} value={form.message} onChange={update("message")} disabled={isLoading} />
          </label>

          {status === "error" && (
            <p className="form-error"><Icon name="x" size={14} /> {errorMsg}</p>
          )}

          <button
            className={`button button-primary button-large form-button ${isLoading ? "button-loading" : ""}`}
            type="submit"
            disabled={isLoading || isSuccess}
          >
            {isLoading ? (
              <><span className="btn-spinner" /> {tr.sending}</>
            ) : isSuccess ? (
              <>{tr.sent} <Icon name="check" size={18} /></>
            ) : (
              <>{tr.submitBtn} <Icon name="arrow" size={18} /></>
            )}
          </button>
        </form>
      </div>

      <div className={`toast ${toastVisible ? "toast-visible" : ""}`} role="status" aria-live="polite">
        <div className="toast-icon"><Icon name="check" size={18} /></div>
        <div className="toast-body">
          <strong>{tr.toastTitle}</strong>
          <span>{tr.toastText}</span>
        </div>
        <button className="toast-close" onClick={() => setToastVisible(false)} aria-label="Cerrar">
          <Icon name="x" size={15} />
        </button>
      </div>
    </section>
  );
}
