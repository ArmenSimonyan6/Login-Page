import { BrowserRouter, Route, Routes } from "react-router-dom";
import { PrivateRoute, ROUTES_GROUP } from "./routes";
import { Layout } from "./layouts";

import "./App.scss";
import { AuthProvider } from "./context/AuthContext/AuthContex";

export const AppProvider = () => (
  <AuthProvider>
    <BrowserRouter>
      <Routes>
        {ROUTES_GROUP.map(({ path, component: Component, isPrivate }) => {
          const element = (
            <Layout>
              <Component />
            </Layout>
          );

          return (
            <Route
              key={path}
              path={path}
              element={
                isPrivate ? <PrivateRoute>{element}</PrivateRoute> : element
              }
            />
          );
        })}
      </Routes>
    </BrowserRouter>
  </AuthProvider>
);
