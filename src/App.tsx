import { useEffect, useRef } from "react";
import "./App.css";
import Nav from "./Nav";
import { handlePointerDown, handlePointerUp } from "./map/handlers";

function App() {
  const surfaceRef = useRef<null | HTMLDivElement>(null);
  useEffect(() => {
    if (!surfaceRef.current) return;
    surfaceRef.current.addEventListener("pointerdown", handlePointerDown);
    window.addEventListener("pointerup", handlePointerUp);
    return () => {
      if (!surfaceRef.current) return;
      surfaceRef.current.removeEventListener("pointerdown", handlePointerDown);
      window.removeEventListener("pointerup", handlePointerUp);
    };

    // const surface = document.getElementById("map-surface");
    // const container = document.getElementById("map-container");
    // if (!surface || !container) return;
  });
  return (
    <>
      <section id="main">
        <div id="map-container" className="relative">
          <div className="h-1 w-1 bg-sky-500 absolute z-49 top-100 left-100"></div>
          <div className="absolute" ref={surfaceRef} id="map-surface">
            <div
              id="anchor-marker"
              className="h-1 w-1 bg-red-600 absolute z-50"
            ></div>
            <div className="w-1 h-1 bg-black absolute top-100 left-100"></div>
          </div>
        </div>
        <Nav></Nav>
      </section>
    </>
  );
}

export default App;
