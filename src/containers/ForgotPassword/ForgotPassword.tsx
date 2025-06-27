import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactUsSchema } from "../../schemas";
import styles from "./ForgotPassword.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../context/AuthContext/AuthContex";
import type { IFormData, TStatus } from "./ForgotPassword.props";
import type { IEmailOnly } from "../../context/AuthContext/AuthContext.props";

import cx from "classnames";
import { Button, Input } from "../../components/shared";

const ForgotPassword = () => {
  const schema = contactUsSchema.pick(["email"]);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IFormData>({
    resolver: yupResolver(schema),
  });

  const { resetPassword } = useAuth();
  const [status, setStatus] = useState<TStatus | null>(null);

  const onSubmit = async ({ email }: IEmailOnly) => {
    const DateNow = Date.now();
    const recoveryKey = `resetCooldown_${email}`;
    const lastSentRequest = Number(localStorage.getItem(recoveryKey));

    const cooldown = 60 * 1000;
    const remainingTime = cooldown - (DateNow - lastSentRequest);

    if (lastSentRequest && remainingTime > 0) {
      setStatus({
        type: "error",
        message: `Error: For security purposes, you can only request this after ${Math.ceil(
          remainingTime / 1000
        )} seconds.`,
      });
      return;
    }

    const res = await resetPassword({ email });

    const isLimitError = res.error
      ?.toLowerCase()
      .includes("for security purposes");

    if (isLimitError) {
      setStatus({
        type: "error",
        message: "Error: " + res.error,
      });
      return;
    }

    localStorage.setItem(recoveryKey, DateNow.toString());

    setStatus({
      type: "success",
      message: "You'll receive an email to recover your password.",
    });

    if (!res.success) {
      console.error("Reset password error:", res.error);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <h2 className={styles.formWrapper__title}>Reset Password</h2>
        <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.formWrapper__inputs}>
            <div>
              <span>Forgot Password?</span>
              <Input
                type="email"
                variant="light"
                {...register("email")}
                placeholder="Enter your email"
              />

              {errors.email && (
                <p className={styles.formWrapper__error}>
                  {errors.email?.message}
                </p>
              )}
            </div>
          </div>
          <div className={styles.formWrapper__submit}>
            <Button
              type="submit"
              disabled={isSubmitting}
              variant="dark"
              text="Send Recovery Email"
            />
          </div>
          {status && (
            <p
              className={cx({
                [styles.formWrapper__error]: status.type === "error",
                [styles.formWrapper__success]: status.type === "success",
              })}
            >
              {status.message}
            </p>
          )}
        </form>
      </div>
    </div>
  );
};

export default ForgotPassword;
