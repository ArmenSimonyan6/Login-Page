import {
  createContext,
  useContext,
  useEffect,
  useState,
  type PropsWithChildren,
} from "react";
import type { Session } from "@supabase/supabase-js";
import { supabase } from "../../supabase/supabaseClient";
import type {
  AuthResponse,
  IAuthContextType,
  IEmailOnly,
  IEmailPassword,
} from "./AuthContext.props";
import { ROUTES } from "../../routes/Routes";
import { Providers } from "./AuthContext.const";

const AuthContext = createContext<IAuthContextType | null>(null);

export const AuthProvider = ({ children }: PropsWithChildren) => {
  const [loading, setLoading] = useState(true);
  const [session, setSession] = useState<Session | null>(null);

  // Sign Up
  const signUpNewUser = async ({
    email,
    password,
  }: IEmailPassword): Promise<AuthResponse> => {
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.log("There was a problem signing up:", error);
      return { success: false, error: error.message };
    }

    return { success: true, data };
  };

  // Sign Up Google
  const signUpGoogle = async () => {
    await supabase.auth.signInWithOAuth({
      provider: Providers.GOOGLE,
      options: {
        redirectTo: `${window.location.origin}${ROUTES.HOME}`,
      },
    });
  };

  // Sign in
  const signInUser = async ({
    email,
    password,
  }: IEmailPassword): Promise<AuthResponse> => {
    try {
      const { error, data } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) {
        return { success: false, error: error.message };
      }
      console.log("sign-in success: ", data);
      return { success: true, data };
    } catch (error) {
      console.log("an error occurred", error);
      return { success: false, error: "Unexpected error occurred" };
    }
  };

  // Sign Out
  const signOut = async (): Promise<void> => {
    const { error } = await supabase.auth.signOut();

    if (error) {
      console.log("There was an error", error);
    }
  };

  // Forgot Password
  const resetPassword = async ({
    email,
  }: IEmailOnly): Promise<AuthResponse> => {
    console.log("reset password for:", email);
    try {
      const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${window.location.origin}${ROUTES.RESET_PWD}`,
      });

      if (error) {
        console.error("Supabase error:", error);
        return { success: false, error: error.message };
      }

      return { success: true };
    } catch (err) {
      const error = err as Error;
      console.error("Unexpected error:", error);
      return { success: false, error: error.message };
    }
  };

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setLoading(false);
    });

    supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      setLoading(false);
    });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        session,
        signOut,
        loading,
        signInUser,
        signUpGoogle,
        signUpNewUser,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
