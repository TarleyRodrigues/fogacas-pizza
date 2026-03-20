// src/components/Cardapio.tsx
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PizzaCard from "./PizzaCard";
import { CATEGORIAS, LOJA, PRECOS_BASE, TEMA_ATIVO } from "../../config/loja";
import { usePizzas } from "../hooks/usePizzas";
import { useWhatsApp } from "../hooks/useWhatsApp";

export default function Cardapio() {
  const { pizzas, loading } = usePizzas();
  const { linkGenerico }    = useWhatsApp();
  const [catAtiva,   setCatAtiva]   = useState<string>("todas");
  const [busca,      setBusca]      = useState("");

  const filtradas = useMemo(() => {
    return pizzas.filter(p => {
      const matchCat   = catAtiva === "todas" || p.categoria === catAtiva;
      const matchBusca = !busca.trim() ||
        p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        p.descricao.toLowerCase().includes(busca.toLowerCase()) ||
        String(p.id).includes(busca.trim());
      return matchCat && matchBusca;
    });
  }, [pizzas, catAtiva, busca]);

  return (
    <section id="cardapio" className="py-16 px-4 max-w-7xl mx-auto">

      {/* Cabeçalho */}
      <motion.div className="text-center mb-10"
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <p className="text-sm font-bold uppercase tracking-widest mb-3"
          style={{ color: TEMA_ATIVO.primaria }}>
          Nosso Cardápio
        </p>
        <h2 className="font-display text-4xl md:text-5xl font-bold"
          style={{ color: "#FDF8F0" }}>
          Escolha sua{" "}
          <em className="text-grad not-italic">favorita</em>
        </h2>
        <div className="divider mx-auto" />

        {/* Tabela de preços */}
        <div className="inline-flex gap-6 px-6 py-3 rounded-2xl mt-2"
          style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.07)" }}>
          {[
            { tam: "Pequena", preco: PRECOS_BASE.P },
            { tam: "Média",   preco: PRECOS_BASE.M },
            { tam: "Grande",  preco: PRECOS_BASE.G },
          ].map(t => (
            <div key={t.tam} className="text-center">
              <div className="font-display font-bold text-lg leading-none"
                style={{ color: TEMA_ATIVO.secundaria }}>
                {t.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
              </div>
              <div className="text-xs mt-0.5 uppercase tracking-wider"
                style={{ color: "rgba(253,248,240,0.4)" }}>
                {t.tam}
              </div>
            </div>
          ))}
        </div>
      </motion.div>

      {/* Banner Bordas Especiais */}
      <motion.div
        className="mb-8 px-5 py-4 rounded-2xl flex flex-col sm:flex-row items-center gap-3 text-center sm:text-left"
        style={{
          background: `linear-gradient(135deg, ${TEMA_ATIVO.primaria}12, ${TEMA_ATIVO.secundaria}08)`,
          border: `1px solid ${TEMA_ATIVO.primaria}30`,
        }}
        initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}>
        <span className="text-2xl flex-shrink-0">✨</span>
        <div>
          <p className="text-xs font-bold uppercase tracking-widest mb-1"
            style={{ color: TEMA_ATIVO.primaria }}>Borda Especial</p>
          <p className="text-sm" style={{ color: "rgba(253,248,240,0.7)" }}>
            Disponível nos sabores{" "}
            {LOJA.bordas.map((b, i) => (
              <span key={b}>
                <span className="font-semibold" style={{ color: TEMA_ATIVO.secundaria }}>{b}</span>
                {i < LOJA.bordas.length - 1 && <span style={{ color: "rgba(253,248,240,0.35)" }}> ou </span>}
              </span>
            ))}.{" "}
            <span style={{ color: "rgba(253,248,240,0.4)" }}>Informe ao fazer o pedido.</span>
          </p>
        </div>
      </motion.div>

      {/* Busca */}
      <div className="relative max-w-md mx-auto mb-6">
        <svg className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4"
          style={{ color: "rgba(253,248,240,0.35)" }}
          fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <circle cx={11} cy={11} r={8} /><path d="m21 21-4.35-4.35" />
        </svg>
        <input type="search" placeholder="Buscar pelo nome ou número..."
          value={busca} onChange={e => setBusca(e.target.value)}
          className="w-full pl-10 pr-4 py-3 text-sm rounded-2xl focus:outline-none transition-colors"
          style={{
            background: "rgba(255,255,255,0.05)",
            border: "1px solid rgba(255,255,255,0.1)",
            color: "#FDF8F0",
          }}
          onFocus={e => e.target.style.borderColor = TEMA_ATIVO.primaria + "80"}
          onBlur={e  => e.target.style.borderColor = "rgba(255,255,255,0.1)"}
        />
      </div>

      {/* Filtros de categoria */}
      <div className="flex gap-2 overflow-x-auto pb-3 mb-8 scrollbar-hide -mx-4 px-4">
        <button className={`pill flex-shrink-0 ${catAtiva === "todas" ? "active" : ""}`}
          onClick={() => setCatAtiva("todas")}>
          Todas ({pizzas.length})
        </button>
        {CATEGORIAS.map(cat => (
          <button key={cat.id}
            className={`pill flex-shrink-0 ${catAtiva === cat.id ? "active" : ""}`}
            onClick={() => setCatAtiva(cat.id)}>
            <span className="mr-1">{cat.emoji}</span>
            {cat.nome} ({pizzas.filter(p => p.categoria === cat.id).length})
          </button>
        ))}
      </div>

      {/* Grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="skeleton h-64" />
          ))}
        </div>
      ) : (
        <AnimatePresence mode="wait">
          {filtradas.length > 0 ? (
            <motion.div key={catAtiva + busca}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}>
              {filtradas.map((p, i) => <PizzaCard key={p.id} pizza={p} index={i} />)}
            </motion.div>
          ) : (
            <motion.div key="empty" className="text-center py-20"
              initial={{ opacity: 0 }} animate={{ opacity: 0.4 }}>
              <div className="text-6xl mb-4">🔍</div>
              <p className="font-display text-xl">Nenhuma pizza encontrada</p>
            </motion.div>
          )}
        </AnimatePresence>
      )}

      {/* CTA final */}
      <motion.div className="text-center mt-14 p-8 rounded-3xl"
        style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
        initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }} transition={{ duration: 0.6 }}>
        <p className="font-display text-2xl mb-2">Pronto para pedir?</p>
        <p className="text-sm mb-5" style={{ color: "rgba(253,248,240,0.55)" }}>
          Escolha pelo número e mande mensagem — é rápido e fácil! 🍕
        </p>
        <a href={linkGenerico} target="_blank" rel="noopener noreferrer"
          className="btn-primary px-7 py-3.5 text-sm rounded-2xl"
          style={{ background: TEMA_ATIVO.primaria }}>
          <WaIcon /> Fazer pedido pelo WhatsApp
        </a>
      </motion.div>
    </section>
  );
}

function WaIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
    </svg>
  );
}
