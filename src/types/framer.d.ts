// src/types/framer.d.ts
// Resolve incompatibilidade de tipos do Framer Motion com React.CSSProperties
import "framer-motion";
import type { CSSProperties } from "react";

declare module "framer-motion" {
  interface MotionStyle extends CSSProperties {}
}
