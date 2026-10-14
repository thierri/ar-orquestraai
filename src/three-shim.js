// O A-Frame já carrega o three.js (AFRAME.THREE). Este módulo substitui o
// pacote "three" no build (veja vite.config.js), para os módulos de
// three/examples usarem essa mesma cópia em vez de embutir outra de ~500 kB.
const THREE = window.AFRAME.THREE;

export const { FileLoader, Loader, ShapePath } = THREE;
export default THREE;
