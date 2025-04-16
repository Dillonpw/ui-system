import React, { createContext, useContext } from "react";
import { defaultTokens } from "./default-tokens";
import type { DesignTokens } from "./design-store";

interface ThemeContextType {
  tokens: DesignTokens;
  setTokens: (tokens: DesignTokens) => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({
  children,
  initialTokens = defaultTokens,
}: {
  children: React.ReactNode;
  initialTokens?: DesignTokens;
}) {
  const [tokens, setTokens] = React.useState<DesignTokens>(initialTokens);

  const value = React.useMemo(
    () => ({
      tokens,
      setTokens,
    }),
    [tokens],
  );

  return (
    <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error("useTheme must be used within a ThemeProvider");
  }
  return context;
}

export function useToken<T extends keyof DesignTokens>(
  category: T,
  tokenName: keyof DesignTokens[T],
): DesignTokens[T][keyof DesignTokens[T]] {
  const { tokens } = useTheme();
  return tokens[category][tokenName];
}
