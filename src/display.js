import QRCode from 'qrcode';
import { drawMarker } from './marker.js';

drawMarker(document.getElementById('marker'), 1024);

// Aberto via localhost, o celular não alcançaria esse endereço: usa o IP da rede.
const isLocal = ['localhost', '127.0.0.1', '[::1]'].includes(location.hostname);
const arUrl = `${isLocal ? __LAN_ORIGIN__ : location.origin}/ar/`;

const link = document.getElementById('ar-link');
link.href = arUrl;
link.textContent = arUrl;

QRCode.toCanvas(document.getElementById('qr'), arUrl, { width: 220, margin: 2 });
