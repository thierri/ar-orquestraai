// Desenha a face do letreiro num canvas, usado como textura na cena 3D.

export const SIGN_TEXT = 'Orquestra';
export const SIGN_ACCENT = 'AI';

// Proporção largura/altura da placa (o canvas e a geometria usam a mesma).
export const SIGN_ASPECT = 3.6;

export function drawSign(canvas) {
  const w = 2048;
  const h = Math.round(w / SIGN_ASPECT);
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  // Placa escura com borda luminosa
  const pad = 24;
  const radius = 90;
  ctx.fillStyle = '#0e1116';
  ctx.beginPath();
  ctx.roundRect(pad, pad, w - pad * 2, h - pad * 2, radius);
  ctx.fill();

  ctx.save();
  ctx.shadowColor = '#6ea8ff';
  ctx.shadowBlur = 40;
  ctx.lineWidth = 14;
  ctx.strokeStyle = '#6ea8ff';
  ctx.stroke();
  ctx.restore();

  // Texto: "Orquestra" em branco + "AI" em degradê, centralizados juntos
  let fontSize = 300;
  const font = (size) => `800 ${size}px system-ui, -apple-system, Roboto, 'Segoe UI', sans-serif`;
  const gap = 0.12;
  const measure = () => {
    ctx.font = font(fontSize);
    const a = ctx.measureText(SIGN_TEXT).width;
    const b = ctx.measureText(SIGN_ACCENT).width;
    return { a, b, total: a + b + fontSize * gap };
  };
  let m = measure();
  const maxWidth = w - 260;
  if (m.total > maxWidth) {
    fontSize = Math.floor((fontSize * maxWidth) / m.total);
    m = measure();
  }

  const x = (w - m.total) / 2;
  const y = h / 2;
  ctx.textBaseline = 'middle';

  ctx.save();
  ctx.shadowColor = 'rgba(255, 255, 255, 0.45)';
  ctx.shadowBlur = 30;
  ctx.fillStyle = '#ffffff';
  ctx.fillText(SIGN_TEXT, x, y);
  ctx.restore();

  const ax = x + m.a + fontSize * gap;
  const gradient = ctx.createLinearGradient(ax, 0, ax + m.b, 0);
  gradient.addColorStop(0, '#6ea8ff');
  gradient.addColorStop(1, '#b07cff');
  ctx.save();
  ctx.shadowColor = '#8f8cff';
  ctx.shadowBlur = 50;
  ctx.fillStyle = gradient;
  ctx.fillText(SIGN_ACCENT, ax, y);
  ctx.restore();
}
