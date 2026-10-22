import type { BgId } from "./BgContext";

export type DrawFn = (ctx: CanvasRenderingContext2D, w: number, h: number, t: number) => void;

export interface BgVariant {
  id: BgId;
  label: string;
  description: string;
  type?: "canvas" | "youtube";
  youtubeId?: string;
  draw: DrawFn;
}

// ── helpers ──────────────────────────────────────────────
const rand = (min: number, max: number) => Math.random() * (max - min) + min;

// ── Variant 1: Hero — dark space + violet/cyan particles ──
function drawHero(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const bg = ctx.createLinearGradient(0, 0, w * 0.6, h);
  bg.addColorStop(0,    "#050505");
  bg.addColorStop(0.45, "#07092e");
  bg.addColorStop(1,    "#080d19");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Grid lines
  ctx.strokeStyle = "rgba(79,70,229,0.06)";
  ctx.lineWidth = 1;
  const gs = 36;
  for (let x = 0; x < w; x += gs) { ctx.beginPath(); ctx.moveTo(x, 0); ctx.lineTo(x, h); ctx.stroke(); }
  for (let y = 0; y < h; y += gs) { ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke(); }

  // Glow blobs
  const drawGlow = (cx: number, cy: number, radius: number, color: string) => {
    const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, radius);
    g.addColorStop(0, color); g.addColorStop(1, "transparent");
    ctx.fillStyle = g;
    ctx.fillRect(cx - radius, cy - radius, radius * 2, radius * 2);
  };
  drawGlow(w * 0.78 + Math.sin(t * 0.4) * 20, h * 0.2, w * 0.35, "rgba(37,99,235,0.18)");
  drawGlow(w * 0.1  + Math.sin(t * 0.3) * 15, h * 0.6, w * 0.28, "rgba(124,58,237,0.13)");
  drawGlow(w * 0.5,                            h * 0.9, w * 0.25, "rgba(255,210,31,0.07)");

  // Particles
  const palette = ["#7c3aed","#4f46e5","#0ea5e9","#8b5cf6","#06b6d4","#ffffff"];
  const COUNT = 90;
  for (let i = 0; i < COUNT; i++) {
    const ang = (i / COUNT) * Math.PI * 2 * 7 + t * (0.05 + (i % 5) * 0.01);
    const rad = 30 + (i * 4.3) % (Math.min(w, h) * 0.48);
    const px = w * 0.5 + Math.cos(ang + 42) * rad * (w / h);
    const py = h * 0.5 + Math.sin(ang) * rad;
    ctx.beginPath();
    ctx.arc(px, py, 0.5 + (i % 4) * 0.4, 0, Math.PI * 2);
    ctx.fillStyle = palette[i % palette.length];
    ctx.globalAlpha = 0.4 + Math.sin(t + i) * 0.2;
    ctx.fill();
  }
  ctx.globalAlpha = 1;

  // Wireframe
  const cx2 = w * 0.82, cy2 = h * 0.3, R = Math.min(w, h) * 0.14;
  const verts = Array.from({ length: 12 }, (_, i) => {
    const phi = Math.acos(-1 + (2 * i) / 11);
    const theta = Math.sqrt(12 * Math.PI) * phi + t * 0.4;
    return { x: cx2 + R * Math.sin(phi) * Math.cos(theta), y: cy2 + R * Math.sin(phi) * Math.sin(theta) };
  });
  ctx.strokeStyle = "rgba(124,58,237,0.35)"; ctx.lineWidth = 0.7;
  for (let a = 0; a < verts.length; a++)
    for (let b = a + 1; b < verts.length; b++) {
      const dx = verts[a].x - verts[b].x, dy = verts[a].y - verts[b].y;
      if (Math.sqrt(dx*dx + dy*dy) < R * 1.2) {
        ctx.beginPath(); ctx.moveTo(verts[a].x, verts[a].y); ctx.lineTo(verts[b].x, verts[b].y); ctx.stroke();
      }
    }
}

