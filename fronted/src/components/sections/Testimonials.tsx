import { useState, useEffect, useRef, type FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { SectionHeading, Icon } from "@/components/ui";
import { testimonials as staticTestimonials } from "@/data/testimonials";
import useInView from "@/hooks/useInView";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

interface ApiTestimonial {
  id: string; name: string; role: string; company: string;
  quote: string; rating: number;
}


function TestimonialCard({
  name, role, company, quote, rating, color, initials,
}: {
  name: string; role: string; company: string; quote: string;
  rating: number; color?: string; initials?: string;
}) {
  const [expanded, setExpanded] = useState(false);
  const [clamped,  setClamped]  = useState(false);
  const textRef = useRef<HTMLQuoteElement>(null);

  // Detect if text actually overflows the clamp
  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    setClamped(el.scrollHeight > el.clientHeight + 2);
  }, [quote]);

  return (
    <article className="testimonial-card">
      <div className="testimonial-stars">
        {Array.from({ length: rating }).map((_, i) => <span key={i}>★</span>)}
      </div>

      <blockquote
        ref={textRef}
        style={expanded ? { WebkitLineClamp: "unset", overflow: "visible" } : {}}
      >
        "{quote}"
      </blockquote>

      {/* Show toggle only when text is actually clamped or was expanded */}
      {(clamped || expanded) && (
        <button
          type="button"
          className="testimonial-expand-btn"
          onClick={() => setExpanded(v => !v)}
        >
          {expanded ? "Ver menos ↑" : "Ver más ↓"}
        </button>
      )}

      <div className="testimonial-author">
        <div className="testimonial-avatar" style={{ background: color ?? "#246bfe" }} aria-hidden="true">
          {initials ?? name.slice(0, 2).toUpperCase()}
        </div>
        <div>
          <strong>{name}</strong>
          <span>{role} · {company}</span>
        </div>
      </div>
    </article>
  );
}

type Status = "idle" | "loading" | "success" | "error";

function TestimonialForm() {
  const { lang } = useLang();
  const tr = t(lang).testimonials;

  const [form, setForm] = useState({ name: "", role: "", company: "", quote: "", rating: 5 });
  const [status, setStatus] = useState<Status>("idle");
  const [msg,    setMsg]    = useState("");

  const upd = (k: keyof typeof form, v: string | number) =>
    setForm(prev => ({ ...prev, [k]: v }));

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("loading"); setMsg("");
    try {
      const res  = await fetch(`${API}/api/testimonials`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, rating: Number(form.rating) }),
      });
      const data = await res.json() as { success: boolean; message: string };
      if (!data.success) throw new Error(data.message);
      setStatus("success");
      setMsg(data.message);
      setForm({ name: "", role: "", company: "", quote: "", rating: 5 });
    } catch (err) {
      setStatus("error");
      setMsg(err instanceof Error ? err.message : "Error al enviar");
    }
  };

  return (
    <div className="testimonial-form-wrap">
      <h3>{tr.formTitle}</h3>
      <p>{tr.formText}</p>

      <AnimatePresence mode="wait">
        {status === "success" ? (
          <motion.div
            className="testimonial-form-success"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
          >
            <Icon name="check" size={24} />
            <p>{msg || tr.successTitle}</p>
          </motion.div>
        ) : (
          <motion.form onSubmit={submit} className="testimonial-form" initial={{ opacity: 1 }} animate={{ opacity: 1 }}>
            <div className="tf-row">
              <label>{tr.fieldName}<input required value={form.name} onChange={e => upd("name", e.target.value)} placeholder="María González" disabled={status === "loading"} /></label>
              <label>{tr.fieldRole}<input required value={form.role} onChange={e => upd("role", e.target.value)} placeholder="CEO" disabled={status === "loading"} /></label>
            </div>
            <label>{tr.fieldCompany}<input required value={form.company} onChange={e => upd("company", e.target.value)} placeholder="Mi empresa S.A." disabled={status === "loading"} /></label>
            <label className="tf-rating-label">
              {tr.fieldRating}
              <div className="tf-stars">
                {[1,2,3,4,5].map(n => (
                  <button key={n} type="button" className={`tf-star ${n <= form.rating ? "active" : ""}`} onClick={() => upd("rating", n)}>★</button>
                ))}
              </div>
            </label>
            <label>
              {tr.fieldComment}
              <textarea required rows={4} minLength={20} value={form.quote} onChange={e => upd("quote", e.target.value)} placeholder={tr.commentPlaceholder} disabled={status === "loading"} />
            </label>
            {status === "error" && <p className="tf-error">{msg}</p>}
            <button type="submit" className="button button-primary tf-submit" disabled={status === "loading"}>
              {status === "loading"
                ? <><span className="btn-spinner" /> {tr.sending}</>
                : <>{tr.submitBtn} <Icon name="arrow" size={16} /></>}
            </button>
          </motion.form>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function Testimonials() {
  const { lang } = useLang();
  const tr = t(lang).testimonials;

  const { ref, inView } = useInView();
  const [apiTestimonials, setApiTestimonials] = useState<ApiTestimonial[]>([]);

  useEffect(() => {
    fetch(`${API}/api/testimonials`)
      .then(r => r.json())
      .then((d: { success: boolean; data: ApiTestimonial[] }) => {
        if (d.success && d.data?.length) setApiTestimonials(d.data);
      })
      .catch(() => {});
  }, []);

  const allTestimonials = apiTestimonials.length > 0 ? apiTestimonials : staticTestimonials;

  return (
    <section className="section testimonials-section" id="testimonials">
      <div className="container">
        <SectionHeading
          eyebrow={tr.eyebrow}
          title={tr.title}
          text={tr.text}
        />

        <div ref={ref} className={`testimonials-grid reveal-group ${inView ? "in-view" : ""}`}>
          {allTestimonials.map((t_item, i) => (
            <motion.div
              key={"id" in t_item ? t_item.id : t_item.name}
              style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <TestimonialCard
                name={t_item.name}
                role={t_item.role}
                company={t_item.company}
                quote={t_item.quote}
                rating={t_item.rating ?? 5}
                color={"color" in t_item ? (t_item as any).color : undefined}
                initials={"initials" in t_item ? (t_item as any).initials : undefined}
              />
            </motion.div>
          ))}
        </div>

        <TestimonialForm />
      </div>
    </section>
  );
}
