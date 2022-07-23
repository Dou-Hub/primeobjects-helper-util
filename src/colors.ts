import { isNil } from "lodash";
import { isNonEmptyString } from "./core";

export const SLATE = {
    "50": "#f8fafc",
    "100": "#f1f5f9",
    "200": "#e2e8f0",
    "300": "#cbd5e1",
    "400": "#94a3b8",
    "500": "#64748b",
    "600": "#475569",
    "700": "#334155",
    "800": "#1e293b",
    "900": "#0f172a"
};

export const GRAY = {
    "50": "#f9fafb",
    "100": "#f3f4f6",
    "200": "#e5e7eb",
    "300": "#d1d5db",
    "400": "#9ca3af",
    "500": "#6b7280",
    "600": "#4b5563",
    "700": "#374151",
    "800": "#1f2937",
    "900": "#111827"
};

export const ZINC = {
    "50": "#fafafa",
    "100": "#f4f4f5",
    "200": "#e4e4e7",
    "300": "#d4d4d8",
    "400": "#a1a1aa",
    "500": "#71717a",
    "600": "#52525b",
    "700": "#3f3f46",
    "800": "#27272a",
    "900": "#18181b"
};

export const NEUTRAL = {
    "50": "#fafafa",
    "100": "#f5f5f5",
    "200": "#e5e5e5",
    "300": "#d4d4d4",
    "400": "#a3a3a3",
    "500": "#737373",
    "600": "#525252",
    "700": "#404040",
    "800": "#262626",
    "900": "#171717"
};

export const STONE = {
    "50": "#fafaf9",
    "100": "#f5f5f4",
    "200": "#e7e5e4",
    "300": "#d6d3d1",
    "400": "#a8a29e",
    "500": "#78716c",
    "600": "#57534e",
    "700": "#44403c",
    "800": "#292524",
    "900": "#1c1917"
};

export const RED = {
    "50": "#fef2f2",
    "100": "#fee2e2",
    "200": "#fecaca",
    "300": "#fca5a5",
    "400": "#f87171",
    "500": "#ef4444",
    "600": "#dc2626",
    "700": "#b91c1c",
    "800": "#991b1b",
    "900": "#7f1d1d"
};

export const ORANGE = {
    "50": "#fff7ed",
    "100": "#ffedd5",
    "200": "#fed7aa",
    "300": "#fdba74",
    "400": "#fb923c",
    "500": "#f97316",
    "600": "#ea580c",
    "700": "#c2410c",
    "800": "#9a3412",
    "900": "#7c2d12"
};

export const AMBER = {
    "50": "#fffbeb",
    "100": "#fef3c7",
    "200": "#fde68a",
    "300": "#fcd34d",
    "400": "#fbbf24",
    "500": "#f59e0b",
    "600": "#d97706",
    "700": "#b45309",
    "800": "#92400e",
    "900": "#78350f"
};

export const YELLOW = {
    "50": "#",
    "100": "#",
    "200": "#",
    "300": "#",
    "400": "#",
    "500": "#",
    "600": "#",
    "700": "#",
    "800": "#",
    "900": "#"
};

export const LIME = {
    "50": "#",
    "100": "#",
    "200": "#",
    "300": "#",
    "400": "#",
    "500": "#",
    "600": "#",
    "700": "#",
    "800": "#",
    "900": "#"
};

export const GREEN = {
    "50": "#f0fdf4",
    "100": "#dcfce7",
    "200": "#bbf7d0",
    "300": "#86efac",
    "400": "#4ade80",
    "500": "#22c55e",
    "600": "#16a34a",
    "700": "#15803d",
    "800": "#166534",
    "900": "#14532d"
};

export const EMERALD = {
    "50": "#",
    "100": "#",
    "200": "#",
    "300": "#",
    "400": "#",
    "500": "#",
    "600": "#",
    "700": "#",
    "800": "#",
    "900": "#"
};

export const TEAL = {
    "50": "#",
    "100": "#",
    "200": "#",
    "300": "#",
    "400": "#",
    "500": "#",
    "600": "#",
    "700": "#",
    "800": "#",
    "900": "#"
};

export const CYAN = {
    "50": "#",
    "100": "#",
    "200": "#",
    "300": "#",
    "400": "#",
    "500": "#",
    "600": "#",
    "700": "#",
    "800": "#",
    "900": "#"
};

export const SKY = {
    "50": "#f0f9ff",
    "100": "#e0f2fe",
    "200": "#bae6fd",
    "300": "#7dd3fc",
    "400": "#38bdf8",
    "500": "#0ea5e9",
    "600": "#0284c7",
    "700": "#0369a1",
    "800": "#075985",
    "900": "#0c4a6e"
};

export const BLUE = {
    "50": "#eff6ff",
    "100": "#dbeafe",
    "200": "#bfdbfe",
    "300": "#93c5fd",
    "400": "60a5fa",
    "500": "#3b82f6",
    "600": "#2563eb",
    "700": "#1d4ed8",
    "800": "#1e40af",
    "900": "#1e3a8a"
};

export const INDIGO = {
    "50": "#",
    "100": "#",
    "200": "#",
    "300": "#",
    "400": "#",
    "500": "#",
    "600": "#",
    "700": "#",
    "800": "#",
    "900": "#"
};

export const VIOLET = {
    "50": "#",
    "100": "#",
    "200": "#",
    "300": "#",
    "400": "#",
    "500": "#",
    "600": "#",
    "700": "#",
    "800": "#",
    "900": "#"
};

export const PURPLE = {
    "50": "#",
    "100": "#",
    "200": "#",
    "300": "#",
    "400": "#",
    "500": "#",
    "600": "#",
    "700": "#",
    "800": "#",
    "900": "#"
};

export const FUCHSIA = {
    "50": "#",
    "100": "#",
    "200": "#",
    "300": "#",
    "400": "#",
    "500": "#",
    "600": "#",
    "700": "#",
    "800": "#",
    "900": "#"
};

export const PINK = {
    "50": "#",
    "100": "#",
    "200": "#",
    "300": "#",
    "400": "#",
    "500": "#",
    "600": "#",
    "700": "#",
    "800": "#",
    "900": "#"
};

export const ROSE = {
    "50": "#",
    "100": "#",
    "200": "#",
    "300": "#",
    "400": "#",
    "500": "#",
    "600": "#",
    "700": "#",
    "800": "#",
    "900": "#"
};

export const WHITE = "#ffffff";
export const BLACK = "#000000";

export const COLORS = {
    SLATE,
    GRAY,
    ZINC,
    NEUTRAL,
    STONE,
    RED,
    ORANGE,
    AMBER,
    YELLOW,
    LIME,
    GREEN,
    EMERALD,
    TEAL,
    CYAN,
    SKY,
    BLUE,
    INDIGO,
    VIOLET,
    PURPLE,
    FUCHSIA,
    PINK,
    ROSE,
    WHITE,
    BLACK
};

export const getColor = (name: string, index: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900, defaultName?: string): string => {
    const color: Record<string, any> = isNonEmptyString(name) ? COLORS[name.toUpperCase()] : null;
    return isNil(color) ? getColor(isNonEmptyString(defaultName) ? `${defaultName}` : "sky", index, "sky") : color[`${index}`];
};
