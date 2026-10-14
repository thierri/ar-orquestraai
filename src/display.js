import QRCode from 'qrcode';
import { drawMarker } from './marker.js';

drawMarker(document.getElementById('marker'), 1024);

// Aberto via localhost, o celular não alcançaria esse endereço: usa o IP da rede.
const isLocal = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
// Fora dele, "ar/" relativo à página atual respeita o subcaminho (GitHub Pages).
const arUrl = isLocal ? `${__LAN_ORIGIN__}/ar/` : new URL('ar/', location.href).href;
document.getElementById('lan-hint').hidden = !isLocal;

const link = document.getElementById('ar-link');
link.href = arUrl;
link.textContent = arUrl;

QRCode.toCanvas(document.getElementById('qr'), arUrl, { width: 220, margin: 2 });
