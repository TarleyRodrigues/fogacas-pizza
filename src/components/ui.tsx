// src/components/ui.tsx — v4 Napoli Noir
// Header, Donos, Footer, WhatsAppFab

import { useState, useEffect } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { LOJA, TEXTOS, TEMA_ATIVO } from "../../config/loja";
import { useWhatsApp } from "../hooks/useWhatsApp";

// ── Header ──────────────────────────────────────────────────
export function Header() {
  const [menuAberto, setMenuAberto] = useState(false);
  const { scrollY } = useScroll();
  const bgOpacity = useTransform(scrollY, [0, 100], [0, 1]);
  const { linkGenerico } = useWhatsApp();

  useEffect(() => {
    if (!menuAberto) return;
    const close = () => setMenuAberto(false);
    document.addEventListener("click", close);
    return () => document.removeEventListener("click", close);
  }, [menuAberto]);

  const links = [
    { href: "#cardapio", label: "Cardápio"  },
    { href: "#donos",    label: "Sobre nós" },
    { href: "#contato",  label: "Contato"   },
  ];

  return (
    <header style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 50 }}>
      <motion.div className="glass" style={{
        position: "absolute", inset: 0, opacity: bgOpacity,
      }} />

      <div style={{
        position: "relative", maxWidth: "1280px", margin: "0 auto",
        padding: "0 1.25rem", height: "64px",
        display: "flex", alignItems: "center", justifyContent: "space-between",
      }}>
        {/* Logo + nome */}
        <a href="#" style={{ display: "flex", alignItems: "center", gap: "0.75rem", textDecoration: "none" }}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/images/logo.png" alt={LOJA.nome}
            style={{ height: "38px", width: "auto", objectFit: "contain", flexShrink: 0 }}
            onError={(e) => { e.currentTarget.style.display = "none"; }}
          />
          <div className="hidden sm:block" style={{ width: "1px", height: "26px", background: "rgba(201,149,42,0.25)", flexShrink: 0 }} />
<div className="hidden sm:flex" style={{ flexDirection: "column", lineHeight: 1.1 }}>
  <span style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.05rem", color: "#F5F0E8", letterSpacing: "-0.01em" }}>
    {LOJA.nome}
  </span>
  <span style={{ fontSize: "0.55rem", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.2em", color: "#C9952A", marginTop: "1px" }}>
    O segredo está no tempo e na paixão pelo que fazemos.
  </span>
</div>
        </a>

        {/* Nav desktop */}
        <nav style={{ display: "flex", alignItems: "center", gap: "0.25rem" }}
          className="hidden md:flex">
          {links.map(l => (
            <a key={l.href} href={l.href} style={{
              padding: "0.5rem 1rem", fontSize: "0.875rem", fontWeight: 500,
              color: "rgba(245,240,232,0.6)", borderRadius: "0.625rem",
              textDecoration: "none", transition: "color 0.2s, background 0.2s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "#F5F0E8"; e.currentTarget.style.background = "rgba(255,255,255,0.04)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "rgba(245,240,232,0.6)"; e.currentTarget.style.background = "transparent"; }}>
              {l.label}
            </a>
          ))}
        </nav>

        {/* CTA desktop */}
        <div className="hidden md:flex" style={{ alignItems: "center", gap: "0.75rem" }}>
          {LOJA.instagram && (
            <a href={`https://instagram.com/${LOJA.instagram}`} target="_blank" rel="noopener noreferrer"
              style={{ color: "rgba(245,240,232,0.4)", transition: "color 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.color = "#C9952A"}
              onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,232,0.4)"}
              aria-label="Instagram">
              <svg width="18" height="18" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
              </svg>
            </a>
          )}
          <a href={linkGenerico} target="_blank" rel="noopener noreferrer"
            className="btn-primary" style={{ padding: "0.55rem 1.25rem", fontSize: "0.875rem", borderRadius: "0.75rem" }}>
            Pedir agora
          </a>
        </div>

        {/* Hamburger mobile */}
        <button
          className="md:hidden"
          style={{ padding: "0.5rem", borderRadius: "0.5rem", background: "transparent", border: "none", color: "rgba(245,240,232,0.7)", cursor: "pointer" }}
          onClick={e => { e.stopPropagation(); setMenuAberto(!menuAberto); }}
          aria-label="Menu">
          <svg width="22" height="22" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            {menuAberto
              ? <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
              : <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16"/>
            }
          </svg>
        </button>
      </div>

      {/* Menu mobile */}
      {menuAberto && (
        <motion.div className="glass md:hidden"
          style={{ borderTop: "1px solid rgba(201,149,42,0.12)", padding: "0.75rem 1.25rem 1rem" }}
          initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }}
          onClick={e => e.stopPropagation()}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setMenuAberto(false)}
              style={{ display: "block", padding: "0.75rem 0.75rem", fontSize: "0.9rem", fontWeight: 500, color: "rgba(245,240,232,0.75)", borderRadius: "0.5rem", textDecoration: "none" }}>
              {l.label}
            </a>
          ))}
          <a href={linkGenerico} target="_blank" rel="noopener noreferrer"
            className="btn-primary" style={{ display: "flex", justifyContent: "center", marginTop: "0.75rem", padding: "0.75rem", fontSize: "0.9rem", borderRadius: "0.75rem" }}>
            🛒 Pedir agora
          </a>
        </motion.div>
      )}
    </header>
  );
}


