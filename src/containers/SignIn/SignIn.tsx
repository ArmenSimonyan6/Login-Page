import { ROUTES } from "../../routes";
import styles from "./SignIn.module.scss";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { loginSchema } from "../../schemas";
import { useNavigate } from "react-router-dom";
import type { TFormData } from "./SignIn.props";
import { yupResolver } from "@hookform/resolvers/yup";
import { useAuth } from "../../context/AuthContext/AuthContex";
import { Button, Input } from "../../components/shared";

const SignIn = () => {
  const navigate = useNavigate();
  const { session, signInUser } = useAuth();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(loginSchema),
  });

  const onSubmit = async (data: TFormData) => {
    setError("");
    try {
      const result = await signInUser(data);

      if (result.success) {
        navigate(ROUTES.HOME);
      } else {
        setError(result.error || "Account not found or password is incorrect");
      }
    } catch {
      setError("an error occurred");
    }
  };

  useEffect(() => {
    if (session) {
      navigate(ROUTES.HOME);
    }
  }, [navigate, session]);

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div>
          <h2 className={styles.formWrapper__title}>Login to your account</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div>
            <div className={styles.formWrapper__inputs}>
              <span>Email</span>
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

              <span>Password</span>
              <Input
                variant="bold"
                type="password"
                {...register("password")}
                placeholder="Enter your password"
              />
              {errors.password && (
                <p className={styles.formWrapper__error}>
                  {errors.password?.message}
                </p>
              )}
            </div>
          </div>
          <div className={styles.formWrapper__forgot}>
            <button type="button" onClick={() => navigate(ROUTES.FORGOT_PWD)}>
              Forgot password?
            </button>
          </div>
          <div className={styles.formWrapper__submit}>
            <Button variant="dark">Log In</Button>
          </div>
          {error && <p className={styles.formWrapper__error}>{error}</p>}
          <div className={styles.formWrapper__footer}>
            <span className={styles.formWrapper__footer__subtitle}>
              Don't Have An Account?
            </span>
            <button
              type="button"
              className={styles.formWrapper__footerButton}
              onClick={() =>
                navigate(ROUTES.SIGN_UP, { state: { fromNavigate: true } })
              }
            >
              Sign Up
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignIn;
