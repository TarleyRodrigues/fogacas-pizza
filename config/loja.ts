// ============================================================
//  config/loja.ts — ARQUIVO CENTRAL DE CONFIGURAÇÃO
//  Para customizar para um novo cliente, edite apenas este arquivo
//  + troque as imagens em /public/images/
// ============================================================

// ── Identidade da Loja ───────────────────────────────────────
export const LOJA = {
  nome:        "Fogaça's Pizza",
  nomeSlug:    "fogacas-pizza",        // usado em SEO e meta tags
  slogan:      "Sabooor em cada fatia",
  descricaoSEO:"Cardápio digital com pedidos via WhatsApp. Massa artesanal aberta na hora e assada no forno elétrico de esteira.",
  whatsapp:    "5562991561911",         // apenas números: DDI + DDD + número
  endereco:    "R. Quintino Bocaiúva - St. Campinas, Goiânia - GO, 74515-050",                      // ex: "Rua das Pizzas, 123 — Goiânia/GO"
  instagram:   "fogacas_pizza",                      // apenas o @ sem o @, ex: "fogacaspizza"
  cor:         "red" as ThemeCor,       // veja opções abaixo em ThemeCor

  horarios: [
    { dias: "Terça a Domingo", abre: "07:00", fecha: "23:00", fechado: false },
    { dias: "Segunda-feira",   abre: "",      fecha: "",       fechado: true  },
  ],

  bordas: ["Cheddar", "Catupiry"] as string[],

  // Texto do pedido no WhatsApp (use {numero}, {nome}, {tamanho}, {preco})
  mensagemWhatsApp: "Olá! Quero pedir a Pizza {numero} - {nome} ({tamanho}) — R$ {preco} 🍕",
} as const;

// ── Tema de Cores ─────────────────────────────────────────────
// Para mudar o tema completo, basta trocar a "cor" acima
export type ThemeCor = "red" | "orange" | "green" | "blue" | "purple";

export const TEMAS: Record<ThemeCor, { primaria: string; secundaria: string; glow: string }> = {
  red:    { primaria: "#E8380D", secundaria: "#F5A623", glow: "rgba(232,56,13,0.3)"   },
  orange: { primaria: "#F97316", secundaria: "#FBBF24", glow: "rgba(249,115,22,0.3)"  },
  green:  { primaria: "#16A34A", secundaria: "#86EFAC", glow: "rgba(22,163,74,0.3)"   },
  blue:   { primaria: "#2563EB", secundaria: "#60A5FA", glow: "rgba(37,99,235,0.3)"   },
  purple: { primaria: "#7C3AED", secundaria: "#C4B5FD", glow: "rgba(124,58,237,0.3)"  },
};

export const TEMA_ATIVO = TEMAS[LOJA.cor];

// ── Categorias do Cardápio ────────────────────────────────────
export const CATEGORIAS = [
  { id: "salgadas", nome: "Salgadas", emoji: "🍕" },
  { id: "doces",    nome: "Doces",    emoji: "🍫" },
] as const;

export type CategoriaId = typeof CATEGORIAS[number]["id"];

// ── Preços Base ───────────────────────────────────────────────
// Altere aqui para mudar todos os preços de uma vez
export const PRECOS_BASE = {
  P:  30,   // Pequena
  M:  38,   // Média
  G:  46,   // Grande
} as const;

// ── Tipo Pizza ────────────────────────────────────────────────
export interface Pizza {
  id:        number;
  nome:      string;
  categoria: CategoriaId;
  descricao: string;
  precos:    { P: number; M: number; G: number };
  badges?:   Array<"mais-pedido" | "novidade" | "vegana" | "chef">;
  destaque?: boolean;
  ativo:     boolean;
}

// ── Cardápio Completo ─────────────────────────────────────────
// Para alterar: mude nome, descricao, precos ou ativo:false para esconder
const P = PRECOS_BASE;

