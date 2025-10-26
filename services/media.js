const BASE_URL = process.env.NEXT_PUBLIC_WC_STORE_URL;

export async function getMediaById(id) {
  try {
    const response = await fetch(`${BASE_URL}/wp-json/wp/v2/media/${id}`);
    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching media:', error);
    return null;
  }
}

export async function getAllMedia(page = 1, perPage = 20) {
  try {
    const response = await fetch(
      `${BASE_URL}/wp-json/wp/v2/media?page=${page}&per_page=${perPage}`
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch media: ${response.status}`);
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching media:', error);
    return [];
  }
}

export function getImageSizes(mediaItem) {
  if (!mediaItem) return null;

  return {
    thumbnail: mediaItem?.media_details?.sizes?.thumbnail?.source_url || mediaItem.source_url,
    medium: mediaItem?.media_details?.sizes?.medium?.source_url || mediaItem.source_url,
    large: mediaItem?.media_details?.sizes?.large?.source_url || mediaItem.source_url,
    full: mediaItem.source_url,
    alt: mediaItem.alt_text || '',
    width: mediaItem?.media_details?.width,
    height: mediaItem?.media_details?.height
  };
}

// Helper untuk mendapatkan URL gambar yang optimal berdasarkan ukuran container
export function getOptimalImageUrl(mediaItem, containerWidth) {
  const sizes = getImageSizes(mediaItem);
  if (!sizes) return null;

  if (containerWidth <= 150) return sizes.thumbnail;
  if (containerWidth <= 300) return sizes.medium;
  if (containerWidth <= 1024) return sizes.large;
  return sizes.full;
}
