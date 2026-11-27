// Your CVs are picked up automatically. Drop one or more PDFs into
//
//   src/assets/cv/
//
// and they appear in the About section (and a "CV" link appears in Contact).
// The file name becomes the label: "Nelson-Wey-Design-CV.pdf" shows as
// "Nelson Wey Design CV", and that is also the name people get when they download it.
// Remember the file is public: remove any phone number or address you don't want shared.
const files = import.meta.glob('../assets/cv/*.{pdf,PDF}', {
  eager: true,
  import: 'default',
});

export const cvs = Object.entries(files)
  .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
  .map(([path, url]) => {
    const file = path.split('/').pop();
    return {
      url,
      file,
      label: file.replace(/\.pdf$/i, '').replace(/[-_]+/g, ' ').trim(),
    };
  });
