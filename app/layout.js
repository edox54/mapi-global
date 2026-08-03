import { Archivo } from 'next/font/google';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import SelectorTema from '../components/SelectorTema';
import { site } from '../lib/site';
import './globals.css';

// ponytail: fija data-tema antes del primer paint para que no parpadee el
// acento por defecto mientras React hidrata. Quitar junto con SelectorTema
// cuando el cliente apruebe una paleta y esta quede fija en globals.css.
const SCRIPT_TEMA = `try{var t=localStorage.getItem('mapi-tema');if(t)document.documentElement.setAttribute('data-tema',t);}catch(e){}`;

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
    <html lang="es" className={archivo.className} suppressHydrationWarning>
      <body>
        <script dangerouslySetInnerHTML={{ __html: SCRIPT_TEMA }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify({
            '@context': 'https://schema.org',
            '@type': 'Organization',
            name: site.nombre,
            url: site.url,
            logo: `${site.url}/isotipo.png`,
            description: site.tagline,
            email: site.contacto.correo,
            telephone: site.contacto.telefono,
            address: {
              '@type': 'PostalAddress',
              streetAddress: '8180 NW 36 St, Suite 406',
              addressLocality: 'Doral',
              addressRegion: 'FL',
              postalCode: '33166',
              addressCountry: 'US',
            },
          }) }}
        />
        <a href="#contenido" className="saltar">Saltar al contenido</a>
        <Navbar />
        {children}
        <Footer />
        <SelectorTema />
      </body>
    </html>
  );
}
