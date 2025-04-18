import { create } from "zustand";
import { persist } from "zustand/middleware";
import { defaultTokens } from "./default-tokens";

type ShadeKey =
  | "50"
  | "100"
  | "200"
  | "300"
  | "400"
  | "500"
  | "600"
  | "700"
  | "800"
  | "900"
  | "950";
type ColorToken = {
  [key: string]: string;
} & Record<ShadeKey, string>;

type FontSize = {
  [size: string]: string;
};

type FontWeight = {
  [weight: string]: number;
};

type BorderRadius = {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
  full: string;
};

type BoxShadow = {
  none: string;
  "2xs": string;
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  "2xl": string;
};

export type DesignTokens = {
  colors: {
    primary: ColorToken;
    secondary: ColorToken;
    accent: ColorToken;
    gray: ColorToken;
    background: string;
    foreground: string;
    card: string;
    success: string;
    warning: string;
    info: string;
  };
  typography: {
    fontFamily: string;
    fontSize: FontSize;
    fontWeight: FontWeight;
    lineHeight: {
      [size: string]: string;
    };
  };
  radius: BorderRadius;
  shadows: BoxShadow;
};

type DesignStore = {
  tokens: DesignTokens;
  selectedRadius: keyof BorderRadius;
  selectedShadow: keyof BoxShadow;
  selectedFontSize: string;
  selectedFontWeight: string;
  updateColor: (
    palette: keyof DesignTokens["colors"],
    shade: string,
    value: string,
  ) => void;
  updateTypography: (
    category: keyof DesignTokens["typography"],
    key: string,
    value: string,
  ) => void;
  updateRadius: (size: keyof BorderRadius, value: string) => void;
  updateShadow: (size: keyof BoxShadow, value: string) => void;
  setSelectedRadius: (size: keyof BorderRadius) => void;
  setSelectedShadow: (size: keyof BoxShadow) => void;
  setSelectedFontSize: (size: string) => void;
  setSelectedFontWeight: (weight: string) => void;
  resetTokens: () => void;
};

export const useDesignStore = create<DesignStore>()(
  persist(
    (set) => ({
      tokens: defaultTokens,
      selectedRadius: "md",
      selectedShadow: "md",
      selectedFontSize: "base",
      selectedFontWeight: "normal",
      updateColor: (palette, shade, value) =>
        set((state) => ({
          tokens: {
            ...state.tokens,
            colors: {
              ...state.tokens.colors,
              [palette]:
                typeof state.tokens.colors[palette] === "string"
                  ? value
                  : {
                      ...state.tokens.colors[palette],
                      [shade]: value,
                    },
            },
          },
        })),
      updateTypography: (category, key, value) =>
        set((state) => ({
          tokens: {
            ...state.tokens,
            typography: {
              ...state.tokens.typography,
              [category === "fontSize"
                ? "fontSize"
                : category === "fontWeight"
                  ? "fontWeight"
                  : "fontFamily"]:
                category === "fontFamily"
                  ? value
                  : {
                      ...state.tokens.typography[
                        category as "fontSize" | "fontWeight"
                      ],
                      [key]: value,
                    },
            },
          },
        })),
      updateRadius: (size, value) =>
        set((state) => ({
          tokens: {
            ...state.tokens,
            radius: {
              ...state.tokens.radius,
              [size]: value,
            },
          },
        })),
      updateShadow: (size, value) =>
        set((state) => ({
          tokens: {
            ...state.tokens,
            shadows: {
              ...state.tokens.shadows,
              [size]: value,
            },
          },
        })),
      setSelectedRadius: (size) => set({ selectedRadius: size }),
      setSelectedShadow: (size) => set({ selectedShadow: size }),
      setSelectedFontSize: (size) => set({ selectedFontSize: size }),
      setSelectedFontWeight: (weight) => set({ selectedFontWeight: weight }),
      resetTokens: () =>
        set({
          tokens: defaultTokens,
          selectedRadius: "md",
          selectedShadow: "md",
          selectedFontSize: "base",
          selectedFontWeight: "normal",
        }),
    }),
    {
      name: "design-store",
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            const data = JSON.parse(str);
            return data.state;
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          localStorage.setItem(name, JSON.stringify({ state: value }));
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
