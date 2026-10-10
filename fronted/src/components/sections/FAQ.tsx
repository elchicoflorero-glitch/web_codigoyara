import { useState } from "react";
import { SectionHeading } from "@/components/ui";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

export default function FAQ() {
  const { lang } = useLang();
  const tr = t(lang).faq;

  const [open, setOpen] = useState<number | null>(null);
  const toggle = (i: number) => setOpen(prev => prev === i ? null : i);

  return (
    <section className="section faq-section">
      <div className="container faq-inner">
        <SectionHeading
          eyebrow={tr.eyebrow}
          title={tr.title}
          text={tr.text}
        />
        <div className="faq-list">
          {tr.items.map((faq, i) => (
            <div className={`faq-item ${open === i ? "faq-open" : ""}`} key={i}>
              <button
                className="faq-question"
                onClick={() => toggle(i)}
                aria-expanded={open === i}
              >
                <span>{faq.q}</span>
                <i className="faq-icon" aria-hidden="true" />
              </button>
              <div className="faq-answer">
                <p>{faq.a}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
