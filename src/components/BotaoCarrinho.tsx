// src/components/BotaoCarrinho.tsx
// Botão flutuante do carrinho com contador de itens

import { motion, AnimatePresence } from "framer-motion";
import { useCarrinho } from "../hooks/useCarrinho";

export default function BotaoCarrinho() {
  const { totalItens, total, toggle } = useCarrinho();

  return (
    <AnimatePresence>
      {totalItens > 0 && (
        <motion.button
          onClick={toggle}
          initial={{ opacity: 0, y: 24, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 24, scale: 0.8 }}
          transition={{ type: "spring", stiffness: 380, damping: 28 }}
          style={{
            position: "fixed",
            bottom: "9rem",   // ← fica acima do FAB do WhatsApp
            left: "1rem",
            right: "1rem",
            zIndex: 150,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.75rem",
            padding: "0.875rem 1.5rem",
            background: "linear-gradient(135deg, #E8380D, #C42D08)",
            color: "white",
            border: "none",
            borderRadius: "9999px",
            cursor: "pointer",
            boxShadow: "0 8px 32px rgba(232,56,13,0.45), 0 2px 8px rgba(0,0,0,0.4)",
            fontFamily: "'DM Sans', sans-serif",
            fontWeight: 700,
            fontSize: "0.95rem",
            whiteSpace: "nowrap",
          }}
          whileHover={{ scale: 1.04, boxShadow: "0 12px 40px rgba(232,56,13,0.55), 0 2px 8px rgba(0,0,0,0.4)" }}
          whileTap={{ scale: 0.97 }}
        >
          {/* Ícone carrinho */}
          <svg width="18" height="18" fill="none" stroke="currentColor" strokeWidth={2.2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-1.5 6h13M9 19a1 1 0 100 2 1 1 0 000-2zm8 0a1 1 0 100 2 1 1 0 000-2z"/>
          </svg>

          {/* Contador */}
          <motion.span
            key={totalItens}
            initial={{ scale: 1.4 }}
            animate={{ scale: 1 }}
            style={{
              background: "rgba(255,255,255,0.2)",
              borderRadius: "9999px",
              padding: "0.1rem 0.55rem",
              fontSize: "0.8rem",
              fontWeight: 800,
            }}>
            {totalItens}
          </motion.span>

          Ver pedido

          {/* Total */}
          <span style={{
            background: "rgba(0,0,0,0.2)",
            borderRadius: "9999px",
            padding: "0.2rem 0.75rem",
            fontSize: "0.88rem",
          }}>
            {total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" })}
          </span>
        </motion.button>
      )}
    </AnimatePresence>
  );
}
