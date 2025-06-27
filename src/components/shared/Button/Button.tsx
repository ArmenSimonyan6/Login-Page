import cx from "classnames";
import styles from "./Button.module.scss";
import type { TButton } from "./Button.props";

export const Button = ({
  type,
  onClick,
  variant,
  children,
  disabled,
  className = "",
}: TButton) => {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={cx(
        styles.button,
        variant ? styles[variant] : undefined,
        className
      )}
    >
      {children}
    </button>
  );
};
