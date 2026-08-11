// lib/shimmer.ts
const skeleton = (w: number, h: number) => `
<svg width="${w}" height="${h}" xmlns="http://www.w3.org/2000/svg">
  <rect width="${w}" height="${h}" fill="#e2e2e2" />
</svg>`;

const toBase64 = (str: string) =>
  typeof window === "undefined"
    ? Buffer.from(str).toString("base64")
    : window.btoa(str);

export const skeletonDataURL = (w = 700, h = 475) =>
  `data:image/svg+xml;base64,${toBase64(skeleton(w, h))}`;