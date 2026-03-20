// src/lib/supabase.ts
// Supabase é usado para:
// 1. Salvar leads/pedidos (analytics)
// 2. Painel futuro de edição de preços (opcional)
// 3. Controle de disponibilidade de pizzas em tempo real

import { createClient } from "@supabase/supabase-js";

const supabaseUrl  = process.env.NEXT_PUBLIC_SUPABASE_URL!;
const supabaseKey  = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!;

// Guard para dev sem Supabase configurado
const isConfigured = supabaseUrl && supabaseUrl !== "https://placeholder.supabase.co";

export const supabase = isConfigured
  ? createClient(supabaseUrl, supabaseKey)
  : null;

// ── Tipos do banco ────────────────────────────────────────────

export interface PizzaOverride {
  id:          number;   // mesmo id do config/loja.ts
  preco_p?:    number;   // sobrescreve o preço do config se preenchido
  preco_m?:    number;
  preco_g?:    number;
  ativo:       boolean;  // pode desativar uma pizza sem mexer no código
  destaque?:   boolean;
  updated_at:  string;
}

export interface PedidoLog {
  id?:          string;
  pizza_id:     number;
  pizza_nome:   string;
  tamanho:      string;
  preco:        number;
  whatsapp:     string;  // número da loja (identifica qual franquia)
  created_at?:  string;
}

// ── Funções de acesso ─────────────────────────────────────────

/**
 * Busca overrides de preço/disponibilidade do Supabase.
 * Se Supabase não estiver configurado, retorna array vazio
 * e o config/loja.ts é usado como fonte de verdade.
 */
export async function getPizzaOverrides(): Promise<PizzaOverride[]> {
  if (!supabase) return [];
  const { data, error } = await supabase
    .from("pizza_overrides")
    .select("*");
  if (error) {
    console.warn("[Supabase] Erro ao buscar overrides:", error.message);
    return [];
  }
  return data ?? [];
}

/**
 * Registra um clique de pedido para analytics (fire-and-forget).
 * Falha silenciosamente se Supabase não estiver configurado.
 */
export async function logPedido(pedido: Omit<PedidoLog, "id" | "created_at">): Promise<void> {
  if (!supabase) return;
  const { error } = await supabase.from("pedido_logs").insert(pedido);
  if (error) console.warn("[Supabase] Erro ao logar pedido:", error.message);
}

// ── SQL para criar as tabelas (rode no Supabase SQL Editor) ───
/*
-- Tabela de overrides (opcional, para edição de preços sem deploy)
CREATE TABLE pizza_overrides (
  id          INT PRIMARY KEY,
  preco_p     NUMERIC,
  preco_m     NUMERIC,
  preco_g     NUMERIC,
  ativo       BOOLEAN DEFAULT TRUE,
  destaque    BOOLEAN,
  updated_at  TIMESTAMPTZ DEFAULT NOW()
);

-- Habilitar Row Level Security (leitura pública)
ALTER TABLE pizza_overrides ENABLE ROW LEVEL SECURITY;
CREATE POLICY "public read" ON pizza_overrides FOR SELECT USING (true);

-- Tabela de analytics de pedidos (opcional)
CREATE TABLE pedido_logs (
  id          UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  pizza_id    INT NOT NULL,
  pizza_nome  TEXT NOT NULL,
  tamanho     TEXT NOT NULL,
  preco       NUMERIC NOT NULL,
  whatsapp    TEXT NOT NULL,
  created_at  TIMESTAMPTZ DEFAULT NOW()
);

ALTER TABLE pedido_logs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "insert only" ON pedido_logs FOR INSERT WITH CHECK (true);
*/
