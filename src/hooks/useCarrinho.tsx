// src/hooks/useCarrinho.tsx  ← extensão .tsx (contém JSX)
import {
  createContext, useContext, useReducer, useCallback,
  type ReactNode,
} from "react";
import { LOJA } from "../../config/loja";

// ── Tipos ────────────────────────────────────────────────────

export type TamanhoKey = "P" | "M" | "G";

export interface ItemCarrinho {
  uid:          string;
  tipo:         "inteira" | "meio-a-meio";
  tamanho:      TamanhoKey;
  preco:        number;
  pizzaId?:     number;
  pizzaNome?:   string;
  metade1Id?:   number;
  metade1Nome?: string;
  metade2Id?:   number;
  metade2Nome?: string;
  borda?:       string;
}

interface CarrinhoState {
  itens:  ItemCarrinho[];
  aberto: boolean;
}

type Action =
  | { type: "ADICIONAR"; item: ItemCarrinho }
  | { type: "REMOVER";   uid: string }
  | { type: "LIMPAR" }
  | { type: "ABRIR" }
  | { type: "FECHAR" }
  | { type: "TOGGLE" };

// ── Reducer ──────────────────────────────────────────────────

function reducer(state: CarrinhoState, action: Action): CarrinhoState {
  switch (action.type) {
    case "ADICIONAR": return { ...state, itens: [...state.itens, action.item], aberto: true };
    case "REMOVER":   return { ...state, itens: state.itens.filter(i => i.uid !== action.uid) };
    case "LIMPAR":    return { ...state, itens: [] };
    case "ABRIR":     return { ...state, aberto: true };
    case "FECHAR":    return { ...state, aberto: false };
    case "TOGGLE":    return { ...state, aberto: !state.aberto };
    default:          return state;
  }
}

// ── Context ──────────────────────────────────────────────────

interface CarrinhoCtx {
  itens:             ItemCarrinho[];
  aberto:            boolean;
  total:             number;
  totalItens:        number;
  adicionarInteira:  (p: { pizzaId: number; pizzaNome: string; tamanho: TamanhoKey; preco: number; borda?: string }) => void;
  adicionarMeioMeio: (p: { metade1Id: number; metade1Nome: string; metade2Id: number; metade2Nome: string; tamanho: TamanhoKey; preco: number; borda?: string }) => void;
  remover:           (uid: string) => void;
  limpar:            () => void;
  abrir:             () => void;
  fechar:            () => void;
  toggle:            () => void;
  enviarWhatsApp:    () => void;
}

const CarrinhoContext = createContext<CarrinhoCtx | null>(null);

// ── Provider ─────────────────────────────────────────────────

export function CarrinhoProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, { itens: [], aberto: false });

  const total      = state.itens.reduce((s, i) => s + i.preco, 0);
  const totalItens = state.itens.length;

  const adicionarInteira = useCallback((p: {
    pizzaId: number; pizzaNome: string; tamanho: TamanhoKey; preco: number; borda?: string;
  }) => {
    dispatch({
      type: "ADICIONAR",
      item: { uid: `${Date.now()}-${Math.random()}`, tipo: "inteira", ...p },
    });
  }, []);

  const adicionarMeioMeio = useCallback((p: {
    metade1Id: number; metade1Nome: string; metade2Id: number; metade2Nome: string;
    tamanho: TamanhoKey; preco: number; borda?: string;
  }) => {
    dispatch({
      type: "ADICIONAR",
      item: { uid: `${Date.now()}-${Math.random()}`, tipo: "meio-a-meio", ...p },
    });
  }, []);

  const remover = useCallback((uid: string) => dispatch({ type: "REMOVER", uid }), []);
  const limpar  = useCallback(() => dispatch({ type: "LIMPAR"  }), []);
  const abrir   = useCallback(() => dispatch({ type: "ABRIR"   }), []);
  const fechar  = useCallback(() => dispatch({ type: "FECHAR"  }), []);
  const toggle  = useCallback(() => dispatch({ type: "TOGGLE"  }), []);

  const TAM: Record<TamanhoKey, string> = { P: "Pequena", M: "Média", G: "Grande" };

  const enviarWhatsApp = useCallback(() => {
    if (state.itens.length === 0) return;

    const linhas = state.itens.map((item, i) => {
      const num   = String(i + 1).padStart(2, "0");
      const tam   = TAM[item.tamanho];
      const preco = item.preco.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
      const borda = item.borda ? ` | Borda: ${item.borda}` : "";

      if (item.tipo === "inteira") {
        const id = String(item.pizzaId).padStart(2, "0");
        return `${num}. Pizza ${id} - ${item.pizzaNome} (${tam}) — ${preco}${borda}`;
      }
      const id1 = String(item.metade1Id).padStart(2, "0");
      const id2 = String(item.metade2Id).padStart(2, "0");
      return `${num}. Meio a Meio: ${id1} ${item.metade1Nome} + ${id2} ${item.metade2Nome} (${tam}) — ${preco}${borda}`;
    });

    const totalStr = total.toLocaleString("pt-BR", { style: "currency", currency: "BRL" });
    const msg = [
      "Olá! Gostaria de fazer um pedido 🍕",
      "",
      ...linhas,
      "",
      `Total: ${totalStr}`,
      "",
      "Aguardo confirmação. Obrigado!",
    ].join("\n");

    window.open(`https://wa.me/${LOJA.whatsapp}?text=${encodeURIComponent(msg)}`, "_blank", "noopener,noreferrer");
  }, [state.itens, total]);

  return (
    <CarrinhoContext.Provider value={{
      itens: state.itens, aberto: state.aberto, total, totalItens,
      adicionarInteira, adicionarMeioMeio, remover, limpar,
      abrir, fechar, toggle, enviarWhatsApp,
    }}>
      {children}
    </CarrinhoContext.Provider>
  );
}

// ── Hook ─────────────────────────────────────────────────────

export function useCarrinho() {
  const ctx = useContext(CarrinhoContext);
  if (!ctx) throw new Error("useCarrinho deve ser usado dentro de CarrinhoProvider");
  return ctx;
}