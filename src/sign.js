// Desenha a placa do letreiro (fundo + borda luminosa) num canvas, usado como
// textura na cena 3D. As letras em relevo ficam em text3d.js.

// Proporção largura/altura da placa (o canvas e a geometria usam a mesma).
export const SIGN_ASPECT = 3.6;

export function drawPlate(canvas) {
  const w = 2048;
  const h = Math.round(w / SIGN_ASPECT);
  canvas.width = w;
  canvas.height = h;
  const ctx = canvas.getContext('2d');

  const pad = 24;
  const radius = 90;
  const gradient = ctx.createLinearGradient(0, 0, 0, h);
  gradient.addColorStop(0, '#1a2030');
  gradient.addColorStop(1, '#0b0e14');
  ctx.fillStyle = gradient;
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
}
