import { ROUTES } from "../../routes";
import { GoogleIcon } from "../../assets";
import styles from "./SignUp.module.scss";
import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { contactUsSchema } from "../../schemas";
import { yupResolver } from "@hookform/resolvers/yup";
import type { TFormData } from "../SignIn/SignIn.props";
import { useAuth } from "../../context/AuthContext/AuthContex";
import { Button, Input } from "../../components/shared";

const SignUp = () => {
  const navigate = useNavigate();
  const { signUpNewUser, signUpGoogle } = useAuth();

  const [error, setError] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(contactUsSchema),
  });

  useEffect(() => {
    const visitedHome = localStorage.getItem("visitedHome");
    const isCameFromNavigate = window.history.state?.usr?.fromNavigate === true;

    if (visitedHome && !isCameFromNavigate) {
      navigate(ROUTES.HOME);
    }
  }, [navigate]);

  const handleSignUpGoogle = async () => {
    try {
      await signUpGoogle();
    } catch (error) {
      console.log("Google Sign In Error: ", error);
    }
  };

  const signUp = async (data: TFormData) => {
    setError("");

    try {
      const result = await signUpNewUser(data);

      if (result.success) {
        navigate(ROUTES.HOME);
      } else {
        setError(
          result.error === "User already registered"
            ? "This user is already registered"
            : result.error || "Failed to create account"
        );
      }
    } catch {
      setError("An unexpected error occurred");
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.formWrapper}>
        <div>
          <h2 className={styles.formWrapper__title}>Create an account</h2>
        </div>

        <form onSubmit={handleSubmit(signUp)} autoComplete="off">
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
                  {errors.email.message}
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
                  {errors.password.message}
                </p>
              )}
            </div>
          </div>
          <div className={styles.formWrapper__submit}>
            <Button variant="dark">Create account</Button>
          </div>
          <div className={styles.formWrapper__google}>
            <Button
              variant="primary"
              onClick={handleSignUpGoogle}
              type="button"
            >
              <img src={GoogleIcon} />
              Continue with Google
            </Button>
          </div>
          <div className={styles.formWrapper__footer}>
            <span className={styles.formWrapper__footer__subTitle}>
              Already Have An Account?
            </span>
            <button
              type="button"
              className={styles.formWrapper__footerButton}
              onClick={() => navigate(ROUTES.SIGN_IN)}
            >
              Sign In
            </button>
            {error && <p className={styles.formWrapper__error}>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
