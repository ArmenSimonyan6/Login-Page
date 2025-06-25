import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import { ROUTES } from "../../routes/Routes";
import { useNavigate } from "react-router-dom";
import { contactUsSchema } from "../../schemas";
import styles from "./ResetPassword.module.scss";
import { yupResolver } from "@hookform/resolvers/yup";
import type { TPassword } from "./ResetPassword.props";
import { supabase } from "../../supabase/supabaseClient";

const ResetPassword = () => {
  const navigate = useNavigate();

  const [isReady, setIsReady] = useState(false);
  const [passwordChanged, setPasswordChanged] = useState(false);

  const schema = contactUsSchema.pick(["password"]);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TPassword>({
    resolver: yupResolver(schema),
  });

  useEffect(
    () => () => {
      if (isReady && !passwordChanged) {
        supabase.auth.signOut();
      }
    },
    [isReady, passwordChanged]
  );

  useEffect(() => {
    const { hash } = window.location;

    if (!hash) return;

    const params = new URLSearchParams(hash.slice(1));

    const access_token = params.get("access_token");
    const refresh_token = params.get("refresh_token");

    if (access_token && refresh_token) {
      supabase.auth
        .setSession({ access_token, refresh_token })
        .then(({ error }) => {
          if (error) {
            console.error("Session error:", error.message);
          } else {
            setIsReady(true);
          }
        });
    }
  }, []);

  const onSubmit = async (data: TPassword) => {
    const { error } = await supabase.auth.updateUser({
      password: data.password,
    });

    if (error) {
      alert("Error updating password: " + error.message);
    } else {
      setPasswordChanged(false);
      navigate(ROUTES.SIGN_IN);
      alert("Password updated successfully!");
    }
  };

  return (
    <div className={styles.loginPage}>
      <div className={styles.formDiv}>
        <h2 className={styles.formDiv__title}>Reset Password</h2>

        {!isReady ? (
          <p>Preparing your session...</p>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} autoComplete="off">
            <div className={styles.inputs}>
              <div>
                <span>New Password</span>
                <input
                  type="password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                  placeholder="New password"
                  className={styles.inputPassword}
                />
                {errors.password && (
                  <p className={styles.error}>{errors.password?.message}</p>
                )}
              </div>
            </div>

            <div className={styles.buttonLogIn}>
              <button type="submit">Reset Password</button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
