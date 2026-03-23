// src/pages/index.tsx
import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Script from "next/script";
import { useState } from "react";
import { motion } from "framer-motion";
import { LOJA, TEXTOS, TEMA_ATIVO } from "../../config/loja";
import Hero from "../components/Hero";
import Cardapio from "../components/Cardapio";
import Carrinho from "../components/Carrinho";
import BotaoCarrinho from "../components/BotaoCarrinho";
import MeioAMeio from "../components/MeioAMeio";
import BackToTop from "../components/BackToTop";
import { Header, Donos, Footer, WhatsAppFab } from "../components/ui";

const Home: NextPage = () => {
  const [meioAMeioAberto, setMeioAMeioAberto] = useState(false);

  return (
    <>
      <Head>
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
        <meta name="apple-mobile-web-app-capable"          content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
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

      <Script id="scroll-top" strategy="beforeInteractive">
        {`if(history.scrollRestoration)history.scrollRestoration='manual';window.scrollTo(0,0);`}
      </Script>

      <Header />
      <Hero />

      <main className="page-body">
        {/* Botão Meio a Meio fixo */}
        <div style={{
          position: "sticky", top: "70px", zIndex: 40,
          display: "flex", justifyContent: "center",
          padding: "0.875rem 1.25rem 0",
          pointerEvents: "none",
        }}>
          <motion.button
            onClick={() => setMeioAMeioAberto(true)}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.5 }}
            style={{
              pointerEvents: "all",
              display: "inline-flex", alignItems: "center", gap: "0.6rem",
              padding: "0.65rem 1.5rem",
              background: "rgba(10,10,10,0.92)",
              border: "1px solid rgba(201,149,42,0.35)",
              borderRadius: "9999px", cursor: "pointer",
              color: "#F5F0E8", fontWeight: 600, fontSize: "0.875rem",
              backdropFilter: "blur(16px)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 0 0 1px rgba(201,149,42,0.1)",
              fontFamily: "'DM Sans', sans-serif",
            }}
            whileHover={{
              borderColor: "rgba(201,149,42,0.7)",
              boxShadow: "0 4px 24px rgba(0,0,0,0.5), 0 0 20px rgba(201,149,42,0.15)",
            }}
          >
            <span style={{ fontSize: "1.1rem" }}>🍕</span>
            <span>Monte seu{" "}
              <span style={{
                background: "linear-gradient(135deg, #F0C060, #C9952A)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                fontFamily: "'Playfair Display', serif", fontStyle: "italic",
              }}>
                Meio a Meio
              </span>
            </span>
            <svg width="14" height="14" fill="none" stroke="#C9952A" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7"/>
            </svg>
          </motion.button>
        </div>

        <Cardapio />
        <Donos />

        {/* Sobre */}
        <section id="sobre" style={{ padding: "5rem 1.25rem", maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.65 }}>
            <span className="section-tag">Nossa História</span>
            <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: "clamp(2rem, 5vw, 3rem)", fontWeight: 900, color: "#F5F0E8", marginTop: "0.5rem", marginBottom: "0.75rem" }}>
              Tradição em cada fatia
            </h2>
            <div className="divider" style={{ margin: "0 auto 1.5rem" }} />
            <p style={{ fontSize: "1rem", lineHeight: 1.8, color: "rgba(245,240,232,0.58)", maxWidth: "600px", margin: "0 auto 3rem" }}>
              {TEXTOS.sobre.paragrafo1}
            </p>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(180px,1fr))", gap: "1rem", maxWidth: "640px", margin: "0 auto" }}>
              {TEXTOS.diferenciais.map((d, i) => (
                <motion.div key={d.titulo}
                  style={{
                    padding: "1.5rem 1rem", borderRadius: "1.25rem", textAlign: "center",
                    background: "rgba(255,255,255,0.025)",
                    border: "1px solid rgba(201,149,42,0.1)",
                  }}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}>
                  <div style={{ fontSize: "2.5rem", marginBottom: "0.75rem" }}>{d.icon}</div>
                  <div style={{ fontWeight: 600, fontSize: "0.875rem", color: "#F5F0E8", marginBottom: "0.25rem" }}>{d.titulo}</div>
                  <div style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.35)" }}>{d.desc}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </section>
      </main>

      <Footer />

      {/* Componentes globais */}
      <WhatsAppFab />
      <BackToTop />
      <BotaoCarrinho />
      <Carrinho />
      <MeioAMeio aberto={meioAMeioAberto} fechar={() => setMeioAMeioAberto(false)} />
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => ({
  props: {},
  revalidate: 3600,
});

export default Home;
