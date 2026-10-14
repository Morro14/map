export interface Size {
  x: number;
  y: number;
}
export interface Coords {
  x: number;
  y: number;
}
export const MAP_OPTIONS = {
  zoomMin: 0.4,
  zoomMax: 2,
  zoomFactor: 0.4,
  wheelZoom: true,
  containerSize: { x: 800, y: 800 },
};
interface ZoomOptions {
  direction: -1 | 1;
}
let zoomCurrent = 1;
export const ANCHOR_BASE = {
  x: MAP_OPTIONS.containerSize.x / 2,
  y: MAP_OPTIONS.containerSize.y / 2,
};
const anchor = {
  x: MAP_OPTIONS.containerSize.x / 2,
  y: MAP_OPTIONS.containerSize.y / 2,
};
let rectPosInit = { x: 0, y: 0 };
let offsets = { x: 0, y: 0 };
export function zoom({ direction }: ZoomOptions) {
  const surface = document.getElementById("map-surface");
  const container = document.getElementById("map-container");
  if (!surface || !container) return;
  rectPosInit = {
    x: surface.getBoundingClientRect().left,
    y: surface.getBoundingClientRect().top,
  };
  const zoomNew =
    direction === 1
      ? (zoomCurrent / MAP_OPTIONS.zoomFactor) * 0.8
      : (zoomCurrent * MAP_OPTIONS.zoomFactor) / 0.8;
  // const projectedRect = getProjectRect(zoomNew, anchor);
  // if (!projectedRect) return;
  // const intersections = detectIntersection(projectedRect);
  // capSurfacePos(zoomNew);
  const viewportCenter = {
    x: anchor.x,
    y: anchor.y,
  };
  // test marker
  const anchorNew = {
    x: -surface.offsetLeft + viewportCenter.x,
    y: -surface.offsetTop + viewportCenter.y,
  };
  const anchorMarker = document.getElementById("anchor-marker");
  if (!anchorMarker) return;
  anchorMarker.style.left = `${anchorNew.x}px`;
  anchorMarker.style.top = `${anchorNew.y}px`;
  //
  let zoomCurrentUpdate = 1;
  if (offsets.x !== surface.offsetLeft || offsets.y !== surface.offsetTop) {
    console.log("update offsetsScaled");
    offsets = { x: surface.offsetLeft, y: surface.offsetTop };
    zoomCurrentUpdate = zoomCurrent;
  }
  const offsetsScaledNew = {
    x:
      viewportCenter.x * zoomCurrentUpdate -
      surface.offsetLeft * zoomCurrentUpdate,
    y:
      viewportCenter.y * zoomCurrentUpdate -
      surface.offsetTop * zoomCurrentUpdate,
  };
  const transform = {
    x: offsetsScaledNew.x,
    y: offsetsScaledNew.y,
  };
  console.log("offsetLeft", surface.offsetLeft);
  surface.style.transformOrigin = `${transform.x}px ${transform.y}px`;
  // surface.style.transformOrigin = `${100}px ${100}px`;

  surface.style.scale = `${zoomNew}`;
  zoomCurrent = zoomNew;
}

// export function capSurfacePos(zoomNew: number) {
//   const surface = document.getElementById("map-surface");
//   const container = document.getElementById("map-container");
//   if (!surface || !container) return;
// }

export function getProjectRect(zoomNew: number, anchor: Coords) {
  const surface = document.getElementById("map-surface");
  if (!surface) return;
  const rect = surface.getBoundingClientRect();
  const rectNew = DOMRect.fromRect({
    x: anchor.x * zoomNew,
    y: anchor.y * zoomNew,
    width: rect.width * zoomNew,
    height: rect.height * zoomNew,
  });
  return rectNew;
}

export function detectIntersection(rectNew: DOMRect) {
  const container = document.getElementById("map-container");
  if (!container) return;
  const rectContainer = container.getBoundingClientRect();
  const intersections = {
    top: rectNew.top > rectContainer.top,
    right: rectNew.right < rectContainer.right,
    bottom: rectNew.bottom < rectContainer.bottom,
    left: rectNew.left > rectContainer.left,
  };
  return intersections;
}
