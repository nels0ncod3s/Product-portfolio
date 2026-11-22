// Phone frames for mobile projects. With `screens` (portrait screenshots) it
// shows up to three of them; without, it draws three wireframe phones.
function PlaceholderScreen({ n }) {
  if (n === 0) {
    return (
      <div className="ps ps-grid">
        <b className="ps-title" />
        <div>
          {Array.from({ length: 6 }, (_, i) => (
            <i key={i} />
          ))}
        </div>
      </div>
    );
  }
  if (n === 1) {
    return (
      <div className="ps ps-map">
        <i className="ps-pin" style={{ left: '22%', top: '26%' }} />
        <i className="ps-pin" style={{ left: '66%', top: '34%' }} />
        <i className="ps-pin is-drop" style={{ left: '42%', top: '52%' }} />
        <i className="ps-pin" style={{ left: '70%', top: '62%' }} />
        <b className="ps-sheet" />
      </div>
    );
  }
  return (
    <div className="ps ps-cam">
      <i className="ps-shutter" />
    </div>
  );
}

function PhoneShowcase({ screens = [], alt = '' }) {
  const hasScreens = screens.length > 0;
  const items = hasScreens ? screens.slice(0, 3) : [0, 1, 2];

  return (
    <div className="phones" role={alt ? 'img' : undefined} aria-label={alt || undefined} aria-hidden={alt ? undefined : 'true'}>
      {items.map((item, i) => (
        <div className="phone" key={i}>
          {hasScreens ? (
            <img src={item} alt="" loading="lazy" />
          ) : (
            <PlaceholderScreen n={i} />
          )}
        </div>
      ))}
      {!hasScreens && <span className="ph-note">Placeholder</span>}
    </div>
  );
}

export default PhoneShowcase;
