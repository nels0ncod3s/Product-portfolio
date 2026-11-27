import icon16 from '../assets/favicon/favicon-16.png';
import icon32 from '../assets/favicon/favicon-32.png';
import icon512 from '../assets/favicon/icon-512.png';
import appleTouch from '../assets/favicon/apple-touch-icon.png';

// The favicon is made from the photo in the hero pill (see assets/favicon/).
// It is added here, so nothing in index.html needs editing. Any icon links
// already in index.html (such as the Vite logo) are removed first.
const icons = [
  { rel: 'icon', type: 'image/png', sizes: '16x16', href: icon16 },
  { rel: 'icon', type: 'image/png', sizes: '32x32', href: icon32 },
  { rel: 'icon', type: 'image/png', sizes: '512x512', href: icon512 },
  { rel: 'apple-touch-icon', sizes: '180x180', href: appleTouch },
];

export function setupHead() {
  document
    .querySelectorAll('link[rel="icon"], link[rel="shortcut icon"], link[rel="apple-touch-icon"]')
    .forEach((el) => el.remove());

  icons.forEach((attrs) => {
    const link = document.createElement('link');
    Object.entries(attrs).forEach(([key, value]) => link.setAttribute(key, value));
    document.head.appendChild(link);
  });
}

// Browser tab titles. Edit these to taste.
export const titles = {
  home: 'Nelson Wey · Design Engineer Portfolio',
  work: 'All work · Nelson Wey',
};
