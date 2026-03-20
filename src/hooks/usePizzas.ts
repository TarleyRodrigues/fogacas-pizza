// src/hooks/usePizzas.ts
// Mescla o cardápio do config/loja.ts com overrides do Supabase
// Se Supabase não estiver configurado, usa apenas o config

import { useState, useEffect, useMemo } from "react";
import { CARDAPIO, type Pizza } from "../../config/loja";
import { getPizzaOverrides, type PizzaOverride } from "../lib/supabase";

interface UsePizzasReturn {
  pizzas:    Pizza[];
  loading:   boolean;
  destaques: Pizza[];
}

export function usePizzas(): UsePizzasReturn {
  const [overrides, setOverrides] = useState<PizzaOverride[]>([]);
  const [loading,   setLoading]   = useState(true);

  useEffect(() => {
    getPizzaOverrides()
      .then(setOverrides)
      .finally(() => setLoading(false));
  }, []);

  const pizzas = useMemo(() => {
    return CARDAPIO
      .filter(p => p.ativo)
      .map(pizza => {
        const override = overrides.find(o => o.id === pizza.id);
        if (!override) return pizza;
        return {
          ...pizza,
          ativo:    override.ativo,
          destaque: override.destaque ?? pizza.destaque,
          precos: {
            P: override.preco_p ?? pizza.precos.P,
            M: override.preco_m ?? pizza.precos.M,
            G: override.preco_g ?? pizza.precos.G,
          },
        };
      })
      .filter(p => p.ativo);
  }, [overrides]);

  const destaques = useMemo(
    () => pizzas.filter(p => p.destaque).slice(0, 4),
    [pizzas]
  );

  return { pizzas, loading, destaques };
}
