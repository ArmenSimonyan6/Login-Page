import { Footer, Header } from "../../components";
import React, { type PropsWithChildren } from "react";

export const Layout = ({ children }: PropsWithChildren) => (
  <React.Fragment>
    <Header />
    <main>{children}</main>
    <Footer />
  </React.Fragment>
);
