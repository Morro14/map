import { type Coords } from "./general";

let posInit: Coords = { x: 0, y: 0 };
let offsetsInit: Coords = { x: 0, y: 0 };

export function handlePointerDown(e: PointerEvent) {
  const surface = document.getElementById("map-surface");
  if (!surface) return;
  posInit = { x: e.clientX, y: e.clientY };
  offsetsInit = { x: surface.offsetLeft, y: surface.offsetTop };
  document.addEventListener("pointermove", handlePointerMove);
}
export function handlePointerMove(e: PointerEvent) {
  const surface = document.getElementById("map-surface");
  if (!surface) return;
  const posDelta = { x: -posInit.x + e.clientX, y: -posInit.y + e.clientY };
  surface.style.left = `${offsetsInit.x + posDelta.x}px`;
  surface.style.top = `${offsetsInit.y + posDelta.y}px`;
}
export function handlePointerUp() {
  document.removeEventListener("pointermove", handlePointerMove);
  // posInit = { x: e.clientX, y: e.clientY };
}
