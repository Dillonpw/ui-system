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
    muted: ColorToken;
    foreground: string;
    card: string;
    success: string;
    warning: string;
    info: string;
    page: string;
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
      selectedShadow: "sm",
      selectedFontSize: "base",
      selectedFontWeight: "normal",
      updateColor: (palette, shade, value) =>
        set((state) => {
          const currentPalette = state.tokens.colors[palette] || {};

          return {
            tokens: {
              ...state.tokens,
              colors: {
                ...state.tokens.colors,
                [palette]:
                  typeof currentPalette === "string"
                    ? value
                    : {
                        ...currentPalette,
                        [shade]: value,
                      },
              },
            },
          };
        }),
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
          selectedShadow: "sm",
          selectedFontSize: "base",
          selectedFontWeight: "normal",
        }),
    }),
    {
      name: "design-store",
      version: 1,
      storage: {
        getItem: (name) => {
          const str = localStorage.getItem(name);
          if (!str) return null;
          try {
            const data = JSON.parse(str);
            if (!data.version || data.version < 1) {
              localStorage.removeItem(name);
              return null;
            }
            const state = data.state;
            if (state?.tokens?.colors) {
              const requiredColors = [
                "primary",
                "secondary",
                "accent",
                "muted",
                "gray",
              ];
              const hasAllColors = requiredColors.every(
                (color) =>
                  state.tokens.colors[color] &&
                  typeof state.tokens.colors[color] === "object",
              );
              if (!hasAllColors) {
                localStorage.removeItem(name);
                return null;
              }
            }
            return state;
          } catch {
            return null;
          }
        },
        setItem: (name, value) => {
          localStorage.setItem(
            name,
            JSON.stringify({ version: 1, state: value }),
          );
        },
        removeItem: (name) => localStorage.removeItem(name),
      },
    },
  ),
);
