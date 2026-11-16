import profile from '../config/profile.json';
const sides = ['front', 'back', 'right', 'left', 'top', 'bottom'];
export default function Cube() {
  return (
    <div className="cube-scene">
      <div className="cube">
        {profile.cubeFaces.slice(0, 6).map((f, i) => (
          <div key={f} className={`face ${sides[i]}`}>{f}</div>
        ))}
      </div>
    </div>
  );
}
