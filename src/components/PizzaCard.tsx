// src/components/PizzaCard.tsx
// Cards com suporte a foto real de pizza + zoom hover + animações suaves

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { useWhatsApp } from "../hooks/useWhatsApp";
import { TEMA_ATIVO, type Pizza } from "../../config/loja";

const BADGE_MAP = {
  "mais-pedido": { label: "🔥 Mais Pedido", cls: "badge-red"   },
  novidade:      { label: "✨ Novidade",     cls: "badge-gold"  },
  vegana:        { label: "🌱 Vegana",       cls: "badge-green" },
  chef:          { label: "👨‍🍳 Chef",         cls: "badge-gold"  },
} as const;

const TAMANHOS = [
  { key: "P" as const, label: "P", full: "Pequena" },
  { key: "M" as const, label: "M", full: "Média"   },
  { key: "G" as const, label: "G", full: "Grande"  },
];

// Cada pizza pode ter uma foto em public/images/pizzas/{slug}.jpg
// Se não existir, exibe o placeholder com gradiente e emoji
const EMOJI_MAP: Record<string, string> = {
  salgadas: "🍕",
  doces:    "🍫",
};

interface Props { pizza: Pizza; index?: number; }

export default function PizzaCard({ pizza, index = 0 }: Props) {
  const [tamanho, setTamanho] = useState<"P"|"M"|"G">("G");
  const [imgErr,  setImgErr]  = useState(false);
  const { abrirPedido } = useWhatsApp();

  const numStr   = String(pizza.id).padStart(2, "0");
  const isDoce   = pizza.categoria === "doces";
  const imgSlug  = pizza.nome
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");

  return (
    <motion.article
      className="card flex flex-col h-full"
      initial={{ opacity: 0, y: 32 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.055, 0.4), ease: [0.4,0,0.2,1] }}
    >
      {/* ── Foto / Placeholder ── */}
      <div className="card-img" style={{ aspectRatio: "16/9" }}>
        {!imgErr ? (
          <Image
            src={`/images/pizzas/${imgSlug}.jpg`}
            alt={pizza.nome}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
            style={{ objectFit: "cover" }}
            onError={() => setImgErr(true)}
          />
        ) : (
          // Placeholder elegante quando não há foto
          <div style={{
            position: "absolute", inset: 0,
            background: isDoce
              ? "linear-gradient(135deg,#2A1608,#1A0E04)"
              : "linear-gradient(135deg,#1E0A02,#2A1005)",
            display: "flex", flexDirection: "column",
            alignItems: "center", justifyContent: "center", gap: "0.5rem",
          }}>
            <span style={{ fontSize: "2.8rem", lineHeight: 1 }}>
              {EMOJI_MAP[pizza.categoria]}
            </span>
            <span style={{
              fontSize: "0.65rem", fontWeight: 700,
              textTransform: "uppercase", letterSpacing: "0.12em",
              color: "rgba(253,248,240,0.2)",
            }}>
              {pizza.categoria}
            </span>
          </div>
        )}

        {/* Badges flutuando sobre a imagem */}
        {pizza.badges && pizza.badges.length > 0 && (
          <div style={{
            position: "absolute", top: "0.6rem", left: "0.6rem",
            display: "flex", flexWrap: "wrap", gap: "0.35rem",
          }}>
            {pizza.badges.slice(0, 2).map(b => (
              <span key={b} className={`badge ${BADGE_MAP[b].cls}`}>
                {BADGE_MAP[b].label}
              </span>
            ))}
          </div>
        )}
      </div>

      {/* ── Header com número ── */}
      <div className="flex items-center gap-2.5 px-4 py-3"
        style={{ borderBottom: "1px solid rgba(255,255,255,0.05)" }}>
        <span className="pizza-num">{numStr}</span>
        <div className="w-px h-7 flex-shrink-0" style={{ background: "rgba(255,255,255,0.08)" }} />
        <h3 className="font-display font-bold leading-tight flex-1 min-w-0"
          style={{ fontSize: "0.95rem", color: "#FDF8F0" }}>
          {pizza.nome}
        </h3>
      </div>

      {/* ── Descrição ── */}
      <div className="px-4 py-3 flex-1">
        <p className="text-xs leading-relaxed line-clamp-2"
          style={{ color: "rgba(253,248,240,0.5)" }}>
          {pizza.descricao}
        </p>
      </div>

      {/* ── Seletor de tamanho ── */}
      <div className="px-4 pb-3">
        <div className="flex gap-1.5" role="group" aria-label="Selecionar tamanho">
          {TAMANHOS.map(({ key, label, full }) => {
            const ativo = tamanho === key;
            return (
              <button key={key} onClick={() => setTamanho(key)}
                aria-pressed={ativo}
                title={`${full} — R$ ${pizza.precos[key].toFixed(2)}`}
                className="flex-1 py-1.5 rounded-xl text-xs font-bold border transition-all duration-200"
                style={ativo ? {
                  background: TEMA_ATIVO.primaria,
                  borderColor: TEMA_ATIVO.primaria,
                  color: "white",
                  boxShadow: `0 0 12px ${TEMA_ATIVO.glow}`,
                } : {
                  background: "transparent",
                  borderColor: "rgba(255,255,255,0.09)",
                  color: "rgba(253,248,240,0.45)",
                }}>
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ── Preço + CTA ── */}
      <div className="flex items-center justify-between px-4 pb-4 pt-2"
        style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
        <div>
          <div className="price">
            {pizza.precos[tamanho].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </div>
          <div style={{ fontSize: "0.65rem", marginTop: "0.2rem", color: "rgba(253,248,240,0.32)" }}>
            {tamanho === "P" ? "Pequena" : tamanho === "M" ? "Média" : "Grande"}
          </div>
        </div>

        <button
          onClick={() => abrirPedido({
            pizzaId:   pizza.id,
            pizzaNome: pizza.nome,
            tamanho:   tamanho === "P" ? "Pequena" : tamanho === "M" ? "Média" : "Grande",
            preco:     pizza.precos[tamanho],
          })}
          className="btn-primary px-4 py-2.5 text-xs rounded-xl gap-1.5"
          style={{ background: TEMA_ATIVO.primaria }}
        >
          <WaIcon /> Pedir
        </button>
      </div>
    </motion.article>
  );
}

function WaIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}
