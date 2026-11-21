// Stand-in for a real screenshot. Each project picks one of three wireframes.
// Delete this once every project has an `image`.
const bars = [38, 62, 48, 80, 58, 92, 70, 54];

const layouts = {
  dashboard: (
    <div className="ph-dash">
      <div className="ph-side">
        <i /><i /><i /><i />
      </div>
      <div className="ph-main">
        <div className="ph-row">
          <b style={{ width: '34%' }} />
          <b className="ph-chip" style={{ width: '16%' }} />
        </div>
        <div className="ph-stats">
          <b /><b /><b />
        </div>
        <div className="ph-chart">
          {bars.map((h, i) => (
            <i key={i} style={{ height: `${h}%` }} />
          ))}
        </div>
      </div>
    </div>
  ),
  landing: (
    <div className="ph-landing">
      <b className="ph-chip" style={{ width: '22%' }} />
      <b style={{ width: '78%', height: 22 }} />
      <b style={{ width: '56%', height: 22 }} />
      <div className="ph-btns">
        <b className="ph-solid" /><b />
      </div>
      <div className="ph-tiles">
        <b /><b /><b />
      </div>
    </div>
  ),
  profile: (
    <div className="ph-profile">
      <i className="ph-avatar" />
      <b style={{ width: '38%', height: 14 }} />
      <b style={{ width: '58%' }} />
      <div className="ph-amounts">
        <b /><b /><b />
      </div>
      <b className="ph-solid ph-wide" />
    </div>
  ),
};

function ProjectPlaceholder({ kind }) {
  return (
    <div className="ph" aria-hidden="true">
      <div className="ph-window">
        <div className="ph-bar">
          <i /><i /><i />
          <b />
        </div>
        <div className="ph-body">{layouts[kind] ?? layouts.landing}</div>
      </div>
      <span className="ph-note">Placeholder</span>
    </div>
  );
}

export default ProjectPlaceholder;