export const CARDAPIO: Pizza[] = [
  // ── Salgadas ──────────────────────────────────────────────
  { id:1,  nome:"Calabresa",       categoria:"salgadas", ativo:true,  destaque:true,
    descricao:"Molho de tomate, muçarela, calabresa, cebola, azeitona, orégano.",
    precos:{...P}, badges:["mais-pedido"] },

  { id:2,  nome:"Frango c/ Catupiry", categoria:"salgadas", ativo:true, destaque:true,
    descricao:"Molho de tomate, muçarela, frango desfiado, catupiry, azeitona, orégano.",
    precos:{...P}, badges:["mais-pedido"] },

  { id:3,  nome:"Frango c/ Bacon",    categoria:"salgadas", ativo:true,
    descricao:"Molho de tomate, muçarela, frango desfiado, bacon, catupiry, orégano.",
    precos:{...P} },

  { id:4,  nome:"Frango c/ Cheddar",  categoria:"salgadas", ativo:true,
    descricao:"Molho de tomate, muçarela, frango desfiado, cheddar, palmito, orégano.",
    precos:{...P} },

  { id:5,  nome:"Presunto",           categoria:"salgadas", ativo:true,
    descricao:"Molho de tomate, muçarela, tomate, azeitona, palmito, orégano.",
    precos:{...P} },

  { id:6,  nome:"4 Queijos",          categoria:"salgadas", ativo:true,  destaque:true,
    descricao:"Molho de tomate, muçarela, provolone, catupiry, parmesão, orégano.",
    precos:{...P}, badges:["chef"] },

  { id:7,  nome:"Atum",               categoria:"salgadas", ativo:true,
    descricao:"Molho de tomate, muçarela, atum, cebola, azeitona, orégano.",
    precos:{...P} },

  { id:8,  nome:"Muçarela",           categoria:"salgadas", ativo:true,
    descricao:"Molho de tomate, muçarela, tomate, orégano.",
    precos:{...P} },

  { id:9,  nome:"Italiana",           categoria:"salgadas", ativo:true,
    descricao:"Molho de tomate, muçarela, peperoni, tomate seco, azeitona e orégano.",
    precos:{...P}, badges:["novidade"] },

  { id:10, nome:"Carne de Sol",        categoria:"salgadas", ativo:true, destaque:true,
    descricao:"Molho de tomate, muçarela, carne seca, catupiry, azeitona.",
    precos:{...P}, badges:["chef"] },

  { id:11, nome:"Bacon",               categoria:"salgadas", ativo:true,
    descricao:"Molho de tomate, muçarela, bacon, palmito, azeitona, orégano.",
    precos:{...P} },

  { id:12, nome:"Margarita",           categoria:"salgadas", ativo:true,
    descricao:"Molho de tomate, muçarela, presunto, manjericão, tomate, orégano.",
    precos:{...P} },

  { id:13, nome:"Peperoni",            categoria:"salgadas", ativo:true,
    descricao:"Molho de tomate, muçarela, peperoni, tomate, cebola, orégano.",
    precos:{...P} },

  { id:14, nome:"Cheddar",             categoria:"salgadas", ativo:true,
    descricao:"Molho de tomate, muçarela, palmito, cheddar, azeitona, orégano.",
    precos:{...P} },

  { id:15, nome:"Francesa",            categoria:"salgadas", ativo:true,
    descricao:"Molho de tomate, muçarela, lombo canadense, creme de leite, gema de ovo, orégano.",
    precos:{...P}, badges:["novidade"] },

  { id:16, nome:"Vegetariana",         categoria:"salgadas", ativo:true,
    descricao:"Molho de tomate, muçarela, tomate, champignon, ervilha, palmito, milho, orégano.",
    precos:{...P}, badges:["vegana"] },

  { id:17, nome:"Lombinho",            categoria:"salgadas", ativo:true,
    descricao:"Molho de tomate, muçarela, lombo canadense, ovo, tomate, cebola, orégano.",
    precos:{...P} },

  { id:18, nome:"À Moda",              categoria:"salgadas", ativo:true,
    descricao:"Molho de tomate, muçarela, presunto, frango desfiado, catupiry, tomate, azeitona, orégano.",
    precos:{...P} },

  { id:19, nome:"Americana",           categoria:"salgadas", ativo:true,
    descricao:"Molho de tomate, muçarela, presunto, calabresa, ovo, bacon, azeitona, orégano.",
    precos:{...P} },

  { id:20, nome:"Portuguesa",          categoria:"salgadas", ativo:true,
    descricao:"Molho de tomate, muçarela, presunto, ervilha, ovo, cebola, azeitona, orégano.",
    precos:{...P} },

  { id:21, nome:"Fogaça's",            categoria:"salgadas", ativo:true, destaque:true,
    descricao:"Molho de tomate, muçarela, frango, palmito, tomate seco, abacaxi, champignon.",
    precos:{...P}, badges:["mais-pedido", "chef"] },

  // ── Doces ────────────────────────────────────────────────
  { id:22, nome:"Banana com Canela",      categoria:"doces", ativo:true,
    descricao:"Muçarela, banana, canela, leite condensado.",
    precos:{...P} },

  { id:23, nome:"Morango com Chocolate",  categoria:"doces", ativo:true,
    descricao:"Leite condensado, chocolate, morango, muçarela.",
    precos:{...P}, badges:["novidade"] },

  { id:24, nome:"Banana com Chocolate",   categoria:"doces", ativo:true,
    descricao:"Muçarela, banana, chocolate, leite condensado.",
    precos:{...P} },
];

// ── Textos Institucionais ─────────────────────────────────────
// Para revender: troque estes textos para o novo cliente
export const TEXTOS = {
  sobre: {
    titulo:   "Feita com amor de verdade",
    subtitulo:"Nossa História",
    paragrafo1: "A Fogaça's Pizza nasceu da paixão por uma boa pizza e pelo prazer de ver as pessoas bem alimentadas e felizes. Cada pizza é preparada com a massa aberta na hora, ingredientes frescos e muito carinho.",
    paragrafo2: "Do primeiro ao último pedido do dia, do atendimento às 07h à última entrega às 23h, estamos aqui pra fazer a sua experiência ser especial. Seja bem-vindo à nossa família!",
  },
  diferenciais: [
    { icon: "🍕", titulo: "Massa Aberta na Hora",      desc: "Feita fresquinha pra você"        },
    { icon: "⚡", titulo: "Forno Elétrico de Esteira", desc: "Tecnologia e sabor unidos"        },
    { icon: "🕐", titulo: "Ter a Dom — 07h às 23h",    desc: "Quase sempre aqui por você"       },
  ],
  hero: {
    tagline: "Massa aberta na hora, sabor em cada fatia",
    titulo1: "A pizza",
    titulo2: "perfeita",
    titulo3: "começa aqui.",
    subtitulo: "Massa artesanal aberta na hora, ingredientes selecionados e assada no forno elétrico de esteira — o ponto certo em cada pizza.",
    stats: [
      { valor: "24+",   label: "Sabores"   },
      { valor: "5★",    label: "Avaliação" },
      { valor: "07–23h",label: "Ter a Dom" },
    ],
  },
} as const;
