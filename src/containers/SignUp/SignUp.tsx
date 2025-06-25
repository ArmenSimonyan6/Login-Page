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
    <div className={styles.loginPage}>
      <div className={styles.formDiv}>
        <div>
          <h2 className={styles.formDiv__title}>Create an account</h2>
        </div>

        <form onSubmit={handleSubmit(signUp)} autoComplete="off">
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
                <p className={styles.error}>{errors.email.message}</p>
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
                <p className={styles.error}>{errors.password.message}</p>
              )}
            </div>
          </div>
          <div className={styles.buttonLogIn}>
            <button>Create account</button>
          </div>
          <div className={styles.buttonGoogle}>
            <button onClick={handleSignUpGoogle} type="button">
              <img src={GoogleIcon} />
              Continue with Google
            </button>
          </div>
          <div className={styles.footerLogin}>
            <span className={styles.textFooter}>Already Have An Account?</span>
            <button
              type="button"
              className={styles.buttonBlue}
              onClick={() => navigate(ROUTES.SIGN_IN)}
            >
              Sign In
            </button>
            {error && <p className={styles.error}>{error}</p>}
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
