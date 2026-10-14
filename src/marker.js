// Marcador compartilhado entre a tela do computador e o celular.
// A mesma função desenha o marcador grande (tela) e gera o arquivo .patt (celular),
// então os dois lados nunca ficam fora de sincronia.

// Proporção da área interna em relação ao marcador inteiro (padrão do AR.js).
export const PATTERN_RATIO = 0.5;

// Desenho interno: precisa ser assimétrico para o AR.js saber a orientação.
export function drawInner(ctx, size) {
  ctx.fillStyle = '#fff';
  ctx.fillRect(0, 0, size, size);
  ctx.fillStyle = '#000';

  // Quadrado no canto superior esquerdo
  ctx.fillRect(size * 0.06, size * 0.06, size * 0.36, size * 0.36);

  // Círculo no canto inferior direito
  ctx.beginPath();
  ctx.arc(size * 0.68, size * 0.68, size * 0.26, 0, Math.PI * 2);
  ctx.fill();

  // Triângulo no canto inferior esquerdo
  ctx.beginPath();
  ctx.moveTo(size * 0.06, size * 0.94);
  ctx.lineTo(size * 0.42, size * 0.94);
  ctx.lineTo(size * 0.06, size * 0.58);
  ctx.closePath();
  ctx.fill();
}

// Marcador completo: borda preta grossa + desenho interno.
export function drawMarker(canvas, size) {
  canvas.width = canvas.height = size;
  const ctx = canvas.getContext('2d');
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, size, size);

  const inner = document.createElement('canvas');
  const innerSize = Math.round(size * PATTERN_RATIO);
  inner.width = inner.height = innerSize;
  drawInner(inner.getContext('2d'), innerSize);

  const offset = (size - innerSize) / 2;
  ctx.drawImage(inner, offset, offset);
}

// Gera o conteúdo de um arquivo .patt (formato ARToolKit, mesmo algoritmo do
// gerador oficial do AR.js): 4 rotações × 3 canais (B, G, R) × 16×16 valores.
export function buildPatternFile() {
  const src = document.createElement('canvas');
  src.width = src.height = 256;
  drawInner(src.getContext('2d'), 256);

  const canvas = document.createElement('canvas');
  canvas.width = canvas.height = 16;
  const ctx = canvas.getContext('2d', { willReadFrequently: true });

  let out = '';
  for (let orientation = 0; orientation > -2 * Math.PI; orientation -= Math.PI / 2) {
    ctx.save();
    ctx.clearRect(0, 0, 16, 16);
    ctx.translate(8, 8);
    ctx.rotate(orientation);
    ctx.drawImage(src, -8, -8, 16, 16);
    ctx.restore();

    const { data } = ctx.getImageData(0, 0, 16, 16);
    if (orientation !== 0) out += '\n';
    for (let channel = 2; channel >= 0; channel--) {
      for (let y = 0; y < 16; y++) {
        const row = [];
        for (let x = 0; x < 16; x++) row.push(String(data[(y * 16 + x) * 4 + channel]).padStart(3));
        out += row.join(' ') + '\n';
      }
    }
  }
  return out;
}
