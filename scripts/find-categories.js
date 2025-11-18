// scripts/find-categories.js
// Jalankan script ini untuk menemukan ID kategori Anda
// Run: node scripts/find-categories.js

const findCategories = async () => {
  try {
    // Ganti dengan URL website Anda
    const response = await fetch('https://www.homedecorindonesia.com/wp-json/wc/v3/products/categories');
    const result = await response.json();

    if (result.success) {
      console.log('\n✅ DAFTAR KATEGORI WOOCOMMERCE:\n');
      console.log('='.repeat(80));
      
      // Filter kategori yang Anda butuhkan
      const bedroomCategories = result.data.filter(cat => 
        ['beds', 'headboards', 'bedside-table', 'bedroom'].some(keyword => 
          cat.slug.toLowerCase().includes(keyword) || 
          cat.name.toLowerCase().includes(keyword)
        )
      );

      if (bedroomCategories.length > 0) {
        console.log('\n📌 KATEGORI BEDROOM:');
        bedroomCategories.forEach(cat => {
          console.log(`   ID: ${cat.id.toString().padEnd(5)} | Slug: ${cat.slug.padEnd(20)} | Name: ${cat.name} (${cat.count} products)`);
        });

        // Generate API endpoint string
        const categoryIds = bedroomCategories.map(cat => cat.id).join(',');
        const categorySlugs = bedroomCategories.map(cat => cat.slug).join(',');
        
        console.log('\n📋 CARA MENGGUNAKAN:\n');
        console.log('1. Menggunakan Category IDs:');
        console.log(`   apiEndpoint="/api/products/popular-products?categories=${categoryIds}"\n`);
        
        console.log('2. Menggunakan Category Slugs (Recommended):');
        console.log(`   apiEndpoint="/api/products/popular-products?categories=${categorySlugs}"\n`);
      }

      // Tampilkan semua kategori
      console.log('\n📋 SEMUA KATEGORI:');
      console.log('='.repeat(80));
      result.data.forEach(cat => {
        console.log(`   ID: ${cat.id.toString().padEnd(5)} | Slug: ${cat.slug.padEnd(25)} | Name: ${cat.name} (${cat.count} products)`);
      });

    } else {
      console.error('❌ Error:', result.error);
    }
  } catch (error) {
    console.error('❌ Failed to fetch categories:', error.message);
    console.log('\n⚠️  Pastikan:');
    console.log('   1. Development server berjalan (npm run dev)');
    console.log('   2. API route /api/categories sudah dibuat');
    console.log('   3. WooCommerce credentials sudah benar');
  }
};

findCategories();

// ============================================================================
// ALTERNATIF: Jika ingin langsung test di browser console
// ============================================================================

/*
// Paste kode ini di browser console saat membuka website Anda:

fetch('/api/categories')
  .then(res => res.json())
  .then(data => {
    console.table(data.data.map(cat => ({
      ID: cat.id,
      Name: cat.name,
      Slug: cat.slug,
      Products: cat.count
    })));
  });
*/