// ── Donos ────────────────────────────────────────────────────
export function Donos() {
  const [imgErr, setImgErr] = useState(false);
  const { linkGenerico } = useWhatsApp();

  return (
    <section id="donos" style={{ padding: "5rem 1.25rem" }}>
      <div style={{ maxWidth: "1100px", margin: "0 auto" }}>
        <motion.div
          style={{
            borderRadius: "2rem", overflow: "hidden", position: "relative",
            background: "linear-gradient(135deg, #141414 0%, #0f0f0f 100%)",
            border: "1px solid rgba(201,149,42,0.15)",
            boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
          }}
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}>

          {/* Brilho dourado de fundo */}
          <div style={{
            position: "absolute", top: 0, right: 0,
            width: "400px", height: "400px", borderRadius: "50%",
            background: "radial-gradient(circle, rgba(201,149,42,0.06) 0%, transparent 70%)",
            transform: "translate(30%,-30%)", pointerEvents: "none",
          }} />

          <div className="flex flex-col lg:grid lg:grid-cols-2 lg:items-center">

            {/* Foto */}
            <motion.div style={{ padding: "2.5rem", display: "flex", justifyContent: "center" }}
              initial={{ opacity: 0, x: -32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.2 }}>
              <div style={{ position: "relative", width: "100%", maxWidth: "360px" }}>
                {/* Moldura dourada */}
                <div style={{
                  position: "absolute", inset: "-3px", borderRadius: "1.5rem",
                  background: "linear-gradient(135deg, rgba(201,149,42,0.4), rgba(201,149,42,0.1), transparent)",
                  padding: "1px",
                }} />
                <div style={{ borderRadius: "1.4rem", overflow: "hidden", aspectRatio: "4/3", background: "#1a1a1a" }}>
                  {!imgErr ? (
                    <Image src="/images/donos.gif" alt="Os donos" fill unoptimized
                      className="object-cover" sizes="360px"
                      onError={() => setImgErr(true)} />
                  ) : (
                    <div style={{
                      height: "100%", minHeight: "240px",
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: "1rem",
                    }}>
                      <span style={{ fontSize: "4rem" }}>📸</span>
                      <p style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.3)", textAlign: "center", padding: "0 1rem" }}>
                        Coloque em <code style={{ color: "#C9952A" }}>public/images/donos.gif</code>
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>

            {/* Texto */}
            <motion.div style={{ padding: "2.5rem 2.5rem 2.5rem 1rem" }}
              className="px-6 pb-10 lg:py-10 lg:pr-10 lg:pl-4"
              initial={{ opacity: 0, x: 32 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7, delay: 0.3 }}>

              <div style={{ marginBottom: "1rem" }}>
                <span className="section-tag">{TEXTOS.sobre.subtitulo}</span>
              </div>

              <h2 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(1.8rem, 4vw, 2.8rem)",
                fontWeight: 900, lineHeight: 1.1,
                color: "#F5F0E8", marginBottom: "1rem",
              }}>
                {TEXTOS.sobre.titulo.split("amor").map((part, i) =>
                  i === 0 ? <span key={i}>{part}<em style={{
                    fontStyle: "italic",
                    background: "linear-gradient(135deg, #E8380D, #F5A623)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>amor</em></span> : <span key={i}>{part}</span>
                )}
              </h2>

              <div className="divider" />

              <p style={{ fontSize: "0.92rem", lineHeight: 1.75, color: "rgba(245,240,232,0.6)", marginBottom: "1rem" }}>
                {TEXTOS.sobre.paragrafo1}
              </p>
              <p style={{ fontSize: "0.92rem", lineHeight: 1.75, color: "rgba(245,240,232,0.6)", marginBottom: "2rem" }}>
                {TEXTOS.sobre.paragrafo2}
              </p>

              <a href={linkGenerico} target="_blank" rel="noopener noreferrer"
                className="btn-primary" style={{ padding: "0.875rem 1.75rem", fontSize: "0.9rem", borderRadius: "0.875rem" }}>
                <WaIcon /> Fazer um pedido agora
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
    <footer id="contato" style={{ background: "#080808", borderTop: "1px solid rgba(201,149,42,0.12)", marginTop: "5rem" }}>
      {/* Barra dourada decorativa */}
      <div style={{ height: "1px", background: "linear-gradient(90deg, transparent, rgba(201,149,42,0.4), transparent)" }} />

      <div style={{ maxWidth: "1280px", margin: "0 auto", padding: "4rem 1.25rem 2rem" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: "3rem", marginBottom: "3rem" }}>

          {/* Marca */}
          <div>
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/images/logo.png" alt={LOJA.nome}
              style={{ height: "40px", width: "auto", marginBottom: "1rem" }}
              onError={e => { e.currentTarget.style.display = "none"; }}
            />
            <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: "#F5F0E8", marginBottom: "0.4rem" }}>
              {LOJA.nome}
            </p>
            <p style={{ fontSize: "0.8rem", color: "rgba(245,240,232,0.4)", lineHeight: 1.6, marginBottom: "1.25rem" }}>
              {LOJA.slogan}
            </p>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              {LOJA.instagram && (
                <a href={`https://instagram.com/${LOJA.instagram}`} target="_blank" rel="noopener noreferrer"
                  style={{ color: "rgba(245,240,232,0.3)", transition: "color 0.2s" }}
                  onMouseEnter={e => e.currentTarget.style.color = "#C9952A"}
                  onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,232,0.3)"}>
                  <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                  </svg>
                </a>
              )}
              <a href={linkGenerico} target="_blank" rel="noopener noreferrer"
                style={{ color: "rgba(245,240,232,0.3)", transition: "color 0.2s" }}
                onMouseEnter={e => e.currentTarget.style.color = "#25D366"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,232,0.3)"}>
                <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Horários */}
          <div>
            <h3 style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "#C9952A", marginBottom: "1.25rem" }}>
              Horários
            </h3>
            <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: "0.6rem" }}>
              {(LOJA.horarios.length > 0 ? LOJA.horarios : [
                { dias: "Terça a Domingo", abre: "07:00", fecha: "23:00", fechado: false },
                { dias: "Segunda-feira",   abre: "",      fecha: "",       fechado: true  },
              ]).map((h, i) => (
                <li key={i} style={{ display: "flex", justifyContent: "space-between", gap: "1rem", fontSize: "0.82rem" }}>
                  <span style={{ color: "rgba(245,240,232,0.5)" }}>{h.dias}</span>
                  <span style={{ fontWeight: 600, color: h.fechado ? "rgba(245,240,232,0.25)" : "#F5F0E8" }}>
                    {h.fechado ? "Fechado" : `${h.abre} – ${h.fecha}`}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h3 style={{ fontSize: "0.7rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "#C9952A", marginBottom: "1.25rem" }}>
              Fale Conosco
            </h3>
            {LOJA.endereco && (
              <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)", marginBottom: "1rem", lineHeight: 1.6 }}>
                📍 {LOJA.endereco}
              </p>
            )}
            <a href={linkGenerico} target="_blank" rel="noopener noreferrer"
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem", fontSize: "0.875rem", fontWeight: 600, color: "#25D366", textDecoration: "none", transition: "opacity 0.2s" }}
              onMouseEnter={e => e.currentTarget.style.opacity = "0.8"}
              onMouseLeave={e => e.currentTarget.style.opacity = "1"}>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
              </svg>
              {LOJA.whatsapp.replace(/^55(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3")}
            </a>
          </div>
        </div>

        {/* Rodapé inferior */}
        <div style={{
          paddingTop: "1.5rem", borderTop: "1px solid rgba(255,255,255,0.05)",
          display: "flex", justifyContent: "center", alignItems: "center",
        }}>
          <p style={{ fontSize: "0.75rem", color: "rgba(245,240,232,0.2)", textAlign: "center" }}>
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
      <svg width="25" height="25" viewBox="0 0 24 24" fill="white">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
      </svg>
    </a>
  );
}

function WaIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}
