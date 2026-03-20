// src/hooks/useWhatsApp.ts
import { useCallback } from "react";
import { LOJA } from "../../config/loja";
import { logPedido } from "../lib/supabase";

interface PedidoParams {
  pizzaId:   number;
  pizzaNome: string;
  tamanho:   string;
  preco:     number;
}

export function useWhatsApp() {
  const abrirPedido = useCallback(async (params: PedidoParams) => {
    const { pizzaId, pizzaNome, tamanho, preco } = params;

    // Gera link com mensagem pré-preenchida
    const msg = LOJA.mensagemWhatsApp
      .replace("{numero}",  String(pizzaId).padStart(2, "0"))
      .replace("{nome}",    pizzaNome)
      .replace("{tamanho}", tamanho)
      .replace("{preco}",   preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" }));

    const link = `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(msg)}`;

    // Analytics fire-and-forget
    logPedido({ pizza_id: pizzaId, pizza_nome: pizzaNome, tamanho, preco, whatsapp: LOJA.whatsapp });

    window.open(link, "_blank", "noopener,noreferrer");
  }, []);

  const linkGenerico = `https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent("Olá! Quero fazer um pedido 🍕")}`;

  return { abrirPedido, linkGenerico };
}
