import type { ReactNode } from "react";

export type ThemeMode = "light" | "dark" | "system";

export interface NavItem {
  label: string;
  href?: string;
  icon?: ReactNode;
  active?: boolean;
}