// ── Variant 2: Aurora Boreal ──
function drawAurora(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.fillStyle = "#020a08"; ctx.fillRect(0, 0, w, h);
  const bands = [
    { offset: 0.25, col: ["rgba(0,255,120,0.0)",  "rgba(0,255,120,0.12)",  "rgba(0,255,120,0.0)"]  },
    { offset: 0.40, col: ["rgba(0,220,180,0.0)",  "rgba(0,220,180,0.10)",  "rgba(0,220,180,0.0)"]  },
    { offset: 0.55, col: ["rgba(30,180,255,0.0)", "rgba(30,180,255,0.09)", "rgba(30,180,255,0.0)"] },
    { offset: 0.68, col: ["rgba(120,80,255,0.0)", "rgba(120,80,255,0.07)", "rgba(120,80,255,0.0)"] },
  ];
  bands.forEach(({ offset, col }, bi) => {
    const yBase = h * offset, amp = h * 0.06, freq = 0.008 + bi * 0.002, speed = t * (0.3 + bi * 0.1);
    const pts = Array.from({ length: w + 1 }, (_, x) => ({ x, y: yBase + Math.sin(x * freq + speed) * amp + Math.sin(x * freq * 2.3 + speed * 1.5) * amp * 0.4 }));
    const grad = ctx.createLinearGradient(0, yBase - amp * 2, 0, yBase + amp * 2);
    grad.addColorStop(0, col[0]); grad.addColorStop(0.5, col[1]); grad.addColorStop(1, col[2]);
    ctx.beginPath(); ctx.moveTo(0, h); pts.forEach(p => ctx.lineTo(p.x, p.y)); ctx.lineTo(w, h); ctx.closePath();
    ctx.fillStyle = grad; ctx.fill();
  });
  for (let i = 0; i < 120; i++) {
    ctx.beginPath(); ctx.arc((i * 137.5) % w, (i * 97.3) % (h * 0.5), 0.5 + (i % 3) * 0.3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.2 + Math.sin(t * 2 + i) * 0.15})`; ctx.fill();
  }
}

// ── Variant 3: Neon Grid ──
function drawNeonGrid(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.fillStyle = "#05000f"; ctx.fillRect(0, 0, w, h);
  const vp = { x: w * 0.5, y: h * 0.42 };
  const cols = ["rgba(255,0,180,", "rgba(255,80,0,", "rgba(0,200,255,"];
  for (let i = 0; i < 14; i++) {
    const y = vp.y + (h - vp.y) * Math.pow(i / 13, 1.8);
    ctx.strokeStyle = cols[i % 3] + (i / 13 * 0.5) + ")"; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(0, y); ctx.lineTo(w, y); ctx.stroke();
  }
  for (let i = 0; i <= 18; i++) {
    const fx = (i / 18) * w, alpha = Math.max(0.03, 0.18 - Math.abs(i / 18 - 0.5) * 0.3);
    ctx.strokeStyle = cols[i % 3] + alpha + ")"; ctx.lineWidth = 0.8;
    ctx.beginPath(); ctx.moveTo(vp.x, vp.y); ctx.lineTo(fx, h); ctx.stroke();
  }
  const hg = ctx.createLinearGradient(0, vp.y - 30, 0, vp.y + 40);
  hg.addColorStop(0, "transparent"); hg.addColorStop(0.5, "rgba(255,0,180,0.15)"); hg.addColorStop(1, "transparent");
  ctx.fillStyle = hg; ctx.fillRect(0, vp.y - 30, w, 70);
  for (let i = 0; i < 40; i++) {
    ctx.beginPath(); ctx.arc((i * 71.3 + t * 10) % w, vp.y + 20 + (i * 31.7 + t * 5) % (h - vp.y - 20), 1.2, 0, Math.PI * 2);
    ctx.fillStyle = cols[i % 3] + "0.7)"; ctx.fill();
  }
  const sunG = ctx.createRadialGradient(vp.x, vp.y, 0, vp.x, vp.y, 60);
  sunG.addColorStop(0, "rgba(255,100,0,0.6)"); sunG.addColorStop(0.5, "rgba(255,0,100,0.3)"); sunG.addColorStop(1, "transparent");
  ctx.fillStyle = sunG; ctx.beginPath(); ctx.arc(vp.x, vp.y, 60, 0, Math.PI * 2); ctx.fill();
  for (let s = 1; s < 6; s++) { ctx.strokeStyle = "rgba(5,0,15,0.4)"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(vp.x - 40, vp.y - 8 + s * 4); ctx.lineTo(vp.x + 40, vp.y - 8 + s * 4); ctx.stroke(); }
}

// ── Variant 4: Deep Ocean ──
function drawOcean(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const bg2 = ctx.createLinearGradient(0, 0, 0, h);
  bg2.addColorStop(0, "#000810"); bg2.addColorStop(1, "#001428");
  ctx.fillStyle = bg2; ctx.fillRect(0, 0, w, h);
  for (let r = 0; r < 8; r++) {
    const rx = w * (0.1 + r * 0.11), rw2 = 15 + r * 8;
    const grad2 = ctx.createLinearGradient(rx, 0, rx, h * 0.7);
    grad2.addColorStop(0, "rgba(0,180,255,0.06)"); grad2.addColorStop(1, "transparent");
    ctx.fillStyle = grad2;
    ctx.beginPath(); ctx.moveTo(rx - rw2 * 0.3 + Math.sin(t * 0.5 + r) * 8, 0); ctx.lineTo(rx + rw2 * 0.3 + Math.sin(t * 0.5 + r) * 8, 0);
    ctx.lineTo(rx + rw2 + Math.sin(t * 0.3 + r * 2) * 15, h * 0.7); ctx.lineTo(rx - rw2 + Math.sin(t * 0.3 + r * 2) * 15, h * 0.7); ctx.closePath(); ctx.fill();
  }
  const bio = ["rgba(0,255,200,", "rgba(0,180,255,", "rgba(100,255,220,", "rgba(0,255,150,"];
  for (let i = 0; i < 80; i++) {
    const bx = w * ((i * 0.618) % 1), by = h * ((i * 0.382 + Math.sin(t * 0.15 + i * 0.1) * 0.02) % 1);
    const br = 0.8 + Math.sin(t * 1.5 + i * 0.7) * 0.6, ba = 0.3 + Math.sin(t * 2 + i) * 0.25;
    ctx.beginPath(); ctx.arc(bx, by, br, 0, Math.PI * 2); ctx.fillStyle = bio[i % bio.length] + ba + ")"; ctx.fill();
    const halo = ctx.createRadialGradient(bx, by, 0, bx, by, br * 6);
    halo.addColorStop(0, bio[i % bio.length] + (ba * 0.3) + ")"); halo.addColorStop(1, "transparent");
    ctx.fillStyle = halo; ctx.beginPath(); ctx.arc(bx, by, br * 6, 0, Math.PI * 2); ctx.fill();
  }
  const jx = w * 0.7 + Math.sin(t * 0.2) * 20, jy = h * 0.35 + Math.sin(t * 0.15) * 15;
  ctx.strokeStyle = "rgba(0,220,180,0.2)"; ctx.lineWidth = 1;
  ctx.beginPath(); ctx.arc(jx, jy, 28, Math.PI, 0); ctx.stroke();
  for (let j = 0; j < 6; j++) {
    const jtx = jx - 20 + j * 8;
    ctx.beginPath(); ctx.moveTo(jtx, jy); ctx.bezierCurveTo(jtx - 4, jy + 20 + j * 2, jtx + 4, jy + 35 + j * 2, jtx + Math.sin(t + j) * 6, jy + 50); ctx.stroke();
  }
}

// ── Variant 5: Golden Nebula ──
function drawNebula(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.fillStyle = "#080400"; ctx.fillRect(0, 0, w, h);
  const clouds = [
    { x: 0.3, y: 0.4, r: 0.45, c1: "rgba(255,140,0,0.12)", c2: "rgba(255,80,0,0.06)" },
    { x: 0.7, y: 0.3, r: 0.35, c1: "rgba(255,200,0,0.10)", c2: "rgba(200,100,0,0.05)" },
    { x: 0.5, y: 0.7, r: 0.40, c1: "rgba(180,60,0,0.09)",  c2: "rgba(255,120,0,0.04)" },
  ];
  clouds.forEach((cl, ci) => {
    const ncx = w * cl.x + Math.sin(t * 0.1 + ci) * w * 0.02, ncy = h * cl.y + Math.cos(t * 0.08 + ci) * h * 0.02;
    const ng = ctx.createRadialGradient(ncx, ncy, 0, ncx, ncy, Math.min(w, h) * cl.r);
    ng.addColorStop(0, cl.c1); ng.addColorStop(0.6, cl.c2); ng.addColorStop(1, "transparent");
    ctx.fillStyle = ng; ctx.fillRect(0, 0, w, h);
  });
  for (let i = 0; i < 150; i++) {
    const sa = 0.4 + Math.sin(t * 1.5 + i * 0.5) * 0.3;
    ctx.beginPath(); ctx.arc((i * 173.1) % w, (i * 113.7) % h, i % 5 === 0 ? 1.5 : 0.6, 0, Math.PI * 2);
    ctx.fillStyle = i % 4 === 0 ? `rgba(255,220,100,${sa})` : `rgba(255,255,255,${sa * 0.7})`; ctx.fill();
  }
  const ssT = (t * 0.3) % (Math.PI * 2), ssx = w * 0.1 + (ssT / (Math.PI * 2)) * w * 1.2, ssy = h * 0.1 + Math.sin(ssT) * h * 0.1;
  const grad3 = ctx.createLinearGradient(ssx - 60, ssy - 20, ssx, ssy);
  grad3.addColorStop(0, "transparent"); grad3.addColorStop(1, "rgba(255,200,50,0.6)");
  ctx.strokeStyle = grad3; ctx.lineWidth = 1.5; ctx.beginPath(); ctx.moveTo(ssx - 60, ssy - 20); ctx.lineTo(ssx, ssy); ctx.stroke();
  for (let i = 0; i < 60; i++) {
    ctx.beginPath(); ctx.arc((i * 83.1 + t * 4) % w, (i * 67.3 + t * 2) % h, 0.7, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,${150 + i % 100},0,0.35)`; ctx.fill();
  }
}

