import { useReducedMotion } from "framer-motion";

/** True when the user asked the OS/browser to minimise motion. */
export const usePrefersReducedMotion = () => useReducedMotion() ?? false;
