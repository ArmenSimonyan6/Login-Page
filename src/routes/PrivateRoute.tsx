import { ROUTES } from "./Routes";
import { Navigate } from "react-router-dom";
import React, { type PropsWithChildren } from "react";
import { useAuth } from "../context/AuthContext/AuthContex";

export const PrivateRoute = ({ children }: PropsWithChildren) => {
  const { session, loading } = useAuth();

  if (loading) {
    return <div>Loading...</div>;
  }

  return session ? (
    <React.Fragment>{children}</React.Fragment>
  ) : (
    <Navigate to={ROUTES.SIGN_IN} replace />
  );
};
