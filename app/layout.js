import { Archivo } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import Fade from '../components/Fade';
import { site } from '../lib/site';
import './globals.css';

const archivo = Archivo({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  display: 'swap',
});

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.nombre} — Holding Empresarial Internacional`,
    template: `%s — ${site.nombre}`,
  },
  description: site.tagline,
  openGraph: {
    title: `${site.nombre} — Holding Empresarial Internacional`,
    description: site.tagline,
    type: 'website',
    locale: 'es_ES',
  },
};

export const viewport = { themeColor: '#0F2040' };

export default function RootLayout({ children }) {
  return (
    <html lang="es" className={archivo.className}>
      <body>
        <a href="#contenido" className="saltar">Saltar al contenido</a>
        <Navbar />
        <Fade>
          <div id="contenido">{children}</div>
        </Fade>
        <Footer />
      </body>
    </html>
  );
}
