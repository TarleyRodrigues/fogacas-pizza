// src/components/Header.tsx
import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { LOJA, TEMA_ATIVO } from "../../config/loja";
import { useWhatsApp } from "../hooks/useWhatsApp";

export function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 80], [0, 1]);
  const { linkGenerico } = useWhatsApp();

  useEffect(() => {
    if (menuAberto) {
      const close = () => setMenuAberto(false);
      document.addEventListener("click", close);
      return () => document.removeEventListener("click", close);
    }
  }, [menuAberto]);

  const links = [
    { href: "#cardapio", label: "Cardápio"  },
    { href: "#donos",    label: "Sobre nós" },
    { href: "#contato",  label: "Contato"   },
  ];

  return (
    <header className="fixed top-0 left-0 right-0 z-50">
      <motion.div className="glass absolute inset-0" style={{ opacity: bgOpacity }} />
      <div className="relative max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
  {/* Logo */}
  {/* eslint-disable-next-line @next/next/no-img-element */}
  <img
    src="/images/logo.png"
    alt={LOJA.nome}
    style={{
      height: "40px",
      width: "auto",
      objectFit: "contain",
      flexShrink: 0,
    }}
  />

  {/* Separador vertical */}
  <div style={{
    width: "1px",
    height: "28px",
    background: "rgba(255,255,255,0.15)",
    flexShrink: 0,
  }} />

  {/* Texto */}
  <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.1 }}>
    <span style={{
      fontFamily: "'Playfair Display', serif",
      fontWeight: 700,
      fontSize: "1.1rem",
      color: "#FDF8F0",
      letterSpacing: "-0.01em",
    }}>
      {LOJA.nome}
    </span>
    <span style={{
      fontSize: "0.6rem",
      fontWeight: 500,
      textTransform: "uppercase",
      letterSpacing: "0.18em",
      color: "var(--cor-primaria)",
      marginTop: "1px",
    }}>
      O segredo está no tempo e na paixão pelo que fazemos.
    </span>
  </div>
</a>

        {/* Nav desktop */}
        <nav className="hidden md:flex items-center gap-1">
          {links.map(l => (
            <a key={l.href} href={l.href}
              className="px-4 py-2 text-sm font-medium rounded-xl transition-all duration-200"
              style={{ color: "rgba(253,248,240,0.65)" }}
              onMouseEnter={e => (e.currentTarget.style.color = "#FDF8F0")}
              onMouseLeave={e => (e.currentTarget.style.color = "rgba(253,248,240,0.65)")}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:flex items-center gap-3">
          {LOJA.instagram && (
            <a href={`https://instagram.com/${LOJA.instagram}`} target="_blank" rel="noopener noreferrer"
              className="transition-colors" style={{ color: "rgba(253,248,240,0.45)" }}
              onMouseEnter={e => e.currentTarget.style.color = TEMA_ATIVO.primaria}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(253,248,240,0.45)"}
              aria-label="Instagram">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          )}
          <a href={linkGenerico} target="_blank" rel="noopener noreferrer"
            className="btn-primary px-5 py-2.5 text-sm rounded-xl"
            style={{ background: TEMA_ATIVO.primaria }}>
            Pedir agora
          </a>
        </div>

        {/* Hamburguer mobile */}
        <button
          className="md:hidden p-2 rounded-xl transition-all"
          style={{ color: "rgba(253,248,240,0.7)" }}
          onClick={e => { e.stopPropagation(); setMenuAberto(!menuAberto); }}
          aria-label="Menu" aria-expanded={menuAberto}>
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {menuAberto
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            }
          </svg>
        </button>
      </div>

      {/* Dropdown mobile */}
      {menuAberto && (
        <motion.div className="md:hidden glass border-t px-4 py-4 flex flex-col gap-1"
          style={{ borderColor: "rgba(255,255,255,0.07)" }}
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          onClick={e => e.stopPropagation()}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuAberto(false)}
              className="px-4 py-3 text-sm font-medium rounded-xl"
              style={{ color: "rgba(253,248,240,0.75)" }}>
              {l.label}
            </a>
          ))}
          <a href={linkGenerico} target="_blank" rel="noopener noreferrer"
            className="btn-primary mt-2 px-5 py-3 text-sm rounded-xl justify-center"
            style={{ background: TEMA_ATIVO.primaria }}>
            🛒 Pedir agora
          </a>
        </motion.div>
      )}
    </header>
  );
}


// ── Seção Donos ──────────────────────────────────────────────
import { useState as useState2 } from "react";
import Image from "next/image";
import { TEXTOS } from "../../config/loja";

