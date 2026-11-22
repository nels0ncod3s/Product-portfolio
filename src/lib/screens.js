// App screenshots for mobile projects are picked up automatically. Put portrait
// screenshots in a folder named after the project's slug:
//
//   src/assets/work/screens/drift/1.png
//   src/assets/work/screens/drift/2.png
//   src/assets/work/screens/drift/3.png
//
// The first three (sorted by file name) are shown in phone frames. Until you add
// some, a wireframe placeholder is shown instead.
const files = import.meta.glob(
  '../assets/work/screens/*/*.{png,jpg,jpeg,webp,PNG,JPG,JPEG,WEBP}',
  { eager: true, import: 'default' }
);

export function screensFor(slug) {
  return Object.entries(files)
    .filter(([path]) => path.includes(`/screens/${slug}/`))
    .sort(([a], [b]) => a.localeCompare(b, undefined, { numeric: true }))
    .map(([, url]) => url);
}
