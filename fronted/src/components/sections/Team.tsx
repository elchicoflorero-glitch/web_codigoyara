import { useEffect, useState } from "react";
import { Icon, SectionHeading } from "@/components/ui";
import { team as staticTeam } from "@/data/team";
import useInView from "@/hooks/useInView";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

const API = import.meta.env.VITE_API_URL ?? "http://localhost:3000";

interface TeamMember {
  id?: string;
  name: string;
  role: string;
  bio: string;
  initials: string;
  color: string;
  linkedin: string;
  photo?: string;
}

const VALUE_ICONS = ["rocket", "shield", "spark", "support"] as const;

export default function Team() {
  const { lang } = useLang();
  const tr = t(lang).team;

  const { ref, inView } = useInView();
  const [members, setMembers] = useState<TeamMember[]>(staticTeam);

  useEffect(() => {
    fetch(`${API}/api/team`)
      .then(r => r.json())
      .then((d: { success: boolean; data: TeamMember[] }) => {
        if (d.success && d.data?.length) setMembers(d.data);
      })
      .catch(() => {});
  }, []);

  return (
    <section className="section team-section" id="equipo">
      <div className="container">
        <div className="team-heading">
          <SectionHeading
            eyebrow={tr.eyebrow}
            title={tr.title}
            text={tr.text}
          />
        </div>

        <div ref={ref} className={`team-grid reveal-group ${inView ? "in-view" : ""}`}>
          {members.map((member, i) => (
            <article
              className="team-card"
              key={member.name}
              style={{ "--delay": `${i * 80}ms` } as React.CSSProperties}
            >
              <div className="team-avatar-wrap">
                {member.photo ? (
                  <img src={member.photo} alt={member.name} className="team-avatar-photo" />
                ) : (
                  <div
                    className="team-avatar"
                    style={{ background: `${member.color}22`, border: `2px solid ${member.color}44` }}
                  >
                    <span style={{ color: member.color }}>{member.initials}</span>
                  </div>
                )}
                <div className="team-avatar-ring" style={{ borderColor: `${member.color}33` }} />
              </div>
              <div className="team-info">
                <h3>{member.name}</h3>
                <span className="team-role">{member.role}</span>
                <p>{member.bio}</p>
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="team-linkedin"
                  aria-label={`LinkedIn de ${member.name}`}
                >
                  <Icon name="link" size={14} /> LinkedIn
                </a>
              </div>
            </article>
          ))}
        </div>

        <div className="team-values">
          {tr.values.map((label, i) => (
            <div className="team-value" key={label}>
              <Icon name={VALUE_ICONS[i]} size={18} />
              <span>{label}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
