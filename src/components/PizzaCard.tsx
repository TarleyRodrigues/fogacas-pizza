// src/components/PizzaCard.tsx — v5 com carrinho
import { useState } from "react";
import { motion } from "framer-motion";
import { TEMA_ATIVO, type Pizza } from "../../config/loja";
import { useCarrinho, type TamanhoKey } from "../hooks/useCarrinho";

const BADGE_MAP = {
  "mais-pedido": { label: "🔥 Mais Pedido", cls: "badge-red"   },
  novidade:      { label: "✨ Novidade",     cls: "badge-gold"  },
  vegana:        { label: "🌱 Vegana",       cls: "badge-green" },
  chef:          { label: "👨‍🍳 Chef",         cls: "badge-gold"  },
} as const;

const TAMANHOS: { key: TamanhoKey; label: string; full: string }[] = [
  { key: "P", label: "P", full: "Pequena" },
  { key: "M", label: "M", full: "Média"   },
  { key: "G", label: "G", full: "Grande"  },
];

interface Props { pizza: Pizza; index?: number; }

export default function PizzaCard({ pizza, index = 0 }: Props) {
  const [tamanho,   setTamanho]   = useState<TamanhoKey>("G");
  const [imgErr,    setImgErr]    = useState(false);
  const [adicionado,setAdicionado] = useState(false);
  const { adicionarInteira } = useCarrinho();

  const isDoce  = pizza.categoria === "doces";
  const numStr  = String(pizza.id).padStart(2, "0");
  const imgSlug = pizza.nome
    .toLowerCase()
    .normalize("NFD").replace(/[\u0300-\u036f]/g,"")
    .replace(/[^a-z0-9]+/g,"-").replace(/^-|-$/g,"");

  const handleAdicionar = () => {
    adicionarInteira({
      pizzaId:   pizza.id,
      pizzaNome: pizza.nome,
      tamanho,
      preco:     pizza.precos[tamanho],
    });
    setAdicionado(true);
    setTimeout(() => setAdicionado(false), 1800);
  };

  return (
    <motion.article className="card flex flex-col h-full"
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-40px" }}
      transition={{ duration: 0.5, delay: Math.min(index * 0.055, 0.35) }}>

      {/* Imagem */}
      <div className="card-img">
        {!imgErr ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={`/images/pizzas/${imgSlug}.jpg`} alt={pizza.nome}
            onError={() => setImgErr(true)}
            style={{ width: "100%", height: "100%", objectFit: "cover" }}
          />
        ) : (
          <div style={{
            position: "absolute", inset: 0,
            background: isDoce ? "linear-gradient(160deg,#1A0E08,#0F0804)" : "linear-gradient(160deg,#180A02,#0A0502)",
            display: "flex", alignItems: "center", justifyContent: "center",
          }}>
            <span style={{ fontSize: "3rem", filter: "drop-shadow(0 0 12px rgba(201,149,42,0.3))" }}>
              {isDoce ? "🍫" : "🍕"}
            </span>
          </div>
        )}

        {/* Gradiente inferior */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, height: "60%",
          background: "linear-gradient(to top, rgba(10,10,10,0.97) 0%, transparent 100%)",
          pointerEvents: "none",
        }} />

        {/* Número + nome sobre a imagem */}
        <div style={{ position: "absolute", bottom: "0.75rem", left: "0.75rem", right: "0.75rem", display: "flex", alignItems: "flex-end", gap: "0.5rem" }}>
          <span className="pizza-num" style={{ fontSize: "2rem", flexShrink: 0 }}>{numStr}</span>
          <h3 style={{
            fontFamily: "'Playfair Display', serif", fontWeight: 700,
            fontSize: "0.95rem", color: "rgba(245,240,232,0.92)", lineHeight: 1.2,
            paddingBottom: "2px",
          }}>
            {pizza.nome}
          </h3>
        </div>

        {/* Badges */}
        {pizza.badges && pizza.badges.length > 0 && (
          <div style={{ position: "absolute", top: "0.6rem", left: "0.6rem", display: "flex", gap: "0.3rem", flexWrap: "wrap" }}>
            {pizza.badges.slice(0,2).map(b => (
              <span key={b} className={`badge ${BADGE_MAP[b].cls}`}>{BADGE_MAP[b].label}</span>
            ))}
          </div>
        )}
      </div>

      {/* Corpo */}
      <div style={{ display: "flex", flexDirection: "column", flex: 1, padding: "0.875rem 1rem 1rem", gap: "0.75rem" }}>

        {/* Descrição */}
        {pizza.descricao && (
          <p style={{ fontSize: "0.75rem", lineHeight: 1.6, color: "rgba(245,240,232,0.45)", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical", overflow: "hidden", flex: 1 }}>
            {pizza.descricao}
          </p>
        )}

        <div style={{ height: "1px", background: "linear-gradient(90deg, rgba(201,149,42,0.25), transparent)" }} />

        {/* Tamanhos */}
        <div style={{ display: "flex", gap: "0.375rem" }}>
          {TAMANHOS.map(({ key, label, full }) => {
            const ativo = tamanho === key;
            return (
              <button key={key} onClick={() => setTamanho(key)}
                title={`${full} — R$ ${pizza.precos[key].toFixed(2)}`}
                style={{
                  flex: 1, padding: "0.4rem 0", borderRadius: "0.5rem",
                  fontSize: "0.75rem", fontWeight: 700, letterSpacing: "0.05em",
                  border: ativo ? "none" : "1px solid rgba(255,255,255,0.07)",
                  background: ativo ? `linear-gradient(135deg, ${TEMA_ATIVO.primaria}, #C42D08)` : "rgba(255,255,255,0.03)",
                  color: ativo ? "white" : "rgba(245,240,232,0.38)",
                  boxShadow: ativo ? `0 3px 12px ${TEMA_ATIVO.glow}` : "none",
                  cursor: "pointer", transition: "all 0.18s",
                }}>
                {label}
              </button>
            );
          })}
        </div>

        {/* Preço + Adicionar ao carrinho */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <div className="price">
              {pizza.precos[tamanho].toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
            </div>
            <div style={{ fontSize: "0.62rem", color: "rgba(245,240,232,0.28)", marginTop: "1px", textTransform: "uppercase", letterSpacing: "0.06em" }}>
              {tamanho === "P" ? "Pequena" : tamanho === "M" ? "Média" : "Grande"}
            </div>
          </div>

          <motion.button
            onClick={handleAdicionar}
            animate={adicionado ? { scale: [1, 0.9, 1.05, 1] } : {}}
            transition={{ duration: 0.35 }}
            style={{
              display: "inline-flex", alignItems: "center", gap: "0.35rem",
              padding: "0.6rem 1rem", borderRadius: "0.75rem",
              background: adicionado
                ? "linear-gradient(135deg, #16a34a, #15803d)"
                : `linear-gradient(135deg, ${TEMA_ATIVO.primaria}, #C42D08)`,
              color: "white", border: "none", cursor: "pointer",
              fontSize: "0.78rem", fontWeight: 700,
              boxShadow: adicionado ? "0 4px 16px rgba(22,163,74,0.4)" : `0 4px 16px ${TEMA_ATIVO.glow}`,
              transition: "background 0.3s, box-shadow 0.3s",
            }}>
            {adicionado ? (
              <><CheckIcon /> Adicionado!</>
            ) : (
              <><CartIcon /> Adicionar</>
            )}
          </motion.button>
        </div>
      </div>
    </motion.article>
  );
}

function CartIcon() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6h13M9 19a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z"/>
    </svg>
  );
}

function CheckIcon() {
  return (
    <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7"/>
    </svg>
  );
}
