import { defineConfig } from 'vite';
import basicSsl from '@vitejs/plugin-basic-ssl';
import os from 'node:os';
import { resolve } from 'node:path';

const PORT = 5173;

// Primeiro IPv4 da rede local — usado para gerar o QR code que o celular vai ler.
function lanAddress() {
  for (const ifaces of Object.values(os.networkInterfaces())) {
    for (const iface of ifaces ?? []) {
      if (iface.family === 'IPv4' && !iface.internal) return iface.address;
    }
  }
  return 'localhost';
}

export default defineConfig({
  // HTTPS é obrigatório para o navegador do celular liberar a câmera.
  plugins: [basicSsl()],
  resolve: {
    // Só o import exato "three"; "three/examples/..." continua vindo do pacote.
    alias: [{ find: /^three$/, replacement: resolve(import.meta.dirname, 'src/three-shim.js') }],
  },
  server: { host: true, port: PORT, strictPort: true },
  preview: { host: true, port: PORT, strictPort: true },
  define: {
    __LAN_ORIGIN__: JSON.stringify(`https://${lanAddress()}:${PORT}`),
  },
  build: {
    rollupOptions: {
      input: {
        display: resolve(import.meta.dirname, 'index.html'),
        ar: resolve(import.meta.dirname, 'ar/index.html'),
      },
    },
  },
});
