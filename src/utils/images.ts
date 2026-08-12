import type { ImageMetadata } from "astro";

const allImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/**/*.{jpeg,jpg,png,gif,webp,svg}",
);

const projectGalleryImages = import.meta.glob<{ default: ImageMetadata }>(
  "/src/assets/projects/*/*.{jpeg,jpg,png,gif,webp}",
);

export interface GalleryImage {
  src: ImageMetadata;
  filename: string;
}

/**
 * Dynamically resolves a local asset image object from a string filename or path.
 * @param photoUrl - The filename (e.g., 'avatar.jpg') or full path from JSON data
 * @returns The resolved ImageMetadata object, or null if not found
 */

export async function resolveAssetImage(
  photoUrl: string | undefined,
): Promise<ImageMetadata | null> {
  if (!photoUrl || photoUrl.trim() === "") {
    return null;
  }

  // Normalize path format
  const imagePath = photoUrl.startsWith("/src/assets/") ? photoUrl : `/src/assets/${photoUrl}`;

  const imageResolver = allImages[imagePath];

  if (!imageResolver) {
    console.warn(`[Image Utility] Asset not found for path: ${imagePath}`);
    return null;
  }

  try {
    const imageModule = await imageResolver();
    return imageModule.default;
  } catch (error) {
    console.error(`[Image Utility] Failed to load image at ${imagePath}`, error);
    return null;
  }
}

/**
 * Collects every screenshot dropped into /src/assets/projects/<slug>/, ordered by filename.
 * See src/assets/projects/README.md for the folder convention.
 * @param slug - The project slug, which is also its folder name
 * @returns Resolved images sorted naturally by filename; empty array if the folder has none
 */

export async function resolveProjectGallery(slug: string): Promise<GalleryImage[]> {
  const folder = `/src/assets/projects/${slug}/`;

  const paths = Object.keys(projectGalleryImages)
    .filter((path) => path.startsWith(folder))
    .sort((a, b) => a.localeCompare(b, undefined, { numeric: true }));

  const images = await Promise.all(
    paths.map(async (path) => {
      try {
        const imageModule = await projectGalleryImages[path]();
        return { src: imageModule.default, filename: path.slice(folder.length) };
      } catch (error) {
        console.error(`[Image Utility] Failed to load gallery image at ${path}`, error);
        return null;
      }
    }),
  );

  return images.filter((image): image is GalleryImage => image !== null);
}
