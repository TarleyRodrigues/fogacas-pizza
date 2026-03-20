// src/pages/_document.tsx
// Injeta as variáveis CSS do tema diretamente no <html>
// Assim ao mudar cor no config/loja.ts, tudo muda automaticamente

import { Html, Head, Main, NextScript } from "next/document";
import { TEMA_ATIVO } from "../../config/loja";

export default function Document() {
  const cssVars = `
    :root {
      --cor-primaria:   ${TEMA_ATIVO.primaria};
      --cor-secundaria: ${TEMA_ATIVO.secundaria};
      --cor-glow:       ${TEMA_ATIVO.glow};
    }
  `.trim();

  return (
    <Html lang="pt-BR">
      <Head>
        {/* Injeta tema como variáveis CSS — muda tudo ao trocar config/loja.ts */}
        <style dangerouslySetInnerHTML={{ __html: cssVars }} />

        {/* Fontes */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,700;0,900;1,700&family=DM+Sans:opsz,wght@9..40,300;9..40,400;9..40,500;9..40,600&display=swap"
          rel="stylesheet"
        />

        {/* PWA */}
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="Pizzaria" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
