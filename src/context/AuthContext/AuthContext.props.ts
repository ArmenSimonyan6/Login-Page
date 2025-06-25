import type { Session } from "@supabase/supabase-js";

export interface IEmailOnly {
  email: string;
}

export interface IEmailPassword {
  email: string;
  password: string;
}

export interface AuthResponse {
  data?: unknown;
  error?: string;
  success: boolean;
}

export interface IAuthContextType {
  loading: boolean;
  session: Session | null;
  signOut: () => Promise<void>;
  signUpGoogle: () => Promise<void>;
  resetPassword: ({ email }: IEmailOnly) => Promise<AuthResponse>;
  signInUser: ({ email, password }: IEmailPassword) => Promise<AuthResponse>;
  signUpNewUser: ({ email, password }: IEmailPassword) => Promise<AuthResponse>;
}
