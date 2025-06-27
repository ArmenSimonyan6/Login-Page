import cx from "classnames";
import { forwardRef } from "react";
import styles from "./Input.module.scss";
import type { TInput } from "./Input.props";

export const Input = forwardRef<HTMLInputElement, TInput>(
  ({ variant, className = "", ...rest }, ref) => {
    return (
      <input
        ref={ref}
        className={cx(
          styles.input,
          variant ? styles[variant] : undefined,
          className
        )}
        {...rest}
      />
    );
  }
);

Input.displayName = "Input";
