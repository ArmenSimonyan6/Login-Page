import type { PropsWithChildren } from "react";

export interface IButtonProps {
  text: string;
  icon?: string;
  disabled?: boolean;
  className?: string;
  type?: "button" | "submit";
  variant?: "primary" | "dark";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export type TButton = PropsWithChildren<IButtonProps>;
