# ar-orquestraai

Realidade aumentada na web com duas páginas:

- **`/`** (computador): mostra o marcador e um QR code com o link para o celular.
- **`/ar/`** (celular Android + Chrome): abre a câmera e projeta o letreiro 3D “Orquestra AI” sobre o marcador.

Feito com [A-Frame](https://aframe.io) + [AR.js](https://ar-js-org.github.io/AR.js-Docs/) (marcador de padrão) e Vite.

## Rodando

```bash
npm install
npm run dev
```

Abra `https://localhost:5173/` no computador e leia o QR code com o celular (mesma rede Wi-Fi).
O servidor usa um certificado autoassinado (o celular só libera a câmera em HTTPS), então aceite o aviso do navegador nos dois aparelhos.

## Estrutura

- `src/marker.js`: desenho do marcador e geração do arquivo `.patt`, compartilhados pelas duas páginas.
- `src/sign.js`: placa do letreiro (desenhada em canvas e usada como textura).
- `src/text3d.js`: letras “Orquestra AI” em relevo 3D (texto extrudado com three.js).
- `src/ar.js`: cena de realidade aumentada.
- `src/display.js`: página do computador.
