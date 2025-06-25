import { useState } from "react";
import { useForm } from "react-hook-form";
import { contactUsSchema } from "../../schemas";
import styles from "./ForgotPassword.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../context/AuthContext/AuthContex";
import type { IFormData, TStatus } from "./ForgotPassword.props";
import type { IEmailOnly } from "../../context/AuthContext/AuthContext.props";

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
    setStatus({
      type: "success",
      message: "You'll receive an email to recover your password.",
    });

    if (!res.success) {
      console.error("Reset password error:", res.error);
    }
  };

  return (
    <div className={styles.parentDiv}>
      <div className={styles.formDiv}>
        <h2 className={styles.formDiv__title}>Reset Password</h2>
        <form
          autoComplete="off"
          className={styles.forgotForm}
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className={styles.inputs}>
            <div>
              <span>Forgot Password?</span>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className={styles.inputPassword}
              />

              {errors.email && (
                <p className={styles.errorMessage}>{errors.email?.message}</p>
              )}
            </div>
          </div>
          <div className={styles.buttonLogIn}>
            <button type="submit" disabled={isSubmitting}>
              Send Recovery Email
            </button>
          </div>
          {status && (
            <p
              className={
                status.type === "error"
                  ? styles.statusError
                  : styles.statusSuccess
              }
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
