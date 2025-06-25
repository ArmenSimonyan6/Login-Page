import { ROUTES } from "../../routes";
import styles from "./SignIn.module.scss";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import type { TFormData } from "./SignIn.props";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginSchema } from "../../schemas/login.schema";
import { useAuth } from "../../context/AuthContext/AuthContex";

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
    <div className={styles.loginPage}>
      <div className={styles.formDiv}>
        <div>
          <h2 className={styles.formDiv__title}>Login to your account</h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
          <div className={styles.inputs}>
            <div>
              <span>Email</span>
              <input
                type="email"
                {...register("email")}
                placeholder="Enter your email"
                className={styles.inputEmail}
              />
              {errors.email && (
                <p className={styles.error}>{errors.email?.message}</p>
              )}
            </div>
            <div>
              <span>Password</span>
              <input
                type="password"
                {...register("password")}
                placeholder="Enter your password"
                className={styles.inputPassword}
              />
              {errors.password && (
                <p className={styles.error}>{errors.password?.message}</p>
              )}
            </div>
          </div>
          <div className={styles.forgot}>
            <button
              type="button"
              className={styles.buttonBlue}
              onClick={() => navigate(ROUTES.FORGOT_PWD)}
            >
              Forgot password?
            </button>
          </div>
          <div className={styles.buttonLogIn}>
            <button>Log In</button>
          </div>
          {error && <p className={styles.error}>{error}</p>}
          <div className={styles.footerLogin}>
            <span className={styles.textFooter}>Don't Have An Account?</span>
            <button
              type="button"
              className={styles.buttonBlue}
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
