import Image from 'next/image';
import { getMediaById, getImageSizes } from '@/services/media';

export default async function WordPressImage({ 
  mediaId, 
  className = '',
  priority = false,
  sizes = '100vw',
  quality = 75
}) {
  const mediaData = await getMediaById(mediaId);
  if (!mediaData) return null;

  const imageSizes = getImageSizes(mediaData);
  if (!imageSizes) return null;

  return (
    <Image
      src={imageSizes.full}
      alt={imageSizes.alt}
      width={imageSizes.width}
      height={imageSizes.height}
      className={className}
      priority={priority}
      sizes={sizes}
      quality={quality}
    />
  );
}

// Client component untuk lazy loading
export function WordPressImageClient({
  src,
  alt,
  width,
  height,
  className = '',
  priority = false,
  sizes = '100vw',
  quality = 75
}) {
  if (!src) return null;

  return (
    <Image
      src={src}
      alt={alt || ''}
      width={Number(width)}
      height={Number(height)}
      className={className}
      priority={priority}
      sizes={sizes}
      quality={quality}
    />
  );
}
