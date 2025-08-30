import Theme from "@/theme-provider";
import "./globals.css";
import { Poppins } from "next/font/google";
import localFont from 'next/font/local';
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppFloating from "@/components/WhatsappFloating";

const futuraBook = localFont({
  src: './fonts/Futura-Book.ttf',
  display: 'swap',
  variable: '--font-futura-book',
})

export const metadata = {
  metadataBase: new URL('https://homedecorindonesia.com'),
  keywords: ['homedecorindonesia', 'homedecor'],
  title: {
    default: 'Homedecor',
    template: "Homedecor | %s",
  },
  verification: {
    google: ""
  },
  // openGraph: {
  //   description: '',
  //   images: [
  //     {
  //       url: '',
  //       alt: '',
  //       width: 1200,
  //       height: 630,
  //     }
  //   ]
  // },
  twitter: {
    card: "summary_large_image",
    title: "9Teen Supply Website",
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body
        className={`${futuraBook.variable} antialiased`}
      >
        <Theme>
          <Header />
          {children}
          <WhatsAppFloating />
          <Footer />
        </Theme>
      </body>
    </html>
  );
}
