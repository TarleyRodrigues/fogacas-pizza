// src/components/Hero.tsx
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { LOJA, TEXTOS, TEMA_ATIVO } from "../../config/loja";
import { useWhatsApp } from "../hooks/useWhatsApp";

const ITEM = {
  hidden: { opacity: 0, y: 36 },
  show:   { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.4, 0, 0.2, 1] } },
};
const CONTAINER = {
  hidden: {},
  show:   { transition: { staggerChildren: 0.14, delayChildren: 0.15 } },
};

export default function Hero() {
  const { linkGenerico } = useWhatsApp();
  const [progress, setProgress] = useState(0);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const onScroll = () => {
      const el = wrapperRef.current;
      if (!el) return;
      const ratio = Math.max(0, Math.min(1, window.scrollY / el.offsetHeight));
      setProgress(ratio);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const imgY          = progress * 100;
  const imgOpacity    = 1 - Math.max(0, (progress - 0.45) * 2.2);
  const overlayAlpha  = Math.min(0.92, 0.3 + progress * 0.65);
  const { hero }      = TEXTOS;

  return (
    <div ref={wrapperRef} style={{ height: "100vh", position: "relative" }}>

      {/* Imagem — tag <img> nativa, sem next/image, sem problemas */}
      <div style={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        overflow: "hidden",
        opacity: Math.max(0, imgOpacity),
        pointerEvents: "none",
      }}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/images/hero.webp"
          alt={LOJA.nome}
          style={{
            position: "absolute",
  top: "-15%",
  left: 0,
  width: "100%",
  height: "130%",
  objectFit: "cover",
  objectPosition: "center 30%",
  transform: `translateY(${imgY}px)`,
  willChange: "transform",
  imageRendering: "auto",
  WebkitBackfaceVisibility: "hidden",
  backfaceVisibility: "hidden",
          }}
        />

        {/* Overlay escurece gradualmente */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: `linear-gradient(
            to bottom,
            rgba(17,17,17,${(overlayAlpha * 0.25).toFixed(2)}) 0%,
            rgba(17,17,17,${(overlayAlpha * 0.55).toFixed(2)}) 45%,
            rgba(17,17,17,${(overlayAlpha * 0.92).toFixed(2)}) 80%,
            rgba(17,17,17,1) 100%
          )`,
        }} />
      </div>

      {/* Conteúdo */}
      <div style={{
        position: "relative",
        zIndex: 2,
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "0 1.5rem 4rem",
        maxWidth: "1280px",
        margin: "0 auto",
      }}>
        <motion.div variants={CONTAINER} initial="hidden" animate="show" className="max-w-2xl">

          <motion.div variants={ITEM} className="flex items-center gap-3 mb-5">
            <div style={{ height: "1px", width: "28px", background: TEMA_ATIVO.primaria, borderRadius: "9999px" }} />
            <span style={{ color: TEMA_ATIVO.primaria, fontSize: "0.72rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.22em" }}>
              {hero.tagline}
            </span>
          </motion.div>

          <motion.h1 variants={ITEM} className="font-display font-black leading-none mb-6"
            style={{ fontSize: "clamp(2.8rem, 7.5vw, 5.5rem)", color: "#FDF8F0" }}>
            {hero.titulo1}<br />
            <em className="text-grad not-italic">{hero.titulo2}</em><br />
            {hero.titulo3}
          </motion.h1>

          <motion.p variants={ITEM} className="text-lg mb-8 max-w-md leading-relaxed"
            style={{ color: "rgba(253,248,240,0.72)" }}>
            {hero.subtitulo}
          </motion.p>

          <motion.div variants={ITEM} className="flex flex-wrap gap-3 mb-10">
            <a href="#cardapio" className="btn-primary px-7 py-3.5 text-base rounded-2xl"
              style={{ background: TEMA_ATIVO.primaria }}>
              Ver Cardápio
            </a>
            <a href={linkGenerico} target="_blank" rel="noopener noreferrer"
              className="btn-outline px-7 py-3.5 text-base rounded-2xl">
              <svg width="17" height="17" viewBox="0 0 24 24" fill="#25D366" style={{ flexShrink: 0 }}>
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              Pedir agora
            </a>
          </motion.div>

          <motion.div variants={ITEM} className="flex gap-8 flex-wrap">
            {hero.stats.map(s => (
              <div key={s.label}>
                <div className="font-display font-bold leading-none"
                  style={{ fontSize: "1.6rem", color: TEMA_ATIVO.primaria }}>
                  {s.valor}
                </div>
                <div style={{ fontSize: "0.68rem", textTransform: "uppercase", letterSpacing: "0.12em", marginTop: "0.3rem", color: "rgba(253,248,240,0.38)" }}>
                  {s.label}
                </div>
              </div>
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        style={{ position: "absolute", bottom: "1.5rem", left: "50%", transform: "translateX(-50%)", zIndex: 3, opacity: Math.max(0, 1 - progress * 6), display: "flex", flexDirection: "column", alignItems: "center", gap: "0.375rem" }}
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.2, repeat: Infinity, ease: "easeInOut" }}>
        <span style={{ fontSize: "0.6rem", textTransform: "uppercase", letterSpacing: "0.2em", color: "rgba(253,248,240,0.3)" }}>scroll</span>
        <svg width="14" height="14" fill="none" stroke="rgba(253,248,240,0.3)" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
        </svg>
      </motion.div>
    </div>
  );
}