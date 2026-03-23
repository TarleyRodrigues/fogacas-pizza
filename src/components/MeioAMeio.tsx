// src/components/MeioAMeio.tsx
import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CARDAPIO, PRECOS_BASE } from "../../config/loja";
import { useCarrinho, type TamanhoKey } from "../hooks/useCarrinho";

interface Props { aberto: boolean; fechar: () => void; }

const TAMANHOS: { key: TamanhoKey; label: string; full: string }[] = [
  { key: "P", label: "P", full: "Pequena" },
  { key: "M", label: "M", full: "Média"   },
  { key: "G", label: "G", full: "Grande"  },
];

export default function MeioAMeio({ aberto, fechar }: Props) {
  const { adicionarMeioMeio } = useCarrinho();

  const [busca1,  setBusca1]  = useState("");
  const [busca2,  setBusca2]  = useState("");
  const [metade1, setMetade1] = useState<number | null>(null);
  const [metade2, setMetade2] = useState<number | null>(null);
  const [tamanho, setTamanho] = useState<TamanhoKey>("G");
  const [borda,   setBorda]   = useState("");
  const [etapa,   setEtapa]   = useState<1 | 2 | 3>(1);

  const pizzasSalgadas = useMemo(() => CARDAPIO.filter(p => p.ativo && p.categoria === "salgadas"), []);
  const pizzasDoces    = useMemo(() => CARDAPIO.filter(p => p.ativo && p.categoria === "doces"),    []);

  const filtrar = (lista: typeof CARDAPIO, busca: string) =>
    !busca.trim() ? lista : lista.filter(p =>
      p.nome.toLowerCase().includes(busca.toLowerCase()) ||
      String(p.id).includes(busca.trim())
    );

  const pizza1 = metade1 ? CARDAPIO.find(p => p.id === metade1) : null;
  const pizza2 = metade2 ? CARDAPIO.find(p => p.id === metade2) : null;

  const preco = useMemo(() => {
    if (!pizza1 || !pizza2) return PRECOS_BASE[tamanho];
    return Math.max(pizza1.precos[tamanho], pizza2.precos[tamanho]);
  }, [pizza1, pizza2, tamanho]);

  const handleAdicionar = () => {
    if (!pizza1 || !pizza2) return;
    adicionarMeioMeio({
      metade1Id: pizza1.id, metade1Nome: pizza1.nome,
      metade2Id: pizza2.id, metade2Nome: pizza2.nome,
      tamanho, preco, borda: borda || undefined,
    });
    setMetade1(null); setMetade2(null);
    setBusca1(""); setBusca2("");
    setBorda(""); setEtapa(1);
    fechar();
  };

  const reset = () => {
    setMetade1(null); setMetade2(null);
    setBusca1(""); setBusca2("");
    setBorda(""); setEtapa(1);
    fechar();
  };

  return (
    <AnimatePresence>
      {aberto && (
        <>
          {/* Backdrop */}
          <motion.div key="bd" onClick={reset}
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            style={{ position: "fixed", inset: 0, zIndex: 400, background: "rgba(0,0,0,0.85)", backdropFilter: "blur(6px)" }}
          />

          {/* Container centralizador — sem depender de transform do Framer */}
          <div style={{
            position: "fixed", inset: 0, zIndex: 401,
            display: "flex", alignItems: "center", justifyContent: "center",
            padding: "1rem",
            pointerEvents: "none",
          }}>
            <motion.div key="modal"
              initial={{ opacity: 0, scale: 0.93, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.93, y: 24 }}
              transition={{ type: "spring", stiffness: 350, damping: 32 }}
              style={{
                pointerEvents: "all",
                width: "100%",
                maxWidth: "680px",
                maxHeight: "calc(100dvh - 2rem)",
                background: "#0f0f0f",
                border: "1px solid rgba(201,149,42,0.2)",
                borderRadius: "1.5rem",
                display: "flex",
                flexDirection: "column",
                boxShadow: "0 32px 80px rgba(0,0,0,0.7)",
                overflow: "hidden",
              }}>

              {/* Header */}
              <div style={{
                padding: "1.1rem 1.25rem",
                borderBottom: "1px solid rgba(201,149,42,0.1)",
                background: "linear-gradient(135deg, rgba(201,149,42,0.06), transparent)",
                display: "flex", alignItems: "center", justifyContent: "space-between",
                flexShrink: 0,
              }}>
                <div>
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.1rem", color: "#F5F0E8" }}>
                    🍕 Monte seu Meio a Meio
                  </h2>
                  <p style={{ fontSize: "0.72rem", color: "rgba(201,149,42,0.8)", marginTop: "2px" }}>
                    {etapa === 1 ? "Escolha o 1º sabor" : etapa === 2 ? "Escolha o 2º sabor" : "Confirme seu pedido"}
                  </p>
                </div>
                <button onClick={reset} style={{
                  background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                  borderRadius: "50%", width: "2rem", height: "2rem",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  cursor: "pointer", color: "rgba(245,240,232,0.6)", flexShrink: 0,
                }}>
                  <svg width="13" height="13" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                  </svg>
                </button>
              </div>

              {/* Progresso */}
              <div style={{ display: "flex", padding: "0.75rem 1.25rem 0", gap: "0.4rem", flexShrink: 0 }}>
                {[1,2,3].map(n => (
                  <div key={n} style={{
                    flex: 1, height: "3px", borderRadius: "9999px",
                    background: n <= etapa ? "linear-gradient(90deg, #E8380D, #F5A623)" : "rgba(255,255,255,0.08)",
                    transition: "background 0.3s",
                  }} />
                ))}
              </div>

              {/* Conteúdo rolável */}
              <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.25rem", WebkitOverflowScrolling: "touch" } as React.CSSProperties}>

                {(etapa === 1 || etapa === 2) && (
                  <>
                    <input
                      type="search"
                      placeholder={`Buscar ${etapa === 1 ? "1º" : "2º"} sabor...`}
                      value={etapa === 1 ? busca1 : busca2}
                      onChange={e => etapa === 1 ? setBusca1(e.target.value) : setBusca2(e.target.value)}
                      autoFocus
                      style={{
                        width: "100%", padding: "0.7rem 1rem", marginBottom: "0.875rem",
                        background: "rgba(255,255,255,0.05)", color: "#F5F0E8",
                        border: "1px solid rgba(201,149,42,0.2)", borderRadius: "0.75rem",
                        fontSize: "0.875rem", outline: "none",
                      }}
                      onFocus={e => e.target.style.borderColor = "rgba(201,149,42,0.5)"}
                      onBlur={e  => e.target.style.borderColor = "rgba(201,149,42,0.2)"}
                    />

                    {(["salgadas", "doces"] as const).map(cat => {
                      const base  = cat === "salgadas" ? pizzasSalgadas : pizzasDoces;
                      const lista = filtrar(base, etapa === 1 ? busca1 : busca2);
                      if (lista.length === 0) return null;
                      return (
                        <div key={cat} style={{ marginBottom: "1rem" }}>
                          <p style={{ fontSize: "0.62rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.18em", color: "#C9952A", marginBottom: "0.5rem" }}>
                            {cat === "salgadas" ? "🍕 Salgadas" : "🍫 Doces"}
                          </p>
                          <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
                            {lista.map(p => {
                              const selecionado = etapa === 1 ? metade1 === p.id : metade2 === p.id;
                              const bloqueado   = etapa === 2 && metade1 === p.id;
                              return (
                                <button key={p.id}
                                  onClick={() => {
                                    if (bloqueado) return;
                                    if (etapa === 1) { setMetade1(p.id); setEtapa(2); }
                                    else             { setMetade2(p.id); setEtapa(3); }
                                  }}
                                  disabled={bloqueado}
                                  style={{
                                    display: "flex", alignItems: "center", gap: "0.65rem",
                                    padding: "0.65rem 0.875rem", borderRadius: "0.75rem",
                                    background: selecionado ? "rgba(232,56,13,0.12)" : bloqueado ? "rgba(255,255,255,0.02)" : "rgba(255,255,255,0.03)",
                                    border: `1px solid ${selecionado ? "rgba(232,56,13,0.4)" : bloqueado ? "rgba(255,255,255,0.04)" : "rgba(255,255,255,0.06)"}`,
                                    cursor: bloqueado ? "not-allowed" : "pointer",
                                    opacity: bloqueado ? 0.4 : 1,
                                    textAlign: "left", width: "100%",
                                  }}>
                                  <span style={{
                                    fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "0.95rem", minWidth: "1.8rem",
                                    background: "linear-gradient(135deg, #F0C060, #C9952A)",
                                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                                  }}>
                                    {String(p.id).padStart(2,"0")}
                                  </span>
                                  <div style={{ flex: 1, minWidth: 0 }}>
                                    <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "1px" }}>{p.nome}</p>
                                    <p style={{ fontSize: "0.68rem", color: "rgba(245,240,232,0.38)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.descricao}</p>
                                  </div>
                                  {selecionado && (
                                    <svg width="15" height="15" fill="#E8380D" viewBox="0 0 20 20" style={{ flexShrink: 0 }}>
                                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd"/>
                                    </svg>
                                  )}
                                  {bloqueado && <span style={{ fontSize: "0.58rem", color: "rgba(245,240,232,0.28)", flexShrink: 0 }}>1ª metade</span>}
                                </button>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </>
                )}

                {etapa === 3 && pizza1 && pizza2 && (
                  <div>
                    {/* Visualização meio a meio */}
                    <div style={{ display: "flex", borderRadius: "1rem", overflow: "hidden", border: "1px solid rgba(201,149,42,0.2)", marginBottom: "1.25rem" }}>
                      {[pizza1, pizza2].map((p, i) => (
                        <div key={p.id} style={{
                          flex: 1, padding: "1rem", textAlign: "center",
                          background: i === 0 ? "rgba(232,56,13,0.06)" : "rgba(201,149,42,0.06)",
                          borderRight: i === 0 ? "1px dashed rgba(201,149,42,0.2)" : "none",
                        }}>
                          <p style={{ fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: i === 0 ? "#E8380D" : "#C9952A", marginBottom: "0.4rem" }}>
                            {i === 0 ? "1ª Metade" : "2ª Metade"}
                          </p>
                          <p style={{ fontFamily: "'Playfair Display', serif", fontWeight: 900, fontSize: "1.4rem", background: "linear-gradient(135deg, #F0C060, #C9952A)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text", marginBottom: "0.2rem" }}>
                            {String(p.id).padStart(2,"0")}
                          </p>
                          <p style={{ fontSize: "0.82rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.4rem" }}>{p.nome}</p>
                          <button onClick={() => { if (i === 0) { setMetade1(null); setEtapa(1); } else { setMetade2(null); setEtapa(2); } }}
                            style={{ background: "none", border: "none", fontSize: "0.65rem", color: "rgba(245,240,232,0.35)", cursor: "pointer", textDecoration: "underline" }}>
                            Trocar
                          </button>
                        </div>
                      ))}
                    </div>

                    {/* Tamanho */}
                    <div style={{ marginBottom: "1rem" }}>
                      <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#C9952A", marginBottom: "0.5rem" }}>Tamanho</p>
                      <div style={{ display: "flex", gap: "0.4rem" }}>
                        {TAMANHOS.map(t => (
                          <button key={t.key} onClick={() => setTamanho(t.key)} style={{
                            flex: 1, padding: "0.65rem 0.25rem", borderRadius: "0.75rem",
                            background: tamanho === t.key ? "linear-gradient(135deg, #E8380D, #C42D08)" : "rgba(255,255,255,0.04)",
                            border: `1px solid ${tamanho === t.key ? "transparent" : "rgba(255,255,255,0.08)"}`,
                            color: tamanho === t.key ? "white" : "rgba(245,240,232,0.5)",
                            cursor: "pointer", fontWeight: 700, fontSize: "0.82rem",
                            boxShadow: tamanho === t.key ? "0 4px 16px rgba(232,56,13,0.3)" : "none",
                            transition: "all 0.2s",
                          }}>
                            <div>{t.label}</div>
                            <div style={{ fontSize: "0.65rem", fontWeight: 400, marginTop: "2px" }}>
                              {Math.max(pizza1.precos[t.key], pizza2.precos[t.key]).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                            </div>
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Borda */}
                    <div style={{ marginBottom: "1rem" }}>
                      <p style={{ fontSize: "0.68rem", fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.15em", color: "#C9952A", marginBottom: "0.5rem" }}>Borda Especial (opcional)</p>
                      <div style={{ display: "flex", gap: "0.4rem", flexWrap: "wrap" }}>
                        {["Sem borda", "Cheddar", "Catupiry"].map(b => (
                          <button key={b} onClick={() => setBorda(b === "Sem borda" ? "" : b)} style={{
                            padding: "0.45rem 0.9rem", borderRadius: "9999px",
                            background: (b === "Sem borda" ? !borda : borda === b) ? "linear-gradient(135deg, #E8380D, #C42D08)" : "rgba(255,255,255,0.04)",
                            border: `1px solid ${(b === "Sem borda" ? !borda : borda === b) ? "transparent" : "rgba(255,255,255,0.08)"}`,
                            color: (b === "Sem borda" ? !borda : borda === b) ? "white" : "rgba(245,240,232,0.55)",
                            cursor: "pointer", fontSize: "0.8rem", fontWeight: 500, transition: "all 0.2s",
                          }}>
                            {b}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Footer */}
              <div style={{
                padding: "0.875rem 1.25rem",
                borderTop: "1px solid rgba(255,255,255,0.06)",
                display: "flex", gap: "0.6rem", flexShrink: 0,
                background: "rgba(10,10,10,0.95)",
              }}>
                {etapa > 1 && (
                  <button onClick={() => setEtapa(e => (e - 1) as 1|2|3)} style={{
                    padding: "0.75rem 1rem", borderRadius: "0.75rem",
                    background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                    color: "rgba(245,240,232,0.7)", cursor: "pointer", fontWeight: 600, fontSize: "0.875rem",
                    flexShrink: 0,
                  }}>
                    ← Voltar
                  </button>
                )}
                {etapa === 3 && pizza1 && pizza2 && (
                  <button onClick={handleAdicionar} style={{
                    flex: 1, padding: "0.875rem 0.75rem", borderRadius: "0.875rem",
                    background: "linear-gradient(135deg, #E8380D, #C42D08)",
                    color: "white", border: "none", cursor: "pointer",
                    fontWeight: 700, fontSize: "0.88rem",
                    boxShadow: "0 4px 20px rgba(232,56,13,0.35)",
                    display: "flex", alignItems: "center", justifyContent: "center", gap: "0.4rem",
                  }}>
                    🛒 Adicionar —{" "}
                    {preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </button>
                )}
              </div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
}