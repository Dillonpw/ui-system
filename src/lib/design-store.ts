import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { defaultTokens } from './default-tokens';
import { hexToRgb } from './utils';

type ColorToken = {
    [shade: string]: string;
};

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
    '2xl': string;
    full: string;
};

type BoxShadow = {
    none: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
    '2xl': string;
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
    updateColor: (
        palette: keyof DesignTokens['colors'],
        shade: string,
        value: string
    ) => void;
    updateTypography: (
        category: keyof DesignTokens['typography'],
        key: string,
        value: string
    ) => void;
    updateRadius: (size: keyof BorderRadius, value: string) => void;
    updateShadow: (size: keyof BoxShadow, value: string) => void;
    resetTokens: () => void;
};

export const useDesignStore = create<DesignStore>()(
    persist(
        (set) => ({
            tokens: defaultTokens,
            updateColor: (palette, shade, value) =>
                set((state) => ({
                    tokens: {
                        ...state.tokens,
                        colors: {
                            ...state.tokens.colors,
                            [palette]:
                                typeof state.tokens.colors[palette] === 'string'
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
                            [category === 'fontSize'
                                ? 'fontSize'
                                : category === 'fontWeight'
                                ? 'fontWeight'
                                : 'fontFamily']:
                                category === 'fontFamily'
                                    ? value
                                    : {
                                          ...state.tokens.typography[
                                              category as
                                                  | 'fontSize'
                                                  | 'fontWeight'
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
            resetTokens: () => set({ tokens: defaultTokens }),
        }),
        {
            name: 'design-store',
        }
    )
);

export const generateTailwindConfig = (tokens: DesignTokens): string => {
    const config = {
        theme: {
            extend: {
                colors: {
                    primary: tokens.colors.primary,
                    secondary: tokens.colors.secondary,
                    accent: tokens.colors.accent,
                },
                borderRadius: {
                    DEFAULT: tokens.radius.md,
                },
                boxShadow: {
                    DEFAULT: tokens.shadows.md,
                },
                fontFamily: {
                    sans: [tokens.typography.fontFamily],
                },
                fontSize: {
                    base: tokens.typography.fontSize,
                },
                lineHeight: {
                    base: tokens.typography.lineHeight.normal,
                },
                fontWeight: {
                    base: tokens.typography.fontWeight,
                },
            },
        },
    };

    return JSON.stringify(config, null, 2);
};

export const generateCSSVariables = (tokens: DesignTokens): string => {
    const { r, g, b } = hexToRgb(tokens.colors.primary['500']);
    const cssVars = `
:root {
    --primary: ${tokens.colors.primary['500']};
    --primary-rgb: ${r} ${g} ${b};
    --secondary: ${tokens.colors.secondary};
    --accent: ${tokens.colors.accent};
    --radius: ${tokens.radius.md};
    --shadow: ${tokens.shadows.md};
    --font-family: ${tokens.typography.fontFamily};
    --font-size: ${tokens.typography.fontSize};
    --line-height: ${tokens.typography.lineHeight};
    --font-weight: ${tokens.typography.fontWeight};
}`;

    return cssVars;
};
