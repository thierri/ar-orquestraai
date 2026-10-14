import { buildPatternFile, PATTERN_RATIO } from './marker.js';
import { drawSign, SIGN_ASPECT } from './sign.js';

const intro = document.getElementById('intro');
const status = document.getElementById('status');

document.getElementById('start').addEventListener('click', () => {
  intro.remove();
  status.hidden = false;
  mountScene();
});

function mountScene() {
  const patternUrl = URL.createObjectURL(new Blob([buildPatternFile()], { type: 'text/plain' }));

  const signCanvas = document.createElement('canvas');
  signCanvas.id = 'sign-texture';
  signCanvas.hidden = true;
  drawSign(signCanvas);
  document.body.append(signCanvas);

  // Largura em unidades do marcador (1 = largura do marcador na tela).
  const SIGN_WIDTH = 1.8;
  const SIGN_HEIGHT = SIGN_WIDTH / SIGN_ASPECT;

  // Com a tela na vertical, o eixo Y do marcador aponta para fora do monitor:
  // os objetos "flutuam" na frente da tela, na direção de quem olha.
  document.body.insertAdjacentHTML('beforeend', `
    <a-scene
      vr-mode-ui="enabled: false"
      renderer="logarithmicDepthBuffer: true; antialias: true; alpha: true"
      arjs="sourceType: webcam; detectionMode: mono; patternRatio: ${PATTERN_RATIO}; debugUIEnabled: false;">

      <a-marker type="pattern" url="${patternUrl}" smooth="true" smoothCount="8" smoothTolerance="0.01" smoothThreshold="2">
        <!-- rotation -90 em X: a frente da placa olha para fora da tela e o "para cima"
             do letreiro coincide com o topo do marcador. -->
        <a-entity position="0 0.35 0" rotation="-90 0 0">
          <a-entity animation="property: position; from: 0 -0.04 0; to: 0 0.04 0; dir: alternate; loop: true; dur: 2200; easing: easeInOutSine">
            <!-- Caixa um pouco menor que a face, para as quinas não aparecerem
                 atrás dos cantos arredondados da textura. -->
            <a-box width="${SIGN_WIDTH - 0.1}" height="${SIGN_HEIGHT - 0.1}" depth="0.06"
              material="color: #1a1f29; metalness: 0.5; roughness: 0.4">
            </a-box>
            <a-plane width="${SIGN_WIDTH}" height="${SIGN_HEIGHT}" position="0 0 0.031"
              material="src: #sign-texture; shader: flat; transparent: true">
            </a-plane>
          </a-entity>
        </a-entity>
      </a-marker>

      <a-entity light="type: ambient; intensity: 0.6"></a-entity>
      <a-entity light="type: directional; intensity: 0.9" position="1 2 1"></a-entity>
      <a-entity camera></a-entity>
    </a-scene>`);

  // Eventos disparados pelo AR.js ao abrir (ou falhar ao abrir) a câmera.
  window.addEventListener('camera-init', () => (status.textContent = 'Procurando o marcador…'));
  // O AR.js não inclui o erro no evento; ele mostra os detalhes num popup próprio.
  window.addEventListener('camera-error', () => {
    status.hidden = false;
    status.textContent = 'Não foi possível abrir a câmera';
  });

  const marker = document.querySelector('a-marker');
  marker.addEventListener('markerFound', () => (status.hidden = true));
  marker.addEventListener('markerLost', () => (status.hidden = false));
}
