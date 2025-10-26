import { getPage } from "@/services/pages";
import WordPressImage from "@/components/WordPressImage";

export const revalidate = 3600; // Revalidate every hour

export default async function AboutUs() {
  const pageData = await getPage("about-us");
  const featuredImageId = pageData?.featured_media;

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section with Featured Image */}
      <div className="relative h-[60vh] bg-neutral-100 overflow-hidden">
        {featuredImageId && (
          <WordPressImage
            mediaId={featuredImageId}
            priority={true}
            className="object-cover w-full h-full"
            sizes="100vw"
          />
        )}
        <div className="absolute inset-0 bg-black/40" />
        <div className="container mx-auto px-4 h-full flex items-center justify-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-bold text-white text-center">
            About Home Decor Indonesia
          </h1>
        </div>
      </div>

      {/* Content Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto">
          <div 
            className="prose prose-lg prose-neutral max-w-none"
            dangerouslySetInnerHTML={{ __html: pageData?.content?.rendered }}
          />
        </div>
      </div>

      {/* Values Section */}
      <div className="bg-neutral-50 py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Quality</h3>
              <p className="text-neutral-600">
                We are committed to providing the highest quality furniture and home decor products.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Innovation</h3>
              <p className="text-neutral-600">
                We constantly innovate to bring you the latest trends and designs in home decoration.
              </p>
            </div>
            <div className="bg-white p-8 rounded-lg shadow-sm hover:shadow-md transition-shadow">
              <h3 className="text-xl font-semibold mb-4">Customer Service</h3>
              <p className="text-neutral-600">
                We pride ourselves on providing exceptional customer service and support.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Contact CTA Section */}
      <div className="bg-neutral-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-6">Get in Touch</h2>
          <p className="text-lg mb-8 text-neutral-300">
            Have questions? We'd love to hear from you.
          </p>
          <button className="bg-white text-neutral-900 px-8 py-3 rounded-full font-semibold hover:bg-neutral-100 transition-colors">
            Contact Us
          </button>
        </div>
      </div>
    </div>
  );
}
