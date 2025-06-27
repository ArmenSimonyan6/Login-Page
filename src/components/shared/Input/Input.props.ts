import type { InputHTMLAttributes } from "react";

export interface IInputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  variant: "light" | "bold";
}

export type TInput = IInputProps;
