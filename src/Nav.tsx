import { zoom } from "./map/general";
export default function Nav() {
  return (
    <div className="nav flex gap-3">
      <button onClick={() => zoom({ direction: 1 })} className="shrink">
        Zoom In
      </button>
      <button onClick={() => zoom({ direction: -1 })} className="shrink">
        Zoom Out
      </button>
    </div>
  );
}
