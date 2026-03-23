// src/components/Cardapio.tsx — v4 Napoli Noir
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PizzaCard from "./PizzaCard";
import { CATEGORIAS, LOJA, PRECOS_BASE, TEMA_ATIVO } from "../../config/loja";
import { usePizzas } from "../hooks/usePizzas";
import { useWhatsApp } from "../hooks/useWhatsApp";

export default function Cardapio() {
  const { pizzas, loading } = usePizzas();
  const { linkGenerico }    = useWhatsApp();
  const [catAtiva, setCatAtiva] = useState<string>("todas");
  const [busca,    setBusca   ] = useState("");

  const filtradas = useMemo(() => pizzas.filter(p => {
    const matchCat   = catAtiva === "todas" || p.categoria === catAtiva;
    const matchBusca = !busca.trim() ||
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      p.descricao.toLowerCase().includes(busca.toLowerCase()) ||
      String(p.id).includes(busca.trim());
    return matchCat && matchBusca;
  }), [pizzas, catAtiva, busca]);

  return (
    <section id="cardapio" style={{ padding: "5rem 1.25rem 4rem", maxWidth: "1280px", margin: "0 auto" }}>

      {/* ── Cabeçalho ── */}
      <motion.div style={{ textAlign: "center", marginBottom: "3rem" }}
        initial={{ opacity: 0, y: 28 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.65 }}>

        <div style={{ marginBottom: "1.25rem" }}>
          <span className="section-tag">Nosso Cardápio</span>
        </div>

        <h2 style={{
          fontFamily: "'Playfair Display', serif",
          fontSize: "clamp(2.2rem, 6vw, 3.5rem)",
          fontWeight: 900, color: "#F5F0E8",
          lineHeight: 1.1, marginBottom: "0.5rem",
        }}>
          Escolha sua{" "}
          <em style={{
            fontStyle: "italic",
            background: "linear-gradient(135deg, #E8380D, #F5A623)",
            WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
            backgroundClip: "text",
          }}>favorita</em>
        </h2>

        <div className="divider" style={{ margin: "1rem auto 1.5rem" }} />

        {/* Tabela de preços elegante */}
        <div style={{
          display: "inline-flex", gap: "0", borderRadius: "1rem", overflow: "hidden",
          border: "1px solid rgba(201,149,42,0.2)",
          background: "rgba(201,149,42,0.04)",
        }}>
          {[
            { tam: "Pequena", preco: PRECOS_BASE.P },
            { tam: "Média",   preco: PRECOS_BASE.M },
            { tam: "Grande",  preco: PRECOS_BASE.G },
          ].map((t, i) => (
            <div key={t.tam} style={{
              padding: "0.75rem 1.5rem", textAlign: "center",
              borderRight: i < 2 ? "1px solid rgba(201,149,42,0.15)" : "none",
            }}>
              <div style={{
                fontFamily: "'Playfair Display', serif", fontWeight: 700,
                fontSize: "1.2rem", lineHeight: 1,
                background: "linear-gradient(135deg, #F0C060, #C9952A)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}>
                {t.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <div style={{ fontSize: "0.62rem", color: "rgba(245,240,232,0.35)", marginTop: "0.25rem", textTransform: "uppercase", letterSpacing: "0.14em" }}>
                {t.tam}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* ── Banner Bordas Especiais ── */}
      <motion.div
        style={{
          marginBottom: "2rem", padding: "1rem 1.25rem",
          borderRadius: "1rem", display: "flex", alignItems: "center", gap: "1rem",
          background: "linear-gradient(135deg, rgba(232,56,13,0.07), rgba(201,149,42,0.05))",
          border: "1px solid rgba(201,149,42,0.18)",
        }}
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}>
        <span style={{ fontSize: "1.5rem", flexShrink: 0 }}>✨</span>
        <div>
          <p style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "#C9952A", marginBottom: "0.2rem" }}>
            Borda Especial
          </p>
          <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.65)" }}>
            {LOJA.bordas.map((b, i) => (
              <span key={b}>
                <span style={{ color: "#F0C060", fontWeight: 600 }}>{b}</span>
                {i < LOJA.bordas.length - 1 && <span style={{ color: "rgba(245,240,232,0.3)" }}> ou </span>}
              </span>
            ))}
            <span style={{ color: "rgba(245,240,232,0.38)" }}> — informe ao pedir</span>
          </p>
        </div>
      </motion.div>

      {/* ── Busca ── */}
      <div style={{ position: "relative", maxWidth: "420px", margin: "0 auto 1.5rem" }}>
        <svg style={{ position: "absolute", left: "1rem", top: "50%", transform: "translateY(-50%)", color: "rgba(201,149,42,0.5)", pointerEvents: "none" }}
          width="16" height="16" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx={11} cy={11} r={8}/><path d="m21 21-4.35-4.35"/>
        </svg>
        <input type="search" placeholder="Buscar pelo nome ou número..."
          value={busca} onChange={e => setBusca(e.target.value)}
          style={{
            width: "100%", paddingLeft: "2.75rem", paddingRight: "1rem",
            paddingTop: "0.75rem", paddingBottom: "0.75rem",
            background: "rgba(255,255,255,0.04)", color: "#F5F0E8",
            border: "1px solid rgba(201,149,42,0.15)", borderRadius: "0.875rem",
            fontSize: "0.875rem", outline: "none",
            transition: "border-color 0.2s",
          }}
          onFocus={e => e.target.style.borderColor = "rgba(201,149,42,0.45)"}
          onBlur={e  => e.target.style.borderColor = "rgba(201,149,42,0.15)"}
        />
      </div>

      {/* ── Filtros ── */}
      <div className="scrollbar-hide" style={{
        display: "flex", gap: "0.5rem", overflowX: "auto",
        paddingBottom: "0.75rem", marginBottom: "2rem",
        margin: "0 -1.25rem 2rem", padding: "0 1.25rem 0.75rem",
      }}>
        <button className={`pill flex-shrink-0 ${catAtiva === "todas" ? "active" : ""}`}
          onClick={() => setCatAtiva("todas")}>
          Todas ({pizzas.length})
        </button>
        {CATEGORIAS.map(cat => (
          <button key={cat.id}
            className={`pill flex-shrink-0 ${catAtiva === cat.id ? "active" : ""}`}
            onClick={() => setCatAtiva(cat.id)}>
            {cat.emoji} {cat.nome} ({pizzas.filter(p => p.categoria === cat.id).length})
          </button>
        ))}
      </div>

      {/* ── Grid ── */}
      {loading ? (
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}>
          {Array.from({ length: 6 }).map((_, i) => <div key={i} className="skeleton" style={{ height: "320px" }} />)}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {filtradas.length > 0 ? (
            <motion.div key={catAtiva + busca}
              style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: "1.25rem" }}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}>
              {filtradas.map((p, i) => <PizzaCard key={p.id} pizza={p} index={i} />)}
            </motion.div>
          ) : (
            <motion.div key="empty" style={{ textAlign: "center", padding: "5rem 0", opacity: 0.35 }}
              initial={{ opacity: 0 }} animate={{ opacity: 0.35 }}>
              <div style={{ fontSize: "3.5rem", marginBottom: "1rem" }}>🔍</div>
              <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.3rem" }}>Nenhuma pizza encontrada</p>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* ── CTA final ── */}
      <motion.div
        style={{
          textAlign: "center", marginTop: "4rem", padding: "3rem 2rem",
          borderRadius: "1.5rem", position: "relative", overflow: "hidden",
          background: "linear-gradient(135deg, rgba(232,56,13,0.06), rgba(201,149,42,0.04))",
          border: "1px solid rgba(201,149,42,0.15)",
        }}
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}>
        {/* Glow de fundo */}
        <div style={{
          position: "absolute", top: "50%", left: "50%",
          transform: "translate(-50%,-50%)",
          width: "300px", height: "200px", borderRadius: "50%",
          background: "radial-gradient(circle, rgba(232,56,13,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
        }} />
        <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.5rem", fontWeight: 700, color: "#F5F0E8", marginBottom: "0.5rem" }}>
          Pronto para pedir?
        </p>
        <p style={{ fontSize: "0.875rem", color: "rgba(245,240,232,0.5)", marginBottom: "1.5rem" }}>
          Escolha pelo número e mande mensagem — rápido e fácil 🍕
        </p>
        <a href={linkGenerico} target="_blank" rel="noopener noreferrer"
          className="btn-primary" style={{ padding: "0.875rem 2rem", fontSize: "0.9rem", borderRadius: "0.875rem" }}>
          <WaIcon /> Fazer pedido pelo WhatsApp
        </a>
      </motion.div>
    </section>
  );
}

function WaIcon() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}
