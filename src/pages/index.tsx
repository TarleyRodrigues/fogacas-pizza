// src/pages/index.tsx
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import { motion } from "framer-motion";
import { LOJA, TEXTOS, TEMA_ATIVO } from "../../config/loja";
import Hero from "../components/Hero";
import Cardapio from "../components/Cardapio";
import BackToTop from "../components/BackToTop";
import { Header, Donos, Footer, WhatsAppFab } from "../components/ui";

const Home: NextPage = () => (
  <>
    <Head>
      {/* title como string única — evita aviso do Next.js */}
      <title>{`${LOJA.nome} — Cardápio Online`}</title>
      <meta name="description" content={LOJA.descricaoSEO} />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      <link rel="icon" href="/favicon.ico" />
      <meta property="og:title"       content={`${LOJA.nome} — Cardápio`} />
      <meta property="og:description" content={LOJA.descricaoSEO} />
      <meta property="og:type"        content="website" />
      <meta property="og:locale"      content="pt_BR" />
      <link rel="manifest"            href="/manifest.json" />
      <meta name="theme-color"        content={TEMA_ATIVO.primaria} />
      <meta name="apple-mobile-web-app-capable"           content="yes" />
      <meta name="apple-mobile-web-app-status-bar-style"  content="black-translucent" />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify({
        "@context":    "https://schema.org",
        "@type":       "Restaurant",
        name:          LOJA.nome,
        description:   LOJA.descricaoSEO,
        telephone:     LOJA.whatsapp,
        servesCuisine: "Pizza",
        ...(LOJA.endereco  && { address: { "@type": "PostalAddress", streetAddress: LOJA.endereco } }),
        ...(LOJA.instagram && { sameAs: [`https://instagram.com/${LOJA.instagram}`] }),
      })}} />
    </Head>

    {/* Scroll para o topo ao carregar — usando next/script corretamente */}
    <Script id="scroll-top" strategy="beforeInteractive">
      {`if(history.scrollRestoration)history.scrollRestoration='manual';window.scrollTo(0,0);`}
    </Script>

    <Header />
    <Hero />

    <main className="page-body">
      <Cardapio />
      <Donos />

      {/* Sobre */}
      <section id="sobre" className="py-16 px-4 max-w-5xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65 }}>
          <p className="text-sm font-bold uppercase tracking-widest mb-3"
            style={{ color: TEMA_ATIVO.primaria }}>
            Nossa História
          </p>
          <h2 className="font-display text-4xl font-bold mb-4" style={{ color: "#FDF8F0" }}>
            Tradição em cada fatia
          </h2>
          <div className="divider mx-auto" />
          <p className="leading-relaxed max-w-2xl mx-auto mb-10"
            style={{ color: "rgba(253,248,240,0.6)", fontSize: "1.05rem" }}>
            {TEXTOS.sobre.paragrafo1}
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5 max-w-2xl mx-auto">
            {TEXTOS.diferenciais.map((d, i) => (
              <motion.div key={d.titulo}
                className="p-5 rounded-2xl text-center"
                style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}>
                <div className="text-4xl mb-3">{d.icon}</div>
                <div className="font-semibold text-sm mb-1" style={{ color: "#FDF8F0" }}>{d.titulo}</div>
                <div className="text-xs" style={{ color: "rgba(253,248,240,0.38)" }}>{d.desc}</div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </main>

    <Footer />
    <WhatsAppFab />
    <BackToTop />
  </>
);

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
  revalidate: 3600,
});

export default Home;