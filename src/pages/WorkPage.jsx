import { useCallback, useRef } from 'react';
import CaseStudy from '../components/CaseStudy';
import Project from '../components/Project';
import { caseStudies } from '../data/caseStudies';
import { projects } from '../data/projects';
import { useScrollGrow } from '../lib/useScrollGrow';
import { replaceHash } from '../lib/route';

// The full work page: every project, with live links and case studies.
// The open case study lives in the URL hash (#/work/first-layer), so it can be
// linked to directly, and Back closes it.
function WorkPage({ slug }) {
  const ref = useRef(null);
  useScrollGrow(ref);

  const openCase = useCallback((next) => {
    window.location.hash = `/work/${next}`;
  }, []);

  const closeCase = useCallback(() => replaceHash('#/work'), []);

  const openProject = projects.find((p) => p.slug === slug && caseStudies[p.slug]);

  return (
    <section className="work-section work-page" id="work" ref={ref}>
      <div className="container">
        <a href="#work" className="back-link">
          <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M19 12H5M11 6l-6 6 6 6" />
          </svg>
          Back
        </a>

        <div className="section-heading">
          <h1>All work</h1>
        </div>

        <div className="work-grid">
          {projects.map((project) => (
            <Project project={project} onOpenCase={openCase} key={project.name} />
          ))}
        </div>
      </div>

      {openProject && (
        <CaseStudy
          project={openProject}
          study={caseStudies[openProject.slug]}
          onClose={closeCase}
          key={openProject.slug}
        />
      )}
    </section>
  );
}

export default WorkPage;
