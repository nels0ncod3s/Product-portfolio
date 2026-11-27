import { useEffect, useState } from 'react';

// Drop ANY image named "me" into src/assets/ (jpg, jpeg, png, webp or avif, any
// letter case) and it is picked up automatically in the hero and About section.
// No import to edit. If no file is found, a placeholder is shown instead.
const found = import.meta.glob(
  '../assets/me.{jpg,jpeg,png,webp,avif,JPG,JPEG,PNG,WEBP,AVIF}',
  { eager: true, import: 'default' }
);

export const photo = Object.values(found)[0] ?? null;

// Keeps odd shapes (a very tall or very wide photo) from breaking the layout.
export const fitRatio = (ratio, min, max) => Math.min(max, Math.max(min, ratio));

let cachedRatio = null;

// Width / height of the photo, measured once. The photo frames use it so the
// FRAME takes the photo's shape instead of the photo being cropped to a fixed
// shape. Returns `fallback` until the image has loaded.
export function usePhotoRatio(fallback = 1) {
  const [ratio, setRatio] = useState(cachedRatio);

  useEffect(() => {
    if (!photo || cachedRatio) return undefined;
    const img = new Image();
    img.onload = () => {
      if (!img.naturalHeight) return;
      cachedRatio = img.naturalWidth / img.naturalHeight;
      setRatio(cachedRatio);
    };
    img.src = photo;
    return () => {
      img.onload = null;
    };
  }, []);

  return ratio ?? fallback;
}