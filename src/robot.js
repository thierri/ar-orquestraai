// Robozinho montado com primitivas do A-Frame, em pé em cima do letreiro.
// Coordenadas com os pés em y = 0 e a frente virada para +z (para quem olha).

// Fecha os olhos rapidinho de tempos em tempos.
AFRAME.registerComponent('blink', {
  schema: { every: { default: 3500 }, duration: { default: 140 } },
  tick(time) {
    const phase = time % this.data.every;
    this.el.object3D.scale.y = phase < this.data.duration ? 0.1 : 1;
  },
});

const BODY = 'color: #eef1f7; metalness: 0.2; roughness: 0.35';
const JOINT = 'color: #5b6b8c; metalness: 0.5; roughness: 0.4';
const GLOW_BLUE = 'color: #7fb2ff; emissive: #6ea8ff; emissiveIntensity: 0.9';
const GLOW_PURPLE = 'color: #c9a6ff; emissive: #b07cff; emissiveIntensity: 1';

export function robotHTML(position) {
  return `
    <a-entity position="${position}" scale="1.35 1.35 1.35"
      animation="property: rotation; from: 0 -12 0; to: 0 12 0; dir: alternate; loop: true; dur: 3000; easing: easeInOutSine">

      <!-- Pernas e pés -->
      <a-box width="0.07" height="0.1" depth="0.07" position="-0.065 0.07 0" material="${JOINT}"></a-box>
      <a-box width="0.07" height="0.1" depth="0.07" position="0.065 0.07 0" material="${JOINT}"></a-box>
      <a-box width="0.1" height="0.04" depth="0.12" position="-0.065 0.02 0.015" material="${BODY}"></a-box>
      <a-box width="0.1" height="0.04" depth="0.12" position="0.065 0.02 0.015" material="${BODY}"></a-box>

      <!-- Corpo com luz no peito -->
      <a-box width="0.28" height="0.24" depth="0.18" position="0 0.24 0" material="${BODY}"></a-box>
      <a-circle radius="0.045" position="0 0.25 0.091" material="${GLOW_BLUE}"
        animation="property: material.emissiveIntensity; from: 0.4; to: 1.2; dir: alternate; loop: true; dur: 900; easing: easeInOutSine">
      </a-circle>

      <!-- Braço esquerdo, parado -->
      <a-entity position="-0.165 0.33 0" rotation="0 0 -12">
        <a-sphere radius="0.035" material="${JOINT}"></a-sphere>
        <a-box width="0.06" height="0.17" depth="0.06" position="0 -0.1 0" material="${BODY}"></a-box>
        <a-sphere radius="0.04" position="0 -0.2 0" material="${JOINT}"></a-sphere>
      </a-entity>

      <!-- Braço direito, acenando -->
      <a-entity position="0.165 0.33 0"
        animation="property: rotation; from: 0 0 125; to: 0 0 165; dir: alternate; loop: true; dur: 450; easing: easeInOutSine">
        <a-sphere radius="0.035" material="${JOINT}"></a-sphere>
        <a-box width="0.06" height="0.17" depth="0.06" position="0 -0.1 0" material="${BODY}"></a-box>
        <a-sphere radius="0.04" position="0 -0.2 0" material="${JOINT}"></a-sphere>
      </a-entity>

      <!-- Pescoço e cabeça -->
      <a-cylinder radius="0.035" height="0.05" position="0 0.38 0" material="${JOINT}"></a-cylinder>
      <a-entity position="0 0.5 0">
        <a-box width="0.32" height="0.21" depth="0.22" material="${BODY}"></a-box>
        <!-- Visor escuro com os olhos -->
        <a-box width="0.26" height="0.13" depth="0.02" position="0 0 0.111" material="color: #0e1116; metalness: 0.6; roughness: 0.2"></a-box>
        <a-entity position="0 0.005 0.123" blink>
          <a-circle radius="0.03" position="-0.06 0 0" material="${GLOW_BLUE}"></a-circle>
          <a-circle radius="0.03" position="0.06 0 0" material="${GLOW_BLUE}"></a-circle>
        </a-entity>
        <!-- Orelhas -->
        <a-cylinder radius="0.045" height="0.03" position="-0.175 0 0" rotation="0 0 90" material="${JOINT}"></a-cylinder>
        <a-cylinder radius="0.045" height="0.03" position="0.175 0 0" rotation="0 0 90" material="${JOINT}"></a-cylinder>
        <!-- Antena -->
        <a-cylinder radius="0.008" height="0.1" position="0 0.155 0" material="${JOINT}"></a-cylinder>
        <a-sphere radius="0.03" position="0 0.215 0" material="${GLOW_PURPLE}"
          animation="property: material.emissiveIntensity; from: 0.3; to: 1.4; dir: alternate; loop: true; dur: 700; easing: easeInOutSine">
        </a-sphere>
      </a-entity>
    </a-entity>`;
}
