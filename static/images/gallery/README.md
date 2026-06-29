# Imágenes de la galería

Coloca aquí las fotos de la comunidad (formato `.jpg`, `.png` o `.webp`).

Luego referencia cada archivo en `src/utils/constants.ts`, dentro de
`GALLERY_IMAGES`, usando la ruta pública. Por ejemplo, si subes
`retiro-2026.jpg` a esta carpeta:

```ts
export const GALLERY_IMAGES = [
  { id: "1", title: "Retiro de jóvenes 2026", imageUrl: "/images/gallery/retiro-2026.jpg" },
  // ...
];
```

Mientras `imageUrl` esté vacío se mostrará un marcador con degradado de color.
