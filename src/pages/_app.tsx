// src/pages/_app.tsx
import type { AppProps } from "next/app";
import { CarrinhoProvider } from "../hooks/useCarrinho";
import "../styles/globals.css";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <CarrinhoProvider>
      <Component {...pageProps} />
    </CarrinhoProvider>
  );
}
