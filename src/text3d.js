// Componente A-Frame que monta o texto "Orquestra AI" com letras extrudadas
// (relevo + chanfro), centralizado e escalado para caber na largura pedida.
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import fontData from 'three/examples/fonts/helvetiker_bold.typeface.json';

const THREE = AFRAME.THREE;
const font = new FontLoader().parse(fontData);

// Medidas relativas a letras de tamanho 1; tudo é escalado no final.
const EXTRUDE = {
  depth: 0.28,
  curveSegments: 10,
  bevelEnabled: true,
  bevelThickness: 0.05,
  bevelSize: 0.03,
  bevelSegments: 4,
};
const GAP = 0.3;

// Grupo 0 da ExtrudeGeometry = faces da frente/trás, grupo 1 = laterais.
// Laterais mais escuras que a frente é o que dá a leitura de relevo.
function materials(front, side, emissive = '#000000', emissiveIntensity = 0) {
  return [
    new THREE.MeshStandardMaterial({ color: front, metalness: 0.25, roughness: 0.3, emissive, emissiveIntensity }),
    new THREE.MeshStandardMaterial({ color: side, metalness: 0.4, roughness: 0.45 }),
  ];
}

function word(text, mats) {
  const geometry = new THREE.ExtrudeGeometry(font.generateShapes(text, 1), EXTRUDE);
  geometry.computeBoundingBox();
  return new THREE.Mesh(geometry, mats);
}

AFRAME.registerComponent('orquestra-text', {
  schema: { width: { type: 'number', default: 2 } },

  init() {
    const main = word('Orquestra', materials('#f4f6fb', '#5b6b8c'));
    const accent = word('AI', materials('#7fb2ff', '#4a3a9e', '#6c5cff', 0.35));

    const mainBox = main.geometry.boundingBox;
    const accentBox = accent.geometry.boundingBox;
    accent.position.x = mainBox.max.x + GAP - accentBox.min.x;

    const group = new THREE.Group();
    group.add(main, accent);

    // Centraliza pela caixa total; o chanfro sai para trás de z=0, então a
    // base das letras é empurrada para encostar na frente da placa.
    const box = new THREE.Box3().setFromObject(group);
    const center = box.getCenter(new THREE.Vector3());
    group.position.set(-center.x, -center.y, -box.min.z);

    const scale = this.data.width / (box.max.x - box.min.x);
    const holder = new THREE.Group();
    holder.scale.setScalar(scale);
    holder.add(group);
    this.el.setObject3D('mesh', holder);
  },

  remove() {
    this.el.removeObject3D('mesh');
  },
});
