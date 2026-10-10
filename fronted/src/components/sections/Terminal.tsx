import { useEffect, useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useLang } from "@/lib/LangContext";
import { t } from "@/lib/translations";

/* ─────────────────────────────────────────────────────────
   Flutter code stages
───────────────────────────────────────────────────────── */
type Screen = "blank" | "splash" | "login" | "logging" | "home";

interface Stage {
  lines: string[];
  screen: Screen;
}

const STAGES: Stage[] = [
  {
    screen: "blank",
    lines: [
      "// Flutter · Nuvora App",
      "import 'package:flutter/material.dart';",
    ],
  },
  {
    screen: "splash",
    lines: [
      "// Flutter · Nuvora App",
      "import 'package:flutter/material.dart';",
      "",
      "class SplashScreen extends StatelessWidget {",
      "  @override",
      "  Widget build(BuildContext context) {",
      "    return Scaffold(",
      "      backgroundColor: Color(0xFF050505),",
      "      body: Center(",
      "        child: Column(children: [",
      "          Icon(Icons.bolt, color: Colors.yellow),",
      "          Text('nuvora.',",
      "            style: TextStyle(color: Colors.white,",
      "              fontSize: 32, fontWeight: FontWeight.w800)),",
      "        ]),",
      "      ),",
      "    );",
      "  }",
      "}",
    ],
  },
  {
    screen: "login",
    lines: [
      "import 'package:flutter/material.dart';",
      "",
      "class LoginScreen extends StatelessWidget {",
      "  @override",
      "  Widget build(BuildContext context) {",
      "    return Scaffold(",
      "      body: Padding(",
      "        padding: EdgeInsets.all(24),",
      "        child: Column(children: [",
      "          SizedBox(height: 80),",
      "          Text('Bienvenido',",
      "            style: TextStyle(fontSize: 28,",
      "              fontWeight: FontWeight.bold)),",
      "          SizedBox(height: 32),",
      "          TextField(decoration: InputDecoration(",
      "            labelText: 'Correo electrónico')),",
      "          SizedBox(height: 16),",
      "          TextField(obscureText: true,",
      "            decoration: InputDecoration(",
      "              labelText: 'Contraseña')),",
      "          SizedBox(height: 24),",
      "          ElevatedButton(",
      "            onPressed: () {},",
      "            child: Text('Iniciar sesión')),",
      "        ]),",
      "      ),",
      "    );",
      "  }",
      "}",
    ],
  },
  {
    screen: "logging",
    lines: [
      "// ⚡ Compilando...",
      "// flutter build apk --release",
      "// Running Gradle task 'assembleRelease'...",
      "// ✓  Built build/app/outputs/apk/release",
      "",
      "// Autenticando usuario...",
      "Future<void> _login() async {",
      "  setState(() => _loading = true);",
      "  await AuthService.signIn(",
      "    email: _emailCtrl.text,",
      "    password: _passCtrl.text,",
      "  );",
      "  Navigator.pushReplacement(context,",
      "    MaterialPageRoute(builder: (_) => HomeScreen()));",
      "}",
    ],
  },
  {
    screen: "home",
    lines: [
      "class HomeScreen extends StatelessWidget {",
      "  @override",
      "  Widget build(BuildContext context) {",
      "    return Scaffold(",
      "      appBar: AppBar(title: Text('Dashboard')),",
      "      body: Column(children: [",
      "        _StatsRow(value: '\\$84.2K', label: 'Ingresos'),",
      "        _StatsRow(value: '2,429',   label: 'Usuarios'),",
      "        _StatsRow(value: '24.8%',   label: 'Conversión'),",
      "        Expanded(child: _ChartWidget()),",
      "      ]),",
      "      bottomNavigationBar: BottomNavigationBar(",
      "        items: [",
      "          BottomNavigationBarItem(icon: Icon(Icons.home)),",
      "          BottomNavigationBarItem(icon: Icon(Icons.bar_chart)),",
      "          BottomNavigationBarItem(icon: Icon(Icons.person)),",
      "        ],",
      "      ),",
      "    );",
      "  }",
      "}",
      "// 🚀 App publicada en Play Store",
    ],
  },
];

/* ─────────────────────────────────────────────────────────
   Phone screen previews
───────────────────────────────────────────────────────── */
function PhoneBlank() {
  return (
    <div className="ph-screen ph-blank">
      <motion.div
        className="ph-cursor"
        animate={{ opacity: [1, 0] }}
        transition={{ duration: 0.7, repeat: Infinity }}
      />
    </div>
  );
}

function PhoneSplash() {
  return (
    <div className="ph-screen ph-splash">
      <motion.div
        className="ph-splash-inner"
        initial={{ scale: 0.6, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ type: "spring", stiffness: 200, damping: 16 }}
      >
        <div className="ph-splash-icon">⚡</div>
        <div className="ph-splash-logo">nuvora<span>.</span></div>
        <div className="ph-splash-sub">Mobile App</div>
      </motion.div>
    </div>
  );
}