export function Donos() {
  const [imgErr, setImgErr] = useState2(false);
  const { linkGenerico } = useWhatsApp();

  return (
    <section id="donos" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="rounded-3xl overflow-hidden"
          style={{
            background: "linear-gradient(135deg,#1E1E1E,#171717)",
            border: "1px solid rgba(255,255,255,0.06)",
          }}
          initial={{ opacity: 0, y: 32 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}>

          <div className="grid grid-cols-1 lg:grid-cols-2 items-center">

            {/* Foto */}
            <motion.div className="flex justify-center items-center p-8 lg:p-12"
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}>
              <div className="relative w-full max-w-sm">
                <div className="absolute -inset-3 rounded-3xl opacity-25"
                  style={{ background: `linear-gradient(135deg, ${TEMA_ATIVO.primaria}, ${TEMA_ATIVO.secundaria})` }} />
                <div className="relative rounded-2xl overflow-hidden aspect-[4/3]"
                  style={{ background: "#2A2A2A" }}>
                  {!imgErr ? (
                    <Image src="/images/donos.gif" alt="Os donos"
                      fill className="object-cover"
                      sizes="(max-width: 768px) 90vw, 400px"
                      onError={() => setImgErr(true)}
                      unoptimized
                      />
                  ) : (
                    <div className="flex flex-col items-center justify-center h-full gap-4 p-8 text-center">
                      <div className="text-6xl">📸</div>
                      <div>
                        <p className="font-display text-lg font-bold" style={{ color: "#FDF8F0" }}>
                          Foto dos Donos
                        </p>
                        <p className="text-sm mt-1" style={{ color: "rgba(253,248,240,0.4)" }}>
                          Coloque em{" "}
                          <code className="text-xs px-1.5 py-0.5 rounded"
                            style={{ color: TEMA_ATIVO.primaria, background: `${TEMA_ATIVO.primaria}18` }}>
                            public/images/donos.jpg
                          </code>
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Texto */}
            <motion.div className="px-8 pb-10 lg:py-12 lg:pr-12 lg:pl-4 text-center lg:text-left"
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}>
              <p className="text-sm font-bold uppercase tracking-widest mb-3"
                style={{ color: TEMA_ATIVO.primaria }}>
                {TEXTOS.sobre.subtitulo}
              </p>
              <h2 className="font-display text-4xl md:text-5xl font-bold leading-tight mb-4"
                style={{ color: "#FDF8F0" }}>
                {TEXTOS.sobre.titulo.split(" ").map((w, i) =>
                  w === "amor" ? <em key={i} className="text-grad not-italic">{w} </em> : w + " "
                )}
              </h2>
              <div className="divider lg:mx-0 mx-auto" />
              <p className="leading-relaxed mb-4" style={{ color: "rgba(253,248,240,0.62)" }}>
                {TEXTOS.sobre.paragrafo1}
              </p>
              <p className="leading-relaxed mb-8" style={{ color: "rgba(253,248,240,0.62)" }}>
                {TEXTOS.sobre.paragrafo2}
              </p>
              <a href={linkGenerico} target="_blank" rel="noopener noreferrer"
                className="btn-primary inline-flex px-7 py-3.5 text-sm rounded-2xl"
                style={{ background: TEMA_ATIVO.primaria }}>
                Fazer um pedido agora
              </a>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}


// ── Footer ───────────────────────────────────────────────────
export function Footer() {
  const ano = new Date().getFullYear();
  const { linkGenerico } = useWhatsApp();

  return (
    <footer id="contato"
      style={{ background: "#161616", borderTop: "1px solid rgba(255,255,255,0.05)" }}
      className="mt-20">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8 mb-10">

          {/* Marca */}
          <div>
            <span className="font-display text-2xl font-bold" style={{ color: "#FDF8F0" }}>
              🍕 {LOJA.nome}
            </span>
            <p className="text-sm mt-2" style={{ color: "rgba(253,248,240,0.45)" }}>
              O segredo está no tempo e na paixão pelo que fazemos.
            </p>
            <div className="flex gap-3 mt-4">
              {LOJA.instagram && (
                <a href={`https://instagram.com/${LOJA.instagram}`} target="_blank" rel="noopener noreferrer"
                  style={{ color: "rgba(253,248,240,0.35)" }}
                  onMouseEnter={e => e.currentTarget.style.color = TEMA_ATIVO.primaria}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(253,248,240,0.35)"}
                  className="transition-colors" aria-label="Instagram">
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              <a href={linkGenerico} target="_blank" rel="noopener noreferrer"
                style={{ color: "rgba(253,248,240,0.35)" }}
                onMouseEnter={e => e.currentTarget.style.color = "#25D366"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(253,248,240,0.35)"}
                className="transition-colors" aria-label="WhatsApp">
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Horários */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: "#FDF8F0" }}>Horários</h3>
            <ul className="space-y-2">
              {LOJA.horarios.map((h, i) => (
                <li key={i} className="flex justify-between text-sm gap-4">
                  <span style={{ color: "rgba(253,248,240,0.55)" }}>{h.dias}</span>
                  <span className="font-medium"
                    style={{ color: h.fechado ? "rgba(253,248,240,0.3)" : "#FDF8F0" }}>
                    {h.fechado ? "Fechado" : `${h.abre} – ${h.fecha}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 className="font-semibold mb-4" style={{ color: "#FDF8F0" }}>Fale Conosco</h3>
            {LOJA.endereco && (
              <p className="text-sm mb-3 flex gap-2 items-start"
                style={{ color: "rgba(253,248,240,0.55)" }}>
                <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none"
                  stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24"
                  style={{ color: TEMA_ATIVO.primaria }}>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/>
                  <path strokeLinecap="round" strokeLinejoin="round"
                    d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"/>
                </svg>
                {LOJA.endereco}
              </p>
            )}
            <a href={linkGenerico} target="_blank" rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-sm font-medium transition-opacity hover:opacity-75"
              style={{ color: "#25D366" }}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              {LOJA.whatsapp.replace(/^55/, "(").replace(/(\d{2})(\d{5})(\d{4})$/, "$1) $2-$3")}
            </a>
          </div>
        </div>

        <div className="pt-6 text-center" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
          <p className="text-xs" style={{ color: "rgba(253,248,240,0.2)" }}>
            © {ano} {LOJA.nome} — Feito com ❤️ e muito manjericão 🌿
          </p>
        </div>
      </div>
    </footer>
  );
}


// ── WhatsApp FAB ─────────────────────────────────────────────
export function WhatsAppFab() {
  const { linkGenerico } = useWhatsApp();
  return (
    <a href={linkGenerico} target="_blank" rel="noopener noreferrer"
      className="whatsapp-fab" aria-label="Pedir pelo WhatsApp">
      <svg width="26" height="26" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
}