// ── Variant 6: Matrix Rain ──
let matrixInitialized = false;
function drawMatrix(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  if (!matrixInitialized) { ctx.fillStyle = "#000500"; ctx.fillRect(0, 0, w, h); matrixInitialized = true; }
  ctx.fillStyle = "rgba(0,5,0,0.18)"; ctx.fillRect(0, 0, w, h);
  const chars = "アイウエオカキクケコサシスセソタチツテトナニヌネノハヒフヘホ01";
  ctx.font = `${Math.max(10, w * 0.018)}px monospace`;
  const colW = Math.max(10, w * 0.018) * 1.2;
  const cols2 = Math.floor(w / colW);
  for (let c = 0; c < cols2; c++) {
    const speed = 0.5 + (c % 7) * 0.3, offset = (c * 37.1) % h;
    const y = ((t * speed * 20 + offset) % (h + 100)) - 20;
    const charIdx = Math.floor(t * 10 + c * 7) % chars.length;
    ctx.fillStyle = "rgba(180,255,180,0.95)"; ctx.fillText(chars[charIdx], c * colW, y);
    for (let tr = 1; tr < 8; tr++) {
      ctx.fillStyle = `rgba(0,${180 + (8 - tr) * 8},0,${(1 - tr / 8) * 0.6})`;
      ctx.fillText(chars[(charIdx + tr) % chars.length], c * colW, y - tr * colW);
    }
  }
}