function PhoneLogin() {
  return (
    <div className="ph-screen ph-login">
      <motion.div
        className="ph-login-inner"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <div className="ph-login-logo">nuvora<span>.</span></div>
        <div className="ph-login-title">Bienvenido</div>
        <div className="ph-login-sub">Ingresa a tu cuenta</div>

        <div className="ph-field">
          <div className="ph-field-label">Correo electrónico</div>
          <div className="ph-field-input">carlos@empresa.com</div>
        </div>
        <div className="ph-field">
          <div className="ph-field-label">Contraseña</div>
          <div className="ph-field-input">••••••••</div>
        </div>

        <div className="ph-login-btn">Iniciar sesión</div>
        <div className="ph-login-link">¿Olvidaste tu contraseña?</div>
      </motion.div>
    </div>
  );
}

function PhoneLogging() {
  return (
    <div className="ph-screen ph-logging">
      <div className="ph-login-logo" style={{ marginBottom: 24 }}>nuvora<span>.</span></div>
      <motion.div
        className="ph-loading-ring"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
      <div className="ph-loading-text">Iniciando sesión...</div>
      <div className="ph-loading-steps">
        {["Verificando credenciales", "Cargando perfil", "Preparando dashboard"].map((s, i) => (
          <motion.div
            key={s}
            className="ph-loading-step"
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.5, duration: 0.3 }}
          >
            <motion.span
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.5 + 0.2 }}
            >✓</motion.span>
            {s}
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function PhoneHome() {
  return (
    <div className="ph-screen ph-home">
      {/* AppBar */}
      <div className="ph-appbar">
        <span>Dashboard</span>
        <div className="ph-avatar">CP</div>
      </div>

      {/* Stats */}
      <div className="ph-stats">
        {[
          { value: "$84.2K", label: "Ingresos",   color: "#ffd21f" },
          { value: "2,429",  label: "Usuarios",   color: "#60a5fa" },
          { value: "24.8%",  label: "Conversión", color: "#4ade80" },
        ].map((s, i) => (
          <motion.div
            key={s.label}
            className="ph-stat-card"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.12, duration: 0.3 }}
          >
            <div className="ph-stat-value" style={{ color: s.color }}>{s.value}</div>
            <div className="ph-stat-label">{s.label}</div>
          </motion.div>
        ))}
      </div>

      {/* Chart */}
      <div className="ph-chart-wrap">
        <div className="ph-chart-title">Rendimiento · 30 días</div>
        <div className="ph-chart-bars">
          {[30,50,42,68,55,80,72,88,76,90,84,95].map((h, i) => (
            <motion.div
              key={i}
              className="ph-bar"
              initial={{ scaleY: 0 }}
              animate={{ scaleY: 1 }}
              transition={{ delay: i * 0.04, duration: 0.3, ease: "easeOut" }}
              style={{ height: `${h}%` }}
            />
          ))}
        </div>
      </div>

      {/* Bottom nav */}
      <div className="ph-bottom-nav">
        {["�","�","👤"].map((icon, i) => (
          <div key={i} className={`ph-nav-item ${i === 0 ? "active" : ""}`}>
            <span>{icon}</span>
            <small>{["Inicio","Stats","Perfil"][i]}</small>
          </div>
        ))}
      </div>
    </div>
  );
}

const SCREENS: Record<Screen, React.FC> = {
  blank:   PhoneBlank,
  splash:  PhoneSplash,
  login:   PhoneLogin,
  logging: PhoneLogging,
  home:    PhoneHome,
};

