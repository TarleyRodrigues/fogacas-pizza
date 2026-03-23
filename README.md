# 🍕 Pizzaria Pro — Documentação Completa

> Template profissional de cardápio digital com pedidos via WhatsApp.
> Stack: Next.js 14 · Supabase · Framer Motion · Tailwind CSS

---

## 📋 Índice

1. [Requisitos](#requisitos)
2. [Como rodar o projeto](#como-rodar-o-projeto)
3. [Estrutura de arquivos](#estrutura-de-arquivos)
4. [Como trocar as imagens](#como-trocar-as-imagens)
5. [Como alterar os preços das pizzas](#como-alterar-os-preços-das-pizzas)
6. [Como editar o cardápio](#como-editar-o-cardápio)
7. [Como adicionar imagens de cada pizza](#como-adicionar-imagens-de-cada-pizza)
8. [Como mudar cores e tema](#como-mudar-cores-e-tema)
9. [Como alterar textos e informações da loja](#como-alterar-textos-e-informações-da-loja)
10. [Supabase — edição sem deploy](#supabase--edição-sem-deploy)
11. [Como fazer deploy na Vercel](#como-fazer-deploy-na-vercel)
12. [Como revender para outro cliente](#como-revender-para-outro-cliente)
13. [Erros comuns e soluções](#erros-comuns-e-soluções)

---

## Requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** versão 18 ou superior → [nodejs.org](https://nodejs.org)
- **npm** (vem junto com o Node.js)
- **VS Code** (recomendado) → [code.visualstudio.com](https://code.visualstudio.com)

---

## Como rodar o projeto

**Passo 1 — Instalar as dependências**

Abra o terminal na pasta do projeto e rode:

```bash
npm install
```

**Passo 2 — Configurar as variáveis de ambiente**

Copie o arquivo de exemplo e preencha com seus dados:

```bash
# Copie o arquivo
cp .env.local.example .env.local
```

Abra o `.env.local` e preencha:

```env
NEXT_PUBLIC_SUPABASE_URL=https://SEU_PROJECT_ID.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua_anon_key_aqui
NEXT_PUBLIC_SITE_URL=http://localhost:3000
```

> As credenciais do Supabase ficam em: `supabase.com` → seu projeto → **Settings** → **API**

**Passo 3 — Rodar em modo desenvolvimento**

```bash
npm run dev
```

Acesse no navegador: **http://localhost:3000**

**Outros comandos úteis:**

```bash
npm run build   # gera a versão de produção
npm run start   # roda a versão de produção localmente
npm run lint    # verifica erros de código
```

---

## Estrutura de arquivos

```
Site Fogaças/
│
├── config/
│   └── loja.ts              ← ⭐ ARQUIVO PRINCIPAL — edite aqui primeiro
│
├── public/
│   └── images/
│       ├── hero.jpg         ← foto do estabelecimento (tela inicial)
│       ├── donos.gif        ← foto/gif dos donos
│       └── pizzas/          ← fotos individuais de cada pizza
│           ├── calabresa.jpg
│           ├── frango-c-catupiry.jpg
│           └── ...
│
├── src/
│   ├── components/
│   │   ├── Hero.tsx         ← seção inicial com imagem de fundo
│   │   ├── Cardapio.tsx     ← grid do cardápio com filtros
│   │   ├── PizzaCard.tsx    ← card individual de cada pizza
│   │   ├── BackToTop.tsx    ← botão voltar ao topo
│   │   └── ui.tsx           ← Header, Footer, Donos, WhatsApp FAB
│   │
│   ├── hooks/
│   │   ├── usePizzas.ts     ← busca pizzas (config + Supabase)
│   │   └── useWhatsApp.ts   ← gera links de pedido
│   │
│   ├── lib/
│   │   └── supabase.ts      ← conexão com o banco de dados
│   │
│   ├── pages/
│   │   ├── index.tsx        ← página principal
│   │   ├── _app.tsx         ← configuração global
│   │   └── _document.tsx    ← HTML base com fontes e tema
│   │
│   └── styles/
│       └── globals.css      ← estilos globais e classes utilitárias
│
├── .env.local               ← suas credenciais (nunca envie ao GitHub!)
├── .env.local.example       ← modelo do arquivo de credenciais
└── package.json             ← dependências do projeto
```

---

## Como trocar as imagens

### Imagem do Hero (tela inicial)

A foto que aparece na tela inicial ao abrir o site.

**Onde colocar:**
```
public/images/hero.jpg
```

**Requisitos:**
- Formato: `.jpg` ou `.jpeg`
- Tamanho mínimo recomendado: **1920×1080px**
- Orientação: **horizontal (paisagem)**
- Foco principal: centro ou parte inferior da imagem
- Dica: foto bem iluminada do estabelecimento ou das pizzas

Após substituir o arquivo, salve e o site atualiza automaticamente.

---

### Imagem dos Donos

A foto que aparece na seção "Quem somos".

**Onde colocar:**
```
public/images/donos.gif
```

**Requisitos:**
- Formato: `.gif` (animado) ou `.jpg` (estático)
- Proporção recomendada: **4:3** (ex: 800×600px)
- Se usar `.jpg`, altere a extensão no código em `src/components/ui.tsx`:

```tsx
// Linha com src da imagem dos donos — troque a extensão:
<Image src="/images/donos.gif"   // ← gif animado
<Image src="/images/donos.jpg"   // ← foto estática
```

---

## Como alterar os preços das pizzas

Todos os preços ficam em **`config/loja.ts`**.

### Preço único para todas as pizzas

No início do arquivo, encontre `PRECOS_BASE`:

```typescript
export const PRECOS_BASE = {
  P:  30,   // Pequena — altere aqui
  M:  38,   // Média   — altere aqui
  G:  46,   // Grande  — altere aqui
} as const;
```

Ao alterar esses valores, **todos os preços do cardápio mudam de uma vez**.

### Preço individual por pizza

Se uma pizza específica tiver preço diferente, encontre ela no array `CARDAPIO` e altere o campo `precos`:

```typescript
{ id: 10, nome: "Carne de Sol",
  precos: { P: 35, M: 45, G: 55 },   // ← preços individuais desta pizza
  ...
}
```

> **Dica rápida:** use `Ctrl+S` para salvar e o site atualiza na hora em modo dev.

---

## Como editar o cardápio

Tudo no arquivo **`config/loja.ts`**, no array `CARDAPIO`.

### Estrutura de uma pizza

```typescript
{
  id:        1,                    // número de identificação (01, 02...)
  nome:      "Calabresa",          // nome exibido no card
  categoria: "salgadas",           // "salgadas" ou "doces"
  ativo:     true,                 // true = aparece | false = some do cardápio
  destaque:  true,                 // aparece com badge de destaque
  descricao: "Molho de tomate...", // ingredientes
  precos:    { ...P },             // usa PRECOS_BASE (ou coloque valores fixos)
  badges:    ["mais-pedido"],      // etiquetas opcionais (veja lista abaixo)
}
```

**Badges disponíveis:**
```typescript
badges: ["mais-pedido"]  // 🔥 Mais Pedido
badges: ["novidade"]     // ✨ Novidade
badges: ["vegana"]       // 🌱 Vegana
badges: ["chef"]         // 👨‍🍳 Chef
// Pode combinar: badges: ["mais-pedido", "chef"]
```

---

### Esconder uma pizza temporariamente

Útil quando acaba um ingrediente. Não precisa deletar — só mude `ativo` para `false`:

```typescript
{ id: 7, nome: "Atum",
  ativo: false,   // ← pizza some do cardápio sem ser deletada
  ...
}
```

Para reativar, mude de volta para `true`.

---

### Editar uma pizza existente

Encontre a pizza pelo `id` ou `nome` e altere os campos desejados:

```typescript
// Antes:
{ id: 1, nome: "Calabresa",
  descricao: "Molho de tomate, muçarela, calabresa, cebola, azeitona, orégano.",
  precos: { ...P },
}

// Depois (com preço e descrição alterados):
{ id: 1, nome: "Calabresa Especial",
  descricao: "Molho de tomate, muçarela dupla, calabresa artesanal, cebola roxa, azeitona, orégano.",
  precos: { P: 33, M: 43, G: 53 },
}
```

---

### Adicionar uma pizza nova

Copie o bloco de uma pizza existente, cole ao final do array e ajuste os dados. Lembre de incrementar o `id`:

```typescript
// Adicione antes do ]; que fecha o array CARDAPIO
{ id: 25, nome: "Lombo com Gorgonzola",
  slug:      { current: "lombo-gorgonzola" },
  categoria: "salgadas",
  ativo:     true,
  destaque:  false,
  descricao: "Molho de tomate, muçarela, lombo canadense, gorgonzola, nozes, orégano.",
  precos:    { P: 40, M: 52, G: 62 },
  badges:    ["novidade"],
},
```

> Após adicionar, coloque a foto em `public/images/pizzas/lombo-gorgonzola.jpg` para o card exibir a imagem.

---

### Excluir uma pizza permanentemente

Encontre o bloco da pizza no array `CARDAPIO` e delete-o inteiro, do `{` até o `},` correspondente.

**Exemplo — deletar a pizza Atum (id 7):**

```typescript
// Delete estas linhas:
{ id:7, nome:"Atum",
  slug:{ current:"atum" },
  categoria:"salgadas", ativo:true,
  descricao:"Molho de tomate, muçarela, atum, cebola, azeitona, orégano.",
  precos:{...P} },
```

> **Recomendação:** prefira usar `ativo: false` em vez de deletar. Assim você mantém o histórico e pode reativar facilmente.

---

### Alterar as bordas especiais

No início de `config/loja.ts`, encontre `bordas`:

```typescript
bordas: ["Cheddar", "Catupiry"],
```

Adicione, remova ou renomeie os sabores conforme necessário:

```typescript
bordas: ["Cheddar", "Catupiry", "Cream Cheese"],
```

---

## Como adicionar imagens de cada pizza

As fotos aparecem no topo de cada card do cardápio. Se não tiver foto, exibe um placeholder automático com emoji.

**Onde colocar:**
```
public/images/pizzas/
```

**Padrão de nome dos arquivos:**

O nome do arquivo é gerado automaticamente a partir do nome da pizza — tudo em minúsculo, acentos removidos, espaços e caracteres especiais viram hífen:

| Pizza | Nome do arquivo |
|---|---|
| Calabresa | `calabresa.jpg` |
| Frango c/ Catupiry | `frango-c-catupiry.jpg` |
| Frango c/ Bacon | `frango-c-bacon.jpg` |
| Frango c/ Cheddar | `frango-c-cheddar.jpg` |
| Presunto | `presunto.jpg` |
| 4 Queijos | `4-queijos.jpg` |
| Atum | `atum.jpg` |
| Muçarela | `mucarela.jpg` |
| Italiana | `italiana.jpg` |
| Carne de Sol | `carne-de-sol.jpg` |
| Bacon | `bacon.jpg` |
| Margarita | `margarita.jpg` |
| Peperoni | `peperoni.jpg` |
| Cheddar | `cheddar.jpg` |
| Francesa | `francesa.jpg` |
| Vegetariana | `vegetariana.jpg` |
| Lombinho | `lombinho.jpg` |
| À Moda | `a-moda.jpg` |
| Americana | `americana.jpg` |
| Portuguesa | `portuguesa.jpg` |
| Fogaça's | `fogaca-s.jpg` |
| Banana com Canela | `banana-com-canela.jpg` |
| Morango com Chocolate | `morango-com-chocolate.jpg` |
| Banana com Chocolate | `banana-com-chocolate.jpg` |

**Requisitos das fotos:**
- Formato: `.jpg`
- Tamanho recomendado: **800×450px** (proporção 16:9)
- Fundo neutro ou escuro fica mais bonito no tema escuro do site
- Não precisa ter foto de todas — o placeholder aparece automaticamente

---

## Como mudar cores e tema

Em **`config/loja.ts`**, encontre a linha:

```typescript
cor: "red" as ThemeCor,
```

Troque `"red"` por uma das opções disponíveis:

| Valor | Cor | Indicado para |
|---|---|---|
| `"red"` | Vermelho (padrão) | Pizzarias clássicas |
| `"orange"` | Laranja | Hamburguerias, lanches |
| `"green"` | Verde | Comida saudável, vegetariano |
| `"blue"` | Azul | Frutos do mar, sushi |
| `"purple"` | Roxo | Doceria, sobremesas |

```typescript
// Exemplo — mudar para laranja:
cor: "orange" as ThemeCor,
```

Ao salvar, **todas as cores do site mudam automaticamente**: botões, destaques, gradientes, badges, preços e FAB do WhatsApp.

---

## Como alterar textos e informações da loja

Tudo em **`config/loja.ts`**:

### Dados principais

```typescript
export const LOJA = {
  nome:        "Fogaça's Pizza",       // nome exibido no header e rodapé
  slogan:      "Massa aberta na hora", // subtítulo no hero e SEO
  whatsapp:    "5562992369790",        // DDI + DDD + número (só números)
  endereco:    "Rua das Pizzas, 123",  // endereço (deixe "" para ocultar)
  instagram:   "fogacaspizza",         // @ sem o @ (deixe "" para ocultar)
}
```

### Horários de funcionamento

```typescript
horarios: [
  { dias: "Terça a Domingo", abre: "07:00", fecha: "23:00", fechado: false },
  { dias: "Segunda-feira",   abre: "",      fecha: "",       fechado: true  },
],
```

### Textos da seção "Sobre nós" e Hero

No objeto `TEXTOS` no final do arquivo:

```typescript
export const TEXTOS = {
  sobre: {
    titulo:     "Feita com amor de verdade",
    subtitulo:  "Nossa História",
    paragrafo1: "Texto sobre a loja...",
    paragrafo2: "Segundo parágrafo...",
  },
  hero: {
    tagline:   "Massa aberta na hora, sabor em cada fatia",
    titulo1:   "A pizza",
    titulo2:   "perfeita",      // ← aparece em laranja/cor do tema
    titulo3:   "começa aqui.",
    subtitulo: "Descrição que aparece abaixo do título...",
    stats: [
      { valor: "24+",    label: "Sabores"   },
      { valor: "5★",     label: "Avaliação" },
      { valor: "07–23h", label: "Ter a Dom" },
    ],
  },
}
```

### Mensagem do WhatsApp

Personalize a mensagem que é enviada quando o cliente clica em "Pedir":

```typescript
mensagemWhatsApp: "Olá! Quero pedir a Pizza {numero} - {nome} ({tamanho}) — R$ {preco} 🍕",
```

Variáveis disponíveis: `{numero}`, `{nome}`, `{tamanho}`, `{preco}`

---

## Supabase — edição sem deploy

O Supabase permite alterar preços e disponibilidade das pizzas **sem precisar modificar o código ou fazer deploy**. Ideal para o dono da loja gerenciar pelo celular.

### Como acessar

Acesse **supabase.com** → faça login → clique no seu projeto.

### Alterar preço de uma pizza

1. Clique em **Table Editor** no menu lateral
2. Selecione a tabela **`pizza_overrides`**
3. Clique em **Insert row**
4. Preencha:
   - `id` → número da pizza (ex: `1` para Calabresa)
   - `preco_p` → novo preço Pequena (deixe vazio para usar o padrão)
   - `preco_m` → novo preço Média
   - `preco_g` → novo preço Grande
   - `ativo` → `true`
5. Clique em **Save**

O site atualiza em segundos automaticamente.

### Tirar uma pizza do cardápio temporariamente

1. **Table Editor** → `pizza_overrides`
2. **Insert row** com `id` da pizza e `ativo = false`
3. **Save**

A pizza some do cardápio imediatamente, sem deploy.

### Ver analytics de pedidos

1. **Table Editor** → `pedido_logs`
2. Veja todos os pedidos com: pizza, tamanho, preço e horário

---

## Como fazer deploy na Vercel

**Passo 1 — Suba o projeto para o GitHub**

```bash
git init
git add .
git commit -m "🍕 pizzaria pro"
git remote add origin https://github.com/seu-usuario/seu-repositorio
git push -u origin main
```

> ⚠️ O arquivo `.env.local` **nunca vai ao GitHub** (está no `.gitignore`). As variáveis são configuradas na Vercel.

**Passo 2 — Conecte à Vercel**

1. Acesse **vercel.com** e faça login com GitHub
2. Clique em **New Project**
3. Importe o repositório do projeto
4. A Vercel detecta Next.js automaticamente

**Passo 3 — Configure as variáveis de ambiente**

Na tela de configuração do projeto na Vercel, adicione:

```
NEXT_PUBLIC_SUPABASE_URL        = https://seu-projeto.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY   = sua_anon_key
NEXT_PUBLIC_SITE_URL            = https://seu-dominio.vercel.app
```

**Passo 4 — Deploy**

Clique em **Deploy**. Em ~2 minutos o site está no ar.

A partir daí, **todo `git push` faz deploy automático**.

---

## Como revender para outro cliente

O projeto foi pensado para ser revendido. Para adaptar para um novo cliente:

**1. Copie a pasta do projeto**

```
Site Fogaças/  →  copie para  →  Site NovoCliente/
```

**2. Edite apenas `config/loja.ts`**

Troque nome, WhatsApp, horários, cores e textos.

**3. Substitua as imagens**

```
public/images/hero.jpg    ← nova foto do estabelecimento
public/images/donos.gif   ← foto dos donos do novo cliente
public/images/pizzas/     ← fotos das pizzas (opcional)
```

**4. Atualize o `.env.local`**

Crie um novo projeto no Supabase para o cliente e coloque as novas credenciais.

**5. Deploy na Vercel**

Suba para um novo repositório GitHub e faça deploy.

**Tempo médio para adaptar: 30 minutos** ⚡

---

## Erros comuns e soluções

### Site não abre / erro 500

```bash
# Limpe o cache e reinstale
rd /s /q .next
npm install
npm run dev
```

### Imagem hero não aparece

Verifique se o arquivo existe exatamente em:
```
public\images\hero.jpg
```
O nome deve ser `hero.jpg` em minúsculo. Não coloque `public` no caminho do `src`.

### Erro "Cannot find module"

```bash
npm install
```

### Aviso "Cross origin request"

Normal em desenvolvimento quando acessa pelo celular na mesma rede Wi-Fi. Não afeta o funcionamento.

### Fotos das pizzas não aparecem (404)

Verifique se o nome do arquivo corresponde exatamente ao padrão da tabela na seção [Como adicionar imagens de cada pizza](#como-adicionar-imagens-de-cada-pizza). Nomes com acento, maiúscula ou espaço não funcionam.

### Preço não atualiza após mudar no `config/loja.ts`

Salve o arquivo (`Ctrl+S`) e aguarde o navegador atualizar automaticamente. Se não atualizar, force com `Ctrl+Shift+R` no navegador.

### WhatsApp não abre

Verifique se o número em `config/loja.ts` está no formato correto:
```
DDI + DDD + número, somente números
Exemplo: "5562992369790"  ← correto
Exemplo: "(62) 99236-9790" ← errado
```

---

*Desenvolvido com ❤️ — Stack: Next.js 14 · Supabase · Framer Motion · Tailwind CSS*
