export async function getPage(slug) {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_WC_STORE_URL}/wp-json/wp/v2/pages?slug=${slug}`
  );
  const pages = await response.json();
  return pages[0]; // Return the first page that matches the slug
}