/* ─────────────────────────────────────────────────────────
   Syntax highlighter (Dart/Flutter)
───────────────────────────────────────────────────────── */
function highlight(raw: string): string {
  if (!raw.trim()) return "&nbsp;";
  return raw
    .replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;")
    .replace(/(\/\/.*$)/g,   '<span class="sh-comment">$1</span>')
    .replace(/('[^']*'|"[^"]*")/g, '<span class="sh-string">$1</span>')
    .replace(/\b(import|class|extends|return|final|const|var|void|async|await|override|new|true|false|null)\b/g,
             '<span class="sh-kw">$1</span>')
    .replace(/\b(StatelessWidget|StatefulWidget|Widget|BuildContext|Scaffold|Column|Row|Text|Icon|Center|Padding|EdgeInsets|TextStyle|MaterialPageRoute|Navigator|SizedBox|TextField|ElevatedButton|InputDecoration|BottomNavigationBar|BottomNavigationBarItem|AppBar|Expanded|Colors|Color|FontWeight|Icons|Future)\b/g,
             '<span class="sh-class">$1</span>')
    .replace(/\b(build|onPressed|setState|pushReplacement|signIn)\b/g,
             '<span class="sh-fn">$1</span>');
}

/* ─────────────────────────────────────────────────────────
   Main component
───────────────────────────────────────────────────────── */
export default function Terminal() {
  const { lang } = useLang();
  const tr = t(lang).terminal;

  const ref     = useRef<HTMLDivElement>(null);
  const inView  = useInView(ref, { once: false, margin: "0px 0px -200px 0px" });
  const isRunning = useRef(false);
  const timers  = useRef<ReturnType<typeof setTimeout>[]>([]);

  const [visibleLines, setVisibleLines] = useState<string[]>([]);
  const [typing,       setTyping]       = useState("");
  const [screen,       setScreen]       = useState<Screen>("blank");
  // NO endRef scrollIntoView — eliminado para no secuestrar el scroll

  useEffect(() => () => { timers.current.forEach(clearTimeout); }, []);

  const runAnimation = () => {
    if (isRunning.current) return;
    isRunning.current = true;

    // Reset state
    setVisibleLines([]);
    setTyping("");
    setScreen("blank");

    let delay = 600;
    const CHAR = 26;

    STAGES.forEach((stage) => {
      stage.lines.forEach((line, li) => {
        // Type char by char
        for (let ci = 0; ci <= line.length; ci++) {
          const t = setTimeout(() => setTyping(line.slice(0, ci)), delay + ci * CHAR);
          timers.current.push(t);
        }
        delay += line.length * CHAR + 80;

        // Commit line
        const snapshot = stage.lines.slice(0, li + 1);
        const t2 = setTimeout(() => {
          setTyping("");
          setVisibleLines(snapshot);
          setScreen(stage.screen);
        }, delay);
        timers.current.push(t2);
        delay += 60;
      });
      delay += 500; // pause between stages
    });

    // When done, wait 2s then loop
    const totalDelay = delay + 2000;
    const tLoop = setTimeout(() => {
      isRunning.current = false;
      timers.current = [];
      runAnimation();
    }, totalDelay);
    timers.current.push(tLoop);
  };

  useEffect(() => {
    if (inView) {
      runAnimation();
    } else {
      // Stop if scrolled away
      timers.current.forEach(clearTimeout);
      timers.current = [];
      isRunning.current = false;
    }
  }, [inView]); // eslint-disable-line

  const ScreenComp = SCREENS[screen];

  return (
    <section className="section terminal-section terminal-split-section">
      <div className="container">
        <motion.div
          className="terminal-split-heading"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <span className="eyebrow eyebrow-dark"><span />{tr.eyebrow}</span>
          <h2>{tr.title}</h2>
          <p>{tr.text}</p>
        </motion.div>

        <motion.div
          ref={ref}
          className="terminal-split-grid"
          initial={{ opacity: 0, y: 40 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: "easeOut" }}
        >
          {/* ── Left: VS Code ── */}
          <div className="ts-editor">
            <div className="ts-editor-bar">
              <span className="t-dot t-red" />
              <span className="t-dot t-yellow" />
              <span className="t-dot t-green" />
              <span className="t-title">main.dart — nuvora_app</span>
              <span className="ts-lang">Dart</span>
            </div>
            <div className="ts-editor-body">
              <div className="ts-line-nums">
                {Array.from({ length: Math.max(visibleLines.length + 2, 16) }, (_, i) => (
                  <span key={i}>{i + 1}</span>
                ))}
              </div>
              <div className="ts-code">
                {visibleLines.map((line, i) => (
                  <div key={i} className="ts-code-line">
                    <span dangerouslySetInnerHTML={{ __html: highlight(line) }} />
                  </div>
                ))}
                <div className="ts-code-line ts-typing">
                  <span dangerouslySetInnerHTML={{ __html: highlight(typing) }} />
                  {typing !== "" && <span className="terminal-cursor">▋</span>}
                </div>
              </div>
            </div>
          </div>

          {/* ── Right: Phone mockup ── */}
          <div className="ts-preview-panel ts-phone-panel">
            <div className="ts-preview-bar">
              <div className="ts-preview-dots"><span /><span /><span /></div>
              <span className="ts-preview-url">Flutter Hot Reload ⚡</span>
              <span className="ts-preview-status">● Running</span>
            </div>
            <div className="ts-phone-wrap">
              <div className="ts-phone">
                <div className="ts-phone-notch" />
                <div className="ts-phone-screen">
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={screen}
                      style={{ width: "100%", height: "100%" }}
                      initial={{ opacity: 0, scale: 0.96 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 1.03 }}
                      transition={{ duration: 0.35, ease: "easeOut" }}
                    >
                      <ScreenComp />
                    </motion.div>
                  </AnimatePresence>
                </div>
                <div className="ts-phone-home-btn" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
