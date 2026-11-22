// Drop ANY image named "me" into src/assets/ (jpg, jpeg, png, webp or avif, any
// letter case) and it is picked up automatically in the hero and About section.
// No import to edit. If no file is found, a placeholder is shown instead.
//
// Sizing is automatic too: the frames are sized in CSS and the image is cropped
// to fill them (object-fit: cover), so any aspect ratio works on any screen.
const found = import.meta.glob(
  '../assets/me.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, import: 'default' }
);

export const photo = Object.values(found)[0] ?? null;