// ── Variant 7: Blanco Limpio ──
function drawWhite(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  // White base
  ctx.fillStyle = "#ffffff";
  ctx.fillRect(0, 0, w, h);

  // Subtle dot grid
  const spacing = 28;
  for (let x = spacing; x < w; x += spacing) {
    for (let y = spacing; y < h; y += spacing) {
      const pulse = 0.08 + Math.sin(t * 0.4 + x * 0.01 + y * 0.01) * 0.03;
      ctx.beginPath();
      ctx.arc(x, y, 1.2, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(180,185,200,${pulse})`;
      ctx.fill();
    }
  }

  // Soft pastel glow blobs
  const blobs = [
    { x: 0.15, y: 0.2,  r: 0.35, c: "rgba(200,190,255," },
    { x: 0.85, y: 0.15, r: 0.30, c: "rgba(255,200,220," },
    { x: 0.5,  y: 0.85, r: 0.40, c: "rgba(190,230,255," },
    { x: 0.75, y: 0.7,  r: 0.25, c: "rgba(210,255,210," },
  ];
  blobs.forEach((b, i) => {
    const bx = w * b.x + Math.sin(t * 0.2 + i) * w * 0.015;
    const by = h * b.y + Math.cos(t * 0.18 + i) * h * 0.015;
    const gr = ctx.createRadialGradient(bx, by, 0, bx, by, Math.min(w, h) * b.r);
    gr.addColorStop(0, b.c + "0.18)");
    gr.addColorStop(1, b.c + "0)");
    ctx.fillStyle = gr;
    ctx.fillRect(0, 0, w, h);
  });
}

// ── Variant 8: Jardín de Rosas ──
function drawFlowers(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  // Dark romantic background
  const bg = ctx.createLinearGradient(0, 0, w, h);
  bg.addColorStop(0, "#0d0508");
  bg.addColorStop(0.5, "#160a10");
  bg.addColorStop(1, "#0a040c");
  ctx.fillStyle = bg;
  ctx.fillRect(0, 0, w, h);

  // Soft background glow
  const glow = ctx.createRadialGradient(w * 0.5, h * 0.4, 0, w * 0.5, h * 0.4, Math.min(w, h) * 0.6);
  glow.addColorStop(0, "rgba(180,30,60,0.08)");
  glow.addColorStop(1, "transparent");
  ctx.fillStyle = glow;
  ctx.fillRect(0, 0, w, h);

  // Draw a single rose at position cx,cy with given size
  const drawRose = (cx: number, cy: number, size: number, rot: number, alpha: number) => {
    ctx.save();
    ctx.globalAlpha = alpha;
    ctx.translate(cx, cy);
    ctx.rotate(rot);

    const petalCount = 5;
    const colors = [
      "rgba(220,40,80,",
      "rgba(180,20,50,",
      "rgba(240,80,110,",
      "rgba(160,10,40,",
    ];

    // Outer petals
    for (let p = 0; p < petalCount; p++) {
      const ang = (p / petalCount) * Math.PI * 2;
      const px = Math.cos(ang) * size * 0.55;
      const py = Math.sin(ang) * size * 0.55;
      const pg = ctx.createRadialGradient(px * 0.4, py * 0.4, 0, px, py, size * 0.55);
      pg.addColorStop(0, colors[p % colors.length] + "0.9)");
      pg.addColorStop(0.6, colors[(p + 1) % colors.length] + "0.6)");
      pg.addColorStop(1, "rgba(100,5,20,0)");
      ctx.beginPath();
      ctx.ellipse(px, py, size * 0.32, size * 0.48, ang, 0, Math.PI * 2);
      ctx.fillStyle = pg;
      ctx.fill();
    }

    // Inner petals (slightly rotated)
    for (let p = 0; p < petalCount; p++) {
      const ang = (p / petalCount) * Math.PI * 2 + Math.PI / petalCount;
      const px = Math.cos(ang) * size * 0.28;
      const py = Math.sin(ang) * size * 0.28;
      const pg2 = ctx.createRadialGradient(0, 0, 0, px, py, size * 0.3);
      pg2.addColorStop(0, "rgba(240,100,130,0.85)");
      pg2.addColorStop(1, "rgba(160,20,50,0)");
      ctx.beginPath();
      ctx.ellipse(px, py, size * 0.18, size * 0.28, ang, 0, Math.PI * 2);
      ctx.fillStyle = pg2;
      ctx.fill();
    }

    // Center
    const cg = ctx.createRadialGradient(0, 0, 0, 0, 0, size * 0.14);
    cg.addColorStop(0, "rgba(255,180,180,0.9)");
    cg.addColorStop(0.5, "rgba(200,60,80,0.7)");
    cg.addColorStop(1, "rgba(120,10,30,0)");
    ctx.beginPath();
    ctx.arc(0, 0, size * 0.14, 0, Math.PI * 2);
    ctx.fillStyle = cg;
    ctx.fill();

    ctx.restore();
  };

  // Stems and leaves
  const drawStem = (cx: number, cy: number, size: number, alpha: number) => {
    ctx.save();
    ctx.globalAlpha = alpha * 0.6;
    ctx.strokeStyle = "rgba(30,80,30,0.7)";
    ctx.lineWidth = size * 0.06;
    ctx.beginPath();
    ctx.moveTo(cx, cy);
    ctx.bezierCurveTo(cx + size * 0.3, cy + size * 0.8, cx - size * 0.2, cy + size * 1.3, cx, cy + size * 1.8);
    ctx.stroke();
    // leaf
    ctx.fillStyle = "rgba(30,100,30,0.5)";
    ctx.beginPath();
    ctx.ellipse(cx + size * 0.35, cy + size * 0.9, size * 0.22, size * 0.1, Math.PI * 0.3, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();
  };

  // Rose positions — fixed seed for consistency
  const roses = [
    { x: 0.15, y: 0.25, s: 0.06, baseRot: 0.2 },
    { x: 0.82, y: 0.18, s: 0.07, baseRot: -0.4 },
    { x: 0.5,  y: 0.12, s: 0.05, baseRot: 0.1 },
    { x: 0.25, y: 0.72, s: 0.065, baseRot: 0.5 },
    { x: 0.75, y: 0.68, s: 0.07,  baseRot: -0.2 },
    { x: 0.92, y: 0.5,  s: 0.055, baseRot: 0.3 },
    { x: 0.08, y: 0.55, s: 0.06,  baseRot: -0.5 },
    { x: 0.55, y: 0.88, s: 0.07,  baseRot: 0.15 },
    { x: 0.38, y: 0.45, s: 0.04,  baseRot: 0.8 },
    { x: 0.65, y: 0.4,  s: 0.04,  baseRot: -0.3 },
  ];

  roses.forEach((r, i) => {
    const sz = Math.min(w, h) * r.s;
    const rx = w * r.x;
    const ry = h * r.y;
    const sway = Math.sin(t * 0.3 + i * 1.2) * 0.06;
    const alpha = 0.55 + Math.sin(t * 0.25 + i * 0.8) * 0.12;
    drawStem(rx, ry, sz, alpha);
    drawRose(rx, ry, sz, r.baseRot + sway, alpha);
  });

  // Floating petals
  for (let i = 0; i < 30; i++) {
    const px = (w * ((i * 0.618 + t * 0.015 * (0.3 + (i % 5) * 0.1)) % 1));
    const py = (h * ((i * 0.382 + t * 0.008 + Math.sin(t * 0.2 + i) * 0.01) % 1));
    const pr = 2 + (i % 4) * 1.5;
    const pa = 0.15 + Math.sin(t * 1.5 + i) * 0.1;
    ctx.save();
    ctx.globalAlpha = pa;
    ctx.translate(px, py);
    ctx.rotate(t * 0.3 + i * 0.7);
    ctx.beginPath();
    ctx.ellipse(0, 0, pr * 2, pr, 0, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(${200 + i % 55},${30 + i % 40},${60 + i % 30},0.8)`;
    ctx.fill();
    ctx.restore();
  }

  // Stars/sparkles
  for (let i = 0; i < 60; i++) {
    const sa = 0.1 + Math.sin(t * 1.8 + i * 0.7) * 0.08;
    ctx.beginPath();
    ctx.arc((i * 157.3) % w, (i * 113.7) % h, 0.5, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,200,210,${sa})`;
    ctx.fill();
  }
}

// ── Variant 9: Cyberpunk City ──
function drawCyberpunk(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.fillStyle = "#000208"; ctx.fillRect(0, 0, w, h);
  // City skyline
  const buildings = [
    { x: 0.02, w: 0.06, h: 0.55 }, { x: 0.09, w: 0.04, h: 0.45 }, { x: 0.14, w: 0.07, h: 0.65 },
    { x: 0.22, w: 0.05, h: 0.50 }, { x: 0.28, w: 0.08, h: 0.70 }, { x: 0.37, w: 0.04, h: 0.42 },
    { x: 0.42, w: 0.09, h: 0.75 }, { x: 0.52, w: 0.05, h: 0.58 }, { x: 0.58, w: 0.07, h: 0.68 },
    { x: 0.66, w: 0.04, h: 0.48 }, { x: 0.71, w: 0.08, h: 0.72 }, { x: 0.80, w: 0.05, h: 0.52 },
    { x: 0.86, w: 0.06, h: 0.62 }, { x: 0.93, w: 0.07, h: 0.44 },
  ];
  buildings.forEach(b => {
    const bx = w * b.x, bh = h * b.h, bw2 = w * b.w;
    ctx.fillStyle = "#050a15";
    ctx.fillRect(bx, h - bh, bw2, bh);
    // Windows
    for (let wx = bx + 3; wx < bx + bw2 - 3; wx += 6) {
      for (let wy = h - bh + 4; wy < h - 10; wy += 8) {
        if (Math.random() > 0.4) {
          ctx.fillStyle = Math.random() > 0.5 ? "rgba(0,200,255,0.6)" : "rgba(255,50,150,0.5)";
          ctx.fillRect(wx, wy, 3, 4);
        }
      }
    }
  });
  // Neon glow at horizon
  const horizon = h * 0.25;
  const hg = ctx.createLinearGradient(0, horizon - 20, 0, horizon + 40);
  hg.addColorStop(0, "transparent");
  hg.addColorStop(0.5, "rgba(0,200,255,0.12)");
  hg.addColorStop(1, "transparent");
  ctx.fillStyle = hg; ctx.fillRect(0, horizon - 20, w, 60);
  // Flying cars
  for (let i = 0; i < 8; i++) {
    const cx = ((i * 0.13 * w + t * (20 + i * 5)) % (w + 40)) - 20;
    const cy = h * (0.15 + i * 0.03);
    ctx.fillStyle = i % 2 === 0 ? "rgba(0,220,255,0.8)" : "rgba(255,60,180,0.8)";
    ctx.beginPath(); ctx.ellipse(cx, cy, 8, 2, 0, 0, Math.PI * 2); ctx.fill();
    const trail = ctx.createLinearGradient(cx - 30, cy, cx, cy);
    trail.addColorStop(0, "transparent");
    trail.addColorStop(1, i % 2 === 0 ? "rgba(0,220,255,0.4)" : "rgba(255,60,180,0.4)");
    ctx.fillStyle = trail; ctx.fillRect(cx - 30, cy - 1, 30, 2);
  }
  // Rain
  ctx.strokeStyle = "rgba(0,150,255,0.15)"; ctx.lineWidth = 0.5;
  for (let i = 0; i < 60; i++) {
    const rx = (i * 17.3 + t * 30) % w;
    const ry = (i * 31.7 + t * 80) % h;
    ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - 2, ry + 12); ctx.stroke();
  }
}

// ── Variant 10: Galaxia Espiral ──
function drawGalaxy(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.fillStyle = "#020010"; ctx.fillRect(0, 0, w, h);
  const cx = w * 0.5, cy = h * 0.5;
  // Arms
  const ARMS = 3, STARS_PER_ARM = 200;
  const armColors = ["rgba(180,120,255,", "rgba(100,180,255,", "rgba(255,180,100,"];
  for (let arm = 0; arm < ARMS; arm++) {
    for (let i = 0; i < STARS_PER_ARM; i++) {
      const frac = i / STARS_PER_ARM;
      const angle = frac * Math.PI * 4 + (arm / ARMS) * Math.PI * 2 + t * 0.05;
      const radius = frac * Math.min(w, h) * 0.42;
      const spread = radius * 0.12;
      const sx = cx + Math.cos(angle) * radius + (Math.random() - 0.5) * spread;
      const sy = cy + Math.sin(angle) * radius * 0.55 + (Math.random() - 0.5) * spread;
      const alpha = 0.15 + frac * 0.6;
      const size = 0.4 + frac * 1.2;
      ctx.beginPath(); ctx.arc(sx, sy, size, 0, Math.PI * 2);
      ctx.fillStyle = armColors[arm] + alpha + ")"; ctx.fill();
    }
  }
  // Core glow
  const cg = ctx.createRadialGradient(cx, cy, 0, cx, cy, Math.min(w, h) * 0.12);
  cg.addColorStop(0, "rgba(255,240,200,0.9)");
  cg.addColorStop(0.3, "rgba(255,180,80,0.4)");
  cg.addColorStop(1, "transparent");
  ctx.fillStyle = cg; ctx.beginPath(); ctx.arc(cx, cy, Math.min(w, h) * 0.12, 0, Math.PI * 2); ctx.fill();
  // Background stars
  for (let i = 0; i < 200; i++) {
    const sa = 0.1 + Math.sin(t * 2 + i * 0.5) * 0.08;
    ctx.beginPath(); ctx.arc((i * 173.1) % w, (i * 113.7) % h, 0.4, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${sa})`; ctx.fill();
  }
}

// ── Variant 11: Tormenta Eléctrica ──
function drawStorm(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  ctx.fillStyle = "#020408"; ctx.fillRect(0, 0, w, h);
  // Storm clouds
  const clouds2 = [
    { x: 0.2, y: 0.15, r: 0.25 }, { x: 0.6, y: 0.1, r: 0.3 }, { x: 0.85, y: 0.2, r: 0.2 },
  ];
  clouds2.forEach((c, i) => {
    const flicker = Math.sin(t * 8 + i * 2) > 0.7 ? 0.15 : 0.05;
    const cg = ctx.createRadialGradient(w * c.x, h * c.y, 0, w * c.x, h * c.y, Math.min(w, h) * c.r);
    cg.addColorStop(0, `rgba(150,180,255,${flicker + 0.05})`);
    cg.addColorStop(1, "transparent");
    ctx.fillStyle = cg; ctx.fillRect(0, 0, w, h);
  });
  // Lightning bolts
  const drawBolt = (sx: number, sy: number, ex: number, ey: number, alpha: number) => {
    ctx.save(); ctx.globalAlpha = alpha;
    ctx.strokeStyle = "rgba(200,220,255,1)"; ctx.lineWidth = 1.5;
    ctx.shadowColor = "rgba(100,150,255,0.8)"; ctx.shadowBlur = 8;
    ctx.beginPath(); ctx.moveTo(sx, sy);
    let cx2 = sx, cy2 = sy;
    const steps = 8;
    for (let s = 1; s <= steps; s++) {
      const nx = sx + (ex - sx) * (s / steps) + (Math.random() - 0.5) * 40;
      const ny = sy + (ey - sy) * (s / steps);
      ctx.lineTo(nx, ny); cx2 = nx; cy2 = ny;
    }
    ctx.stroke(); ctx.restore();
    void cx2; void cy2;
  };
  if (Math.sin(t * 3) > 0.85) drawBolt(w * 0.3, 0, w * 0.25, h * 0.6, 0.9);
  if (Math.sin(t * 2.5 + 1) > 0.88) drawBolt(w * 0.7, 0, w * 0.72, h * 0.5, 0.8);
  if (Math.sin(t * 4 + 2) > 0.9) drawBolt(w * 0.55, 0, w * 0.5, h * 0.7, 0.7);
  // Rain heavy
  ctx.strokeStyle = "rgba(150,180,255,0.2)"; ctx.lineWidth = 0.7;
  for (let i = 0; i < 120; i++) {
    const rx = (i * 13.7 + t * 50) % w;
    const ry = (i * 27.3 + t * 150) % h;
    ctx.beginPath(); ctx.moveTo(rx, ry); ctx.lineTo(rx - 3, ry + 18); ctx.stroke();
  }
  // Ambient light flicker
  const ambAlpha = 0.03 + Math.max(0, Math.sin(t * 5)) * 0.06;
  ctx.fillStyle = `rgba(100,150,255,${ambAlpha})`; ctx.fillRect(0, 0, w, h);
}

// ── Variant 12: Playa Animada ──
function drawBeach(ctx: CanvasRenderingContext2D, w: number, h: number, t: number) {
  const sky = ctx.createLinearGradient(0, 0, 0, h * 0.6);
  sky.addColorStop(0, "#1a6fa8"); sky.addColorStop(0.5, "#4ba3d3"); sky.addColorStop(1, "#f0c97a");
  ctx.fillStyle = sky; ctx.fillRect(0, 0, w, h);
  // Sun
  const sunX = w * 0.75, sunY = h * 0.14;
  const sunG = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, h * 0.12);
  sunG.addColorStop(0, "rgba(255,240,180,1)"); sunG.addColorStop(0.4, "rgba(255,200,80,0.8)"); sunG.addColorStop(1, "rgba(255,160,30,0)");
  ctx.fillStyle = sunG; ctx.beginPath(); ctx.arc(sunX, sunY, h * 0.12, 0, Math.PI * 2); ctx.fill();
  ctx.save(); ctx.translate(sunX, sunY);
  for (let r = 0; r < 8; r++) {
    const ang = (r / 8) * Math.PI * 2 + t * 0.2;
    ctx.strokeStyle = "rgba(255,230,100,0.18)"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(Math.cos(ang) * h * 0.18, Math.sin(ang) * h * 0.18); ctx.stroke();
  }
  ctx.restore();
  // Clouds
  const drawCloud = (cx: number, cy: number, sc: number, al: number) => {
    ctx.save(); ctx.globalAlpha = al; ctx.fillStyle = "rgba(255,255,255,0.85)";
    [{ x: 0, y: 0, r: 18 }, { x: 22, y: -6, r: 22 }, { x: 46, y: 0, r: 18 }, { x: 68, y: -4, r: 16 }, { x: 90, y: 2, r: 14 }].forEach(p => {
      ctx.beginPath(); ctx.arc(cx + p.x * sc, cy + p.y * sc, p.r * sc, 0, Math.PI * 2); ctx.fill();
    }); ctx.restore();
  };
  drawCloud(w * 0.05 + Math.sin(t * 0.08) * 15, h * 0.08, 0.9, 0.7);
  drawCloud(w * 0.35 + Math.sin(t * 0.06 + 1) * 12, h * 0.06, 0.7, 0.6);
  drawCloud(w * 0.55 + Math.sin(t * 0.07 + 2) * 10, h * 0.12, 0.8, 0.5);
  // Sea
  const seaTop = h * 0.48;
  const sea = ctx.createLinearGradient(0, seaTop, 0, h * 0.7);
  sea.addColorStop(0, "#1a7abf"); sea.addColorStop(0.5, "#1560a0"); sea.addColorStop(1, "#0d3d6e");
  ctx.fillStyle = sea; ctx.fillRect(0, seaTop, w, h * 0.22);
  for (let wi = 0; wi < 4; wi++) {
    const wy = seaTop + wi * h * 0.04 + Math.sin(t * 0.8 + wi) * 4;
    ctx.beginPath(); ctx.moveTo(0, wy);
    for (let x = 0; x <= w; x += 8) ctx.lineTo(x, wy + Math.sin((x / w) * Math.PI * 4 + t * (1.2 + wi * 0.3)) * (4 + wi * 2));
    ctx.strokeStyle = `rgba(255,255,255,${0.15 + wi * 0.08})`; ctx.lineWidth = 1.5; ctx.stroke();
  }
  // Shore foam
  const shoreY = h * 0.68;
  for (let x = 0; x < w; x += 6) {
    ctx.beginPath(); ctx.arc(x, shoreY + Math.sin(x * 0.05 + t * 1.5) * 5, 3, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(255,255,255,${0.3 + Math.sin(x * 0.08 + t) * 0.2})`; ctx.fill();
  }
  // Sand
  const sand = ctx.createLinearGradient(0, h * 0.67, 0, h);
  sand.addColorStop(0, "#e8c97a"); sand.addColorStop(0.3, "#d4a85a"); sand.addColorStop(1, "#c49040");
  ctx.fillStyle = sand; ctx.fillRect(0, h * 0.67, w, h * 0.33);
  for (let i = 0; i < 80; i++) {
    ctx.beginPath(); ctx.arc((i * 173.1) % w, h * 0.67 + (i * 97.3) % (h * 0.33), 0.8, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(150,90,20,0.2)"; ctx.fill();
  }
  // Umbrellas
  const drawUmbrella = (ux: number, uy: number, color: string) => {
    ctx.strokeStyle = "#8B6914"; ctx.lineWidth = 2;
    ctx.beginPath(); ctx.moveTo(ux, uy); ctx.lineTo(ux, uy + h * 0.12); ctx.stroke();
    ctx.fillStyle = color; ctx.beginPath(); ctx.ellipse(ux, uy, h * 0.07, h * 0.035, 0, Math.PI, 0); ctx.fill();
    for (let s = 0; s < 5; s++) {
      const ang = Math.PI + (s / 4) * Math.PI;
      ctx.fillStyle = s % 2 === 0 ? "rgba(255,255,255,0.3)" : "transparent";
      ctx.beginPath(); ctx.moveTo(ux, uy); ctx.arc(ux, uy, h * 0.07, ang, ang + Math.PI / 4); ctx.closePath(); ctx.fill();
    }
  };
  drawUmbrella(w * 0.18, h * 0.72, "#e84040");
  drawUmbrella(w * 0.42, h * 0.74, "#40a0e8");
  drawUmbrella(w * 0.88, h * 0.71, "#f0c030");
  // Sunbathers
  const drawSunbather = (px: number, py: number, flip: boolean) => {
    ctx.save(); ctx.fillStyle = "#3a2010";
    if (flip) { ctx.scale(-1, 1); px = -px; }
    ctx.beginPath(); ctx.ellipse(px, py, h * 0.04, h * 0.012, 0, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.arc(px + h * 0.05, py - h * 0.005, h * 0.013, 0, Math.PI * 2); ctx.fill();
    ctx.beginPath(); ctx.moveTo(px + h * 0.01, py - h * 0.01); ctx.lineTo(px + h * 0.02, py - h * 0.04);
    ctx.strokeStyle = "#3a2010"; ctx.lineWidth = 3; ctx.stroke(); ctx.restore();
  };
  drawSunbather(w * 0.15, h * 0.81, false); drawSunbather(w * 0.22, h * 0.84, true);
  drawSunbather(w * 0.38, h * 0.83, false); drawSunbather(w * 0.82, h * 0.80, true); drawSunbather(w * 0.92, h * 0.83, false);
  // Running girl
  const runX = ((t * 40) % (w + 80)) - 40, runY = h * 0.76, lp = t * 5;
  ctx.save(); ctx.fillStyle = "#2a1408"; ctx.strokeStyle = "#2a1408";
  ctx.beginPath(); ctx.ellipse(runX, runY - h * 0.04, h * 0.012, h * 0.028, 0, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.arc(runX, runY - h * 0.075, h * 0.015, 0, Math.PI * 2); ctx.fill();
  ctx.beginPath(); ctx.moveTo(runX, runY - h * 0.075);
  ctx.quadraticCurveTo(runX - h * 0.02, runY - h * 0.085, runX - h * 0.04 + Math.sin(lp) * 5, runY - h * 0.065);
  ctx.strokeStyle = "#4a2010"; ctx.lineWidth = 3; ctx.stroke();
  ctx.lineWidth = 3; ctx.strokeStyle = "#2a1408";
  const l1 = Math.sin(lp) * h * 0.04, l2 = Math.sin(lp + Math.PI) * h * 0.04;
  ctx.beginPath(); ctx.moveTo(runX, runY - h * 0.015); ctx.lineTo(runX + l1 * 0.5, runY + h * 0.025); ctx.lineTo(runX + l1, runY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(runX, runY - h * 0.015); ctx.lineTo(runX + l2 * 0.5, runY + h * 0.025); ctx.lineTo(runX + l2, runY); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(runX, runY - h * 0.04); ctx.lineTo(runX + Math.sin(lp + Math.PI) * h * 0.025, runY - h * 0.02); ctx.stroke();
  ctx.beginPath(); ctx.moveTo(runX, runY - h * 0.04); ctx.lineTo(runX + Math.sin(lp) * h * 0.025, runY - h * 0.02); ctx.stroke();
  ctx.restore();
  // Seagulls
  for (let i = 0; i < 5; i++) {
    const bx = (w * (0.1 + i * 0.18) + Math.sin(t * 0.4 + i) * 20) % w;
    const by = h * (0.2 + i * 0.04) + Math.sin(t * 0.6 + i * 1.3) * 8;
    ctx.strokeStyle = "rgba(20,20,40,0.6)"; ctx.lineWidth = 1.2;
    ctx.beginPath(); ctx.moveTo(bx - 10, by + Math.sin(t * 3 + i) * 5); ctx.quadraticCurveTo(bx, by, bx + 10, by + Math.sin(t * 3 + i) * 5); ctx.stroke();
  }
  // Reflection
  const rg = ctx.createLinearGradient(0, seaTop, 0, h * 0.68);
  rg.addColorStop(0, "rgba(255,200,80,0.12)"); rg.addColorStop(1, "transparent");
  ctx.fillStyle = rg; ctx.fillRect(w * 0.5, seaTop, w * 0.5, h * 0.2);
}

export const BG_VARIANTS: BgVariant[] = [
  { id: "hero",      label: "Hero — Space",      description: "Fondo actual del hero: partículas violeta/cian, glows, wireframe 3D y grid.",  draw: drawHero },
  { id: "aurora",    label: "Aurora Boreal",      description: "Luces del norte: bandas verdes y azules ondeando sobre cielo estrellado.",     draw: drawAurora },
  { id: "neon",      label: "Neon Grid",          description: "Cyberpunk: grilla en perspectiva con sol de neón rosa/naranja.",               draw: drawNeonGrid },
  { id: "ocean",     label: "Deep Ocean",         description: "Fondo marino: cáustica, partículas bioluminiscentes y medusa flotante.",       draw: drawOcean },
  { id: "nebula",    label: "Golden Nebula",      description: "Nebulosa cálida: polvo dorado, estrellas titilantes y estrella fugaz.",        draw: drawNebula },
  { id: "matrix",    label: "Matrix Rain",        description: "Lluvia de código: caracteres japoneses y binarios cayendo en verde.",          draw: drawMatrix },
  { id: "white",     label: "Blanco Limpio",      description: "Fondo blanco puro con textura sutil de puntos grises. Ideal para propuestas formales.", draw: drawWhite },
  { id: "flowers",   label: "Jardín de Rosas",    description: "Fondo oscuro romántico con rosas y pétalos animados en rosas, rojos y carmín.", draw: drawFlowers },
  { id: "cyberpunk", label: "Cyberpunk City",     description: "Ciudad futurista con edificios de neón, autos voladores y lluvia.",            draw: drawCyberpunk },
  { id: "galaxy",    label: "Galaxia Espiral",    description: "Galaxia animada con brazos estelares, núcleo brillante y fondo estrellado.",   draw: drawGalaxy },
  { id: "storm",     label: "Tormenta Eléctrica", description: "Tormenta oscura con rayos, lluvia intensa y destellos de luz.",               draw: drawStorm },
  { id: "beach",     label: "Playa Animada",      description: "Playa tropical con chica corriendo, personas tomando sol, olas y gaviotas.", draw: drawBeach },
  { id: "lofi",      label: "Lo-Fi Chill ▶ Video", description: "Video lofi en vivo como fondo: ciudad animada con música relajante.", type: "youtube", youtubeId: "rwvktpF6_pY", draw: () => {} },
];

export function getBgVariant(id: BgId): BgVariant {
  return BG_VARIANTS.find(v => v.id === id) ?? BG_VARIANTS[0];
}

// suppress unused warning
void rand;
