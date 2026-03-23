// src/components/Carrinho.tsx
// Drawer lateral premium com resumo do pedido e envio WhatsApp

import { motion, AnimatePresence } from "framer-motion";
import { useCarrinho, type TamanhoKey } from "../hooks/useCarrinho";

const TAM: Record<TamanhoKey, string> = { P: "Pequena", M: "Média", G: "Grande" };

export default function Carrinho() {
  const { itens, aberto, total, fechar, remover, limpar, enviarWhatsApp } = useCarrinho();

  return (
    <AnimatePresence>
      {aberto && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            onClick={fechar}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            style={{
              position: "fixed", inset: 0, zIndex: 300,
              background: "rgba(0,0,0,0.75)",
              backdropFilter: "blur(4px)",
            }}
          />

          {/* Drawer */}
          <motion.aside
            key="drawer"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", stiffness: 320, damping: 36 }}
            style={{
              position: "fixed", top: 0, right: 0, bottom: 0,
              width: "min(420px, 100vw)",
              zIndex: 301,
              background: "#0f0f0f",
              borderLeft: "1px solid rgba(201,149,42,0.15)",
              display: "flex", flexDirection: "column",
              boxShadow: "-20px 0 60px rgba(0,0,0,0.6)",
            }}
          >
            {/* Header do drawer */}
            <div style={{
              padding: "1.25rem 1.5rem",
              borderBottom: "1px solid rgba(201,149,42,0.12)",
              display: "flex", alignItems: "center", justifyContent: "space-between",
              background: "linear-gradient(135deg, rgba(201,149,42,0.06), transparent)",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}>
                <span style={{ fontSize: "1.5rem" }}>🛒</span>
                <div>
                  <h2 style={{
                    fontFamily: "'Playfair Display', serif",
                    fontWeight: 700, fontSize: "1.1rem", color: "#F5F0E8",
                  }}>
                    Seu Pedido
                  </h2>
                  <p style={{ fontSize: "0.72rem", color: "rgba(201,149,42,0.8)", marginTop: "1px" }}>
                    {itens.length === 0 ? "Nenhum item" : `${itens.length} ${itens.length === 1 ? "item" : "itens"}`}
                  </p>
                </div>
              </div>
              <button onClick={fechar} style={{
                background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)",
                borderRadius: "50%", width: "2.25rem", height: "2.25rem",
                display: "flex", alignItems: "center", justifyContent: "center",
                cursor: "pointer", color: "rgba(245,240,232,0.6)",
                transition: "all 0.2s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "rgba(255,255,255,0.1)"; e.currentTarget.style.color = "#F5F0E8"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "rgba(255,255,255,0.05)"; e.currentTarget.style.color = "rgba(245,240,232,0.6)"; }}>
                <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/>
                </svg>
              </button>
            </div>

            {/* Lista de itens */}
            <div style={{ flex: 1, overflowY: "auto", padding: "1rem 1.5rem" }}>
              {itens.length === 0 ? (
                <div style={{
                  display: "flex", flexDirection: "column", alignItems: "center",
                  justifyContent: "center", height: "60%", gap: "1rem",
                  opacity: 0.4,
                }}>
                  <span style={{ fontSize: "4rem" }}>🍕</span>
                  <p style={{ fontFamily: "'Playfair Display', serif", fontSize: "1.1rem", color: "#F5F0E8", textAlign: "center" }}>
                    Seu carrinho está vazio
                  </p>
                  <p style={{ fontSize: "0.82rem", color: "rgba(245,240,232,0.5)", textAlign: "center" }}>
                    Adicione pizzas do cardápio
                  </p>
                </div>
              ) : (
                <AnimatePresence initial={false}>
                  {itens.map((item, i) => (
                    <motion.div key={item.uid}
                      initial={{ opacity: 0, x: 24 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -24, height: 0, marginBottom: 0 }}
                      transition={{ duration: 0.25 }}
                      style={{
                        display: "flex", gap: "0.875rem", alignItems: "flex-start",
                        padding: "1rem", marginBottom: "0.75rem",
                        background: "rgba(255,255,255,0.03)",
                        border: "1px solid rgba(255,255,255,0.06)",
                        borderRadius: "1rem",
                        position: "relative",
                      }}>
                      {/* Número do item */}
                      <div style={{
                        width: "2rem", height: "2rem", borderRadius: "50%", flexShrink: 0,
                        background: "linear-gradient(135deg, rgba(232,56,13,0.8), rgba(196,45,8,0.8))",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        fontSize: "0.72rem", fontWeight: 700, color: "white",
                      }}>
                        {i + 1}
                      </div>

                      {/* Info */}
                      <div style={{ flex: 1, minWidth: 0 }}>
                        {item.tipo === "inteira" ? (
                          <>
                            <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.2rem" }}>
                              {String(item.pizzaId!).padStart(2,"0")} — {item.pizzaNome}
                            </p>
                            <p style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.45)" }}>
                              Pizza inteira · {TAM[item.tamanho]}
                              {item.borda && ` · Borda ${item.borda}`}
                            </p>
                          </>
                        ) : (
                          <>
                            <p style={{ fontSize: "0.85rem", fontWeight: 600, color: "#F5F0E8", marginBottom: "0.2rem", display: "flex", alignItems: "center", gap: "0.4rem", flexWrap: "wrap" }}>
                              <span style={{
                                fontSize: "0.58rem", fontWeight: 700, textTransform: "uppercase",
                                letterSpacing: "0.1em", padding: "0.15rem 0.5rem", borderRadius: "9999px",
                                background: "rgba(201,149,42,0.15)", color: "#F0C060",
                                border: "1px solid rgba(201,149,42,0.25)",
                              }}>
                                ½ + ½
                              </span>
                              {item.metade1Nome} + {item.metade2Nome}
                            </p>
                            <p style={{ fontSize: "0.72rem", color: "rgba(245,240,232,0.45)" }}>
                              Meio a meio · {TAM[item.tamanho]}
                              {item.borda && ` · Borda ${item.borda}`}
                            </p>
                          </>
                        )}
                        <p style={{
                          fontSize: "0.9rem", fontWeight: 700, marginTop: "0.4rem",
                          background: "linear-gradient(135deg, #F0C060, #C9952A)",
                          WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                        }}>
                          {item.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                        </p>
                      </div>

                      {/* Remover */}
                      <button onClick={() => remover(item.uid)} style={{
                        background: "transparent", border: "none", cursor: "pointer",
                        color: "rgba(245,240,232,0.25)", padding: "0.25rem",
                        borderRadius: "0.375rem", transition: "color 0.2s",
                        flexShrink: 0,
                      }}
                      onMouseEnter={e => e.currentTarget.style.color = "#E8380D"}
                      onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,232,0.25)"}>
                        <svg width="14" height="14" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"/>
                        </svg>
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              )}
            </div>

            {/* Footer do drawer */}
            {itens.length > 0 && (
              <div style={{
                padding: "1.25rem 1.5rem",
                borderTop: "1px solid rgba(201,149,42,0.12)",
                background: "rgba(10,10,10,0.9)",
              }}>
                {/* Total */}
                <div style={{
                  display: "flex", justifyContent: "space-between", alignItems: "center",
                  marginBottom: "1.25rem",
                }}>
                  <span style={{ fontSize: "0.875rem", color: "rgba(245,240,232,0.6)" }}>Total do pedido</span>
                  <span style={{
                    fontFamily: "'Playfair Display', serif", fontWeight: 700, fontSize: "1.5rem",
                    background: "linear-gradient(135deg, #F0C060, #C9952A)",
                    WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text",
                  }}>
                    {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
                  </span>
                </div>

                {/* Botão enviar */}
                <button onClick={enviarWhatsApp} style={{
                  width: "100%", padding: "1rem", borderRadius: "0.875rem",
                  background: "linear-gradient(135deg, #25D366, #1da851)",
                  color: "white", fontWeight: 700, fontSize: "1rem",
                  border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center", gap: "0.625rem",
                  boxShadow: "0 4px 24px rgba(37,211,102,0.35)",
                  transition: "all 0.2s",
                  letterSpacing: "0.01em",
                }}
                onMouseEnter={e => { e.currentTarget.style.transform = "translateY(-2px)"; e.currentTarget.style.boxShadow = "0 8px 32px rgba(37,211,102,0.5)"; }}
                onMouseLeave={e => { e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "0 4px 24px rgba(37,211,102,0.35)"; }}>
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
                  </svg>
                  Enviar pedido pelo WhatsApp
                </button>

                {/* Limpar carrinho */}
                <button onClick={limpar} style={{
                  width: "100%", marginTop: "0.625rem", padding: "0.625rem",
                  background: "transparent", border: "none", cursor: "pointer",
                  fontSize: "0.78rem", color: "rgba(245,240,232,0.3)",
                  transition: "color 0.2s",
                }}
                onMouseEnter={e => e.currentTarget.style.color = "#E8380D"}
                onMouseLeave={e => e.currentTarget.style.color = "rgba(245,240,232,0.3)"}>
                  Limpar carrinho
                </button>
              </div>
            )}
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
